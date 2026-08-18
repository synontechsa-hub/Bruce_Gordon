import { Font, woff2 } from "fonteditor-core";
import type {
  FontFormat,
  TargetFormat,
  FontMetadata,
  CompatibilityCheck,
  ConvertedResult,
} from "./types";
import { formatBytes } from "./detector";
import { extractMetadataFromTTFObject } from "./tableParser";
import { initWoff2Wasm, getWasmStatus } from "./wasmLoader";

export const MIME_TYPES: Record<TargetFormat, string> = {
  ttf: "font/ttf",
  otf: "font/otf",
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
    description: "Modern standard web font with maximum Brotli compression (30%+ smaller).",
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
  otf: {
    label: "OTF",
    tag: "Desktop OpenType",
    description: "OpenType vector font container with TrueType outline tables.",
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
      "Variable Font: Font contains variation axes. In-browser conversion will flatten the font into a static instance; variable axes will not be preserved."
    );
  }

  // OTF / CFF conversion warnings
  if (sourceFormat === "otf" || metadata?.hasCffOutlines) {
    warnings.push(
      "PostScript CFF Outlines: Converting CFF outlines to TrueType curves will approximate bezier splines. Advanced OpenType layout features, hinting, or specialized tables may be dropped."
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

  // General OpenType table notice
  if (sourceFormat !== "woff2" && targetFormat === "otf") {
    warnings.push(
      "OTF Output Note: Resulting file uses TrueType glyph outlines wrapped inside an OpenType container."
    );
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
    label: "Fully Supported",
    description: "Standard outline conversion with near-lossless fidelity.",
    warnings: [],
  };
}

export async function parseFontBuffer(
  buffer: ArrayBuffer,
  fileName: string,
  detectedFormat: FontFormat
): Promise<{ fontInstance: InstanceType<typeof Font>; metadata: FontMetadata }> {
  // If reading WOFF2, ensure WASM is ready
  if (detectedFormat === "woff2") {
    const wasmReady = await initWoff2Wasm();
    if (!wasmReady) {
      throw new Error(
        "WOFF2 WebAssembly module failed to initialize. Cannot decompress WOFF2 fonts."
      );
    }
  }

  try {
    // Read font through fonteditor-core
    const fontInstance = Font.create(buffer, {
      type: detectedFormat,
      hinting: false,
      kerning: true,
      compound2simple: true,
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
      buffer
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
  originalFileName: string
): Promise<ConvertedResult> {
  if (sourceFormat === targetFormat) {
    throw new Error("Cannot convert font to the same format.");
  }

  // If writing WOFF2, ensure WASM is initialized
  if (targetFormat === "woff2") {
    const wasmReady = await initWoff2Wasm();
    if (!wasmReady) {
      throw new Error(
        "WOFF2 WebAssembly module is not ready. Unable to compress font to WOFF2."
      );
    }
  }

  let uint8Data: Uint8Array;

  try {
    if (targetFormat === "woff2") {
      // 1. Generate standard TTF representation first
      const ttfOutput = fontInstance.write({
        type: "ttf",
        hinting: false,
        kerning: true,
      });

      // 2. Compress with Google WOFF2 WASM
      uint8Data = woff2.encode(ttfOutput as unknown as ArrayBuffer);
    } else {
      const writeType = targetFormat === "otf" ? "ttf" : targetFormat;
      const outputData = fontInstance.write({
        type: writeType,
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

  const mimeType = MIME_TYPES[targetFormat];
  const blob = new Blob([uint8Data as unknown as BlobPart], { type: mimeType });
  const fileSizeBytes = uint8Data ? (uint8Data.byteLength || uint8Data.length || blob.size) : 0;
  const downloadUrl = typeof URL.createObjectURL === "function" ? URL.createObjectURL(blob) : "";
  const fileName = sanitizeFontFileName(originalFileName, targetFormat);

  return {
    blob,
    downloadUrl,
    fileName,
    targetFormat,
    fileSizeBytes,
    formattedSize: formatBytes(fileSizeBytes),
    convertedAt: new Date(),
  };
}
