import Image from "next/image";
import * as motion from "motion/react-client";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark/BrandMark";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { featuredStudies, services } from "@/content/home";
import styles from "./home.module.css";

const entrance = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className={styles.page}>
      <HomeHeader />

      <main id="main-content">
        <section id="home" className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.socialRail} aria-label="Social profiles">
            <span>Follow</span>
            <a href="https://www.linkedin.com/in/bruce-gordon-designs/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.behance.net/bruce-gordon" target="_blank" rel="noopener noreferrer">Behance</a>
            <a href="https://github.com/synontechsa-hub" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>

          <div className={styles.heroInner}>
            <motion.div className={styles.heroCopy} {...entrance} transition={{ duration: 0.45, ease: "easeOut" }}>
              <div className={styles.heroEyebrow}>
                <span>22+ years</span>
                <strong>Graphic design studio</strong>
              </div>

              <h1 id="hero-title">Design that<br /><span>gets noticed.</span></h1>

              <p className={styles.heroPromise}>Websites that convert.<br />Automation that saves time.</p>
              <p className={styles.heroBody}>BGrafX helps businesses stand out, communicate clearly and turn ideas into considered design and practical digital experiences.</p>

              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#work">View my work <ArrowRight aria-hidden="true" size={17} /></a>
                <a className={styles.secondaryButton} href="https://wa.me/27621596082" target="_blank" rel="noopener noreferrer">Request a quote <ArrowUpRight aria-hidden="true" size={16} /></a>
              </div>
            </motion.div>

            <motion.div className={styles.heroVisual} initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}>
              <div className={styles.draftSheet} aria-hidden="true"><span>BG / 001</span><span>Design system</span></div>
              <div className={styles.registrationMark} aria-hidden="true" />

              <div className={styles.folio}>
                <BrandMark inverse />
                <div className={styles.folioDisciplines} aria-hidden="true"><span>Design</span><span>Web</span><span>Automation</span></div>
                <div className={styles.folioImage}>
                  <Image src="/media/forma.jpg" alt="Architectural design concept used to demonstrate BGrafX's editorial art direction" fill priority loading="eager" sizes="(max-width: 768px) 76vw, 36vw" />
                </div>
                <span className={styles.folioNumber} aria-hidden="true">01—24</span>
              </div>

              <div className={styles.notebook} aria-hidden="true">
                <span>Ideas</span><i /><span>Design</span><i /><strong>Impact</strong>
              </div>
              <div className={styles.tape} aria-hidden="true" />
              <div className={styles.colourStrip} aria-hidden="true"><i /><i /><i /><i /><i /></div>
            </motion.div>
          </div>

          <a className={styles.scrollCue} href="#services">Explore <ArrowDownRight aria-hidden="true" size={17} /></a>
        </section>

        <section className={styles.credibility} aria-label="BGrafX credentials">
          <div><strong>22+</strong><span>Years of professional experience</span></div>
          <div><strong>ZA</strong><span>Based in South Africa</span></div>
          <div><strong>Design + code</strong><span>Creative and technical execution</span></div>
          <div><strong>Freelance</strong><span>Available for selected projects</span></div>
        </section>

        <section id="services" className={styles.servicesSection} aria-labelledby="services-title">
          <div className={styles.servicesIntro}>
            <span>What I do</span>
            <h2 id="services-title">Creative solutions that work.</h2>
            <p>From first impression to final production, each discipline is connected by clear thinking and careful execution.</p>
            <a href="mailto:bruce.gordon8403@gmail.com">Discuss a project <ArrowUpRight aria-hidden="true" size={16} /></a>
          </div>

          <div className={styles.serviceGrid}>
            {services.map(({ icon: Icon, title, description }, index) => (
              <article className={styles.serviceCard} key={title}>
                <div className={styles.serviceTop}><span>0{index + 1}</span><Icon aria-hidden="true" size={30} strokeWidth={1.5} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href="mailto:bruce.gordon8403@gmail.com">Learn more <ArrowRight aria-hidden="true" size={14} /></a>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className={styles.workSection} aria-labelledby="work-title">
          <header className={styles.sectionHeader}>
            <div><span>Selected studies</span><h2 id="work-title">A selection of recent creative work.</h2></div>
            <p>These self-initiated concepts demonstrate range across identity, interface and digital art direction. Confirmed client case studies will replace or complement them during the portfolio phase.</p>
          </header>

          <div className={styles.workGrid}>
            {featuredStudies.map((study, index) => (
              <article className={styles.workCard} key={study.title}>
                <div className={styles.workImage}>
                  <Image src={study.image} alt={study.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                  <span>0{index + 1}</span>
                </div>
                <div className={styles.workMeta}>
                  <span>{study.category}</span>
                  <h3>{study.title}</h3>
                  <p>{study.status}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.workFooter}>
            <span>More work and full case studies arrive in Phase 4.</span>
            <a href="/design-system">View the design foundation <ArrowUpRight aria-hidden="true" size={16} /></a>
          </div>
        </section>
      </main>

      <footer className={styles.prototypeFooter}>
        <BrandMark compact inverse />
        <p>Independent creative studio · South Africa</p>
        <a href="mailto:bruce.gordon8403@gmail.com">Start a conversation <ArrowUpRight aria-hidden="true" size={16} /></a>
      </footer>
    </div>
  );
}
