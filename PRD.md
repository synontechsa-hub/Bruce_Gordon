# BGrafX Product Requirements

Status: Active product record
Owner: Bruce Gordon
Last updated: 2026-08-14

## Purpose

BGrafX is Bruce Gordon's independent South African creative practice. The website presents his work across graphic design, branding, responsive websites, practical automation, signage and production-aware design, and turns suitable interest into direct enquiries.

The site should make three things clear quickly: Bruce brings more than 23 years of creative experience, he combines design judgment with technical and production knowledge, and a visitor can start a practical conversation without navigating a sales funnel.

## Audience

Primary audiences are small and medium businesses, startups, manufacturers, signage companies, marketing agencies and entrepreneurs. Secondary audiences include recruiters, creative directors, product teams and software companies.

## Product goals

- Present genuine work and experience with precise attribution.
- Demonstrate connected capability across design, web, automation and production.
- Give visitors clear conversion paths: project enquiry, WhatsApp and Alyssa's guided hand-off.
- Remain fast, accessible, responsive and credible across mobile and desktop.
- Keep the site straightforward to maintain without a CMS or database.

## Current public information architecture

| Route | Purpose |
| --- | --- |
| `/` | Editorial studio homepage, services preview, featured KerfSuite study, selected concepts, experience, process, commercial approach and enquiry form. |
| `/services` | Five detailed service areas: graphic design, web design, automation, branding, and signage & production. |
| `/work` | Archive of twelve self-initiated website concepts plus three live properties. |
| `/work/kerfsuite` | Real-world KerfSuite product case study. |
| `/cladding` | Selected architectural-cladding career archive with Alania attribution. |
| `/_not-found` | Branded not-found experience. |

`/design-system` is an internal visual foundation/specimen route. It remains reachable by direct URL for review but is deliberately marked `noindex, nofollow` and excluded from the sitemap.

## Content and truth rules

- Self-initiated work is labelled honestly and must not imply a client relationship.
- KerfSuite is presented as a real product connected to Synontech and Feed Rate.
- Cladding work credits Alania Building Systems as the collaborating principal business; Bruce's responsibility varied by project.
- Do not invent clients, outcomes, testimonials, awards, dates, statistics or business metrics.
- Experience claims currently used on the site are 23+ years of professional experience and 14 years leading CNC production workflows.

## Enquiry and assistant experience

The homepage contact section is the primary web conversion path. It collects a name, email address, optional business and phone details, service interest, and project description. WhatsApp remains an immediate alternative.

Alyssa is a lightweight, scripted virtual receptionist and guided site-tour host. She is not an AI service and does not retain, transmit or process chat content. Her prompts help a visitor select an enquiry starting point and pass the selected service into the contact form.

On compact phone viewports, the Alyssa launcher stays out of the hero until the visitor has moved beyond it, so it does not obstruct the primary CTAs. The launcher expands later on longer pages.

## Contact delivery and abuse protection

- The browser submits the enquiry to the same-origin `POST /api/contact` route.
- The route validates required fields and lengths, rejects a honeypot field, verifies Cloudflare Turnstile server-side, and sends the enquiry through Resend.
- Credentials are deployment environment variables only: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Values must never be committed or documented.
- The current Resend onboarding sender is a temporary operational limitation until BGrafX has a verified branded sending domain.
- Turnstile and the honeypot are the current anti-spam controls. Durable rate limiting is deferred unless real spam volume warrants it.

## Technical and operational requirements

- Next.js App Router, React, TypeScript, CSS Modules and Motion.
- Vercel hosts production from the GitHub `main` branch at `https://www.bgrafx.co.za`.
- Google Tag Manager is installed through one deliberate page-level integration.
- Canonicals, route metadata, Open Graph data, robots and sitemap are configured for the public routes.
- The site must work from 360px upward, with particular review at 360, 390, 430, 768, 1024, 1280 and 1440 CSS pixels.
- Conversion controls must remain keyboard-accessible; motion must respect reduced-motion preferences.

## Out of scope

- CMS, authentication, database, blog, newsletter, quote calculator and payment flow.
- A generative-AI chat service or storage of assistant conversation data.
- Fabricated social proof or performance claims.

## Definition of done for the current release

- All listed public routes render without broken assets or horizontal overflow at supported sizes.
- Navigation, WhatsApp CTAs, Alyssa service hand-off and enquiry form work.
- Enquiries are protected by Turnstile and delivered through the configured Resend account.
- Lint, typecheck, dependency audit and production build pass.
- Public metadata, sitemap, robots and security headers are present.
