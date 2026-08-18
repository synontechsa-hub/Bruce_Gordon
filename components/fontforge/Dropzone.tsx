"use client";

import React, { useState, useRef, useCallback } from "react";
import { UploadCloud, FileType, AlertTriangle } from "lucide-react";
import styles from "./FontForgeApp.module.css";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  error?: string | null;
}

export function Dropzone({ onFileSelect, disabled = false, error }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [disabled, onFileSelect]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
      // Reset input value so the same file can be re-selected if needed
      e.target.value = "";
    }
  };

  const triggerBrowse = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerBrowse();
    }
  };

  return (
    <div className={styles.dropzoneContainer}>
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ""} ${
          disabled ? styles.dropzoneDisabled : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerBrowse}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label="Upload font file. Drag and drop or press Enter to browse files."
      >
        <input
          ref={inputRef}
          type="file"
          accept=".ttf,.otf,.woff,.woff2,font/ttf,font/otf,font/woff,font/woff2"
          className={styles.hiddenFileInput}
          onChange={handleFileInputChange}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
        />

        <div className={styles.dropzoneIconWrapper}>
          {isDragging ? (
            <FileType className={styles.dropzoneIcon} size={36} />
          ) : (
            <UploadCloud className={styles.dropzoneIcon} size={36} />
          )}
        </div>

        <div className={styles.dropzoneCopy}>
          <span className={styles.dropzoneTitle}>
            {isDragging ? "Drop your font file here" : "Choose a font file or drag it here"}
          </span>
          <span className={styles.dropzoneMeta}>
            Supported: <strong>TTF</strong>, <strong>OTF</strong>, <strong>WOFF</strong>,{" "}
            <strong>WOFF2</strong> • Max <strong>20 MB</strong>
          </span>
        </div>

        <button
          type="button"
          className={styles.browseButton}
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            triggerBrowse();
          }}
          tabIndex={-1}
        >
          Select font file
        </button>
      </div>

      {error && (
        <div className={styles.dropzoneError} role="alert" aria-live="assertive">
          <AlertTriangle size={18} aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
