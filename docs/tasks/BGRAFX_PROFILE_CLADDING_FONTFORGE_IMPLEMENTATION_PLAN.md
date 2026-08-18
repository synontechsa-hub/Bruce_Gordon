# BGrafX Profile, Cladding Archive and FontForge Implementation Plan

## Status

Proposed integrated delivery plan. Implementation has not started.

Owner: Bruce Gordon  
Prepared: 2026-08-18

This document sequences the work described in:

- `BRUCE_GORDON_PROFILE_PAGE_PLAN.md`
- `CLADDING_CNC_ARCHIVE_EXPANSION_PLAN.md`
- `FONTFORGE_WEB_PLAN.md`

The three source briefs remain the detailed product requirements. This plan defines the shared order of work, decision gates, dependencies, verification, and release boundaries.

## Outcome

Deliver three connected additions to the existing BGrafX site:

1. A factual professional profile at `/bruce-gordon`.
2. A broader `/cladding` career archive, followed by evidence-supported case studies.
3. A private-by-design browser font converter, with its final public route approved after the technical proof of concept.

Together they should communicate the full **Creator • Designer • Developer** position without weakening BGrafX as the primary studio brand.

## Current Baseline

The repository is already a production Next.js 16 App Router application using React 19, TypeScript, CSS Modules, Motion, typed local content, and Vercel.

Relevant current implementation:

- Shared public navigation: `components/site-header/HomeHeader.tsx`
- Shared footer: `components/site-footer/SiteFooter.tsx`
- Typed portfolio and cladding data: `content/projects.ts`
- Existing cladding route: `app/cladding/page.tsx`
- Public route discovery: `app/sitemap.ts` and `app/robots.ts`
- Existing release commands: `npm run lint`, `npm run typecheck`, and `npm run build`

The site currently has no CMS, database, authentication, or account system. These additions do not create a need for any of them.

## Delivery Principles

- Facts and owned or licensed assets come before presentation work.
- Do not invent dates, qualifications, proficiency, responsibilities, materials, metrics, or project outcomes.
- Preserve explicit Alania Building Systems attribution.
- Keep public content in typed local source unless later evidence demonstrates a real need for another system.
- Reuse the existing BGrafX design tokens, layout conventions, header, footer, metadata patterns, and image pipeline.
- Add no production dependency until its purpose, maintenance state, bundle cost, security posture, licence, and technical fit have been reviewed and approved.
- Each phase ends with review and approval before the next consequential phase begins.
- Implementation completion is not release approval.

## Recommended Delivery Order

```text
Baseline and decisions
        ↓
Shared content and evidence inventory
        ↓
Bruce Gordon profile
        ↓
Expanded cladding archive
        ↓
First approved cladding case study
        ↓
FontForge technical proof of concept
        ↓
FontForge v1 integration
        ↓
Cross-linking, full-site QA and release review
```

The FontForge proof of concept may be investigated while historical cladding evidence is being collected, but it must remain an isolated experiment until the library and conversion matrix are approved.

## Decisions Required Before Public Implementation

### D1 — Profile publication content

Bruce must approve:

- Professional introduction and summary
- Skills included and their `Primary`, `Working Knowledge`, or `Familiar` labels
- Employment contexts, role names, and dates
- Education and course status
- Selected public projects
- CV file and whether it is downloadable, viewable, or both
- Portrait choice, if used
- LinkedIn, GitHub, Behance, email/contact, and project destinations

### D2 — Navigation hierarchy

The current desktop navigation already contains six destinations. Do not add both profile and tools links without checking width and hierarchy.

Recommended starting direction:

- Add `Bruce Gordon` or `About Bruce` to the primary navigation after responsive testing.
- Represent FontForge through a `Tools` destination only after its route is approved and functional.
- Move a lower-priority homepage anchor to the footer if necessary rather than crowding the header.

Bruce approves the final labels and ordering after a navigation prototype.

### D3 — FontForge public route and name

