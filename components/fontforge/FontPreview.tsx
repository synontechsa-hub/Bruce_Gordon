"use client";

import React, { useState } from "react";
import { Type, Sparkles } from "lucide-react";
import styles from "./FontForgeApp.module.css";

interface FontPreviewProps {
  previewFamily: string | null;
  fontName: string;
}

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog.",
  "Sphinx of black quartz, judge my vow.",
  "Pack my box with five dozen liquor jugs.",
  "ABCDEFGHIJKLM NOPQRSTUVWXYZ 1234567890 &?!$",
];

export function FontPreview({ previewFamily, fontName }: FontPreviewProps) {
  const [fontSize, setFontSize] = useState<number>(32);
  const [customText, setCustomText] = useState<string>(
    "Typography is the craft of endowing human language with a durable visual form."
  );

  return (
    <div className={styles.previewCard} aria-labelledby="preview-section-title">
      <div className={styles.previewHeader}>
        <div className={styles.previewTitleGroup}>
          <span className={styles.inspectorKicker}>Specimen Preview</span>
          <h3 id="preview-section-title" className={styles.previewHeading}>
            {fontName} — Live Type Tester
          </h3>
        </div>

        <div className={styles.previewControls}>
          <div className={styles.sliderGroup}>
            <label htmlFor="preview-font-size" className={styles.sliderLabel}>
              <span>Size</span>
              <strong>{fontSize}px</strong>
            </label>
            <input
              id="preview-font-size"
              type="range"
              min="14"
              max="72"
              step="2"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              aria-label={`Preview font size, current ${fontSize} pixels`}
              className={styles.sizeSlider}
            />
          </div>
        </div>
      </div>

      <div className={styles.presetButtons} aria-label="Sample pangrams">
        <span className={styles.presetLabel}>
          <Sparkles size={12} aria-hidden="true" /> Samples:
        </span>
        {SAMPLE_TEXTS.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            className={styles.presetButton}
            onClick={() => setCustomText(sample)}
            title="Click to load sample text"
          >
            Sample {idx + 1}
          </button>
        ))}
      </div>

      <div className={styles.specimenBox}>
        {previewFamily ? (
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className={styles.specimenInput}
            style={{
              fontFamily: `"${previewFamily}", var(--body), sans-serif`,
              fontSize: `${fontSize}px`,
              lineHeight: 1.35,
            }}
            placeholder="Type custom text to preview your font..."
            aria-label="Editable font specimen preview"
            rows={3}
            spellCheck={false}
          />
        ) : (
          <div className={styles.previewFallback}>
            <Type size={24} aria-hidden="true" />
            <p>Specimen preview is loading or unavailable for this font format.</p>
          </div>
        )}
      </div>

      <div className={styles.previewFooter}>
        <span>Rendered locally with in-memory FontFace • Edit text above to test glyphs</span>
      </div>
    </div>
  );
}
