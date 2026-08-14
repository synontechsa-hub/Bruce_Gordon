"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, MessageCircle, Send } from "lucide-react";
import styles from "./ContactForm.module.css";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const services = ["Graphic design", "Website", "Automation", "Branding", "Signage or production", "Not sure yet"];

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

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
      setState("success");
      setMessage("Thank you. Your message is on its way to Bruce.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Your message could not be sent right now.");
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
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
          <select name="service" defaultValue="" required>
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

      <div className={styles.actions}>
        <button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending..." : "Send project enquiry"}<Send aria-hidden="true" size={17} />
        </button>
        <a href="https://wa.me/27621596082" target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" size={17} />Prefer WhatsApp <ArrowUpRight aria-hidden="true" size={15} /></a>
      </div>

      {message && <p className={`${styles.status} ${state === "error" ? styles.error : styles.success}`} role="status" aria-live="polite">{message}</p>}
    </form>
  );
}
