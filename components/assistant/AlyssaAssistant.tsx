"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./AlyssaAssistant.module.css";

type Message = {
  id: number;
  author: "alyssa" | "visitor";
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

export function AlyssaAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(startingMessages);
  const [draft, setDraft] = useState("");
  const [showPrompts, setShowPrompts] = useState(true);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function addExchange(text: string, reply?: string) {
    const nextId = messages.length + 1;
    const visitor: Message = { id: nextId, author: "visitor", text };
    const alyssa: Message = {
      id: nextId + 1,
      author: "alyssa",
      text: reply ?? "Thank you — that gives me a useful starting point. The full AI conversation is the next step; for now, I can take you straight to Bruce.",
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

  return (
    <aside className={styles.assistant} aria-label="BGrafX virtual receptionist">
      {open && (
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
              <div className={styles.prompts} aria-label="Suggested answers">
                {prompts.map((prompt) => (
                  <button type="button" key={prompt} onClick={() => addExchange(prompt, replies[prompt])}>
                    {prompt}<ArrowRight aria-hidden="true" size={13} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className={styles.form} onSubmit={submit}>
            <label className="sr-only" htmlFor="alyssa-message">Tell Alyssa about your project</label>
            <input id="alyssa-message" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Tell me about your project…" maxLength={500} />
            <button type="submit" aria-label="Send message"><Send aria-hidden="true" size={17} /></button>
          </form>

          <footer className={styles.footer}>
            <span>AI assistant concept</span>
            <a href="https://wa.me/27621596082" target="_blank" rel="noopener noreferrer">Talk to Bruce <ArrowRight aria-hidden="true" size={12} /></a>
          </footer>
        </section>
      )}

      <button className={styles.launcher} type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={open ? "Close Alyssa chat" : "Open Alyssa chat"}>
        <span className={styles.launcherPortrait} aria-hidden="true">
          <Image className={styles.idle} src="/media/assistant/alyssa-idle-v2.webp" alt="" fill sizes="58px" />
          <Image className={styles.blink} src="/media/assistant/alyssa-blink-v2.webp" alt="" fill sizes="58px" />
        </span>
        <span className={styles.launcherCopy}><small>Need a little direction?</small><strong>Ask Alyssa</strong></span>
        <MessageCircle aria-hidden="true" size={20} />
      </button>
    </aside>
  );
}