The source brief uses **BGrafX FontForge**, but FontForge is also the name of an established third-party font editor. Before release, confirm the public product name and route to avoid implying affiliation.

Recommended route structure if the name is approved:

```text
/tools/fontforge
```

A separate `/tools` landing page should be added only if it improves navigation for the first tool; do not build a speculative tools portal.

### D4 — Cladding case-study selection

Do not approve case-study routes from project prestige alone. Select the first case study only when its evidence record supports:

- Bruce's exact role
- Project context
- A meaningful production or technical story
- Accurate imagery and usage rights
- Required attribution

### D5 — Font conversion dependency

Approve the implementation library only after the proof of concept documents:

- Supported input and output formats
- Known unsupported font outlines or tables
- WOFF2 and OTF/CFF limitations
- Browser compatibility
- Output validation results
- Bundle and runtime cost
- Licence and maintenance status
- Confirmation that processing is local and contains no telemetry or upload path

## Phase 0 — Baseline and Work Controls

### Work

1. Confirm the repository is clean or record pre-existing user changes.
2. Run the baseline verification commands.
3. Capture the current navigation at the supported viewport widths.
4. Record existing Lighthouse or equivalent accessibility/performance evidence if available.
5. Create a small implementation checklist linked to the decisions in this plan.

### Verification

```powershell
npm audit --omit=dev
npm run lint
npm run typecheck
npm run build
```

### Exit gate

- Baseline failures are understood before feature work starts.
- No unrelated redesign or infrastructure work has entered scope.

## Phase 1 — Shared Content and Evidence Inventory

This is the critical dependency for both the profile and cladding archive.

### 1.1 Profile content matrix

Create a reviewable record with these states:

- `verified`
- `needs confirmation`
- `omit for now`

Inventory:

- Summary and biography
- Skills and proficiency labels
- Employment timeline
- Education and course status
- CV/resume
- External profile URLs
- Portrait and project images
- Selected projects, roles, stacks, and public links

Verify technology labels against the actual project repositories where possible. Do not infer proficiency from repository presence alone.

### 1.2 Cladding project ledger

Create one record per candidate project containing:

- Canonical project name
- Location
- Verified period or year, if available
- Short factual description
- Bruce's known disciplines and exact role
- Evidence source
- Image source, owner, permission status, and alt-text draft
- Case-study readiness
- Outstanding questions

Audit the five existing public entries as well as all proposed additions. Existing copy should not bypass the verification process merely because it is already published.

### 1.3 Asset handling

- Prefer Bruce-owned source material.
- Record third-party image ownership and permission before committing an asset.
- Do not copy Alania or Behance text verbatim into the implementation.
- Optimise only approved final image copies; preserve source archives outside the web repository where appropriate.
- Use descriptive, stable filenames rather than camera-generated names.

### Deliverables

- Approved profile content matrix
- Cladding project/evidence ledger
- Approved asset shortlist
- Explicit missing-information list for Bruce

### Exit gate

The profile has enough verified content for a credible first release, and the cladding archive has enough approved entries to be broader than the current five-project selection.

## Phase 2 — Bruce Gordon Profile

### 2.1 Content and component design

Define typed content separately from page layout. Likely modules may include:

```text
content/profile.ts
components/profile/
app/bruce-gordon/page.tsx
app/bruce-gordon/page.module.css
```

Keep component boundaries purposeful; do not split every visual fragment into a separate file.

### 2.2 Page shell

Build:

- Page metadata and canonical URL
- Shared header and footer
- Hero containing the locked identity `Creator • Designer • Developer`
- Approved professional introduction
- `View work`, CV, and contact actions where their targets exist
- Responsive editorial layout consistent with `DESIGN.md`

### 2.3 Profile content

Add only approved content:

- Professional summary
- Grouped disciplines
- Credibility-first proficiency labels
- Selected proof-of-work cards
- Concise experience timeline
- Education and learning
- CV/resume action
- Professional/contact destinations

Production, signage, CNC, and print experience must remain a first-class discipline rather than a footnote to development.

