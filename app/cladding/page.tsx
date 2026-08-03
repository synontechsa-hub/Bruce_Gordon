import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Ruler, ScanLine, Wrench } from "lucide-react";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { claddingProjects } from "@/content/projects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Architectural Cladding Career | Bruce Gordon - BGrafX",
  description: "A selected archive of architectural cladding, CNC, facade and signage projects Bruce Gordon was involved in during his career with Alania Building Systems.",
  alternates: { canonical: "/cladding" },
  openGraph: { title: "Architectural Cladding Career | BGrafX", description: "Selected facade, CNC and signage projects from Bruce Gordon's professional career.", url: "/cladding", images: ["/media/cladding/sandton-city.webp"] },
};

export default function CladdingPage() {
  return (
    <div className={styles.page}>
      <HomeHeader />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="cladding-title">
          <div className={styles.heroImage}><Image src="/media/cladding/sandton-city.webp" alt="Sandton City Tower architectural facade work" fill priority sizes="(max-width: 768px) 100vw, 56vw" /></div>
          <div className={styles.heroCopy}><span>Career archive / South Africa</span><h1 id="cladding-title">Built at architectural scale.</h1><p>A selected record of facade cladding, CNC-routed elements and dimensional signage Bruce was involved in across much of his professional career.</p><a href="#projects">View selected projects <ArrowDownRight aria-hidden="true" size={17} /></a></div>
          <div className={styles.registration} aria-hidden="true" />
          <div className={styles.specNote} aria-hidden="true"><span>Material</span><strong>ACM / Aluminium</strong><span>Process</span><strong>Design / CNC / Production</strong></div>
        </section>

        <section className={styles.context} aria-labelledby="context-title">
          <div className={styles.contextNumber}>22<span>+</span></div>
          <div><span className={styles.kicker}>A substantial part of the story</span><h2 id="context-title">Experience beyond the screen.</h2><p>Long before software and modern web systems became part of the practice, Bruce&apos;s work lived at building scale. That environment demanded precision, material awareness, production discipline and close coordination between drawings, machinery, fabrication and installation.</p><p>The projects shown here record work Bruce was involved in while collaborating with <a href="https://www.alania.co.za/" target="_blank" rel="noopener noreferrer">Alania Building Systems</a>. Responsibilities varied by project; BGrafX does not present itself as the principal cladding contractor.</p></div>
          <ul aria-label="Cladding capabilities"><li><Ruler aria-hidden="true" />Production-aware detailing</li><li><ScanLine aria-hidden="true" />CNC preparation and routing</li><li><Wrench aria-hidden="true" />Fabrication coordination</li></ul>
        </section>

        <section id="projects" className={styles.projects} aria-labelledby="projects-title">
          <header><div><span className={styles.kicker}>Selected built work</span><h2 id="projects-title">Five projects. One exacting discipline.</h2></div><p>Each image represents a documented project from the existing BGrafX career archive. The descriptions focus on the work itself without inventing project-specific roles or commercial outcomes.</p></header>
          <div className={styles.projectList}>
            {claddingProjects.map((project,index) => <article key={project.title} className={styles.project}>
              <div className={styles.projectImage}><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, 68vw" /><span>0{index+1}</span></div>
              <div className={styles.projectCopy}><small>{project.location}</small><h3>{project.title}</h3><p>{project.description}</p><span>Architectural cladding / CNC / signage</span></div>
            </article>)}
          </div>
        </section>

        <section className={styles.attribution}>
          <div><span>Project collaboration</span><h2>See the broader Alania portfolio.</h2></div><p>For the principal contractor&apos;s current business and wider body of architectural cladding work, visit Alania Building Systems directly.</p><a href="https://www.alania.co.za/" target="_blank" rel="noopener noreferrer">Visit Alania <ArrowUpRight aria-hidden="true" size={17} /></a>
        </section>

        <section className={styles.next}><span>Digital practice</span><h2>Now explore the websites.</h2><a href="/work">View the website archive <ArrowRight aria-hidden="true" size={17} /></a></section>
      </main>
      <SiteFooter />
    </div>
  );
}