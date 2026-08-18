export type FontFormat = "ttf" | "otf" | "woff" | "woff2";

export type TargetFormat = "ttf" | "otf" | "woff" | "woff2";

export type CompatibilityStatus = "supported" | "warning" | "unsupported";

export interface VariableAxis {
  tag: string;
  name?: string;
  min: number;
  default: number;
  max: number;
}

export interface FontMetadata {
  format: FontFormat;
  fileName: string;
  fileSizeBytes: number;
  formattedSize: string;
  familyName: string;
  subfamilyName: string;
  fullName: string;
  postscriptName: string;
  unitsPerEm: number;
  glyphCount: number;
  weightClass: number;
  widthClass: number;
  isVariable: boolean;
  variableAxes: VariableAxis[];
  hasCffOutlines: boolean;
  version?: string;
  copyright?: string;
}

export interface CompatibilityCheck {
  status: CompatibilityStatus;
  label: string;
  description: string;
  warnings: string[];
}

export type WasmStatus = "uninitialized" | "loading" | "ready" | "error";

export type ConversionStatus = "idle" | "converting" | "success" | "error";

export interface ConvertedResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  targetFormat: TargetFormat;
  fileSizeBytes: number;
  formattedSize: string;
  convertedAt: Date;
}
