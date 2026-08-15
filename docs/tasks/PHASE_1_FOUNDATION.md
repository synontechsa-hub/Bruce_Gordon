# Phase 1 Task Brief — Foundation and Design Specimen

> Archived implementation brief. This phase is complete; current requirements live in [`../../PRD.md`](../../PRD.md) and [`../../BGRAFX_V2_PLAN.md`](../../BGRAFX_V2_PLAN.md).

## Goal

Establish the production Next.js foundation and a responsive design-system specimen that converts the approved BGrafX reference into reusable visual rules.

## In scope

- Next.js App Router and strict TypeScript foundation.
- CSS Modules and global design tokens.
- Self-hosted display and body typography.
- Core brand mark, navigation shell, buttons, cards, focus states, and workshop primitives.
- Responsive design specimen for architect review.
- Baseline metadata and a no-index directive while the replacement is incomplete.
- Lint, typecheck, and production-build scripts.

## Out of scope

- Complete homepage or supporting pages.
- Final project/content migration.
- Analytics activation.
- Redirects, deployment, domain changes, or legacy deletion.

## Constraints and invariants

- Preserve the legacy implementation and assets.
- Follow `PRD.md`, `DESIGN.md`, `CODEX.md`, and `BGRAFX_V2_PLAN.md`.
- One semantic responsive component tree; no separate desktop/mobile markup.
- No fabricated content, client claims, outcomes, or metrics.
- Use no more than two font families and one controlled accent colour.
- Support keyboard focus and reduced motion.
- Do not commit, deploy, or change `_Engineering` in this phase.

## Acceptance criteria

- Next.js App Router runs with strict TypeScript.
- The specimen demonstrates colour, typography, spacing, buttons, cards, imagery, and workshop detailing.
- The specimen is coherent at 360, 390, 430, 768, 1024, 1280, and 1440 CSS pixels.
- Visible controls have accessible names and focus states.
- No duplicated mobile/desktop component markup.
- Lint, typecheck, and production build pass.
- Bruce approves the visual foundation before Phase 2.

## Verification

```powershell
npm run lint
npm run typecheck
npm run build
```

Perform focused responsive visual review after engineering checks pass.

## Recommended route

Terra Medium for integrated foundation work. No delegation is needed for this tightly coupled first specimen.

## Decision or approval required

Architect approval of typography, palette, brand treatment, UI geometry, workshop-detail density, and responsive visual character.
