import fs from "fs";
import path from "path";
import { detectFontFormat } from "../lib/fontforge/detector";
import { parseFontBuffer, convertFontInstance, evaluateCompatibility } from "../lib/fontforge/converter";
import { initWoff2Wasm, getWasmStatus } from "../lib/fontforge/wasmLoader";
import type { FontFormat, TargetFormat } from "../lib/fontforge/types";

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
  const targetFormats: TargetFormat[] = ["woff2", "woff", "ttf", "otf"];
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

    // Verify converted output can be re-parsed
    const convertedBuffer = await result.blob.arrayBuffer();
    const subDetect = detectFontFormat(convertedBuffer, result.fileName);
    console.log(`   --> Verified converted file header: ${subDetect.format.toUpperCase()}`);
    const validHeader = target === "otf" ? (subDetect.format === "ttf" || subDetect.format === "otf") : subDetect.format === target;
    if (!validHeader) {
      throw new Error(`Converted file header mismatch: expected ${target}, got ${subDetect.format}`);
    }
  }

  console.log(`--> PASS: All operations for ${path.basename(filePath)} succeeded!`);
}

async function runSuite() {
  console.log("INITIALIZING TEST SUITE...");
  await initWoff2Wasm();
  console.log("WASM status:", getWasmStatus());

  // Test 1: Real OTF file with CFF outlines
  await testFont("D:\\Fonts\\Quinn-Bold.otf", "otf", false);

  // Test 2: Real Variable Font
  await testFont("D:\\Fonts\\Outfit\\Outfit-VariableFont_wght.ttf", "ttf", true);

  // Test 3: Real Static TTF
  await testFont("D:\\Fonts\\Permanent_Marker\\PermanentMarker-Regular.ttf", "ttf", false);

  // Test 4: Another Variable Font (Playfair Display)
  await testFont("D:\\Fonts\\Playfair_Display\\PlayfairDisplay-VariableFont_wght.ttf", "ttf", true);

  // Test 5: Real WOFF2 from fontsource
  const woff2Path = path.resolve("node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-100-normal.woff2");
  await testFont(woff2Path, "woff2", false);

  console.log("\n======================================================");
  console.log("🎉 ALL REAL FONT VERIFICATION TESTS PASSED 100%!");
  console.log("======================================================");
}

runSuite().catch((err) => {
  console.error("Test Suite Failed:", err);
  process.exit(1);
});
