import type { FontFormat } from "./types";

export const MAX_FONT_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

export interface DetectionResult {
  format: FontFormat;
  isExtensionMismatch: boolean;
  detectedExtension: string;
  fileExtension: string;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function extractFileExtension(fileName: string): string {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase().trim() : "";
}

export function validateFileSize(file: File): { valid: boolean; error?: string } {
  if (file.size === 0) {
    return {
      valid: false,
      error: "The selected file is empty (0 bytes). Please provide a valid font file.",
    };
  }

  if (file.size > MAX_FONT_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size (${formatBytes(file.size)}) exceeds the client-side limit of ${formatBytes(MAX_FONT_FILE_SIZE_BYTES)}. Browser memory constraints prevent parsing fonts larger than 20 MB.`,
    };
  }

  return { valid: true };
}

export function detectFontFormat(buffer: ArrayBuffer, fileName: string): DetectionResult {
  if (buffer.byteLength < 4) {
    throw new Error("File is too small to contain valid font header data.");
  }

  const view = new DataView(buffer, 0, Math.min(buffer.byteLength, 12));
  const tag0 = view.getUint8(0);
  const tag1 = view.getUint8(1);
  const tag2 = view.getUint8(2);
  const tag3 = view.getUint8(3);

  const sig = String.fromCharCode(tag0, tag1, tag2, tag3);
  const fileExt = extractFileExtension(fileName);

  // Check for Font Collection (TTC/OTC)
  if (sig === "ttcf") {
    throw new Error(
      "Font collections (.ttc / .otc) containing multiple font faces are not supported. Please convert single-face font files."
    );
  }

  let detectedFormat: FontFormat | null = null;

  // TrueType font headers: 0x00010000 or 'true' (Apple TrueType) or 'typ1'
  if (
    (tag0 === 0x00 && tag1 === 0x01 && tag2 === 0x00 && tag3 === 0x00) ||
    sig === "true" ||
    sig === "typ1"
  ) {
    detectedFormat = "ttf";
  } else if (sig === "OTTO") {
    // OpenType with CFF outlines
    detectedFormat = "otf";
  } else if (sig === "wOFF") {
    // WOFF 1.0
    detectedFormat = "woff";
  } else if (sig === "wOF2") {
    // WOFF 2.0
    detectedFormat = "woff2";
  }

  if (!detectedFormat) {
    // Check fallback for extensions if header couldn't be strictly matched
    if (fileExt === "ttf" || fileExt === "otf" || fileExt === "woff" || fileExt === "woff2") {
      throw new Error(
        `File header does not match a valid ${fileExt.toUpperCase()} font structure (detected header: 0x${tag0.toString(16).padStart(2, "0")}${tag1.toString(16).padStart(2, "0")}${tag2.toString(16).padStart(2, "0")}${tag3.toString(16).padStart(2, "0")}). The file may be corrupt or not a font.`
      );
    }
    throw new Error(
      `Unsupported or unrecognized font format. Supported formats: TTF, OTF, WOFF, WOFF2.`
    );
  }

  const isExtensionMismatch =
    fileExt.length > 0 &&
    fileExt !== detectedFormat &&
    !(fileExt === "otf" && detectedFormat === "ttf"); // TTF fonts are often named .otf if containing OpenType tables

  return {
    format: detectedFormat,
    isExtensionMismatch,
    detectedExtension: detectedFormat,
    fileExtension: fileExt,
  };
}