### 2.4 Integration

- Link the profile to `/cladding` as production/CNC evidence.
- Add the approved profile navigation/footer link.
- Add `/bruce-gordon` to the sitemap.
- Ensure project cards use only live, presentable destinations.
- Do not list FontForge as shipped until FontForge v1 is public and verified.

### Verification

- Semantic heading and landmark review
- Full keyboard traversal and visible focus states
- Contrast and non-colour information checks
- Responsive review at 360, 390, 430, 768, 1024, 1280, and 1440 px
- All profile, CV, contact, and project links
- Metadata, canonical, sitemap, and indexability
- Lint, typecheck, and production build

### Exit gate

The page is factually approved, understandable in a quick scan, balanced across Bruce's disciplines, and visually part of BGrafX.

## Phase 3 — Expanded Cladding Archive

### 3.1 Data model

Extend the archive type only with fields required by the approved ledger. A likely starting point is:

```ts
interface CladdingProject {
  slug: string;
  title: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  disciplines?: string[];
  year?: string;
  hasCaseStudy?: boolean;
}
```

Detailed case-study content should use a separate type or module so archive entries stay concise.

### 3.2 Archive interaction prototype

Prototype the archive using the real approved image set. Choose between a grid, manually controlled slideshow, or hybrid based on image count and aspect ratios.

Acceptance requirements:

- Project name and verified location remain visible.
- Touch, pointer, and keyboard interactions work.
- There is no forced auto-advance.
- Reduced-motion preferences are respected.
- Case-study availability is clear without making non-case-study projects feel incomplete.
- Images use the Next.js image pipeline where practical and do not cause layout shift.

### 3.3 Route upgrade

- Preserve the existing career introduction and Alania attribution.
- Replace the fixed `Five projects` language with accurate scalable copy.
- Render the larger verified archive from typed content.
- Add disciplines and verified dates only where supported.
- Add the link back to the Bruce Gordon profile.
- Preserve `/cladding` as the canonical landing route.

### Verification

- Every visible fact matches the project ledger.
- Every image has an approved source and meaningful alt text.
- No horizontal overflow or unusable controls at supported sizes.
- Keyboard and touch browsing work without auto-play traps.
- Existing `/cnc`, `/cnc.html`, and `/cnc-production` redirects still resolve correctly.
- Lint, typecheck, and production build pass.

### Exit gate

The archive demonstrates substantially greater breadth without implying unsupported responsibility or ownership.

## Phase 4 — First Cladding Case Study and Reusable System

### 4.1 Select the evidence-rich project

Use the approved readiness criteria in D4. If no candidate meets them, pause this phase and release the expanded archive without placeholder case-study routes.

### 4.2 Establish the content model

Model only the sections the first real project needs, drawn from:

- Hero and project context
- Mandatory `Bruce's role`
- Challenge
- Process
- Technical details
- Problem solving
- Gallery
- Outcome
- Attribution and sources

Optional sections must remain optional. Do not force empty content to make all projects structurally identical.

### 4.3 Build the reusable route system

Recommended public route:

```text
/cladding/[project-slug]
```

Use a static typed data source and statically generated route where practical. Unknown or unapproved slugs must return not found and must not enter the sitemap.

### 4.4 Review before replication

Review the first case study for:

- Factual accuracy
- Bruce/Alania responsibility boundaries
- Image rights
- Technical clarity
- Readability for non-specialists
- Mobile layout and gallery behaviour
- Reusability without over-generalisation

Do not create further case studies until Bruce approves this master implementation.

### Verification

- Per-route metadata and canonical
- Sitemap entry only for the approved public route
- Attribution and source review
- Keyboard-accessible gallery
- Image performance and responsive sizing
- Lint, typecheck, and production build

### Exit gate

One complete, evidence-backed case study is approved as the master pattern.

## Phase 5 — FontForge Technical Proof of Concept

This phase is a technical investigation, not a production dependency or public feature.

### 5.1 Test corpus

