"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark/BrandMark";
import styles from "./HomeHeader.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Websites" },
  { href: "/cladding", label: "Cladding" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

export function HomeHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.menuOpen = isOpen ? "true" : "false";
    return () => { delete document.body.dataset.menuOpen; };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" aria-label="BGrafX home"><BrandMark /></Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <a className={styles.quote} href="https://wa.me/27621596082" target="_blank" rel="noopener noreferrer">Get a quote <ArrowUpRight aria-hidden="true" size={16} /></a>
        <button className={styles.menuButton} type="button" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Close navigation" : "Open navigation"} onClick={() => setIsOpen((current) => !current)}>{isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      <nav id="mobile-navigation" className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ""}`} aria-label="Mobile navigation">
        {links.map((link, index) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}><span>0{index + 1}</span>{link.label}</Link>)}
        <a className={styles.mobileQuote} href="https://wa.me/27621596082" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>Request a quote <ArrowUpRight aria-hidden="true" /></a>
      </nav>
    </header>
  );
}