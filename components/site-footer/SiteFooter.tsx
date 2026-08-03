import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark/BrandMark";
import styles from "./SiteFooter.module.css";

const studioLinks = [
  { label: "KerfSuite", href: "https://kerf-suite.com/" },
  { label: "Synontech", href: "https://synontech.vercel.app/" },
  { label: "Byte This Games", href: "https://byte-this-games.vercel.app/" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.lead}><BrandMark inverse /><p>Independent creative practice combining design judgment, technical thinking and production experience.</p></div>
      <nav aria-label="Footer navigation"><span>Explore</span><Link href="/">Home</Link><Link href="/work">Website portfolio</Link><Link href="/cladding">Cladding career</Link><Link href="/#services">Services</Link><Link href="/#pricing">Pricing</Link><Link href="/#contact">Contact</Link></nav>
      <div className={styles.network}><span>Studio network</span>{studioLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight aria-hidden="true" size={14} /></a>)}</div>
      <div className={styles.social}><span>Elsewhere</span><a href="https://www.linkedin.com/in/bruce-gordon-designs/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.behance.net/bruce-gordon" target="_blank" rel="noopener noreferrer">Behance</a><a href="https://github.com/synontechsa-hub" target="_blank" rel="noopener noreferrer">GitHub</a></div>
      <div className={styles.bottom}><span>Copyright {new Date().getFullYear()} Bruce Gordon / BGrafX</span><span>Design - Web - Automation</span><span>A Synontech creative practice</span></div>
    </footer>
  );
}