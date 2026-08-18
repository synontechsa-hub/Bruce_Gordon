"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { Font } from "fonteditor-core";
import type {
  TargetFormat,
  FontMetadata,
  ConversionStatus,
  ConvertedResult,
} from "@/lib/fontforge/types";
import { validateFileSize, detectFontFormat } from "@/lib/fontforge/detector";
import { parseFontBuffer, convertFontInstance } from "@/lib/fontforge/converter";
import { initWoff2Wasm } from "@/lib/fontforge/wasmLoader";
import { createFontPreview, type FontPreviewInstance } from "@/lib/fontforge/previewManager";

import { Dropzone } from "./Dropzone";
import { FontInspector } from "./FontInspector";
import { FontPreview } from "./FontPreview";
import { FormatSelector } from "./FormatSelector";
import { FontForgeGuide } from "./FontForgeGuide";
import styles from "./FontForgeApp.module.css";

export function FontForgeApp() {
  const [file, setFile] = useState<File | null>(null);
  const [fontMetadata, setFontMetadata] = useState<FontMetadata | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<TargetFormat>("woff2");
  const [conversionStatus, setConversionStatus] = useState<ConversionStatus>("idle");
  const [convertedResult, setConvertedResult] = useState<ConvertedResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dropzoneError, setDropzoneError] = useState<string | null>(null);
  const [previewFamily, setPreviewFamily] = useState<string | null>(null);

  // References to keep in memory for cleanup
  const activeFontInstanceRef = useRef<InstanceType<typeof Font> | null>(null);
  const activePreviewRef = useRef<FontPreviewInstance | null>(null);
  const activeDownloadUrlRef = useRef<string | null>(null);

  // Pre-initialize WASM runtime silently in background on client mount
  useEffect(() => {
    initWoff2Wasm().catch((err) => {
      console.warn("[FontForge] Background WASM init note:", err);
    });
  }, []);

  // Cleanup helper
  const cleanupResources = useCallback(() => {
    if (activePreviewRef.current) {
      activePreviewRef.current.dispose();
      activePreviewRef.current = null;
    }
    if (activeDownloadUrlRef.current) {
      URL.revokeObjectURL(activeDownloadUrlRef.current);
      activeDownloadUrlRef.current = null;
    }
    activeFontInstanceRef.current = null;
    setPreviewFamily(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupResources();
    };
  }, [cleanupResources]);

  // Handle file selection
  const handleFileSelect = async (selectedFile: File) => {
    setDropzoneError(null);
    setErrorMessage(null);

    // 1. Enforce 20MB file size limit
    const sizeCheck = validateFileSize(selectedFile);
    if (!sizeCheck.valid) {
      setDropzoneError(sizeCheck.error || "File validation failed.");
      return;
    }

    // Clean previous session resources
    cleanupResources();
    setConversionStatus("idle");
    setConvertedResult(null);

    try {
      // 2. Read ArrayBuffer
      const buffer = await selectedFile.arrayBuffer();

      // 3. Detect format from magic bytes
      const detection = detectFontFormat(buffer, selectedFile.name);

      // 4. Parse font and extract metadata
      const { fontInstance, metadata } = await parseFontBuffer(
        buffer,
        selectedFile.name,
        detection.format
      );

      activeFontInstanceRef.current = fontInstance;
      setFile(selectedFile);
      setFontMetadata(metadata);

      // Auto-select smart default target format
      if (detection.format === "woff2") {
        setSelectedTarget("ttf");
      } else if (detection.format === "ttf") {
        setSelectedTarget("woff2");
      } else if (detection.format === "otf") {
        setSelectedTarget("woff2");
      } else {
        setSelectedTarget("woff2");
      }

      // 5. Mount isolated in-memory FontFace for live preview
      const previewInstance = await createFontPreview(buffer, metadata.familyName);
      if (previewInstance) {
        activePreviewRef.current = previewInstance;
        setPreviewFamily(previewInstance.family);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      cleanupResources();
      setDropzoneError(msg);
      setFontMetadata(null);
      setFile(null);
    }
  };

  // Handle Conversion
  const handleConvert = async () => {
    if (!activeFontInstanceRef.current || !fontMetadata || !file) {
      setErrorMessage("No font loaded to convert.");
      return;
    }

    if (fontMetadata.format === selectedTarget) {
      setErrorMessage("Please select a target format different from the source format.");
      return;
    }

    setConversionStatus("converting");
    setErrorMessage(null);

    // Revoke any previous download URL
    if (activeDownloadUrlRef.current) {
      URL.revokeObjectURL(activeDownloadUrlRef.current);
      activeDownloadUrlRef.current = null;
    }

    try {
      const result = await convertFontInstance(
        activeFontInstanceRef.current,
        fontMetadata.format,
        selectedTarget,
        file.name
      );

      activeDownloadUrlRef.current = result.downloadUrl;
      setConvertedResult(result);
      setConversionStatus("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
      setConversionStatus("error");
    }
  };

  // Reset entire state
  const handleReset = () => {
    cleanupResources();
    setFile(null);
    setFontMetadata(null);
    setConversionStatus("idle");
    setConvertedResult(null);
    setErrorMessage(null);
    setDropzoneError(null);
    setSelectedTarget("woff2");
  };

  return (
    <div className={styles.appContainer}>
      {/* Hero Header */}
      <header className={styles.hero}>
        <div className={styles.heroMeta}>
          <span>BGrafX Studio Tools</span>
          <span>Version 1.0 • Pure Client-Side</span>
        </div>
        <h1 className={styles.heroTitle}>FontForge</h1>
        <p className={styles.heroLead}>
          Convert TrueType and OpenType fonts directly inside your browser. Fast, local format
          transcoding with zero server uploads.
        </p>

        <div className={styles.privacyBadge}>
          <span className={styles.privacyDot} aria-hidden="true" />
          <ShieldCheck size={16} aria-hidden="true" />
          <span>Local Device Processing Guarantee — 100% Private</span>
        </div>
      </header>

      {/* Main App Workflow */}
      <main id="fontforge-workbench">
        {!fontMetadata ? (
          <Dropzone
            onFileSelect={handleFileSelect}
            error={dropzoneError}
            disabled={conversionStatus === "converting"}
          />
        ) : (
          <div className={styles.workspaceLayout}>
            {/* Font Inspector */}
            <FontInspector metadata={fontMetadata} />

            {/* Live Specimen Preview */}
            <FontPreview previewFamily={previewFamily} fontName={fontMetadata.familyName} />

            {/* Target Format Selector & Conversion Actions */}
            <FormatSelector
              sourceFormat={fontMetadata.format}
              selectedTarget={selectedTarget}
              onSelectTarget={setSelectedTarget}
              onConvert={handleConvert}
              onReset={handleReset}
              metadata={fontMetadata}
              conversionStatus={conversionStatus}
              convertedResult={convertedResult}
              errorMessage={errorMessage}
            />
          </div>
        )}

        {/* Documentation & Privacy Guide */}
        <FontForgeGuide />
      </main>
    </div>
  );
}
