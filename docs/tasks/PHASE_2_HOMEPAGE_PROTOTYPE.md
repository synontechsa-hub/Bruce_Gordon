# Phase 2 Task Brief — Homepage Prototype and Visual Lock

> Archived implementation brief. This phase is complete; current requirements live in [`../../PRD.md`](../../PRD.md) and [`../../BGRAFX_V2_PLAN.md`](../../BGRAFX_V2_PLAN.md).

## Goal

Turn the approved BGrafX design foundation into the real homepage header, hero, service preview, and featured-work treatment, ready for architect visual approval.

## In scope

- Preserve the Phase 1 specimen at `/design-system`.
- Build the production homepage header and responsive navigation.
- Build the hero with factual positioning, work/contact actions, and crafted editorial imagery.
- Build the service preview using approved disciplines.
- Build one featured-work section using clearly labelled self-initiated studies.
- Add restrained entrance motion with reduced-motion support.
- Update homepage metadata while keeping the incomplete replacement out of search indexes.

## Out of scope

- Complete experience, process, pricing, contact, and footer sections.
- Case-study routes or final project status decisions.
- Analytics, redirects, deployment, or legacy deletion.
- Claims about clients, project results, or commercial outcomes.

## Constraints and invariants

- Follow `PRD.md`, `DESIGN.md`, `CODEX.md`, and `BGRAFX_V2_PLAN.md`.
- Keep the locked Phase 1 palette, type system, geometry, and workshop balance.
- Use one semantic responsive component tree.
- Label concept work accurately.
- Keep contact actions factual and functional.
- Preserve keyboard focus, reduced-motion support, and 44 × 44 CSS-pixel touch targets.
- Do not deploy, commit, or modify `_Engineering`.

## Acceptance criteria

- The homepage communicates Bruce's identity, services, value, and contact path immediately.
- Header, hero, services, and featured work are coherent at all required breakpoints.
- Typography does not clip or cause horizontal overflow.
- Mobile navigation is keyboard-operable and closes after navigation.
- Motion is restrained and respects reduced-motion preferences.
- Lint, typecheck, build, and dependency audit pass.
- Bruce approves the homepage visual language before Phase 3.

## Verification

```powershell
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

Review at 360, 390, 430, 768, 1024, 1280, and 1440 CSS pixels.

## Recommended route

Terra High due to tightly coupled visual judgment, responsive integration, and asset handling. The current root agent performs the work because subagent delegation was not requested.

## Decision or approval required

Architect approval of the real homepage hero composition, headline hierarchy, service presentation, featured-work card treatment, and motion character.
