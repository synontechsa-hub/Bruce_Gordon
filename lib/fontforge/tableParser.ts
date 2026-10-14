import type { FeatureDetectionStatus, FontFormat, FontMetadata, VariableAxis } from "./types";
import { formatBytes } from "./detector";

interface SFNTTableRecord {
  tag: string;
  checksum: number;
  offset: number;
  length: number;
}

export function parseSFNTTableDirectory(view: DataView): Map<string, SFNTTableRecord> {
  const tables = new Map<string, SFNTTableRecord>();
  if (view.byteLength < 12) return tables;

  const numTables = view.getUint16(4, false);
  let pos = 12;

  for (let i = 0; i < numTables; i++) {
    if (pos + 16 > view.byteLength) break;
    const tag0 = view.getUint8(pos);
    const tag1 = view.getUint8(pos + 1);
    const tag2 = view.getUint8(pos + 2);
    const tag3 = view.getUint8(pos + 3);
    const tag = String.fromCharCode(tag0, tag1, tag2, tag3);

    const checksum = view.getUint32(pos + 4, false);
    const offset = view.getUint32(pos + 8, false);
    const length = view.getUint32(pos + 12, false);

    tables.set(tag, { tag, checksum, offset, length });
    pos += 16;
  }

  return tables;
}

export function parseWoffTableTags(view: DataView): Set<string> {
  const tags = new Set<string>();
  if (view.byteLength < 44 || view.getUint32(0, false) !== 0x774f4646) return tags;

  const numTables = view.getUint16(12, false);
  if (numTables < 1 || 44 + numTables * 20 > view.byteLength) return tags;

  for (let pos = 44; pos < 44 + numTables * 20; pos += 20) {
    tags.add(String.fromCharCode(
      view.getUint8(pos), view.getUint8(pos + 1),
      view.getUint8(pos + 2), view.getUint8(pos + 3)
    ));
  }
  return tags;
}

function readFixed16_16(view: DataView, offset: number): number {
  const raw = view.getInt32(offset, false);
  return Number((raw / 65536).toFixed(2));
}

export function detectVariableFontAxes(
  buffer: ArrayBuffer,
  tableMap: Map<string, SFNTTableRecord>
): { isVariable: boolean; axes: VariableAxis[] } {
  const fvar = tableMap.get("fvar");
  if (!fvar || fvar.offset + fvar.length > buffer.byteLength) {
    // Check if gvar / STAT tables exist as variation indicators
    const hasVarTables = tableMap.has("gvar") || tableMap.has("HVAR") || tableMap.has("VVAR");
    return { isVariable: hasVarTables, axes: [] };
  }

  try {
    const view = new DataView(buffer, fvar.offset, fvar.length);
    if (view.byteLength < 16) return { isVariable: true, axes: [] };

    const axesArrayOffset = view.getUint16(4, false);
    const axisCount = view.getUint16(8, false);
    const axisSize = view.getUint16(10, false);

    const axes: VariableAxis[] = [];
    let axisPos = axesArrayOffset;

    for (let i = 0; i < axisCount; i++) {
      if (axisPos + 16 > view.byteLength) break;
      const t0 = view.getUint8(axisPos);
      const t1 = view.getUint8(axisPos + 1);
      const t2 = view.getUint8(axisPos + 2);
      const t3 = view.getUint8(axisPos + 3);
      const tag = String.fromCharCode(t0, t1, t2, t3);

      const min = readFixed16_16(view, axisPos + 4);
      const def = readFixed16_16(view, axisPos + 8);
      const max = readFixed16_16(view, axisPos + 12);

      const tagNames: Record<string, string> = {
        wght: "Weight",
        wdth: "Width",
        slnt: "Slant",
        ital: "Italic",
        opsz: "Optical Size",
        GRAD: "Grade",
      };

      axes.push({
        tag,
        name: tagNames[tag] || tag,
        min,
        default: def,
        max,
      });

      axisPos += axisSize;
    }

    return {
      isVariable: true,
      axes,
    };
  } catch {
    return { isVariable: true, axes: [] };
  }
}

