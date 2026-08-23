import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Type } from "lucide-react";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Tools | BGrafX",
  description: "Useful, privacy-respecting creative tools from BGrafX.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Tools | BGrafX",
    description: "Useful, privacy-respecting creative tools from BGrafX.",
    url: "/tools",
    images: ["/og-bgrafx-v2.png"],
  },
};

export default function ToolsPage() {
  return (
    <div>
      <HomeHeader />
      <main id="main-content" className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>BGrafX Studio</p>
          <h1>Tools</h1>
          <p>Small, practical utilities for creative and production work.</p>
        </header>

        <section className={styles.collection} aria-labelledby="available-tools">
          <h2 id="available-tools">Available tools</h2>
          <Link className={styles.toolCard} href="/tools/fontforge">
            <Type aria-hidden="true" size={34} strokeWidth={1.5} />
            <div>
              <h3>FontForge</h3>
              <p>Convert TTF, OTF, WOFF and WOFF2 font files directly in your browser.</p>
            </div>
            <ArrowUpRight className={styles.arrow} aria-hidden="true" size={22} />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