Assemble a small set of fonts that may legally be used for conversion testing and that cover:

- TrueType outlines
- OpenType with TrueType outlines
- OpenType/CFF where available
- WOFF
- WOFF2
- Variable fonts where relevant
- Invalid, truncated, renamed, and oversized inputs

Do not commit fonts whose licences do not permit repository redistribution.

### 5.2 Candidate evaluation

Evaluate current candidate libraries against a fixed rubric:

- Actual parse and write support, not advertised format names alone
- Browser-only execution
- WOFF2 support and WebAssembly requirements
- OTF/CFF behaviour
- Retention of names, metrics, kerning, glyph maps, and important tables
- Variable-font behaviour
- Error handling on malformed input
- Browser support
- Bundle size and load strategy
- Maintenance, security, and licence

### 5.3 Conversion matrix

Document each direction explicitly, for example:

```text
TTF → WOFF    supported / unsupported / conditional
TTF → WOFF2   supported / unsupported / conditional
OTF → TTF     supported / unsupported / lossy
```

Only reliable, validated directions enter the user interface.

### 5.4 Output validation

For each proposed conversion:

- Re-open the output with an independent parser or trusted font tool.
- Compare glyph count, naming, core metrics, and expected tables.
- Render representative glyphs in the browser.
- Test the file in common font applications where practical.
- Record known losses or incompatibilities.
- Confirm repeated operations release object URLs and large buffers.

### 5.5 Privacy and safety verification

- Inspect the browser network log during selection and conversion.
- Confirm no font bytes, filenames, family names, or table data leave the device.
- Reject files using signature/content inspection rather than extension alone.
- Establish a defensible file-size limit.
- Handle malformed fonts without freezing the page.
- Ensure analytics, if later added, records only generic actions such as conversion success/failure and selected format pair.

### Deliverable

A short proof-of-concept report containing the recommended library, approved conversion matrix, rejected options, limitations, bundle implications, security/privacy findings, and dependency-approval request.

### Exit gate

Bruce approves the dependency, public name/route, supported conversion matrix, and acceptable limitations. If no candidate produces trustworthy files, stop the browser converter rather than shipping unreliable output.

## Phase 6 — FontForge v1

### 6.1 Architecture

- Keep the route server-rendered where possible and isolate conversion logic in a client component.
- Lazy-load heavy conversion code after intent where practical.
- Perform all parsing and conversion in the browser.
- Add no upload, storage, account, API, or database path.
- Consider a Web Worker if proof-of-concept measurements show main-thread blocking.

Likely structure, subject to the approved route and library:

```text
app/tools/fontforge/
components/font-converter/
lib/fonts/
```

### 6.2 Converter states

Implement explicit states for:

- Empty
- Drag-over
- File inspecting
- Ready with detected metadata
- Converting
- Success with download
- Unsupported conversion
- Invalid or unsafe input
- Recoverable failure

The interface must allow reset and repeated conversions without reloading the page.

### 6.3 User experience

- Drag-and-drop and keyboard-accessible file picker
- Source format detection
- Safe font family/name display where available
- Output choices filtered by the approved conversion matrix
- Clear conversion and download actions
- Privacy explanation verified against the implementation
- Font-licensing reminder
- Supported-format and limitation guidance
- BGrafX services/contact path

### 6.4 Resource cleanup

- Revoke generated object URLs when replaced, reset, or unmounted.
- Release references to source and output buffers.
- Prevent stale async work from updating a reset component.
- Keep one clear active conversion at a time unless testing proves concurrency safe.

### 6.5 Integration

- Add approved route metadata and canonical.
- Add route to navigation/footer and sitemap only when functional.
- Add a homepage tool card only if it improves discovery without displacing stronger portfolio evidence.
- Add FontForge to the Bruce Gordon project proof only after public QA passes.

### Verification

