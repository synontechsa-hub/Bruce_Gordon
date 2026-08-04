import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <HomeHeader />

      <main id="main-content" className={styles.main}>
        <div className={styles.container}>
          <article className={styles.card}>
            <div className={styles.draftSheet} aria-hidden="true">
              <span>ERR / 404</span>
              <span>Coordinate missing</span>
            </div>

            <div className={styles.registrationMark} aria-hidden="true" />

            <div className={styles.copy}>
              <span className={styles.badge}>System notification</span>
              <h1 className={styles.number}>
                <span>404</span>
              </h1>
              <h2 className={styles.title}>Off the grid.</h2>
              <p className={styles.description}>
                The page or project coordinate you were looking for doesn&apos;t exist, may have moved, or is under workshop construction.
              </p>

              <div className={styles.actions}>
                <Link className={styles.primaryButton} href="/">
                  Return Home <ArrowRight aria-hidden="true" size={17} />
                </Link>
                <Link className={styles.secondaryButton} href="/work">
                  View Portfolio <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </div>

            <nav className={styles.quickNav} aria-label="Alternative destinations">
              <span className={styles.quickNavLabel}>Explore studio</span>
              <Link className={styles.quickNavLink} href="/work/kerfsuite">
                <Compass aria-hidden="true" size={16} />
                KerfSuite
              </Link>
              <Link className={styles.quickNavLink} href="/cladding">
                <Compass aria-hidden="true" size={16} />
                Cladding Career
              </Link>
              <Link className={styles.quickNavLink} href="/#contact">
                <Compass aria-hidden="true" size={16} />
                Contact Bruce
              </Link>
            </nav>
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
