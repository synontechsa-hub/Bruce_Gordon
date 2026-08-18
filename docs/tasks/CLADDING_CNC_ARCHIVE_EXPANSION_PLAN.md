# BGrafX Cladding / CNC Archive Expansion Plan

## Status

Planning and evidence-gathering stage.

Do **not** treat the current project list or proposed case-study list as final. Additional projects, photographs, historical information, and case-study material still need to be recovered from Bruce's records, Behance, memory, and publicly available Alania Building Systems material.

## Goal

Expand the existing BGrafX `/cladding` career archive so it communicates the real breadth and depth of Bruce Gordon's architectural cladding, signage, CNC, production, and fabrication experience.

The existing page currently provides a strong high-level introduction but only represents a small selection of the work. The upgraded section should operate on two levels:

1. **Large project archive / visual showcase** for the broader body of work.
2. **Detailed case studies** for a smaller number of projects where enough accurate material exists to document Bruce's personal contribution properly.

The goal is not to make BGrafX appear to have been the principal cladding contractor. Attribution to Alania Building Systems and other relevant parties must remain clear and accurate.

---

## Existing Route

```text
/cladding
```

The current route should remain the main landing page for this part of Bruce's career.

The existing positioning around architectural scale, production experience, CNC preparation, fabrication coordination, and Alania attribution should be preserved unless deliberately revised during implementation.

---

# Content Model

## Level 1: Project Archive / Slideshow

The archive should contain substantially more projects than the current five-project selection.

A project does **not** need a full case study to appear in the archive.

Each archive entry should ideally contain:

- Project / building name
- Location
- Strong project photograph
- Image alt text
- Short factual description
- Relevant disciplines, where known
- Approximate date / period, where known and verified
- Optional case-study link when a detailed case study exists

Potential disciplines include:

- Architectural cladding
- CNC routing
- CNC programming / preparation
- Production artwork
- Fabrication
- Aluminium / ACM work
- Dimensional signage
- Illuminated signage
- Production coordination
- Technical detailing

Only list disciplines that can be supported accurately for that project.

## Level 2: Featured Case Studies

Only selected projects should receive full case studies.

A project should qualify for a case study when enough evidence exists to describe Bruce's role accurately and provide meaningful technical/process detail.

A case study should not exist merely because the building is prestigious.

Good case-study candidates are projects where we can explain:

- What the project required
- What Bruce personally did
- The technical or production problem
- The design / drawing / preparation process
- Materials involved
- CNC work involved
- Fabrication considerations
- Production constraints
- Problems encountered
- Solutions developed
- Coordination with other teams where relevant
- Final result
- Lessons or significance of the project

Where appropriate, include drawings, detail photographs, production imagery, CNC-related material, fabrication photographs, and finished-building photography.

---

# Current Archive Expansion Candidates

The following projects have been identified for inclusion in the broader archive, subject to obtaining suitable photographs and verifying factual information:

- 2 Alice Lane
- Steve Biko Hospital
- Sasol Headquarters, Sandton
- Telesure Johannesburg
- Telesure Cape Town
- Waterfall Ellipse
- Gateway West

These are **not** the complete archive.

Additional buildings are expected to be identified during research.

The current BGrafX cladding projects should remain under consideration as part of the expanded archive as well.

---

# Case Study Candidates

The projects listed above are potential sources for deeper coverage, but the final case-study selection is intentionally **not locked yet**.

Do not automatically create a case study for every listed building.

Final selection should happen after reviewing:

- Bruce's existing Behance case studies
- Available photographs
- Existing drawings / artwork if available
- Bruce's recollection of his responsibilities
- Alania project material
- Technical detail available for each project
- Whether Bruce's contribution can be described precisely and credibly

Telesure Johannesburg and Telesure Cape Town should initially be treated as separate projects. They may later become either separate case studies or a combined Telesure case study if the available material makes that structure stronger.

---

# Research / Evidence Gathering

Before implementation, collect material from the following sources.

## Bruce's Behance

Existing Behance case studies are especially important because they may already contain detailed historical write-ups created closer to the time of the work.

Recover where possible:

- Existing project descriptions
- Bruce's stated role
- Process explanations
- Technical details
- Project photographs
- Production photographs
- Drawings / diagrams
- Material specifications
- Problems and solutions

