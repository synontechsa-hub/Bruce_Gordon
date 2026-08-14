import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { serviceDetails } from "@/content/services";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Creative Services | Bruce Gordon - BGrafX",
  description: "Explore BGrafX graphic design, web design, automation, branding, signage and production services for businesses in South Africa and beyond.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Creative and Digital Services | BGrafX",
    description: "Design experience, technical capability and production knowledge across print, digital and interactive work.",
    url: "/services",
    images: ["/og-bgrafx-v2.png"],
  },
};

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.42, ease: "easeOut" as const },
};

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <HomeHeader />

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="services-page-title">
          <div className={styles.heroGrid} aria-hidden="true"><span>BG / SERVICES</span><span>01-05</span></div>
          <motion.div className={styles.heroCopy} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
            <span className={styles.kicker}>Services</span>
            <h1 id="services-page-title">Creative and digital work built to hold up in the real world.</h1>
            <p>BGrafX combines design experience, technical capability and production knowledge across print, digital and interactive work. Projects can be handled as focused standalone briefs or as part of a broader visual or digital system.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="mailto:bruce.gordon8403@gmail.com?subject=BGrafX%20project%20enquiry">Discuss a project <ArrowUpRight aria-hidden="true" size={16} /></a>
              <a className={styles.textLink} href="#service-list">Explore services <ArrowDownRight aria-hidden="true" size={16} /></a>
            </div>
          </motion.div>

          <nav className={styles.serviceIndex} aria-label="Services on this page">
            <span>Studio capabilities</span>
            {serviceDetails.map((service) => (
              <a key={service.id} href={`#${service.id}`}><small>{service.number}</small>{service.title}<ArrowDownRight aria-hidden="true" size={15} /></a>
            ))}
          </nav>
        </section>

        <div className={styles.disciplineBand} aria-hidden="true">
          <span>Design</span><i /><span>Digital</span><i /><span>Production</span><i /><span>Systems</span>
        </div>

        <div id="service-list" className={styles.serviceList}>
          {serviceDetails.map((service) => {
            const Icon = service.icon;
            return (
              <motion.section className={styles.service} id={service.id} data-service={service.id} aria-labelledby={`${service.id}-title`} key={service.id} {...reveal}>
                <header className={styles.serviceHeader}>
                  <div><span>{service.number}</span><small>{service.eyebrow}</small></div>
                  <Icon aria-hidden="true" size={34} strokeWidth={1.35} />
                </header>

                <div className={styles.serviceVisual}>
                  <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 800px) 100vw, 46vw" />
                  <span aria-hidden="true">BG / {service.number}</span>
                </div>

                <div className={styles.serviceCopy}>
                  <span className={styles.kicker}>{service.title}</span>
                  <h2 id={`${service.id}-title`}>{service.heading}</h2>
                  {service.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <div className={styles.serviceActions}>
                    <a className={styles.primaryButton} href={service.ctaHref}>{service.ctaLabel} <ArrowUpRight aria-hidden="true" size={16} /></a>
                    {service.relatedLink ? <Link className={styles.textLink} href={service.relatedLink.href}>{service.relatedLink.label} <ArrowRight aria-hidden="true" size={15} /></Link> : null}
                  </div>
                </div>

                <aside className={styles.capabilities} aria-label={`${service.title} capabilities`}>
                  <span>Capabilities</span>
                  <ul>{service.capabilities.map((capability) => <li key={capability}><Check aria-hidden="true" size={14} />{capability}</li>)}</ul>
                </aside>
              </motion.section>
            );
          })}
        </div>

        <section className={styles.enquiry} aria-labelledby="enquiry-title">
          <span className={styles.kicker}>Not sure where the project fits?</span>
          <h2 id="enquiry-title">Start with the problem.</h2>
          <p>Some projects cross several disciplines. A new brand may need a website. A production workflow may need both interface design and automation. A campaign may need digital, print and signage applications.</p>
          <p>Start with what you need to achieve and we can determine the most sensible scope from there.</p>
          <div className={styles.enquiryActions}>
            <a href="mailto:bruce.gordon8403@gmail.com?subject=BGrafX%20project%20enquiry">Request a proposal <ArrowUpRight aria-hidden="true" size={17} /></a>
            <a href="https://wa.me/27621596082" target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" size={18} />WhatsApp me <ArrowUpRight aria-hidden="true" size={17} /></a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
