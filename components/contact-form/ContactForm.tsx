"use client";

import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, Send } from "lucide-react";
import styles from "./ContactForm.module.css";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const services = ["Graphic design", "Website", "Automation", "Branding", "Signage or production", "Not sure yet"];
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileOptions = {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "flexible";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [service, setService] = useState(() => {
    if (typeof window === "undefined") return "";

    const selectedService = new URLSearchParams(window.location.search).get("service");
    return selectedService && services.includes(selectedService) ? selectedService : "";
  });
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileReady || !turnstileContainerRef.current || !window.turnstile || turnstileWidgetIdRef.current) return;

    turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: turnstileSiteKey,
      theme: "light",
      size: "flexible",
      callback: setTurnstileToken,
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });

    return () => {
      if (turnstileWidgetIdRef.current) window.turnstile?.remove(turnstileWidgetIdRef.current);
      turnstileWidgetIdRef.current = undefined;
    };
  }, [turnstileReady]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!turnstileToken) {
      setState("error");
      setMessage("Please complete the quick security check before sending your enquiry.");
      return;
    }

    const payload = Object.fromEntries(new FormData(form));
    payload.turnstileToken = turnstileToken;

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { error?: string } = await response.json();

      if (!response.ok) throw new Error(result.error ?? "Your message could not be sent right now.");

      form.reset();
      setService("");
      setState("success");
      setMessage("Thank you. Your message is on its way to Bruce.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Your message could not be sent right now.");
    } finally {
      setTurnstileToken("");
      if (turnstileWidgetIdRef.current) window.turnstile?.reset(turnstileWidgetIdRef.current);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      {turnstileSiteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={() => setTurnstileReady(true)} />}
      <div className={styles.fields}>
        <label>
          <span>Your name</span>
          <input name="name" autoComplete="name" maxLength={80} required />
        </label>
        <label>
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" maxLength={120} required />
        </label>
        <label>
          <span>Business or organisation <em>(optional)</em></span>
          <input name="business" autoComplete="organization" maxLength={120} />
        </label>
        <label>
          <span>Phone <em>(optional)</em></span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
        <label className={styles.fullWidth}>
          <span>What can BGrafX help with?</span>
          <select name="service" value={service} onChange={(event) => setService(event.target.value)} required>
            <option value="" disabled>Select a starting point</option>
            {services.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
        </label>
        <label className={styles.fullWidth}>
          <span>Tell me a little about the project</span>
          <textarea name="message" rows={5} maxLength={2000} required />
        </label>
      </div>

      <label className={styles.honeypot} aria-hidden="true">
        <span>Website</span>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {turnstileSiteKey ? (
        <div className={styles.turnstile} ref={turnstileContainerRef} aria-label="Security check" />
      ) : (
        <p className={styles.securityNote}>The contact form security check is still being configured. Please use WhatsApp for now.</p>
      )}

      <div className={styles.actions}>
        <button type="submit" disabled={state === "submitting" || !turnstileSiteKey}>
          {state === "submitting" ? "Sending..." : "Send project enquiry"}<Send aria-hidden="true" size={17} />
        </button>
        <a href="https://wa.me/27621596082" target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" size={17} />Prefer WhatsApp <ArrowUpRight aria-hidden="true" size={15} /></a>
      </div>

      {message && <p className={`${styles.status} ${state === "error" ? styles.error : styles.success}`} role="status" aria-live="polite">{message}</p>}
    </form>
  );
}
