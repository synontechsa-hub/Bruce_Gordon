import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark/BrandMark";
import styles from "./SiteHeader.module.css";

const links = [
  { href: "#principles", label: "Principles" },
  { href: "#type", label: "Typography" },
  { href: "#components", label: "Components" },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.brandLink} href="#top" aria-label="BGrafX design foundation home"><BrandMark /></a>
      <nav className={styles.nav} aria-label="Design foundation sections">
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>
      <a className={styles.cta} href="#components">View specimen <ArrowUpRight aria-hidden="true" size={16} /></a>
    </header>
  );
}
