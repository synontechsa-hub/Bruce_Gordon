# BGrafX v2 — Architecture and Delivery Plan

Status: Proposed for architect approval  
Owner: Bruce Gordon (architect and visual director)  
Implementation lead: Codex  
Last updated: 2026-08-02

## 1. Goal

Rebuild BGrafX as a production-quality, mobile-first Next.js portfolio that presents Bruce Gordon as an experienced multidisciplinary designer and developer, makes genuine work the visual focus, and converts qualified visitors into enquiries.

The supplied design reference is the approved starting direction, not a pixel-perfect final comp. Its strongest qualities—editorial typography, warm paper, disciplined black and yellow, tactile workshop details, strong grid, and portfolio-led colour—will become a responsive design system rather than a screenshot recreation.

## 2. Governance and authority

Work follows the Synontech engineering control system in `D:\Coding\_Engineering`.

Authority order for this project:

1. Platform, security, and legal constraints.
2. Bruce Gordon's decisions in the active conversation.
3. `PRD.md`, `DESIGN.md`, and `CODEX.md`.
4. The Synontech engineering playbook and project context.
5. Framework conventions and engineering judgment.

Bruce approves architecture, visual direction, scope, dependencies, destructive migrations, release, and any material change. Codex may execute normal implementation autonomously within an approved phase. Every phase ends with evidence and an approval gate. Completion never implies permission to deploy.

## 3. Product and design contract

### 3.1 First-impression promise

Within ten seconds, a visitor should understand:

- Bruce is a senior graphic designer, web designer, and software developer.
- BGrafX provides branding, graphic design, websites, automation, and production-aware design.
- The studio combines creative judgment with technical execution.
- A quote can be requested through WhatsApp or email.

### 3.2 Visual north star

The visual balance is:

- 70% premium creative studio
- 20% designer's workshop
- 10% editorial portfolio

The supplied concept establishes these core motifs:

- warm paper canvas with restrained grain;
- near-black typography and panels;
- one controlled signal-yellow accent;
- condensed editorial display type paired with a neutral body face;
- drafting marks, registration targets, rules, annotations, tape, notebook paper, and print swatches;
- strong asymmetrical hero composition;
- square, crisp interface geometry with minimal rounding;
- real work supplying most secondary colour.

Workshop details must be built as lightweight SVG/CSS assets and used selectively. They must never reduce readability, responsiveness, or performance.

### 3.3 What the reference does not lock

The following remain design decisions to validate in the homepage prototype:

- exact typefaces and licensing;
- final accent-yellow value;
- final BGrafX wordmark treatment;
- hero artwork and portrait/project imagery;
- final service count and wording;
- exact density of workshop annotations;
- motion timing and section transitions.

### 3.4 Design quality gates

Visual approval is required at four points:

1. Tokens, typography, wordmark treatment, and core UI specimen.
2. Mobile and desktop homepage hero plus one content section.
3. Complete homepage at all target breakpoints.
4. Work archive and representative case-study page before page-system rollout.

No full-site implementation should proceed from an unapproved homepage language.

## 4. Information architecture

```text
/
├── /work
│   └── /work/[slug]
├── /services
├── /pricing
├── /about
├── /cnc-production
├── /contact
└── not-found
```

Legacy route intent:

- `/projects` → `/work`
- `/side-projects` → `/work` or a future clearly labelled experiments collection
- `/cnc` → `/cnc-production`
- existing valid project URLs → matching case studies when an approved mapping exists

Redirects are implemented only after the destination content is approved and verified.

## 5. Homepage narrative

The homepage should be a persuasive editorial sequence rather than a collection of unrelated sections.

1. **Header** — identity, primary navigation, quote CTA.
2. **Hero** — seniority, positioning, primary offer, two contact/work paths, crafted visual composition.
3. **Credibility strip** — disciplines, location/availability, selected social proof that is factual.
4. **Services** — concise multidisciplinary offer; graphic design, web, branding, automation, and signage/production where approved.
5. **Featured work** — large genuine project imagery with category, year, summary, and case-study path.
6. **Experience** — 22+ years expressed with factual context, not unsupported metrics.
7. **Process** — discover, define, design, build/produce, deliver; wording to match actual practice.
8. **Pricing preview** — transparent starting-point language with a route to the full pricing page.
9. **Contact CTA** — WhatsApp and email as primary conversions.
10. **Footer** — navigation, socials, location, copyright, and Synontech relationship.

## 6. Content model

All public content should live in typed local data rather than being scattered through components. No CMS is introduced.

### Project

- slug
- title
- category
- year
- status: client, collaboration, or self-initiated
- short summary
- services supplied
- role
- collaborators and attribution where applicable
- hero image and gallery
- challenge, approach, and delivered work
- external URL where appropriate
- featured flag

### Service

- title
- short value statement
- deliverables
- suitable client/project types
- related work
- enquiry CTA

### Pricing item

- service
- starting price or quote-only status
- inclusions
- exclusions/notes

Content invariants:

- no invented clients, outcomes, testimonials, awards, dates, statistics, or business metrics;
- concept work must be explicitly labelled and must not imply a client relationship;
- third-party collaboration and CNC work must carry accurate attribution;
- all project images require ownership/provenance confirmation and meaningful alt text;
- pricing is not migrated blindly when it conflicts with premium positioning.

## 7. Technical architecture

### 7.1 Approved stack

- Next.js App Router
- TypeScript in strict mode
- CSS Modules plus global design tokens
- Motion for React, used only where it adds hierarchy or feedback
- Lucide React for functional interface icons
- Vercel hosting
- Google Tag Manager and Google Analytics, with one deliberate measurement path

### 7.2 Rendering model

- Server Components by default.
- Client Components only for navigation state, purposeful motion, and interactive galleries.
- Static generation for marketing pages and project routes.
- No backend, database, CMS, authentication, or form-processing service in v2.
- Contact actions use direct email and WhatsApp links unless a later approved phase adds a form service.

### 7.3 Proposed source shape

```text
app/
├── (site)/
│   ├── page.tsx
│   ├── work/
│   ├── services/
│   ├── pricing/
│   ├── about/
│   ├── cnc-production/
│   └── contact/
├── layout.tsx
├── not-found.tsx
├── robots.ts
└── sitemap.ts
components/
├── layout/
├── sections/
├── work/
└── ui/
content/
├── projects.ts
├── services.ts
├── pricing.ts
└── site.ts
lib/
├── analytics.ts
├── metadata.ts
└── structured-data.ts
public/
└── media/
styles/
├── globals.css
└── tokens.css
```

The legacy static implementation remains recoverable until the Next.js replacement is accepted. Asset migration is selective: approved media is copied/converted into the new public structure; obsolete screenshot-composed UI is not carried forward.

## 8. Responsive strategy

One semantic component tree serves every viewport. Layout changes through CSS Grid, Flexbox, container-aware sizing where useful, and fluid `clamp()` scales.

Required verification widths:

- 360 px
- 390 px
- 430 px
- 768 px
- 1024 px
- 1280 px
- 1440 px

Mobile composition is designed first, not derived by stacking the desktop reference. On small screens:

- the hero becomes a deliberate editorial stack;
- decorative drafting layers reduce in number and complexity;
- project imagery remains prominent;
- type retains impact without clipping;
- primary contact actions remain immediately reachable;
- touch targets are at least 44 × 44 CSS pixels.

## 9. Accessibility, performance, SEO, and analytics

### Accessibility

- semantic landmarks and a single logical page heading;
- visible keyboard focus and skip navigation;
- correct link/button semantics;
- labelled responsive navigation with focus management;
- sufficient colour contrast;
- meaningful image alternatives and empty alternatives only for decoration;
- reduced-motion support;
- no content embedded solely in decorative images.

### Performance

- `next/image` with explicit dimensions and responsive sizes;
- WebP/AVIF derivatives for photographic media;
- self-hosted or `next/font` typography with controlled subsets/weights;
- no large composited background screenshots;
- lazy loading below the fold;
- minimal client JavaScript and motion;
- target Lighthouse scores of 90+ in Performance and 95+ in Accessibility, Best Practices, and SEO on representative production builds, with regressions documented.

### SEO

- preserve `https://www.bgrafx.co.za` canonicals;
- per-page titles and descriptions;
- Open Graph and social images;
- Person/ProfessionalService, Service, CollectionPage, and CreativeWork schema only where factually valid;
- generated sitemap and robots;
- redirect map for retired routes;
- no hidden duplicate SEO content.

### Analytics

- confirm whether GA4 is configured through GTM;
- install one measurement path to prevent duplicate page views;
- track only approved conversion events such as WhatsApp, email, quote CTA, and project-view interactions;
- never place analytics identifiers or secrets in private configuration when they are intended public web IDs; no secret values are read from the external vault.

## 10. Delivery phases and approval gates

### Phase 0 — Audit and plan

Status: complete pending approval of this plan.

Deliverables:

- repository and content audit;
- migration risks;
- architecture and phased plan;
- open decision register.

Verification:

- no product source changed;
- plan matches `PRD.md`, `DESIGN.md`, `CODEX.md`, and `_Engineering` governance.

Approval required: architecture, phase boundaries, and visual north star.

### Phase 1 — Foundation and design specimen

Scope:

- create the Next.js/TypeScript foundation;
- configure lint, build, strict typing, and CSS Modules;
- define initial tokens, typography, spacing, grid, focus states, buttons, links, and workshop primitives;
- implement shared metadata utilities and base layout;
- create a private in-project design specimen route or component fixture for review.

Non-goals:

- full homepage;
- legacy deletion;
- deployment;
- final project migration.

Acceptance:

- lint and production build pass;
- specimen works at all target widths;
- no duplicated mobile/desktop markup;
- Bruce approves the visual foundation.

Recommended route: Terra Medium for integration; focused CSS/components may use Luna High after the contract is approved.

### Phase 2 — Homepage prototype and visual lock

Scope:

- build the mobile and desktop hero;
- build header, service preview, and one featured-work treatment;
- implement restrained motion and reduced-motion fallback;
- use representative approved imagery.

