import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Cpu,
  Download,
  FileVideo,
  Gauge,
  HardDrive,
  Layers3,
  ListChecks,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import styles from "./page.module.css";

const releaseUrl = "https://github.com/synontechsa-hub/MKVoodoo/releases/download/v1.1.1/MKVoodoo_v1.1.1_Setup.exe";
const repositoryUrl = "https://github.com/synontechsa-hub/MKVoodoo";

export const metadata: Metadata = {
  title: "MKVoodoo Video Converter | Product Case Study - BGrafX",
  description: "Meet MKVoodoo, Bruce Gordon's released Windows batch video transcoder: an offline-first Flutter and Python product powered by FFmpeg and built for practical media conversion.",
  alternates: { canonical: "/work/mkvoodoo" },
  openGraph: {
    title: "MKVoodoo | Batch Video Conversion with a Little Magic",
    description: "Brand, product design and engineering behind a released Windows batch video transcoder.",
    url: "/work/mkvoodoo",
    images: [{ url: "/media/MKVoodoo/MKVoodoo logo - Full - With Black BG.svg", width: 400, height: 400, alt: "MKVoodoo video converter logo" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#030305",
};

const capabilities = [
  { icon: Cpu, title: "Hardware aware", text: "Automatically detects NVIDIA NVENC and Intel QuickSync support for accelerated encoding where compatible hardware is available." },
  { icon: Layers3, title: "Built for batches", text: "Add individual files or entire folders, process jobs in parallel, and return to a persistent queue after an interruption." },
  { icon: FileVideo, title: "Smarter media prep", text: "Parse season and episode details from filenames, apply naming templates, and control audio and subtitle tracks before conversion." },
  { icon: HardDrive, title: "Storage conscious", text: "Watch available disk space while a batch runs, with local configuration, queue state, and conversion history kept on the machine." },
  { icon: ListChecks, title: "Queue control", text: "Review proposed jobs, adjust bulk settings, track progress, and resume work instead of rebuilding a long conversion list." },
  { icon: Gauge, title: "One media workflow", text: "Convert local video and feed supported YouTube downloads into the same queue, with MP3, FLAC, M4A, and MP4 download options." },
];

const stack = [
  ["Flutter + Dart", "A responsive Windows interface with dashboard, conversion wizard, queue, downloader, and settings views."],
  ["Python", "The typed backend coordinates scanning, naming, configuration, job state, hardware detection, and conversion services."],
  ["FFmpeg + FFprobe", "The proven media engine and inspection layer behind transcoding, stream discovery, and output generation."],
  ["yt-dlp", "A bundled downloader powers the optional online media workflow without requiring a separate installation."],
  ["Nuitka + Inno Setup", "The Python backend is compiled and packaged with the Flutter release as a standalone Windows installer."],
  ["Automated verification", "Python tests, Flutter analysis and tests, formatting checks, type checking, and GitHub Actions support release confidence."],
];

const workflow = [
  ["01", "Bring the media", "Add files, drop in folders, or start with a supported download."],
  ["02", "Read the details", "MKVoodoo scans streams, filenames, hardware, presets, and available storage."],
  ["03", "Shape the queue", "Choose output behavior, naming, audio, subtitles, and batch settings."],
  ["04", "Let it work", "Run accelerated jobs, follow progress, and resume the queue when needed."],
];

export default function MKVoodooPage() {
  return (
    <div className={styles.page}>
      <HomeHeader theme="mkvoodoo" />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="mkvoodoo-title">
          <div className={styles.heroNoise} aria-hidden="true" />
          <div className={styles.heroBrand}>
            <Image
              src="/media/MKVoodoo/MKVoodoo logo - Full - Dark BG.svg"
              alt="MKVoodoo video converter mask, film reel and play-button logo"
              width={400}
              height={400}
              priority
              unoptimized
            />
            <span>Released product / Windows</span>
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><span>V1.1.1</span> Offline-first batch transcoder</p>
            <h1 id="mkvoodoo-title">Video conversion. A little black magic.</h1>
            <p className={styles.lead}>MKVoodoo turns long, repetitive media-conversion jobs into a controlled Windows workflow—scan, organise, queue, accelerate, and let the machine get on with it.</p>
            <div className={styles.heroActions}>
              <a href={releaseUrl}>Download for Windows <Download aria-hidden="true" size={18} /></a>
              <a href="#story">Discover the product <ArrowRight aria-hidden="true" size={18} /></a>
            </div>
            <div className={styles.heroMeta} aria-label="Product highlights">
              <span>Windows 10 / 11</span><span>Local processing</span><span>No account</span>
            </div>
          </div>
          <div className={styles.heroSigil} aria-hidden="true"><Sparkles /><span>MKV</span><i>+</i><span>VOODOO</span></div>
        </section>

        <section id="story" className={styles.naming} aria-labelledby="naming-title">
          <div className={styles.namingIntro}>
            <span className={styles.sectionLabel}>The name / The identity</span>
            <h2 id="naming-title">MKV meets Voodoo.</h2>
          </div>
          <div className={styles.namingStory}>
            <p><strong>MKV</strong> names the media territory. <strong>Voodoo</strong> gives it a memory, a mood, and a promise: the complicated work can feel almost magical when the product handles the details properly.</p>
            <p>The identity turns that wordplay into a character. A ritual mask meets a film reel and a play symbol; electric purple brings the mystique, acid green signals action, and black keeps the product rooted in the world of media tools.</p>
          </div>
          <div className={styles.wordmark}>
            <Image src="/media/MKVoodoo/MKVoodoo Wordmark - Light BG.svg" alt="MKVoodoo wordmark" width={600} height={100} unoptimized />
          </div>
          <div className={styles.brandFormula} aria-label="MKVoodoo brand idea">
            <div><strong>MKV</strong><span>Media / format / utility</span></div>
            <i>+</i>
            <div><strong>Voodoo</strong><span>Magic / character / recall</span></div>
            <i>=</i>
            <div><strong>MKVoodoo</strong><span>A useful tool with a pulse</span></div>
          </div>
        </section>

        <section className={styles.product} aria-labelledby="product-title">
          <header>
            <span className={styles.sectionLabel}>What it is</span>
            <h2 id="product-title">A batch transcoder for people with better things to do.</h2>
            <p>MKVoodoo is a released, offline-first Windows desktop application for converting and organising video at scale. It combines a guided interface with a persistent processing engine, so a folder full of media becomes a queue you can understand and control.</p>
          </header>
          <div className={styles.capabilityGrid}>
            {capabilities.map(({ icon: Icon, title, text }, index) => (
              <article key={title}>
                <div><Icon aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.workflow} aria-labelledby="workflow-title">
          <header><span className={styles.sectionLabel}>The working rhythm</span><h2 id="workflow-title">From folder to finished queue.</h2></header>
          <ol>
            {workflow.map(([number, title, text]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></li>)}
          </ol>
        </section>

        <section className={styles.stack} aria-labelledby="stack-title">
          <div className={styles.stackLead}>
            <span className={styles.sectionLabel}>Under the mask</span>
            <h2 id="stack-title">A real desktop product, end to end.</h2>
            <p>The design challenge did not stop at the logo or interface. MKVoodoo joins frontend product thinking, backend orchestration, native media tooling, automated checks, and Windows packaging into something people can actually install.</p>
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">Explore the source <ArrowUpRight aria-hidden="true" size={17} /></a>
          </div>
          <div className={styles.stackList}>
            {stack.map(([name, description], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{description}</p></article>)}
          </div>
        </section>

        <section className={styles.expect} aria-labelledby="expect-title">
          <div className={styles.expectMark}><Image src="/media/MKVoodoo/MKVoodoo Logomark - Dark BG.svg" alt="" width={300} height={300} unoptimized /></div>
          <div className={styles.expectCopy}>
            <span className={styles.sectionLabel}>Before you summon it</span>
            <h2 id="expect-title">What to expect.</h2>
            <ul>
              <li><Check aria-hidden="true" />A 64-bit Windows 10 or 11 desktop application.</li>
              <li><Check aria-hidden="true" />Local video processing with no account, analytics, or media upload.</li>
              <li><Check aria-hidden="true" />Best performance with compatible NVIDIA NVENC or Intel QuickSync hardware.</li>
              <li><Check aria-hidden="true" />Optional internet use for downloads, metadata searches, and update checks.</li>
              <li><ShieldCheck aria-hidden="true" />An independently developed, currently unsigned installer that may trigger Windows SmartScreen.</li>
            </ul>
            <p>Converting media can be storage-intensive. The published requirements recommend at least 2 GB of free space for temporary conversion files, with more space appropriate for larger batches.</p>
          </div>
        </section>

        <section className={styles.portfolio} aria-labelledby="portfolio-title">
          <span className={styles.sectionLabel}>Why it belongs in the portfolio</span>
          <h2 id="portfolio-title">Not a concept. A product in people&apos;s hands.</h2>
          <p>MKVoodoo demonstrates the complete line from naming and visual identity to interface design, application architecture, media processing, testing, packaging, and release. The brand gets attention; the engineering earns the download.</p>
          <div className={styles.portfolioProof}>
            <span>Brand strategy</span><span>Visual identity</span><span>Product UX</span><span>Flutter UI</span><span>Python engineering</span><span>Release packaging</span>
          </div>
        </section>

        <section className={styles.download} aria-labelledby="download-title">
          <div>
            <span>MKVoodoo v1.1.1 / Windows</span>
            <h2 id="download-title">Your queue is waiting.</h2>
            <p>Download the current public release, or inspect the source and release history on GitHub before installing.</p>
          </div>
          <div className={styles.downloadActions}>
            <a href={releaseUrl}>Download installer <Download aria-hidden="true" size={18} /></a>
            <a href="https://github.com/synontechsa-hub/MKVoodoo/releases/tag/v1.1.1" target="_blank" rel="noopener noreferrer">Release notes <ArrowUpRight aria-hidden="true" size={18} /></a>
            <Link href="/#contact">Discuss a product <ArrowRight aria-hidden="true" size={18} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
