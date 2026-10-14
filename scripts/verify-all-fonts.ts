import fs from "fs";
import path from "path";
import { detectFontFormat } from "../lib/fontforge/detector";
import { parseFontBuffer, convertFontInstance, evaluateCompatibility } from "../lib/fontforge/converter";
import { initWoff2Wasm, getWasmStatus } from "../lib/fontforge/wasmLoader";
import type { FontFormat, TargetFormat } from "../lib/fontforge/types";

const outputDirectory = process.env.FONTFORGE_OUTPUT_DIR;
const outputRunDirectory = outputDirectory
  ? path.join(outputDirectory, `run-${new Date().toISOString().replace(/[:.]/g, "-")}`)
  : undefined;

async function saveConvertedFixture(
  result: Awaited<ReturnType<typeof convertFontInstance>>,
  sourceFilePath: string
) {
  if (!outputRunDirectory) return;

  fs.mkdirSync(outputRunDirectory, { recursive: true });
  const sourceFile = path.parse(sourceFilePath);
  const outputFileName = `${sourceFile.name}-${sourceFile.ext.slice(1)}-to-${result.targetFormat}.${result.targetFormat}`;
  const outputPath = path.join(outputRunDirectory, outputFileName);
  fs.writeFileSync(outputPath, Buffer.from(await result.blob.arrayBuffer()));
  console.log(`   --> Saved validation output: ${outputPath}`);
}

async function testFontBuffer(
  arrayBuffer: ArrayBuffer,
  fileName: string,
  expectedFormat: FontFormat,
  expectedVariable = false,
  sourceFilePath = fileName
) {
  console.log(`\n======================================================`);
  console.log(`TESTING FONT: ${fileName}`);
  console.log(`======================================================`);
  console.log(`File size: ${arrayBuffer.byteLength} bytes`);

  // 1. Format Detection
  const detection = detectFontFormat(arrayBuffer, fileName);
  console.log(`[Detection] Detected Format: ${detection.format.toUpperCase()} (Expected: ${expectedFormat.toUpperCase()})`);
  if (detection.format !== expectedFormat) {
    throw new Error(`Format detection mismatch: expected ${expectedFormat}, got ${detection.format}`);
  }

  // 2. Parse font & Extract Metadata
  const { fontInstance, metadata } = await parseFontBuffer(arrayBuffer, fileName, detection.format);
  console.log(`[Metadata] Family Name: "${metadata.familyName}"`);
  console.log(`[Metadata] Subfamily/Style: "${metadata.subfamilyName}"`);
  console.log(`[Metadata] Full Name: "${metadata.fullName}"`);
  console.log(`[Metadata] PostScript Name: "${metadata.postscriptName}"`);
  console.log(`[Metadata] Glyphs: ${metadata.glyphCount} | Units/Em: ${metadata.unitsPerEm} | Weight: ${metadata.weightClass}`);
  console.log(`[Metadata] Is Variable: ${metadata.isVariable} (Expected: ${expectedVariable})`);
  if (metadata.variableAxes.length > 0) {
    console.log(`[Metadata] Variable Axes:`, metadata.variableAxes);
  }
  console.log(`[Metadata] Has CFF Outlines: ${metadata.hasCffOutlines}`);

  if (expectedVariable && !metadata.isVariable) {
    throw new Error(`Expected variable font detection for ${fileName}`);
  }

  // 3. Test Compatibility Warnings
  const targetFormats: TargetFormat[] = ["woff2", "woff", "ttf"];
  const converted = new Map<TargetFormat, ArrayBuffer>();
  for (const target of targetFormats) {
    if (target === detection.format) continue;
    const check = evaluateCompatibility(detection.format, target, metadata);
    console.log(`[Compatibility ${detection.format.toUpperCase()} -> ${target.toUpperCase()}]: Status: ${check.status}`);
    if (check.warnings.length > 0) {
      console.log(`   Warnings: ${check.warnings.join(" | ")}`);
    }
  }

  // 4. Test Conversions
  for (const target of targetFormats) {
    if (target === detection.format) continue;
    console.log(`[Converting] ${detection.format.toUpperCase()} -> ${target.toUpperCase()}...`);
    const result = await convertFontInstance(fontInstance, detection.format, target, fileName, metadata, arrayBuffer);
    console.log(`   --> Generated: ${result.fileName} (${result.formattedSize}, ${result.fileSizeBytes} bytes)`);
    if (result.lostLayoutTables.length > 0) {
      console.log(`   --> Download warning: ${result.lostLayoutTables.join(", ")} omitted`);
    }
    if (result.fileSizeBytes === 0) {
      throw new Error(`Conversion produced empty output for target ${target}`);
    }

    await saveConvertedFixture(result, sourceFilePath);

    // Verify converted output can be re-parsed
    const convertedBuffer = await result.blob.arrayBuffer();
    const subDetect = detectFontFormat(convertedBuffer, result.fileName);
    console.log(`   --> Verified converted file header: ${subDetect.format.toUpperCase()}`);
    if (subDetect.format !== target) {
      throw new Error(`Converted file header mismatch: expected ${target}, got ${subDetect.format}`);
    }
    const { metadata: convertedMetadata } = await parseFontBuffer(convertedBuffer, result.fileName, target);
    if (convertedMetadata.glyphCount !== metadata.glyphCount) {
      throw new Error(`Glyph count changed from ${metadata.glyphCount} to ${convertedMetadata.glyphCount}`);
    }
    if (metadata.layoutStatus === "detected" && convertedMetadata.layoutStatus !== "unknown") {
      const droppedTables = metadata.layoutTables.filter((tag) => !convertedMetadata.layoutTables.includes(tag));
      if (droppedTables.join(",") !== result.lostLayoutTables.join(",")) {
        throw new Error(`Reported layout loss does not match the output: ${droppedTables.join(", ")}`);
      }
      const compatibility = evaluateCompatibility(detection.format, target, metadata);
      if (droppedTables.some((tag) => !compatibility.warnings.some((warning) => warning.includes(tag)))) {
        throw new Error(`Missing compatibility warning for dropped layout tables: ${droppedTables.join(", ")}`);
      }
      if (droppedTables.length > 0) {
        console.log(`   --> Layout tables not preserved: ${droppedTables.join(", ")}`);
      }
    }
    converted.set(target, convertedBuffer);
  }

  console.log(`--> PASS: All operations for ${fileName} succeeded!`);
  return converted;
}

