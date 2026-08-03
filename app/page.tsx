import Image from "next/image";
import * as motion from "motion/react-client";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Mail, MessageCircle } from "lucide-react";
import { BrandMark } from "@/components/brand-mark/BrandMark";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { featuredStudies, pricingPaths, processSteps, services } from "@/content/home";
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
                <a className={styles.primaryButton} href="/work">View my work <ArrowRight aria-hidden="true" size={17} /></a>
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
                  <Image src="/media/hero-architecture.jpg" alt="Architectural design concept used to demonstrate BGrafX's editorial art direction" fill priority loading="eager" sizes="(max-width: 768px) 76vw, 36vw" />
                </div>
                <span className={styles.folioNumber} aria-hidden="true">01â€”24</span>
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
            <span>Identity, interface and web direction - built to show the thinking as well as the finish.</span>
            <a href="/work">View the complete website archive <ArrowUpRight aria-hidden="true" size={16} /></a>
          </div>
        </section>

        <section className={styles.experienceSection} aria-labelledby="experience-title">
          <div className={styles.experienceNumber} aria-hidden="true">22<span>+</span></div>
          <div className={styles.experienceCopy}>
            <span className={styles.kicker}>Experience, applied</span>
            <h2 id="experience-title">Good design should do more than look good.</h2>
            <p>More than two decades across graphic design, web, signage and production have taught me to consider the whole job: the audience, the message, the medium and what happens after approval.</p>
            <p>That breadth means fewer gaps between the idea and the finished result - and a creative partner who understands both detail and delivery.</p>
            <a href="#process">See how I work <ArrowDownRight aria-hidden="true" size={16} /></a>
          </div>
          <aside className={styles.experienceNote} aria-label="Bruce Gordon's working principles">
            <span>Built on</span><strong>Curiosity</strong><strong>Craft</strong><strong>Clarity</strong><strong>Follow-through</strong>
          </aside>
        </section>

        <section id="process" className={styles.processSection} aria-labelledby="process-title">
          <header className={styles.processHeader}>
            <div><span className={styles.kicker}>How it works</span><h2 id="process-title">A clear process. No creative fog.</h2></div>
            <p>Every engagement is scaled to the job, but the principle stays the same: understand first, make deliberately, and deliver properly.</p>
          </header>
          <ol className={styles.processGrid}>
            {processSteps.map((step) => (
              <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>
            ))}
          </ol>
        </section>

        <section id="pricing" className={styles.pricingSection} aria-labelledby="pricing-title">
          <div className={styles.pricingIntro}>
            <span className={styles.kicker}>Working together</span>
            <h2 id="pricing-title">The right scope before the price.</h2>
            <p>Every business and brief is different. A short conversation lets me understand the requirement and recommend the most sensible way to work - without padding the proposal with things you do not need.</p>
            <a className={styles.primaryButton} href="mailto:bruce.gordon8403@gmail.com?subject=BGrafX%20project%20enquiry">Request a proposal <ArrowUpRight aria-hidden="true" size={16} /></a>
          </div>
          <div className={styles.pricingGrid}>
            {pricingPaths.map((path, index) => (
              <article className={styles.pricingCard} key={path.title}>
                <div><span>0{index + 1}</span><small>{path.label}</small></div>
                <h3>{path.title}</h3><p>{path.description}</p>
                <ul>{path.includes.map((item) => <li key={item}><Check aria-hidden="true" size={15} />{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className={styles.contactSection} aria-labelledby="contact-title">
          <div className={styles.contactMark} aria-hidden="true">X</div>
          <span className={styles.kicker}>Have a project in mind?</span>
          <h2 id="contact-title">Let&apos;s make something worth noticing.</h2>
          <p>Tell me what you are building, what is getting in the way, or simply where you would like the business to go next.</p>
          <div className={styles.contactActions}>
            <a href="https://wa.me/27621596082" target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />WhatsApp me <ArrowUpRight aria-hidden="true" size={17} /></a>
            <a href="mailto:bruce.gordon8403@gmail.com?subject=BGrafX%20project%20enquiry"><Mail aria-hidden="true" />Send an email <ArrowUpRight aria-hidden="true" size={17} /></a>
          </div>
          <small>South Africa - Available for selected freelance and collaborative work</small>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
