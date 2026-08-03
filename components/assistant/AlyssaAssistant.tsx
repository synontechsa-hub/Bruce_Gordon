"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Map, MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./AlyssaAssistant.module.css";

type Message = {
  id: number;
  author: "alyssa" | "visitor";
  text: string;
};

type TourStep = {
  target: string;
  eyebrow: string;
  title: string;
  text: string;
};

const startingMessages: Message[] = [
  {
    id: 1,
    author: "alyssa",
    text: "Hi, I’m Alyssa — the BGrafX virtual receptionist. What are you hoping to create?",
  },
];

const prompts = ["A new website", "Branding or design", "Automation", "I’m not sure yet"];

const replies: Record<string, string> = {
  "A new website": "Lovely. Is this a completely new site, or are we improving something you already have?",
  "Branding or design": "Great choice. Tell me whether you need a new identity, campaign artwork, print, signage, or a combination.",
  Automation: "Excellent. What repetitive task is taking too much of your time at the moment?",
  "I’m not sure yet": "That’s perfectly fine. Tell me what your business needs to achieve, and we’ll work backwards from there.",
};

const tourSteps: TourStep[] = [
  {
    target: "#home",
    eyebrow: "Welcome to BGrafX",
    title: "Design with practical purpose.",
    text: "This is Bruce’s independent creative studio — combining graphic design, websites and automation with more than 22 years of hands-on experience.",
  },
  {
    target: "#services",
    eyebrow: "What Bruce does",
    title: "One studio. Connected skills.",
    text: "Branding, web design, automation, signage and production are treated as parts of the same communication problem — not isolated services.",
  },
  {
    target: "#work",
    eyebrow: "Selected work",
    title: "See the thinking and the finish.",
    text: "This section is a quick introduction to the studio’s creative range. The full website archive and cladding career pages go much deeper.",
  },
  {
    target: "#process",
    eyebrow: "A clear process",
    title: "No creative fog.",
    text: "Every project moves through discovery, definition, design, build and delivery — scaled to suit the actual job rather than a rigid package.",
  },
  {
    target: "#contact",
    eyebrow: "Ready when you are",
    title: "Start with a conversation.",
    text: "If something here feels relevant, tell Bruce what you are building or where the business needs to go next. A rough idea is more than enough to begin.",
  },
];

const tourStorageKey = "bgrafx-site-tour-v3";

