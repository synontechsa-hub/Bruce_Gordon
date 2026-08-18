import React from "react";
import Link from "next/link";
import { ShieldCheck, Scale, Globe, ArrowUpRight } from "lucide-react";
import styles from "./FontForgeApp.module.css";

export function FontForgeGuide() {
  return (
    <section className={styles.guideSection} aria-labelledby="guide-heading">
      <div className={styles.guideGrid}>
        {/* Privacy Card */}
        <div className={styles.guideCard}>
          <div className={styles.guideCardHeader}>
            <ShieldCheck size={24} className={styles.guideIcon} aria-hidden="true" />
            <h3 className={styles.guideCardTitle}>100% Client-Side Privacy</h3>
          </div>
          <p>
            Your fonts never leave your device. All decompression, table extraction, glyph
            transcoding, and compression happen directly inside your browser’s JavaScript and
            WebAssembly runtime.
          </p>
          <span className={styles.guideTag}>Zero uploads • Zero logs • Zero tracking</span>
        </div>

        {/* Formats Card */}
        <div className={styles.guideCard}>
          <div className={styles.guideCardHeader}>
            <Globe size={24} className={styles.guideIcon} aria-hidden="true" />
            <h3 className={styles.guideCardTitle}>Supported Font Formats</h3>
          </div>
          <p>
            <strong>WOFF2:</strong> Modern web standard with superior Brotli compression.
            <br />
            <strong>WOFF:</strong> Legacy web font container.
            <br />
            <strong>TTF & OTF:</strong> Universal vector formats for desktop publishing, UI design,
            and mobile apps.
          </p>
          <span className={styles.guideTag}>TTF • OTF • WOFF • WOFF2</span>
        </div>

        {/* Licensing Card */}
        <div className={styles.guideCard}>
          <div className={styles.guideCardHeader}>
            <Scale size={24} className={styles.guideIcon} aria-hidden="true" />
            <h3 className={styles.guideCardTitle}>Font Licensing Reminder</h3>
          </div>
          <p>
            Converting a font does not alter its copyright or end-user licence agreement (EULA).
            Ensure you possess the appropriate web, desktop, or commercial rights for the font files
            you convert.
          </p>
          <span className={styles.guideTag}>Respect Type Designers</span>
        </div>
      </div>

      {/* Studio Banner */}
      <div className={styles.studioBanner}>
        <div className={styles.studioBannerCopy}>
          <span className={styles.inspectorKicker}>BGrafX Creative Studio</span>
          <h3>Need custom typography, bespoke branding, or production web engineering?</h3>
          <p>
            From custom type selection to full-stack brand identity and web architecture, BGrafX
            delivers disciplined craftsmanship built for real-world impact.
          </p>
        </div>
        <div className={styles.studioBannerActions}>
          <Link href="/#contact" className={styles.studioButton}>
            Discuss a project <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/services" className={styles.studioTextLink}>
            Explore services <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
