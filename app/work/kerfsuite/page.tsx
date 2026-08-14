import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "KerfSuite Case Study | Bruce Gordon - BGrafX",
  description: "How Bruce Gordon brought product strategy, brand direction, interface design and web development together for KerfSuite, a workshop production software ecosystem.",
  alternates: { canonical: "/work/kerfsuite" },
  openGraph: { title: "KerfSuite Case Study | BGrafX", description: "A real-world product case study spanning workshop knowledge, brand direction, UX/UI and web development.", url: "/work/kerfsuite", images: [{ url: "/media/kerfsuite/kerfsuite-website.png", width: 1920, height: 1000, alt: "KerfSuite website interface" }] },
};

const disciplines = ["Product positioning and information architecture", "Brand direction and visual language", "Website design and frontend development", "Product interface thinking for workshop workflows", "Clear, production-aware communication"];

export default function KerfSuiteCaseStudyPage() {
  return <div className={styles.page}>
    <HomeHeader />
    <main id="main-content">
      <section className={styles.hero} aria-labelledby="case-study-title">
        <div className={styles.heroGrid} aria-hidden="true"><span>CASE STUDY / 01</span><span>KERFSUITE</span></div>
        <div className={styles.heroCopy}>
          <span>Featured real-world product</span><p className={styles.eyebrow}>KerfSuite / Synontech + Feed Rate</p>
          <h1 id="case-study-title">A workshop operating system, built from the floor up.</h1>
          <p>KerfSuite is a growing ecosystem of connected tools for CNC and fabrication workflows. The work brings together brand, product, interface and web development with the perspective of 14 years leading CNC production workflows.</p>
          <div className={styles.heroActions}><a href="https://kerf-suite.com/" target="_blank" rel="noopener noreferrer">Explore KerfSuite <ArrowUpRight aria-hidden="true" size={17} /></a><a href="#the-work">See the work <ArrowRight aria-hidden="true" size={17} /></a></div>
        </div>
        <div className={styles.heroVisual}><Image src="/media/kerfsuite/kerfsuite-website.png" alt="KerfSuite website interface designed for workshop production software" fill priority sizes="(max-width: 860px) 100vw, 55vw" /><span aria-hidden="true">KS / 2026</span></div>
      </section>
      <section className={styles.statement} aria-labelledby="statement-title"><div><span>The challenge</span><h2 id="statement-title">Digital tools only work when they understand the physical job.</h2></div><p>KerfSuite began with a practical question: how can workshop software reduce waste and admin without becoming another disconnected system? The answer is shaped by hands-on production knowledge and needed to feel precise, useful and credible to the people doing the work.</p></section>
      <section id="the-work" className={styles.work} aria-labelledby="work-title"><header><span>What the work brought together</span><h2 id="work-title">One product. Multiple disciplines.</h2></header><div className={styles.workLayout}><div className={styles.workshopImage}><Image src="/media/kerfsuite/workshop.jpg" alt="Workshop production environment that informed the KerfSuite product direction" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className={styles.disciplines}><p>Rather than treating the brand, product and website as separate exercises, the work was designed as one connected system. Each decision had to support clarity on screen and confidence on the workshop floor.</p><ul>{disciplines.map((discipline) => <li key={discipline}><Check aria-hidden="true" size={16} />{discipline}</li>)}</ul></div></div></section>
      <section className={styles.product} aria-labelledby="product-title"><div className={styles.productCopy}><span>Product thinking</span><h2 id="product-title">Made to move from design to physical output.</h2><p>KerfCut focuses on intelligent nesting and material optimisation, while the wider KerfSuite direction connects stock, jobs, users and workshop data into a coherent production environment.</p><a href="https://kerf-suite.com/products" target="_blank" rel="noopener noreferrer">Explore the suite <ArrowUpRight aria-hidden="true" size={16} /></a></div><div className={styles.productImage}><Image src="/media/kerfsuite/kerfcut-wordmark.png" alt="Current KerfCut wordmark and product identity" fill sizes="(max-width: 800px) 100vw, 45vw" /></div></section>
      <section className={styles.outcome} aria-labelledby="outcome-title"><span>Why it belongs here</span><h2 id="outcome-title">KerfSuite is proof that good creative work can also be a working business system.</h2><p>It demonstrates the same thinking BGrafX brings to client work: understand the real context, give the idea a clear identity, make the experience useful, and carry it through to a finished, working outcome.</p><div><a href="https://kerf-suite.com/" target="_blank" rel="noopener noreferrer">Visit KerfSuite <ArrowUpRight aria-hidden="true" size={17} /></a><Link href="/#contact">Discuss a project <ArrowRight aria-hidden="true" size={17} /></Link></div></section>
    </main>
    <SiteFooter />
  </div>;
}