Acceptance:

- reviewed at 360, 390, 430, 768, 1024, 1280, and 1440 px;
- typography does not clip or cause layout shift;
- reference character is recognisable without copying screenshot geometry;
- keyboard and reduced-motion behaviour pass;
- Bruce approves the visual language.

Recommended route: Terra High because visual judgment, responsive integration, and asset handling are tightly coupled.

### Phase 3 — Complete homepage

Scope:

- credibility, services, featured work, experience, process, pricing preview, CTA, and footer;
- final homepage content and interactions;
- homepage structured data and metadata.

Acceptance:

- complete responsive homepage;
- all CTAs function;
- accessibility smoke test passes;
- lint and build pass;
- representative Lighthouse run recorded;
- Bruce approves the homepage.

Recommended route: Terra Medium, with focused components suitable for Luna High only when independently bounded.

### Phase 4 — Work archive and case-study system

Scope:

- typed project content model;
- work filters only if evidence shows they improve navigation;
- work cards and archive;
- one representative case study followed by approved remaining studies;
- accurate project status and attribution.

Acceptance:

- every published project is confirmed genuine or clearly self-initiated;
- each includes title, category, year, factual summary, role, services, imagery, and alt text;
- project routes statically generate;
- Bruce approves the representative case study before rollout.

Recommended route: Terra Medium for the system; Luna Medium/High for approved repeatable project migrations.

### Phase 5 — Supporting pages

Scope:

- Services;
- Pricing;
- About;
- CNC & Production;
- Contact;
- 404/not-found.

Acceptance:

- page-specific content and metadata are complete;
- CNC attribution is factual;
- pricing is architect-approved;
- direct contact actions work;
- lint and build pass.

Recommended route: Terra Medium, with clearly isolated pages eligible for Luna High.

### Phase 6 — Production hardening

Scope:

- asset optimisation;
- accessibility and keyboard audit;
- responsive regression checks;
- metadata, schema, sitemap, robots, and redirect validation;
- analytics validation;
- dependency and secret scanning;
- production build and Lighthouse evidence.

Acceptance:

- no broken internal routes or assets;
- no material console/build warnings;
- production build passes;
- performance targets are met or deviations documented;
- Sol reviewer completes integration/release-readiness review;
- Bruce gives final acceptance.

Recommended route: Terra High for fixes, then Sol High final review if release-critical issues remain; otherwise Sol Medium/Reviewer.

### Phase 7 — Release

Release is a separate architect-approved action.

Scope after approval:

- final Vercel configuration;
- preview deployment validation;
- production deployment;
- domain and analytics smoke checks;
- rollback path confirmation.

No deployment, domain change, merge, or destructive legacy removal occurs without explicit approval.

## 11. Verification loop for every implementation phase

Each phase reports:

1. Outcome and rationale.
2. Files changed.
3. Commands and checks run.
4. Visual evidence at relevant breakpoints.
5. Accessibility/performance findings proportionate to the phase.
6. Remaining work and residual risk.
7. The exact approval requested.

Minimum engineering checks once configured:

```powershell
npm run lint
npm run typecheck
npm run build
```

Focused tests are added where behaviour warrants them. Browser-level smoke tests should cover navigation, mobile menu, primary conversion links, work routes, not-found handling, and reduced-motion behaviour before release.

## 12. Decision register

The following must be resolved before their dependent phase:

| Decision | Needed by | Recommendation |
| --- | --- | --- |
| Which portfolio entries are client work, collaborations, or self-initiated concepts? | Phase 4 | Keep self-initiated work only when clearly labelled; never imply a client. |
| Which real projects will lead the homepage? | Phase 2 | Select 3–5 visually strong projects spanning design, web, and production. |
| What are the correct project years and Bruce's exact role? | Phase 4 | Maintain a factual content worksheet before migration. |
| Should current low starting prices survive the premium repositioning? | Phase 3/5 | Review and approve new commercial wording before publishing. |
| Is AI automation a current paid service with demonstrable capability? | Phase 2/5 | Include only if it is genuinely offered; otherwise position as software/automation capability. |
| Is signage/print a direct BGrafX service or experience/collaboration? | Phase 2/5 | Use precise wording and attribution. |
| Which wordmark/logo assets are final and what usage rules apply? | Phase 1 | Approve one production SVG system before homepage work. |
| Which font licences/assets are available? | Phase 1 | Prefer performant, legally usable families with a condensed display and neutral body pairing. |
| Is GA4 already deployed through GTM? | Phase 6 | Use GTM as the single integration if correctly configured. |

## 13. Explicitly out of scope

- CMS
- authentication
- blog
- newsletter
- quote calculator
- AI assistant
- database or unnecessary backend
- fabricated testimonials or metrics
- deployment before final approval
- destructive removal of the legacy site during development

## 14. Definition of done

BGrafX v2 is done when all required pages and approved case studies are complete; the experience is intentionally designed across all target breakpoints; navigation and contact paths work; content is genuine and attributed; accessibility, SEO, analytics, and performance checks pass; production build is clean; release-readiness review is complete; and Bruce has explicitly accepted the result for deployment.
