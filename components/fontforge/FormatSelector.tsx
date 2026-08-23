"use client";

import React from "react";
import {
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Loader2,
  RefreshCw,
  Download,
} from "lucide-react";
import type {
  FontFormat,
  TargetFormat,
  FontMetadata,
  ConversionStatus,
  ConvertedResult,
} from "@/lib/fontforge/types";
import {
  FORMAT_DESCRIPTIONS,
  evaluateCompatibility,
} from "@/lib/fontforge/converter";
import styles from "./FontForgeApp.module.css";

interface FormatSelectorProps {
  sourceFormat: FontFormat;
  selectedTarget: TargetFormat;
  onSelectTarget: (format: TargetFormat) => void;
  onConvert: () => void;
  onReset: () => void;
  metadata: FontMetadata;
  conversionStatus: ConversionStatus;
  convertedResult: ConvertedResult | null;
  errorMessage: string | null;
}

const AVAILABLE_FORMATS: TargetFormat[] = ["woff2", "woff", "ttf"];

export function FormatSelector({
  sourceFormat,
  selectedTarget,
  onSelectTarget,
  onConvert,
  onReset,
  metadata,
  conversionStatus,
  convertedResult,
  errorMessage,
}: FormatSelectorProps) {
  const isConverting = conversionStatus === "converting";
  const isSuccess = conversionStatus === "success";

  const currentCheck = evaluateCompatibility(sourceFormat, selectedTarget, metadata);

  return (
    <div className={styles.conversionPanel} aria-labelledby="conversion-options-heading">
      <div className={styles.conversionHeader}>
        <span className={styles.inspectorKicker}>Target Format</span>
        <h3 id="conversion-options-heading" className={styles.conversionHeading}>
          Choose Output Format
        </h3>
      </div>

      <div
        className={styles.formatGrid}
        role="radiogroup"
        aria-label="Select target font format"
      >
        {AVAILABLE_FORMATS.map((format) => {
          const info = FORMAT_DESCRIPTIONS[format];
          const isSelected = selectedTarget === format;
          const isSameFormat = sourceFormat === format;
          const check = evaluateCompatibility(sourceFormat, format, metadata);

          return (
            <button
              key={format}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isSameFormat || isConverting}
              onClick={() => onSelectTarget(format)}
              className={`${styles.formatCard} ${isSelected ? styles.formatCardSelected : ""} ${
                isSameFormat ? styles.formatCardDisabled : ""
              }`}
            >
              <div className={styles.formatCardTop}>
                <span className={styles.formatCardName}>{info.label}</span>
                <span className={styles.formatCardTag}>{info.tag}</span>
              </div>

              <p className={styles.formatCardDesc}>{info.description}</p>

              <div className={styles.formatCardFooter}>
                {isSameFormat ? (
                  <span className={styles.statusSame}>Current format</span>
                ) : check.status === "warning" ? (
                  <span className={styles.statusWarning}>
                    <AlertTriangle size={12} aria-hidden="true" />
                    Notice
                  </span>
                ) : (
                  <span className={styles.statusSupported}>
                    <CheckCircle size={12} aria-hidden="true" />
                    Supported
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Compatibility & Loss Warnings */}
      {currentCheck.warnings.length > 0 && (
        <div className={styles.warningBox} role="status">
          <div className={styles.warningTitle}>
            <AlertTriangle size={16} aria-hidden="true" />
            <strong>Conversion Compatibility Notice</strong>
          </div>
          <ul className={styles.warningList}>
            {currentCheck.warnings.map((warn, i) => (
              <li key={i}>{warn}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Conversion Error */}
      {errorMessage && (
        <div className={styles.conversionError} role="alert">
          <AlertTriangle size={18} aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Action Controls */}
      <div className={styles.conversionActions}>
        {!isSuccess ? (
          <button
            type="button"
            className={styles.primaryConvertButton}
            onClick={onConvert}
            disabled={isConverting || currentCheck.status === "unsupported"}
          >
            {isConverting ? (
              <>
                <Loader2 className={styles.spinIcon} size={18} aria-hidden="true" />
                Converting {metadata.format.toUpperCase()} to {selectedTarget.toUpperCase()}...
              </>
            ) : (
              <>
                Convert to {selectedTarget.toUpperCase()}
                <ArrowRight size={18} aria-hidden="true" />
              </>
            )}
          </button>
        ) : (
          <div className={styles.successActions}>
            <a
              href={convertedResult?.downloadUrl}
              download={convertedResult?.fileName}
              className={styles.downloadButton}
              role="button"
            >
              <Download size={18} aria-hidden="true" />
              Download {convertedResult?.fileName} ({convertedResult?.formattedSize})
            </a>

            <button
              type="button"
              className={styles.convertAgainButton}
              onClick={onConvert}
              disabled={isConverting}
            >
              <RefreshCw size={15} aria-hidden="true" />
              Convert to another format
            </button>
          </div>
        )}

        <button
          type="button"
          className={styles.resetButton}
          onClick={onReset}
          disabled={isConverting}
        >
          Reset / Upload new font
        </button>
      </div>

      {/* Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite">
        {isConverting && `Converting font to ${selectedTarget.toUpperCase()}`}
        {isSuccess && `Conversion complete. ${convertedResult?.fileName} is ready for download.`}
        {errorMessage && `Conversion error: ${errorMessage}`}
      </div>
    </div>
  );
}
