"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark/BrandMark";
import styles from "./HomeHeader.module.css";

const DESKTOP_BREAKPOINT = 1088; // 68rem at 16px base

const baseLinks = [
  { href: "/", hash: null, label: "Home" },
  { href: "/work", hash: null, label: "Websites" },
  { href: "/cladding", hash: null, label: "Cladding" },
  { href: "/services", hash: null, label: "Services" },
  { href: "/tools/fontforge", hash: null, label: "FontForge" },
  { href: "/#process", hash: "#process", label: "Process" },
  { href: "/#contact", hash: "#contact", label: "Contact" },
];

interface HomeHeaderProps {
  theme?: "default" | "mkvoodoo";
}

export function HomeHeader({ theme = "default" }: HomeHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.dataset.menuOpen = isOpen ? "true" : "false";
    return () => { delete document.body.dataset.menuOpen; };
  }, [isOpen]);

  // Auto-close mobile menu when resized to desktop width
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= DESKTOP_BREAKPOINT && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const links = baseLinks.map((link) => ({
    ...link,
    resolvedHref: isHome && link.hash ? link.hash : link.href,
  }));

  return (
    <header className={`${styles.header} ${theme === "mkvoodoo" ? styles.mkvoodoo : ""}`}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" aria-label="BGrafX home"><BrandMark inverse={theme === "mkvoodoo"} /></Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.resolvedHref}>{link.label}</Link>)}
        </nav>
        <a className={styles.quote} href="https://wa.me/27621596082" target="_blank" rel="noopener noreferrer">Get a quote <ArrowUpRight aria-hidden="true" size={16} /></a>
        <button className={styles.menuButton} type="button" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Close navigation" : "Open navigation"} onClick={() => setIsOpen((current) => !current)}>{isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      <nav id="mobile-navigation" className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ""}`} aria-label="Mobile navigation">
        {links.map((link, index) => <Link key={link.href} href={link.resolvedHref} onClick={() => setIsOpen(false)}><span>0{index + 1}</span>{link.label}</Link>)}
        <a className={styles.mobileQuote} href="https://wa.me/27621596082" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>Request a quote <ArrowUpRight aria-hidden="true" /></a>
      </nav>
    </header>
  );
}