async function testFont(filePath: string, expectedFormat: FontFormat, expectedVariable = false) {
  const rawBuffer = fs.readFileSync(filePath);
  const arrayBuffer = rawBuffer.buffer.slice(rawBuffer.byteOffset, rawBuffer.byteOffset + rawBuffer.byteLength);
  return testFontBuffer(arrayBuffer, path.basename(filePath), expectedFormat, expectedVariable, filePath);
}

async function runSuite() {
  console.log("INITIALIZING TEST SUITE...");
  await initWoff2Wasm();
  console.log("WASM status:", getWasmStatus());

  // Fontsource packages are already installed for the site and make this suite portable.
  const fixtureDirectory = path.resolve("node_modules/@fontsource/barlow-condensed/files");
  const woffPath = path.join(fixtureDirectory, "barlow-condensed-latin-400-normal.woff");
  const woff2Path = path.join(fixtureDirectory, "barlow-condensed-latin-400-normal.woff2");

  const woffResults = await testFont(woffPath, "woff", false);
  await testFont(woff2Path, "woff2", false);
  const generatedTtf = woffResults.get("ttf");
  if (!generatedTtf) throw new Error("WOFF to TTF conversion did not produce a fixture.");
  await testFontBuffer(generatedTtf, "barlow-condensed-generated.ttf", "ttf");

  if (process.env.FONTFORGE_TTF_FIXTURE) {
    await testFont(process.env.FONTFORGE_TTF_FIXTURE, "ttf");
  }
  if (process.env.FONTFORGE_CFF_FIXTURE) {
    const cffResults = await testFont(process.env.FONTFORGE_CFF_FIXTURE, "otf");
    const cffWoff2 = cffResults.get("woff2");
    if (!cffWoff2) throw new Error("OTF to WOFF2 conversion did not produce a fixture.");
    await testFontBuffer(cffWoff2, "cff-generated.woff2", "woff2");
  }

  const externalFixtureRoot = process.env.FONTFORGE_EXTERNAL_FIXTURE_ROOT;
  if (externalFixtureRoot) {
    await testFont(
      path.join(externalFixtureRoot, "Outfit", "static", "Outfit-Regular.ttf"),
      "ttf",
      false
    );
    await testFont(
      path.join(externalFixtureRoot, "Outfit", "Outfit-VariableFont_wght.ttf"),
      "ttf",
      true
    );
    await testFont(path.join(externalFixtureRoot, "Quinn-Bold.otf"), "otf", false);
  }

  console.log("\n======================================================");
  console.log("🎉 ALL REAL FONT VERIFICATION TESTS PASSED 100%!");
  console.log("======================================================");
}

runSuite().catch((err) => {
  console.error("Test Suite Failed:", err);
  process.exit(1);
});
