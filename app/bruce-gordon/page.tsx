import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Ruler, Sparkles } from "lucide-react";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { experience, profileDisciplines, profileProjects } from "@/content/profile";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Bruce Gordon | Creator, Designer & Developer | BGrafX",
  description: "Professional profile of Bruce Gordon: a multidisciplinary creator, designer and developer with 23 years of experience across design, production, CNC, web, software and automation.",
  alternates: { canonical: "/bruce-gordon" },
  openGraph: {
    title: "Bruce Gordon | Creator, Designer & Developer | BGrafX",
    description: "A multidisciplinary profile spanning design, production, CNC, web, software and automation.",
    url: "/bruce-gordon",
    images: ["/og-bgrafx-v2.png"],
  },
};

const profileSignals = [
  { icon: Sparkles, label: "23 years", detail: "Professional design experience" },
  { icon: Ruler, label: "14 years", detail: "Leading CNC production workflows" },
  { icon: Code2, label: "Current focus", detail: "Software, web & practical automation" },
];

export default function BruceGordonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bruce Gordon",
    jobTitle: "Creator, Designer and Developer",
    url: "https://www.bgrafx.co.za/bruce-gordon",
    sameAs: [
      "https://www.linkedin.com/in/bruce-gordon-designs/",
      "https://www.behance.net/bruce-gordon",
      "https://github.com/synontechsa-hub",
    ],
  };

  return (
    <div className={styles.page}>
      <HomeHeader />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="profile-title">
          <div>
            <p className={styles.eyebrow}>Professional profile / Johannesburg, South Africa</p>
            <h1 id="profile-title">Bruce Gordon</h1>
            <p className={styles.identity}>Creator <span>•</span> Designer <span>•</span> Developer</p>
          </div>
          <div className={styles.heroCopy}>
            <p>I combine long-term graphic design and production experience with web, software and automation work—turning practical operational problems into clear, useful tools and considered digital experiences.</p>
            <div className={styles.actions}>
              <Link href="/work">View work <ArrowRight aria-hidden="true" size={17} /></Link>
              <Link href="/#contact">Start a conversation <ArrowRight aria-hidden="true" size={17} /></Link>
            </div>
          </div>
        </section>

        <section className={styles.signals} aria-label="Professional highlights">
          {profileSignals.map(({ icon: Icon, label, detail }) => (
            <article key={label}><Icon aria-hidden="true" size={22} /><strong>{label}</strong><span>{detail}</span></article>
          ))}
        </section>

        <section className={styles.summary} aria-labelledby="summary-title">
          <div><p className={styles.sectionLabel}>A connected practice</p><h2 id="summary-title">Experience beyond the screen.</h2></div>
          <div><p>My career began in graphic design in 2003, then expanded through print, signage, CAD artwork and large-scale architectural cladding. That grounding in materials, machinery and production discipline now informs the way I approach software and digital products.</p><p>Whether the output is a website, a desktop application or a CNC-ready production file, the same principle applies: understand the real context, make the work clear, and carry it through properly.</p><Link href="/cladding">Explore the architectural & CNC archive <ArrowRight aria-hidden="true" size={17} /></Link></div>
        </section>

        <section className={styles.disciplines} aria-labelledby="disciplines-title">
          <header><p className={styles.sectionLabel}>Disciplines</p><h2 id="disciplines-title">A broad toolkit, grounded in real work.</h2></header>
          <div className={styles.disciplineGrid}>{profileDisciplines.map((discipline, index) => <article key={discipline.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{discipline.title}</h3><ul>{discipline.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
        </section>

        <section className={styles.projects} aria-labelledby="projects-title">
          <header><p className={styles.sectionLabel}>Proof of work</p><h2 id="projects-title">Built, released and maintained.</h2></header>
          <div className={styles.projectGrid}>{profileProjects.map((project) => {
            const content = <><span>{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><b>Explore <ArrowUpRight aria-hidden="true" size={16} /></b></>;
            return project.external ? <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer">{content}</a> : <Link key={project.title} href={project.href}>{content}</Link>;
          })}</div>
        </section>

        <section className={styles.timeline} aria-labelledby="experience-title">
          <header><p className={styles.sectionLabel}>Experience</p><h2 id="experience-title">A career built in production, then expanded through products.</h2></header>
          <ol>{experience.map((entry) => <li key={entry.period}><span>{entry.period}</span><div><h3>{entry.title}</h3><p className={styles.organisation}>{entry.organisation}</p><p>{entry.summary}</p></div></li>)}</ol>
        </section>

        <section className={styles.education} aria-labelledby="education-title">
          <BriefcaseBusiness aria-hidden="true" size={28} /><div><p className={styles.sectionLabel}>Education & development</p><h2 id="education-title">Learning that supports the work.</h2><p><strong>Harvard CS50x — Introduction to Computer Science</strong> (completed 2026): C, Python, algorithms, data structures, SQL and web development.</p><p><strong>Harvard CS50P — Introduction to Programming with Python</strong> (in progress).</p></div>
        </section>

        <section className={styles.contact} aria-labelledby="contact-title">
          <div><p className={styles.sectionLabel}>Let&apos;s make something useful</p><h2 id="contact-title">Have a problem worth solving?</h2></div>
          <div><p>For a design, web, production or software project, start with a practical conversation.</p><Link href="/#contact">Discuss a project <ArrowRight aria-hidden="true" size={18} /></Link></div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