- Approved conversion matrix using the legal test corpus
- Chrome, Edge, Firefox, and practical mobile behaviour
- Invalid, renamed, malformed, large, and repeated inputs
- Keyboard-only and screen-reader state announcements
- Reduced-motion and visible-focus checks
- Network inspection proving no font transmission
- Object URL and memory cleanup checks
- Bundle impact review
- Lint, typecheck, production build, and dependency audit

### Exit gate

A visitor can select a supported font, choose only a valid target, convert locally, download a validated result, and repeat or reset without an account, upload, leak, or broken state.

## Phase 7 — Integrated Site Review

### Cross-linking

Verify the intended evidence path:

```text
/bruce-gordon
    → /cladding
        → approved /cladding/[project-slug]

/bruce-gordon
    → FontForge project proof
        → approved FontForge route
```

Avoid duplicating full cladding case-study content on the profile.

### Information architecture

- Review primary navigation width and priority at every breakpoint.
- Confirm BGrafX remains the studio identity.
- Ensure the profile, cladding archive, and tool each have a clear route back to services/contact.
- Update the footer as needed without duplicating the complete header.

### Full-site regression

Test:

- Home, services, work, KerfSuite, cladding, profile, FontForge, approved case studies, and not-found
- Primary and mobile navigation
- Alyssa launcher and guided hand-off
- Contact form and WhatsApp paths when affected by layout/navigation changes
- Metadata, canonicals, Open Graph, sitemap, and robots
- 360, 390, 430, 768, 1024, 1280, and 1440 px widths
- Keyboard navigation, visible focus, headings, landmarks, contrast, and reduced motion
- Image loading, layout shift, route errors, broken links, and console errors

### Release commands

```powershell
npm audit --omit=dev
npm run lint
npm run typecheck
npm run build
```

Release through a production preview first. Bruce reviews factual content, attribution, design, supported conversions, and mobile behaviour before promotion.

## Suggested Implementation Batches

Each batch should be separately reviewable and should not mix unrelated work.

1. **Content inventory:** profile matrix, cladding ledger, asset rights, missing questions.
2. **Profile shell:** route, metadata, hero, layout, no unverified content.
3. **Profile completion:** approved content, project proof, CV/contact, navigation, sitemap.
4. **Cladding archive model:** verified typed data and approved assets.
5. **Cladding archive UI:** scalable browsing interaction and profile cross-link.
6. **First case study:** reusable route and one evidence-rich project.
7. **Font conversion spike:** test corpus, candidate comparison, matrix, privacy evidence.
8. **FontForge v1:** approved dependency, converter, guidance, route integration.
9. **Integrated release:** navigation reconciliation, cross-links, metadata, full regression.

## Overall Definition of Done

The integrated programme is complete when:

1. `/bruce-gordon` presents an approved, factual, balanced professional profile.
2. `/cladding` contains a meaningfully broader verified archive with accurate attribution.
3. At least one detailed cladding case study is public if, and only if, sufficient evidence exists.
4. FontForge exposes only validated browser conversion paths and transmits no font data.
5. Profile, archive, case studies, and tool link together without duplicating content or crowding navigation.
6. Every public route has accurate metadata, canonical treatment, sitemap inclusion, and indexability.
7. Desktop, mobile, keyboard, accessibility, performance, link, and error-state checks pass.
8. Dependency audit, lint, typecheck, and production build pass.
9. Bruce has approved factual content, image rights, attribution, proficiency labels, navigation, conversion support, and release.

## Explicitly Out of Scope

- Site-wide redesign or rebrand
- CMS, database, authentication, or user accounts
- Server-side font processing or font storage
- Unverified cladding case studies
- Automatic case-study generation
- Skill percentage meters
- Social feeds
- Additional design tools beyond FontForge v1
- A large tools portal
- Changes to Alyssa's approved scripted-assistant boundary
- Deployment or production promotion without Bruce's approval

## Immediate Next Action

Begin Phase 1 by creating the profile content matrix and cladding project/evidence ledger. In parallel with owner-led evidence recovery, prepare the FontForge proof-of-concept test rubric, but do not install a font dependency or start public UI implementation until its decision gate is approved.
