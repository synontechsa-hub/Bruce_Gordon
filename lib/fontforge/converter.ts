import fonteditorCore, { Font, woff2 } from "fonteditor-core";
import { deflate, inflate } from "pako";
import type {
  FontFormat,
  TargetFormat,
  FontMetadata,
  CompatibilityCheck,
  ConvertedResult,
} from "./types";
import { detectFontFormat, formatBytes } from "./detector";
import { extractMetadataFromTTFObject } from "./tableParser";
import { initWoff2Wasm, getWasmStatus } from "./wasmLoader";

const inflateWoff = (compressedData: number[]): number[] =>
  Array.from(inflate(Uint8Array.from(compressedData)));

const deflateWoff = (rawData: number[]): number[] =>
  Array.from(deflate(Uint8Array.from(rawData)));

function toArrayBuffer(data: ArrayBuffer | ArrayBufferView): ArrayBuffer {
  if (data instanceof ArrayBuffer) return data;
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength).slice().buffer as ArrayBuffer;
}

export const MIME_TYPES: Record<TargetFormat, string> = {
  ttf: "font/ttf",
  woff: "font/woff",
  woff2: "font/woff2",
};

export const FORMAT_DESCRIPTIONS: Record<
  TargetFormat,
  { label: string; tag: string; description: string }
> = {
  woff2: {
    label: "WOFF2",
    tag: "Recommended for Web",
    description: "Modern web font format with Brotli compression. File size depends on the font.",
  },
  woff: {
    label: "WOFF",
    tag: "Legacy Web",
    description: "Standard web font format for broad legacy browser compatibility.",
  },
  ttf: {
    label: "TTF",
    tag: "Desktop & Mobile",
    description: "Universal TrueType vector font for macOS, Windows, Linux, and design apps.",
  },
};

export function evaluateCompatibility(
  sourceFormat: FontFormat,
  targetFormat: TargetFormat,
  metadata?: FontMetadata
): CompatibilityCheck {
  if (sourceFormat === targetFormat) {
    return {
      status: "unsupported",
      label: "Same Format",
      description: "Target format is identical to source format.",
      warnings: ["Source and target formats are identical."],
    };
  }

  const warnings: string[] = [];

  // Variable font warning
  if (metadata?.isVariable) {
    warnings.push(
      "Variable Font: Variation axes and related variable-font data may be altered, lost, or unsupported during conversion. The converted font may no longer remain variable."
    );
  } else if (metadata?.variableStatus === "unknown") {
    warnings.push(
      "Variable Font Inspection: Variation-table inspection is unavailable for this compressed source. Variable-font data may be altered or unsupported during conversion."
    );
  }

  // Only a TTF target requires rebuilding CFF outlines as TrueType curves.
  if (targetFormat === "ttf" && (sourceFormat === "otf" || metadata?.hasCffOutlines)) {
    warnings.push(
      "PostScript CFF Outlines: Conversion approximates the original curves as TrueType outlines. Original CFF data and hinting are not preserved."
    );
  }

  const rebuildsCff = targetFormat === "ttf" && (sourceFormat === "otf" || metadata?.hasCffOutlines);
  if (rebuildsCff && metadata?.layoutStatus === "detected") {
    warnings.push(
      `OpenType Layout: This font contains ${metadata.layoutTables.join(", ")} tables. Some may be omitted during conversion, changing ligatures, kerning, or complex-script shaping.`
    );
  } else if (rebuildsCff && metadata?.layoutStatus === "unknown") {
    warnings.push(
      "OpenType Layout: Layout tables cannot be inspected for this source. Ligatures, kerning, or shaping may be lost during conversion."
    );
  }

  // WOFF2 WASM requirement notice
  if (sourceFormat === "woff2" || targetFormat === "woff2") {
    const wasmState = getWasmStatus();
    if (wasmState === "error") {
      return {
        status: "unsupported",
        label: "WASM Required",
        description: "WOFF2 compression module failed to load. Please reload the page to retry.",
        warnings: ["WOFF2 WebAssembly module could not be initialized."],
      };
    }
  }

  if (warnings.length > 0) {
    return {
      status: "warning",
      label: "Supported (with notices)",
      description:
        "Conversion is technically supported, but some advanced tables, hinting, or variable font data may be altered or dropped.",
      warnings,
    };
  }

  return {
    status: "supported",
    label: "Supported",
    description: "Standard conversion path with broad compatibility.",
    warnings: [],
  };
}

