import Image from "next/image";
import { ArrowRight, Bot, MonitorUp, Palette, PenTool, Printer } from "lucide-react";
import { BrandMark } from "@/components/brand-mark/BrandMark";
import { SiteHeader } from "@/components/site-header/SiteHeader";
import styles from "./page.module.css";

const principles = [
  ["01", "Premium first", "Restraint, confidence and excellent pacing."],
  ["02", "Work leads", "The interface frames the work instead of competing with it."],
  ["03", "Craft is visible", "Workshop detail is purposeful, tactile and sparingly applied."],
];

const services = [
  { icon: PenTool, title: "Graphic design", description: "Branding, print, signage and marketing material with a practical production eye." },
  { icon: MonitorUp, title: "Web design", description: "Modern, responsive websites that look considered and make the next action obvious." },
  { icon: Bot, title: "Automation", description: "A visual treatment for the capability; final service wording remains subject to approval." },
];

export default function DesignFoundationPage() {
  return (
    <div id="top" className={styles.page}>
      <SiteHeader />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="foundation-title">
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span>Phase 01</span>Visual foundation</div>
            <h1 id="foundation-title">Crafted to<span>get noticed.</span></h1>
            <p className={styles.heroStatement}>A premium editorial system built from paper, ink, signal yellow and more than two decades of creative experience.</p>
            <p className={styles.heroBody}>This specimen turns the approved concept into reusable rules for typography, layout, interaction and workshop detail | before the full homepage is built.</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="#components">Explore the system <ArrowRight aria-hidden="true" size={17} /></a>
              <a className={styles.secondaryButton} href="#principles">Read the principles</a>
            </div>
          </div>

          <div className={styles.heroArtwork} aria-label="Editorial composition showing the BGrafX visual system">
            <div className={styles.registrationMark} aria-hidden="true" />
            <div className={styles.sheet} aria-hidden="true"><span>Grid / 12</span><span>Ref. BG-02</span></div>
            <div className={styles.blackBook}>
              <BrandMark inverse />
              <div className={styles.disciplines}><span>Design</span><span>Web</span><span>Build</span></div>
              <div className={styles.photoFrame}>
                <Image src="/media/forma.jpg" alt="Monochrome architectural study demonstrating the proposed editorial image treatment" fill priority loading="eager" sizes="(max-width: 768px) 72vw, 32vw" />
              </div>
            </div>
            <div className={styles.notes} aria-hidden="true"><span>Ideas</span><i /><span>Design</span><i /><strong>Impact</strong></div>
            <div className={styles.tape} aria-hidden="true" />
            <div className={styles.swatchStrip} aria-hidden="true"><i /><i /><i /><i /></div>
          </div>
        </section>

        <section id="principles" className={styles.principles} aria-labelledby="principles-title">
          <div className={styles.sectionIntroDark}><span>System intent</span><h2 id="principles-title">Creative confidence without the noise.</h2></div>
          <div className={styles.principleGrid}>
            {principles.map(([number, title, description]) => (
              <article key={number} className={styles.principle}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </section>

        <section id="type" className={styles.specimenSection} aria-labelledby="type-title">
          <header className={styles.sectionHeader}>
            <div><span>Typography / 01</span><h2 id="type-title">Editorial impact.<br />Everyday clarity.</h2></div>
            <p>Barlow Condensed carries the voice. Manrope keeps proposals, services and case studies calm and readable.</p>
          </header>
          <div className={styles.typeGrid}>
            <div className={styles.displaySpecimen}><span>Display / 72–128</span><strong>Design<br />that hits.</strong><small>ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</small></div>
            <div className={styles.bodySpecimen}><span>Body / 16–20</span><h3>Clear thinking, beautifully delivered.</h3><p>Good design does more than decorate. It gives a business confidence, makes information easier to understand, and helps the right people take action.</p><small>Manrope | Regular, Medium and Semibold</small></div>
          </div>
          <div className={styles.palette} aria-label="Proposed BGrafX colour palette">
            <div className={styles.inkSwatch}><span>Ink</span><small>#11110F</small></div>
            <div className={styles.paperSwatch}><span>Paper</span><small>#F2EEE4</small></div>
            <div className={styles.signalSwatch}><span>Signal</span><small>#F3B900</small></div>
            <div className={styles.mutedSwatch}><span>Muted</span><small>#6D6B65</small></div>
          </div>
        </section>

        <section id="components" className={styles.componentsSection} aria-labelledby="components-title">
          <header className={styles.sectionHeader}>
            <div><span>Components / 01</span><h2 id="components-title">Useful pieces,<br />made with intent.</h2></div>
            <p>Geometry stays crisp. Yellow signals action. Lines and print marks provide rhythm without taking over the page.</p>
          </header>
          <div className={styles.controlRow} aria-label="Button styles">
            <a className={styles.primaryButton} href="#top">Primary action <ArrowRight aria-hidden="true" size={17} /></a>
            <a className={styles.secondaryButton} href="#top">Secondary action</a>
            <a className={styles.textLink} href="#top">Text action <ArrowRight aria-hidden="true" size={15} /></a>
          </div>
          <div className={styles.serviceGrid}>
            {services.map(({ icon: Icon, title, description }) => (
              <article className={styles.serviceCard} key={title}>
                <Icon aria-hidden="true" size={31} strokeWidth={1.55} /><span>Service study</span><h3>{title}</h3><p>{description}</p><a href="#top">Learn more <ArrowRight aria-hidden="true" size={14} /></a>
              </article>
            ))}
          </div>
          <article className={styles.projectStudy}>
            <div className={styles.projectImage}><Image src="/media/forma.jpg" alt="Architectural website study shown as an example project-card treatment" fill sizes="(max-width: 768px) 100vw, 56vw" /><span>Image treatment</span></div>
            <div className={styles.projectCopy}><span>Featured work / specimen</span><h3>Large images.<br />Short stories.</h3><p>Project cards lead with the work, then add only the context a visitor needs: discipline, role, year and a direct path into the case study.</p><div className={styles.projectMeta}><span>Category</span><strong>Web / Identity</strong><span>Status</span><strong>Content pending</strong></div></div>
          </article>
          <div className={styles.iconNote}><Palette aria-hidden="true" /><Printer aria-hidden="true" /><p>Lucide is reserved for functional icons. Brand texture comes from typography, layout and crafted details.</p></div>
        </section>
      </main>
      <footer className={styles.footer}><BrandMark compact inverse /><p>Phase 01 | visual foundation for architect review.</p><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