Do not blindly copy old copy into BGrafX. Treat it as source material to verify, edit, and restructure for the new case-study format.

## Bruce's Personal Records

Look for:

- photographs
- archived artwork
- CorelDRAW files
- Illustrator files
- CNC files
- technical drawings
- PDFs
- presentation documents
- old portfolio material

## Bruce's Memory

Bruce's recollection is important for understanding his exact role and the practical production process.

Capture specific details while they are remembered, especially unusual technical problems or manufacturing decisions.

## Alania Building Systems

Review relevant public material from Alania's:

- website
- Instagram
- other official project archives

This material can help identify projects, locations, finished-building imagery, project names, and broader context.

Do not claim Alania-owned imagery or text as BGrafX material without considering usage rights.

Do not copy Alania descriptions verbatim.

---

# Attribution Rules

This is critical.

BGrafX must distinguish between:

- The project itself
- Work delivered by Alania Building Systems / the wider project team
- Bruce Gordon's personal responsibilities and contribution

Avoid language implying that Bruce or BGrafX independently delivered entire architectural projects unless that is factually true.

Preferred case-study language should be specific, for example:

- "Bruce was responsible for..."
- "Bruce prepared..."
- "Bruce developed the CNC..."
- "Bruce worked on..."
- "As part of the Alania team..."

Avoid vague ownership claims such as:

- "We built..."
- "BGrafX delivered..."
- "Bruce completed the entire facade..."

unless evidence supports the statement.

---

# Proposed Information Architecture

```text
/cladding
│
├── Career introduction
├── Capabilities / production background
├── Expanded project archive / slideshow
├── Featured case studies
├── Alania attribution
└── Links into Bruce Gordon profile / related work

/cladding/[project-slug]
└── Detailed project case study
```

Example future routes only:

```text
/cladding/2-alice-lane
/cladding/steve-biko-hospital
/cladding/sasol-headquarters
/cladding/telesure-johannesburg
/cladding/telesure-cape-town
/cladding/waterfall-ellipse
/cladding/gateway-west
```

Do not create all of these routes until the final case-study selection has been approved.

---

# Archive / Slideshow Direction

The archive should communicate **scale and breadth** without forcing visitors to read a long page of full project descriptions.

Potential presentation approaches include:

- large horizontal project carousel
- controlled slideshow
- image-led project grid with progressive disclosure
- combination of featured projects and a broader gallery

The exact interaction should be chosen after reviewing the amount and quality of imagery collected.

Requirements regardless of final presentation:

- responsive
- keyboard accessible
- touch friendly
- meaningful image alt text
- no inaccessible auto-advancing carousel
- project name visible
- location visible where known
- case-study projects clearly identifiable
- images optimized through the existing Next.js image pipeline where practical

If autoplay is used at all, users must be able to pause it and reduced-motion preferences must be respected. A manually controlled experience is preferred.

---

# Case Study Template

Once the source material is collected, create **one reusable master case-study system** rather than designing every project independently.

Suggested case-study structure:

## Hero

- Project name
- Location
- Project period / year if verified
- Hero photograph
- Short project summary

## Project Context

Explain the architectural / production requirement and broader project context.

## Bruce's Role

A clearly labelled section describing Bruce's actual responsibilities.

This section is mandatory.

## Challenge

Describe the technical, design, fabrication, CNC, or production problem.

## Process

Show how the work moved from design / drawings through preparation and production.

Possible subsections:

- artwork / CAD preparation
- material planning
- CNC preparation
- routing / cutting
- fabrication
- signage
- installation coordination

Only include stages that actually occurred and for which Bruce's involvement is known.

## Technical Details

Where known:

- materials
- thicknesses
- finishes
- machinery
- tooling
- CNC considerations
- tolerances
- dimensions
- file preparation

Do not invent missing technical specifications.

## Problem Solving

Highlight unusual constraints and how they were addressed.

This is especially valuable because it demonstrates expertise better than a simple finished-project photograph.

## Gallery

Include a mixture of available:

- completed project imagery
- details
- production imagery
- drawings
- work-in-progress material

## Outcome

Describe the finished result factually.

Avoid unsupported commercial claims or invented performance metrics.

## Attribution