export async function parseFontBuffer(
  buffer: ArrayBuffer,
  fileName: string,
  detectedFormat: FontFormat
): Promise<{ fontInstance: InstanceType<typeof Font>; metadata: FontMetadata }> {
  // Decompress web containers before parsing so CFF-based WOFF/WOFF2 fonts work too.
  if (detectedFormat === "woff2") {
    const wasmReady = await initWoff2Wasm();
    if (!wasmReady) {
      throw new Error(
        "WOFF2 WebAssembly module failed to initialize. Cannot decompress WOFF2 fonts."
      );
    }
  }

  try {
    const parseBuffer = detectedFormat === "woff2"
      ? toArrayBuffer(woff2.decode(buffer))
      : detectedFormat === "woff"
        ? fonteditorCore.woff2ttf(buffer, { inflate: inflateWoff })
        : buffer;
    const parseFormat = detectedFormat === "woff" || detectedFormat === "woff2"
      ? detectFontFormat(parseBuffer, fileName).format
      : detectedFormat;

    // Read font through fonteditor-core
    const fontInstance = Font.create(parseBuffer, {
      type: parseFormat,
      hinting: false,
      kerning: true,
      compound2simple: true,
      inflate: inflateWoff,
    });

    const ttfObject = fontInstance.get();
    if (!ttfObject || !ttfObject.head) {
      throw new Error("Unable to parse font table structures from file buffer.");
    }

    const metadata = extractMetadataFromTTFObject(
      ttfObject,
      detectedFormat,
      fileName,
      buffer.byteLength,
      buffer,
      parseBuffer
    );

    return { fontInstance, metadata };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to parse ${detectedFormat.toUpperCase()} font: ${msg}`);
  }
}

export function sanitizeFontFileName(originalFileName: string, targetFormat: TargetFormat): string {
  // Strip previous extension
  const base = originalFileName.replace(/\.[^/.]+$/, "");
  const cleanBase = base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^-+|-+$/g, "");

  return `${cleanBase || "font"}.${targetFormat}`;
}

export async function convertFontInstance(
  fontInstance: InstanceType<typeof Font>,
  sourceFormat: FontFormat,
  targetFormat: TargetFormat,
  originalFileName: string,
  sourceMetadata: FontMetadata,
  sourceBuffer: ArrayBuffer
): Promise<ConvertedResult> {
  if (sourceFormat === targetFormat) {
    throw new Error("Cannot convert font to the same format.");
  }

  const sourceGlyphCount = fontInstance.get().maxp?.numGlyphs ?? 0;

  // WOFF2 input and output both require WASM.
  if (sourceFormat === "woff2" || targetFormat === "woff2") {
    const wasmReady = await initWoff2Wasm();
    if (!wasmReady) {
      throw new Error(
        "WOFF2 WebAssembly module is not ready. Unable to compress font to WOFF2."
      );
    }
  }

  let uint8Data: Uint8Array;

  try {
    const sourceSfnt = sourceFormat === "woff"
      ? fonteditorCore.woff2ttf(sourceBuffer, { inflate: inflateWoff })
      : sourceFormat === "woff2"
        ? toArrayBuffer(woff2.decode(sourceBuffer))
        : sourceBuffer;

    const isCffSfnt = new DataView(sourceSfnt).getUint32(0, false) === 0x4f54544f;
    if (!(targetFormat === "ttf" && isCffSfnt)) {
      if (targetFormat === "ttf") {
        uint8Data = new Uint8Array(sourceSfnt);
      } else if (targetFormat === "woff2") {
        uint8Data = woff2.encode(sourceSfnt);
      } else {
        const woffBuffer = fonteditorCore.ttf2woff(sourceSfnt, {
          metadata: undefined,
          deflate: deflateWoff,
        });
        if (isCffSfnt) new DataView(woffBuffer).setUint32(4, 0x4f54544f, false);
        uint8Data = new Uint8Array(woffBuffer);
      }
    } else {
      // CFF to TTF changes outline technology; the compatibility notice covers this loss.
      const outputData = fontInstance.write({
        type: targetFormat,
        hinting: false,
        kerning: true,
      });

      if (!outputData) {
        throw new Error(
          `Conversion produced empty output for format ${targetFormat.toUpperCase()}.`
        );
      }

      if (outputData instanceof Uint8Array) {
        uint8Data = outputData;
      } else if (ArrayBuffer.isView(outputData)) {
        const view = outputData as ArrayBufferView;
        uint8Data = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
      } else if (
        outputData instanceof ArrayBuffer ||
        (outputData && typeof outputData === "object" && "byteLength" in outputData)
      ) {
        uint8Data = new Uint8Array(outputData as ArrayBuffer);
      } else if (typeof outputData === "string") {
        uint8Data = new TextEncoder().encode(outputData);
      } else {
        throw new Error("Unrecognized binary output format from font writer.");
      }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Font conversion to ${targetFormat.toUpperCase()} failed: ${msg}`);
  }

  const fileName = sanitizeFontFileName(originalFileName, targetFormat);
  const outputBuffer = new Uint8Array(uint8Data.byteLength);
  outputBuffer.set(uint8Data);
  const detectedOutput = detectFontFormat(
    outputBuffer.buffer,
    fileName
  );
  if (detectedOutput.format !== targetFormat) {
    throw new Error(
      `Conversion produced ${detectedOutput.format.toUpperCase()} data instead of the requested ${targetFormat.toUpperCase()} output.`
    );
  }

  let lostLayoutTables: string[] = [];
  try {
    const { metadata } = await parseFontBuffer(outputBuffer.buffer, fileName, targetFormat);
    if (metadata.glyphCount < 1) {
      throw new Error("The generated font contains no glyphs.");
    }
    if (sourceGlyphCount > 0 && metadata.glyphCount !== sourceGlyphCount) {
      throw new Error(`Glyph count changed from ${sourceGlyphCount} to ${metadata.glyphCount}.`);
    }
    const outputTables = metadata.layoutStatus === "unknown" ? null : metadata.layoutTables;
    if (sourceMetadata.layoutStatus === "detected" && outputTables) {
      lostLayoutTables = sourceMetadata.layoutTables.filter((tag) => !outputTables.includes(tag));
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Generated ${targetFormat.toUpperCase()} font failed validation: ${message}`);
  }

  const mimeType = MIME_TYPES[targetFormat];
  const blob = new Blob([uint8Data as unknown as BlobPart], { type: mimeType });
  const fileSizeBytes = uint8Data ? (uint8Data.byteLength || uint8Data.length || blob.size) : 0;
  const downloadUrl = typeof URL.createObjectURL === "function" ? URL.createObjectURL(blob) : "";
  return {
    blob,
    downloadUrl,
    fileName,
    targetFormat,
    fileSizeBytes,
    formattedSize: formatBytes(fileSizeBytes),
    convertedAt: new Date(),
    lostLayoutTables,
  };
}
