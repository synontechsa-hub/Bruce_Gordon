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

async function testFont(filePath: string, expectedFormat: FontFormat, expectedVariable = false) {
  console.log(`\n======================================================`);
  console.log(`TESTING FONT: ${path.basename(filePath)} (${filePath})`);
  console.log(`======================================================`);

  const fileStats = fs.statSync(filePath);
  console.log(`File size: ${fileStats.size} bytes`);

  const rawBuffer = fs.readFileSync(filePath);
  const arrayBuffer = rawBuffer.buffer.slice(rawBuffer.byteOffset, rawBuffer.byteOffset + rawBuffer.byteLength);

  // 1. Format Detection
  const detection = detectFontFormat(arrayBuffer, path.basename(filePath));
  console.log(`[Detection] Detected Format: ${detection.format.toUpperCase()} (Expected: ${expectedFormat.toUpperCase()})`);
  if (detection.format !== expectedFormat) {
    throw new Error(`Format detection mismatch: expected ${expectedFormat}, got ${detection.format}`);
  }

  // 2. Parse font & Extract Metadata
  const { fontInstance, metadata } = await parseFontBuffer(arrayBuffer, path.basename(filePath), detection.format);
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
    throw new Error(`Expected variable font detection for ${filePath}`);
  }

  // 3. Test Compatibility Warnings
  const targetFormats: TargetFormat[] = ["woff2", "woff", "ttf"];
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
    const result = await convertFontInstance(fontInstance, detection.format, target, path.basename(filePath));
    console.log(`   --> Generated: ${result.fileName} (${result.formattedSize}, ${result.fileSizeBytes} bytes)`);
    if (result.fileSizeBytes === 0) {
      throw new Error(`Conversion produced empty output for target ${target}`);
    }

    await saveConvertedFixture(result, filePath);

    // Verify converted output can be re-parsed
    const convertedBuffer = await result.blob.arrayBuffer();
    const subDetect = detectFontFormat(convertedBuffer, result.fileName);
    console.log(`   --> Verified converted file header: ${subDetect.format.toUpperCase()}`);
    if (subDetect.format !== target) {
      throw new Error(`Converted file header mismatch: expected ${target}, got ${subDetect.format}`);
    }
  }

  console.log(`--> PASS: All operations for ${path.basename(filePath)} succeeded!`);
}

async function runSuite() {
  console.log("INITIALIZING TEST SUITE...");
  await initWoff2Wasm();
  console.log("WASM status:", getWasmStatus());

  // Fontsource packages are already installed for the site and make this suite portable.
  const fixtureDirectory = path.resolve("node_modules/@fontsource/barlow-condensed/files");
  const woffPath = path.join(fixtureDirectory, "barlow-condensed-latin-400-normal.woff");
  const woff2Path = path.join(fixtureDirectory, "barlow-condensed-latin-400-normal.woff2");

  await testFont(woffPath, "woff", false);
  await testFont(woff2Path, "woff2", false);

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
