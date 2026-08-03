import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Globe2 } from "lucide-react";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { liveProperties, websiteProjects } from "@/content/projects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Website Portfolio | Bruce Gordon - BGrafX",
  description: "Explore Bruce Gordon's website design and frontend portfolio across architecture, e-commerce, fintech, SaaS, hospitality and independent digital products.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Website Portfolio | BGrafX", description: "A complete archive of website concepts, product interfaces and live digital properties by Bruce Gordon.", url: "/work", images: ["/og.png"] },
};

export default function WorkPage() {
  return (
    <div className={styles.page}>
      <HomeHeader />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="work-page-title">
          <div className={styles.heroGrid} aria-hidden="true"><span>WEB / ARCHIVE</span><span>01-08</span></div>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Selected digital practice</span>
            <h1 id="work-page-title">Websites built with a point of view.</h1>
            <p>Eight self-initiated builds across distinct industries, each used to explore a different visual language, audience and interface problem.</p>
            <a href="#archive">Explore the archive <ArrowDownRight aria-hidden="true" size={17} /></a>
          </div>
          <div className={styles.heroIndex}>
            <strong>08</strong><span>Website concepts</span><i /><strong>03</strong><span>Live properties</span>
          </div>
        </section>

        <section id="archive" className={styles.archive} aria-labelledby="archive-title">
          <header className={styles.sectionHeader}><div><span>Full archive</span><h2 id="archive-title">Different brands. Different voices.</h2></div><p>The work is self-initiated and labelled honestly. The aim is to demonstrate range: not one house style repeated eight times, but a considered response to each imagined brief.</p></header>
          <div className={styles.projectGrid}>
            {websiteProjects.map((project, index) => (
              <article className={styles.projectCard} key={project.slug}>
                <div className={`${styles.projectVisual} ${!project.image ? styles.generatedVisual : ""}`}>
                  {project.image ? <Image src={project.image} alt={project.imageAlt ?? ""} fill sizes="(max-width: 720px) 100vw, 50vw" /> : <div className={styles.nexusMark} aria-hidden="true"><Globe2 /><strong>NEXUS<span>AI</span></strong><small>Intelligence, applied.</small></div>}
                  <span className={styles.projectNumber}>0{index + 1}</span>
                  <span className={styles.status}>{project.status}</span>
                </div>
                <div className={styles.projectCopy}><span>{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p><small>Responsive website exploration</small></div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.liveSection} aria-labelledby="live-title">
          <header><span>Beyond concepts</span><h2 id="live-title">Live products and studios.</h2><p>Independent properties connected to Bruce&apos;s software, product and interactive work.</p></header>
          <div className={styles.liveGrid}>
            {liveProperties.map((property, index) => <a key={property.url} href={property.url} target="_blank" rel="noopener noreferrer"><span>0{index + 1}</span><small>{property.category}</small><h3>{property.title}</h3><p>{property.summary}</p><strong>Visit website <ArrowUpRight aria-hidden="true" size={16} /></strong></a>)}
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