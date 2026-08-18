"use client";

import React from "react";
import { Sliders, Layers, CheckCircle2 } from "lucide-react";
import type { FontMetadata } from "@/lib/fontforge/types";
import styles from "./FontForgeApp.module.css";

interface FontInspectorProps {
  metadata: FontMetadata;
}

export function FontInspector({ metadata }: FontInspectorProps) {
  return (
    <div className={styles.inspectorCard} aria-labelledby="font-details-heading">
      <div className={styles.inspectorHeader}>
        <div className={styles.inspectorTitleGroup}>
          <span className={styles.inspectorKicker}>Detected Font File</span>
          <h3 id="font-details-heading" className={styles.inspectorFontName}>
            {metadata.fullName || metadata.familyName}
          </h3>
          <span className={styles.inspectorFileName}>{metadata.fileName}</span>
        </div>

        <div className={styles.inspectorBadges}>
          <span className={styles.formatBadge} data-format={metadata.format}>
            {metadata.format.toUpperCase()}
          </span>

          {metadata.isVariable && (
            <span className={styles.variableBadge} title="Font contains variable interpolation axes">
              <Sliders size={12} aria-hidden="true" />
              Variable Font
            </span>
          )}

          {metadata.hasCffOutlines && (
            <span className={styles.cffBadge} title="Font contains PostScript CFF outlines">
              <Layers size={12} aria-hidden="true" />
              CFF Outlines
            </span>
          )}
        </div>
      </div>

      <div className={styles.metadataGrid}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Family</span>
          <span className={styles.metaValue}>{metadata.familyName}</span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Style / Subfamily</span>
          <span className={styles.metaValue}>{metadata.subfamilyName}</span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Glyphs</span>
          <span className={styles.metaValue}>{metadata.glyphCount.toLocaleString()}</span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>File Size</span>
          <span className={styles.metaValue}>{metadata.formattedSize}</span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Units per Em</span>
          <span className={styles.metaValue}>{metadata.unitsPerEm}</span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Weight Class</span>
          <span className={styles.metaValue}>{metadata.weightClass}</span>
        </div>
      </div>

      {metadata.isVariable && metadata.variableAxes.length > 0 && (
        <div className={styles.variableAxesSection}>
          <span className={styles.variableAxesTitle}>Variation Axes ({metadata.variableAxes.length})</span>
          <div className={styles.axesList}>
            {metadata.variableAxes.map((axis) => (
              <div key={axis.tag} className={styles.axisItem}>
                <span className={styles.axisTag}>{axis.tag}</span>
                <span className={styles.axisName}>{axis.name || axis.tag}</span>
                <span className={styles.axisRange}>
                  {axis.min} – {axis.max} <small>(def: {axis.default})</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.privacyNote}>
        <CheckCircle2 size={15} aria-hidden="true" />
        <span>100% In-Browser Inspection — File never leaves your local machine.</span>
      </div>
    </div>
  );
}