export function AlyssaAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(startingMessages);
  const [draft, setDraft] = useState("");
  const [showPrompts, setShowPrompts] = useState(true);
  const [tourInvite, setTourInvite] = useState(false);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (window.location.pathname !== "/") return;

    const searchParams = new URLSearchParams(window.location.search);
    const requestedTour = searchParams.get("tour") === "1";
    const requestedInvite = searchParams.get("invite") === "1";
    const hasSeenTour = window.localStorage.getItem(tourStorageKey) === "seen";
    const timer = window.setTimeout(() => {
      if (requestedTour) {
        setOpen(false);
        setTourStep(0);
        window.localStorage.setItem(tourStorageKey, "seen");
      } else if (requestedInvite || !hasSeenTour) {
        setTourInvite(true);
      }
    }, requestedTour ? 250 : 1100);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.querySelectorAll(".bgrafx-tour-target").forEach((element) => element.classList.remove("bgrafx-tour-target"));
    if (tourStep === null) return;

    const target = document.querySelector(tourSteps[tourStep].target);
    if (!(target instanceof HTMLElement)) return;

    target.classList.add("bgrafx-tour-target");
    target.scrollIntoView({ behavior: "smooth", block: "center" });

    return () => target.classList.remove("bgrafx-tour-target");
  }, [tourStep]);

  function addExchange(text: string, reply?: string) {
    const nextId = messages.length + 1;
    const visitor: Message = { id: nextId, author: "visitor", text };
    const alyssa: Message = {
      id: nextId + 1,
      author: "alyssa",
      text: reply ?? "Thank you — that gives me a useful starting point. For now, I can take you straight to Bruce.",
    };

    setMessages((current) => [...current, visitor]);
    setShowPrompts(false);
    window.setTimeout(() => setMessages((current) => [...current, alyssa]), 380);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    addExchange(text);
  }

  function startTour() {
    if (window.location.pathname !== "/") {
      window.location.assign("/?tour=1");
      return;
    }

    setOpen(false);
    setTourInvite(false);
    setTourStep(0);
    window.localStorage.setItem(tourStorageKey, "seen");
  }

  function dismissTourInvite() {
    setTourInvite(false);
    window.localStorage.setItem(tourStorageKey, "seen");
  }

  function endTour() {
    setTourStep(null);
    window.localStorage.setItem(tourStorageKey, "seen");
  }

  const activeTourStep = tourStep === null ? null : tourSteps[tourStep];

  return (
    <aside className={styles.assistant} aria-label="BGrafX virtual receptionist">
      {tourInvite && !open && tourStep === null && (
        <section className={styles.tourInvite} aria-label="Site tour invitation">
          <button className={styles.inviteClose} type="button" onClick={dismissTourInvite} aria-label="Dismiss site tour invitation"><X aria-hidden="true" size={16} /></button>
          <div className={styles.invitePortrait} aria-hidden="true">
            <Image className={styles.idle} src="/media/assistant/alyssa-idle-v2.webp" alt="" fill sizes="140px" />
            <Image className={styles.blink} src="/media/assistant/alyssa-blink-v2.webp" alt="" fill sizes="140px" />
          </div>
          <div className={styles.inviteCopy}>
            <span>First time here?</span>
            <strong>Let me show you around.</strong>
            <p>A quick guided introduction to BGrafX — no sign-up required.</p>
            <div><button type="button" onClick={startTour}>Start the tour <ArrowRight aria-hidden="true" size={14} /></button><button type="button" onClick={dismissTourInvite}>Not now</button></div>
          </div>
        </section>
      )}

      {activeTourStep && tourStep !== null && (
        <>
          <div className={styles.tourOverlay} aria-hidden="true" />
          <section className={styles.tourCard} role="dialog" aria-label={`Site tour step ${tourStep + 1} of ${tourSteps.length}`}>
            <header>
              <div className={styles.tourAvatar} aria-hidden="true">
                <Image className={styles.idle} src="/media/assistant/alyssa-idle-v2.webp" alt="" fill sizes="60px" />
                <Image className={styles.blink} src="/media/assistant/alyssa-blink-v2.webp" alt="" fill sizes="60px" />
              </div>
              <div><span>Alyssa’s studio tour</span><strong>{tourStep + 1} / {tourSteps.length}</strong></div>
              <button type="button" onClick={endTour} aria-label="End site tour"><X aria-hidden="true" size={18} /></button>
            </header>
            <div className={styles.tourBody} aria-live="polite">
              <span>{activeTourStep.eyebrow}</span>
              <h2>{activeTourStep.title}</h2>
              <p>{activeTourStep.text}</p>
            </div>
            <footer>
              <button type="button" onClick={() => setTourStep((current) => current === null ? 0 : Math.max(0, current - 1))} disabled={tourStep === 0}>
                <ArrowLeft aria-hidden="true" size={14} /> Back
              </button>
              {tourStep < tourSteps.length - 1 ? (
                <button type="button" onClick={() => setTourStep((current) => current === null ? 0 : Math.min(tourSteps.length - 1, current + 1))}>
                  Next stop <ArrowRight aria-hidden="true" size={14} />
                </button>
              ) : (
                <button type="button" onClick={endTour}>Finish tour <ArrowRight aria-hidden="true" size={14} /></button>
              )}
            </footer>
          </section>
        </>
      )}

      {open && tourStep === null && (
        <section className={styles.window} aria-label="Chat with Alyssa">
          <header className={styles.header}>
            <div className={styles.avatar} aria-hidden="true">
              <Image src="/media/assistant/alyssa-idle-v2.webp" alt="" fill sizes="52px" />
            </div>
            <div>
              <span>BGrafX virtual receptionist</span>
              <strong>Alyssa</strong>
              <small><i /> Ready to help</small>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Alyssa chat">
              <X aria-hidden="true" size={19} />
            </button>
          </header>

          <div className={styles.portrait} aria-hidden="true">
            <Image className={styles.idle} src="/media/assistant/alyssa-idle-v2.webp" alt="" fill priority sizes="(max-width: 520px) 44vw, 190px" />
            <Image className={styles.blink} src="/media/assistant/alyssa-blink-v2.webp" alt="" fill priority sizes="(max-width: 520px) 44vw, 190px" />
            <div className={styles.intro}><span>Creative brief assistant</span><strong>Let&apos;s find the right starting point.</strong></div>
          </div>

          <div className={styles.log} ref={logRef} aria-live="polite">
            {messages.map((message) => (
              <p className={message.author === "alyssa" ? styles.alyssaMessage : styles.visitorMessage} key={message.id}>
                {message.text}
              </p>
            ))}

            {showPrompts && (
              <>
                <button className={styles.tourRestart} type="button" onClick={startTour}><Map aria-hidden="true" size={15} /> Take the 60-second site tour <ArrowRight aria-hidden="true" size={13} /></button>
                <div className={styles.prompts} aria-label="Suggested answers">
                  {prompts.map((prompt) => (
                    <button type="button" key={prompt} onClick={() => addExchange(prompt, replies[prompt])}>
                      {prompt}<ArrowRight aria-hidden="true" size={13} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <form className={styles.form} onSubmit={submit}>
            <label className="sr-only" htmlFor="alyssa-message">Tell Alyssa about your project</label>
            <input id="alyssa-message" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Tell me about your project…" maxLength={500} />
            <button type="submit" aria-label="Send message"><Send aria-hidden="true" size={17} /></button>
          </form>

          <footer className={styles.footer}>
            <span>Guided assistant</span>
            <a href="https://wa.me/27621596082" target="_blank" rel="noopener noreferrer">Talk to Bruce <ArrowRight aria-hidden="true" size={12} /></a>
          </footer>
        </section>
      )}

      {tourStep === null && (
        <button className={styles.launcher} type="button" onClick={() => { setTourInvite(false); setOpen((current) => !current); }} aria-expanded={open} aria-label={open ? "Close Alyssa chat" : "Open Alyssa chat"}>
          <span className={styles.launcherPortrait} aria-hidden="true">
            <Image className={styles.idle} src="/media/assistant/alyssa-idle-v2.webp" alt="" fill sizes="58px" />
            <Image className={styles.blink} src="/media/assistant/alyssa-blink-v2.webp" alt="" fill sizes="58px" />
          </span>
          <span className={styles.launcherCopy}><small>Need a little direction?</small><strong>Ask Alyssa</strong></span>
          <MessageCircle aria-hidden="true" size={20} />
        </button>
      )}
    </aside>
  );
}