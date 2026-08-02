import styles from "./BrandMark.module.css";

interface BrandMarkProps {
  compact?: boolean;
  inverse?: boolean;
}

export function BrandMark({ compact = false, inverse = false }: BrandMarkProps) {
  return (
    <span className={`${styles.mark} ${compact ? styles.compact : ""} ${inverse ? styles.inverse : ""}`} aria-label="BGrafX">
      <span aria-hidden="true">BGraf<span className={styles.x}>X</span></span>
      {!compact && (
        <span className={styles.descriptor} aria-hidden="true">
          Design <i /> Web <i /> Automation
        </span>
      )}
    </span>
  );
}