export function extractMetadataFromTTFObject(
  ttfData: Record<string, unknown>,
  originalFormat: FontFormat,
  fileName: string,
  fileSizeBytes: number,
  rawBuffer?: ArrayBuffer,
  inspectionBuffer?: ArrayBuffer
): FontMetadata {
  let isVariable = false;
  let variableAxes: VariableAxis[] = [];
  let variableStatus: FeatureDetectionStatus = "unknown";
  let hasCffOutlines = false;
  let cffOutlineStatus: FeatureDetectionStatus = "unknown";
  let layoutTables: string[] = [];
  let layoutStatus: FeatureDetectionStatus = "unknown";

  // Inspect decompressed SFNT data when a web container was the source.
  const sfntBuffer = inspectionBuffer ?? ((originalFormat === "ttf" || originalFormat === "otf") ? rawBuffer : undefined);
  if (sfntBuffer) {
    try {
      const view = new DataView(sfntBuffer);
      const tableMap = parseSFNTTableDirectory(view);
      if (tableMap.size === 0) throw new Error("Font table directory is empty.");
      layoutTables = ["GSUB", "GPOS", "GDEF", "BASE", "JSTF", "MATH"].filter((tag) => tableMap.has(tag));
      layoutStatus = layoutTables.length > 0 ? "detected" : "not_detected";
      const varInfo = detectVariableFontAxes(sfntBuffer, tableMap);
      isVariable = varInfo.isVariable;
      variableAxes = varInfo.axes;
      variableStatus = isVariable ? "detected" : "not_detected";
      if (tableMap.has("CFF ") || tableMap.has("CFF2")) {
        hasCffOutlines = true;
        cffOutlineStatus = "detected";
      } else {
        cffOutlineStatus = "not_detected";
      }
    } catch {
      variableStatus = "unknown";
      cffOutlineStatus = "unknown";
      layoutStatus = "unknown";
    }
  } else if (rawBuffer && originalFormat === "woff") {
    const tags = parseWoffTableTags(new DataView(rawBuffer));
    if (tags.size > 0) {
      layoutTables = ["GSUB", "GPOS", "GDEF", "BASE", "JSTF", "MATH"].filter((tag) => tags.has(tag));
      layoutStatus = layoutTables.length > 0 ? "detected" : "not_detected";
      isVariable = ["fvar", "gvar", "HVAR", "VVAR"].some((tag) => tags.has(tag));
      variableStatus = isVariable ? "detected" : "not_detected";
      hasCffOutlines = tags.has("CFF ") || tags.has("CFF2");
      cffOutlineStatus = hasCffOutlines ? "detected" : "not_detected";
    }
  }

  const nameTable = (ttfData?.name as Record<string, string | undefined>) || {};
  const headTable = (ttfData?.head as Record<string, number | undefined>) || {};
  const os2Table = (ttfData?.["OS/2"] as Record<string, number | undefined>) || {};
  const maxpTable = (ttfData?.maxp as Record<string, number | undefined>) || {};

  const familyName =
    nameTable.fontFamily ||
    nameTable.preferredFamily ||
    fileName.replace(/\.[^/.]+$/, "") ||
    "Unknown Family";

  const subfamilyName =
    nameTable.fontSubFamily ||
    nameTable.preferredSubFamily ||
    "Regular";

  const fullName =
    nameTable.fullName ||
    nameTable.uniqueSubFamily ||
    `${familyName} ${subfamilyName}`.trim();

  const postscriptName =
    nameTable.postScriptName ||
    familyName.replace(/\s+/g, "-");

  const unitsPerEm = Number(headTable.unitsPerEm || headTable.unitsPerE) || 1000;
  const glyphCount =
    Number(maxpTable.numGlyphs) ||
    (Array.isArray(ttfData?.glyf) ? ttfData.glyf.length : 0);

  const weightClass = Number(os2Table.usWeightClass) || 400;
  const widthClass = Number(os2Table.usWidthClass) || 5;

  return {
    format: originalFormat,
    fileName,
    fileSizeBytes,
    formattedSize: formatBytes(fileSizeBytes),
    familyName,
    subfamilyName,
    fullName,
    postscriptName,
    unitsPerEm,
    glyphCount,
    weightClass,
    widthClass,
    isVariable,
    variableAxes,
    variableStatus,
    hasCffOutlines,
    cffOutlineStatus,
    layoutTables,
    layoutStatus,
    version: nameTable.version || "1.0",
    copyright: nameTable.copyright,
  };
}
