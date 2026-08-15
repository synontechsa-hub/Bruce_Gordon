# BGrafX Delivery Record and Forward Plan

Status: Current
Owner: Bruce Gordon
Last updated: 2026-08-14

## Delivered

- Mobile-first Next.js portfolio with shared navigation, footer, design tokens and motion system.
- Editorial homepage with hero, credibility, services, KerfSuite feature, selected work, experience, process, commercial approach and enquiry section.
- Detailed services page, website-concept archive, KerfSuite case study, cladding archive and custom 404 route.
- Factual content model for services, concepts, live properties and cladding work.
- Alyssa virtual receptionist: scripted prompt flow, guided site tour and reliable hand-off into the relevant contact-form service.
- Enquiry form delivered by Resend, including server-side Turnstile validation, honeypot protection and clear WhatsApp fallback.
- Production metadata, canonical URLs, Open Graph image, sitemap, robots, analytics integration and baseline Vercel security headers.
- Responsive and release audit completed on 2026-08-14: lint, typecheck, dependency audit and production build passed; key mobile, desktop and live enquiry journeys were exercised.

## Current operating model

GitHub `main` deploys to Vercel. The public production address is `https://www.bgrafx.co.za`. DNS remains managed at the domain provider; Vercel is the hosting platform. Cloudflare Turnstile is used only for contact-form verification.

The project has no database, CMS or account system. Public content is kept in typed local source files.

## Deferred owner decisions

1. Verify a BGrafX email domain in Resend and replace the temporary onboarding sender.
2. Add durable server-side rate limiting only if enquiry spam becomes a real operational issue.
3. Review conversion and traffic data once enough real usage exists; avoid adding duplicate analytics paths.

## Out of scope unless separately approved

- DNS-provider migration.
- CMS, authentication, blog, newsletter, quote calculator or payment system.
- Replacing Alyssa with a generative AI assistant.
- Broad visual redesign or unsupported portfolio claims.

## Verification baseline

```powershell
npm audit --omit=dev
npm run lint
npm run typecheck
npm run build
```

For a release affecting conversion, also exercise WhatsApp, direct contact-form completion, and Alyssa's service hand-off in a production preview before promotion.
