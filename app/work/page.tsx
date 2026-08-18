import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Globe2 } from "lucide-react";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { liveProperties, websiteProjects } from "@/content/projects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Website Portfolio | Bruce Gordon - BGrafX",
  description: "Explore Bruce Gordon's website design and frontend portfolio across architecture, e-commerce, fintech, SaaS, hospitality and independent digital products.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Website Portfolio | BGrafX", description: "A complete archive of website concepts, product interfaces and live digital properties by Bruce Gordon.", url: "/work", images: ["/og-bgrafx-v2.png"] },
};

export default function WorkPage() {
  return (
    <div className={styles.page}>
      <HomeHeader />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="work-page-title">
          <div className={styles.heroGrid} aria-hidden="true"><span>WEB / ARCHIVE</span><span>01-12</span></div>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Selected digital practice</span>
            <h1 id="work-page-title">Websites built with a point of view.</h1>
            <p>Released products, live creative properties and twelve self-initiated builds—showing how brand, interface and engineering come together across very different briefs.</p>
            <a href="#live-products">See the live work <ArrowDownRight aria-hidden="true" size={17} /></a>
          </div>
          <div className={styles.heroIndex}>
            <strong>12</strong><span>Website concepts</span><i /><strong>04</strong><span>Live products / studios</span>
          </div>
        </section>

        <section id="live-products" className={styles.liveSection} aria-labelledby="live-title">
          <header><span>Beyond concepts</span><h2 id="live-title">Live products and studios.</h2><p>Released software and independent properties connected to Bruce&apos;s product, creative and interactive work.</p></header>
          <div className={styles.liveGrid}>
            {liveProperties.map((property, index) => <Link key={property.href} href={property.href} target={property.external ? "_blank" : undefined} rel={property.external ? "noopener noreferrer" : undefined}><span>0{index + 1}</span><small>{property.category}</small><h3>{property.title}</h3><p>{property.summary}</p><strong>{property.cta} {property.external ? <ArrowUpRight aria-hidden="true" size={16} /> : <ArrowRight aria-hidden="true" size={16} />}</strong></Link>)}
          </div>
        </section>

        <section id="archive" className={styles.archive} aria-labelledby="archive-title">
          <header className={styles.sectionHeader}><div><span>Full archive</span><h2 id="archive-title">Different brands. Different voices.</h2></div><p>The work is self-initiated and labelled honestly. The aim is to demonstrate range: not one house style repeated eight times, but a considered response to each imagined brief.</p></header>
          <div className={styles.projectGrid}>
            {websiteProjects.map((project, index) => (
              <a className={styles.projectCard} key={project.slug} href={project.showcasePath} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} website concept`}>
                <div className={`${styles.projectVisual} ${!project.image ? styles.generatedVisual : ""} ${project.imageFit === "contain" ? styles.containedVisual : ""}`}>
                  {project.image ? <Image src={project.image} alt={project.imageAlt ?? ""} fill sizes="(max-width: 720px) 100vw, 50vw" /> : <div className={styles.nexusMark} aria-hidden="true"><Globe2 /><strong>{project.title}</strong><small>{project.category}</small></div>}
                  <span className={styles.projectNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.status}>{project.status}</span>
                </div>
                <div className={styles.projectCopy}><span>{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p><small>Open website <ArrowUpRight aria-hidden="true" size={13} /></small></div>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.nextArchive}>
          <div><span>Another side of the work</span><h2>From pixels to building facades.</h2></div>
          <p>Explore the architectural cladding, CNC and signage work that shaped much of Bruce&apos;s professional career.</p>
          <a href="/cladding">View the cladding archive <ArrowRight aria-hidden="true" size={17} /></a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