Clearly state the relationship to Alania Building Systems and any relevant project context.

---

# Data Model Expansion

The existing `CladdingProject` model is currently intentionally simple.

The expanded archive will likely require fields similar to:

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

Detailed case-study content should probably use a separate structure rather than bloating every archive entry.

Exact types should be designed once the first complete case study has been assembled.

Do not prematurely create a complicated CMS or database for this content.

Static typed content is sufficient unless the amount of material later demonstrates a real need for something else.

---

# Relationship to Bruce Gordon Profile

The upcoming `/bruce-gordon` professional profile should link into this archive as proof of Bruce's production / CNC / signage experience.

The profile should not duplicate entire case studies.

Instead:

```text
Bruce Gordon profile
    ↓
Production / CNC experience
    ↓
View architectural & CNC career archive
    ↓
/cladding
    ↓
Detailed case studies
```

This makes the cladding archive evidence supporting the broader **Creator • Designer • Developer** positioning.

---

# SEO / Sitemap / Robots

When new public case-study routes are created:

- add them to the site's sitemap
- confirm they are indexable
- update metadata per project
- use canonical URLs
- use meaningful page titles and descriptions
- ensure robots configuration does not accidentally block the new section

The existing `/cladding` route should remain indexed.

Do not add unfinished / placeholder case-study routes to the sitemap.

---

# Implementation Phases

## Phase 1: Project Inventory

- Build a larger list of known projects.
- Identify project locations.
- Locate suitable images.
- Record source / ownership of each image.
- Record known disciplines for each project.
- Identify which facts still require verification.

## Phase 2: Evidence Recovery

- Review Behance case studies.
- Review personal archives.
- Review Alania's official public archives.
- Capture Bruce's recollections.
- Separate verified facts from uncertain memories.

## Phase 3: Archive Expansion

- Expand the typed project data.
- Add optimized project imagery.
- Upgrade `/cladding` to support the larger archive.
- Implement the selected slideshow / gallery interaction.
- Preserve existing attribution and accessibility standards.

## Phase 4: First Master Case Study

- Select the strongest evidence-rich project.
- Build one complete case study.
- Establish the reusable case-study component system.
- Review factual accuracy and attribution.
- Review visual hierarchy.

Do **not** mass-produce the remaining case studies until the first template is approved.

## Phase 5: Additional Case Studies

- Apply the approved template to selected projects.
- Adapt sections only where the project genuinely requires it.
- Do not force identical content where information does not exist.

## Phase 6: Cross-Linking

- Link case studies from `/cladding`.
- Link the archive from `/bruce-gordon`.
- Link relevant projects from other portfolio areas where appropriate.

## Phase 7: SEO / QA

For each completed public route:

- metadata
- canonical URL
- sitemap entry
- robots/indexability check
- responsive test
- accessibility test
- image optimization check
- broken-link check

Then run:

```text
npm run lint
npm run typecheck
npm run build
```

---

# Definition of Done

The CNC / cladding expansion is complete when:

1. `/cladding` represents a substantially broader selection of Bruce's architectural / CNC career work.
2. The larger archive is visually easy to browse.
3. Every project shown has a verified name, suitable image, and factual short description.
4. A selected subset of projects has detailed case studies.
5. Every case study clearly identifies Bruce's actual contribution.
6. Attribution to Alania and other relevant parties is accurate.
7. No technical specifications, responsibilities, dates, or project outcomes have been invented.
8. Case studies share a consistent reusable structure.
9. The Bruce Gordon profile links naturally into the production archive.
10. New public routes have correct metadata and sitemap entries.
11. The section works on desktop and mobile and meets accessibility requirements.
12. `npm run lint`, `npm run typecheck`, and `npm run build` pass.

---

# Scope Control for Codex

Until the evidence-gathering phase is complete, Codex should **not** attempt to invent or independently fill missing project information.

Do not:

- create case studies for every project automatically
- invent Bruce's role
- invent dates
- invent materials
- invent dimensions
- invent machinery used
- invent project outcomes
- scrape and republish third-party text
- redesign the entire BGrafX site
- build a CMS without explicit approval
- remove the existing Alania attribution

When information is missing, mark it for confirmation or omit it.

The guiding principle is:

> **Breadth in the archive. Depth only where the evidence supports it.**
