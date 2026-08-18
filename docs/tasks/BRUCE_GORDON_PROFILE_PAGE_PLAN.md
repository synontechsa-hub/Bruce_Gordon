# Bruce Gordon Profile Page Plan

## Goal

Create a dedicated professional profile page inside the BGrafX website that introduces Bruce Gordon as the person behind the work.

This page is not intended to replace the formal CV/resume. It should act as an interactive professional profile that helps clients, recruiters, collaborators, and prospective employers quickly understand Bruce's background, skills, experience, tools, projects, and working range.

The page should support both sides of the BGrafX ecosystem:

- **BGrafX** remains the studio/business-facing brand.
- **Bruce Gordon** becomes the personal professional profile behind the studio.

## Route

Recommended route:

```text
/bruce-gordon
```

The page should live inside the existing BGrafX Next.js application and use the existing design system, typography, spacing, colour palette, responsive behaviour, and reusable components wherever practical.

## Locked Hero Copy

### Name

**Bruce Gordon**

### Professional Identity

**Creator • Designer • Developer**

This wording is locked for the initial build unless Bruce explicitly changes it later.

## Page Purpose

The page should answer the following questions quickly:

1. Who is Bruce Gordon?
2. What does he do?
3. What tools and technologies does he know?
4. What is his strongest professional background?
5. What has he actually built or shipped?
6. Where can a recruiter or client see proof of his work?
7. How can someone contact or hire him?

## Important Positioning Rule

Do not make the page feel like a long CV pasted into a website.

The experience should feel closer to a professional profile / interactive resume:

- concise
- visual
- scannable
- proof-driven
- project-linked
- easy to understand for non-technical visitors

The page should show both creative and technical skills without allowing one side to bury the other.

Bruce's production, signage, CNC, print, and design background is a major differentiator and should remain prominent even as the development portfolio grows.

## Suggested Page Structure

### 1. Hero

Include:

- Bruce Gordon
- Creator • Designer • Developer
- Short professional introduction
- Optional portrait/profile image if suitable assets are available
- Primary CTA: View Work
- Secondary CTA: Download CV / Resume
- Optional contact CTA

The introductory paragraph should describe Bruce as a multidisciplinary professional combining long-term graphic design and production experience with software, web, automation, and digital product development.

Do not use exaggerated claims or vague marketing language.

### 2. About / Professional Summary

Short, human-readable summary of Bruce's career path and multidisciplinary background.

Key ideas to communicate:

- extensive graphic design experience
- signage / production / CNC background
- practical knowledge of real production workflows
- software and web development
- automation and business tooling
- ability to bridge visual design and engineering

This section should explain why projects such as KerfSuite make sense in the context of Bruce's real-world experience.

### 3. Core Disciplines

Use clear visual groups instead of one giant software/logo wall.

Suggested groups:

#### Graphic Design

Examples may include:

- CorelDRAW
- Adobe Illustrator
- Adobe Photoshop
- Figma
- layout and artwork preparation
- branding
- signage
- large-format print
- production-ready artwork

#### Development

Examples may include:

- Python
- TypeScript
- JavaScript
- Dart
- HTML
- CSS
- SQL
- C
- Rust

#### Frameworks / Platforms

Examples may include:

- React
- Next.js
- Flutter
- FastAPI
- PyQt6
- Tauri
- Supabase
- Redis
- SQLAlchemy / SQLModel

#### Production / Manufacturing

Examples may include:

- CNC workflows
- signage production
- large-format print workflows
- production artwork
- manufacturing process understanding

#### Development / Deployment Tools

Examples may include:

- Git
- GitHub
- Vercel
- VS Code
- Android Studio
- relevant deployment and development tooling already used in production projects

Do not list tools simply to make the page appear larger. Every listed skill should be defensible.

## Skill Proficiency

Do not visually imply equal mastery of every technology.

Use a simple credibility-first system such as:

- **Primary**
- **Working Knowledge**
- **Familiar**

Avoid fake percentage bars such as "Python 95%" or "React 80%".

The final categorisation should be reviewed with Bruce before publishing.

## 4. Selected Projects / Proof of Work

This is one of the most important sections of the page.

Each project card should show:

- project name
- short description
- technology stack
- Bruce's role
- project image / screenshot where available
- relevant link: live site, case study, repository, download, or portfolio entry

Initial projects to consider:

### KerfSuite

Business / manufacturing software suite demonstrating domain knowledge, UI/UX, application development, and production workflow understanding.

### MKVoodoo

Desktop media utility demonstrating Flutter, Python, FFmpeg, application packaging, and product development.

### BGrafX

The current website itself, demonstrating design, frontend development, branding, and production deployment.

### BGrafX Font Converter

Once built, browser-based design utility demonstrating React / TypeScript and local browser processing.

### Streets of Jozi

When sufficiently developed to show publicly, game-development project demonstrating systems design, gameplay programming, AI, camera systems, traffic systems, and creative direction.

Only include projects that are presentable at the time the profile page ships.

## 5. Experience Timeline

Create a concise professional timeline rather than reproducing every CV bullet.

Each entry should contain:

- company / professional context
- role
- dates where appropriate
- short summary of responsibility and impact

The long-term Alania Building Systems experience should be represented clearly because it explains Bruce's depth in design, signage, CNC, and production.

Freelance / BGrafX / Synontech work may be represented separately if appropriate.

## 6. Education / Learning

Include only relevant learning and credentials.

Potential items:

- CS50x
- CS50P progress / completion status as accurate at publication time
- other relevant programming or professional training

Do not present incomplete coursework as completed certification.

## 7. CV / Resume

Include a clear CV / Resume CTA near the bottom and potentially in the hero.

Possible actions:

- Download CV (PDF)
- View CV

The formal CV remains the ATS / recruiter document. The profile page should complement it rather than replace it.

## 8. Contact / External Profiles

Include relevant professional destinations such as:

- LinkedIn
- GitHub
- Behance
- BGrafX contact route / form
- email CTA if already supported by the site

Use existing BGrafX contact patterns where possible.

## Navigation Integration

The profile should be easy to reach without turning the entire BGrafX site into a personal website.

Possible navigation labels:

- About Bruce
- Bruce Gordon
- About

Recommended initial label: **About Bruce** or **Bruce Gordon**.

The final navigation label should be selected based on how crowded the current navigation is.

BGrafX must remain the primary studio identity.

## Visual Direction

The page should inherit the existing BGrafX visual identity.

Use:

- existing typography
- existing BGrafX colour system
- existing layout rhythm
- existing components where suitable
- subtle urban / spray-paint character where it supports the page

The personal page can be slightly more editorial and biographical than the service pages, but it must still feel like part of the same site.

Avoid turning the page into a dense dashboard of technology logos.

## Responsive Behaviour

The page must work cleanly on:

- desktop
- laptop
- tablet
- mobile

Skill groups and project cards should collapse gracefully without creating horizontal scrolling or tiny unreadable badges.

## Accessibility

Minimum requirements:

- semantic heading hierarchy
- keyboard-accessible interactive elements
- meaningful link labels
- sufficient contrast
- alt text for meaningful imagery
- no critical information conveyed by colour alone
- visible focus states

## SEO / Metadata

Add page-specific metadata targeting Bruce's professional identity without keyword stuffing.

Suggested title direction:

```text
Bruce Gordon | Creator, Designer & Developer | BGrafX
```

Suggested description direction:

```text
Professional profile of Bruce Gordon, a multidisciplinary creator, graphic designer and developer with experience across design, production, CNC, web, software and automation.
```

Final metadata should match the final published content.

Add the route to the sitemap where appropriate.

## Content Accuracy Rule

All skills, experience, dates, qualifications, project status, and proficiency labels must be accurate at publication time.

Codex should not invent:

- employment dates
- certifications
- proficiency levels
- client names
- project metrics
- technologies not present in the project
- awards
- qualifications

If data is missing, use placeholders in implementation or leave the item out until Bruce supplies it.

## Suggested Component Structure

Exact filenames may be adapted to the existing repo structure, but the build should remain modular.

Possible structure:

```text
app/
└── bruce-gordon/
    ├── page.tsx
    └── bruce-gordon.module.css

components/
└── profile/
    ├── ProfileHero.tsx
    ├── ProfileSummary.tsx
    ├── SkillGroups.tsx
    ├── ProjectProof.tsx
    ├── ExperienceTimeline.tsx
    ├── EducationSection.tsx
    └── ProfileContact.tsx
```

Prefer existing shared BGrafX components when they already solve the same problem.

Do not duplicate site-wide components unnecessarily.

## Implementation Phases

### Phase 1: Content Audit

Before building UI:

- inspect existing BGrafX content and design system
- inspect available portfolio/project data
- confirm available CV content
- confirm current external profile URLs
- identify reusable components
- identify missing content that requires Bruce's input

### Phase 2: Page Shell

- create `/bruce-gordon`
- implement metadata
- build hero
- implement responsive page layout
- reuse existing BGrafX header/footer/navigation

### Phase 3: Skills and Profile Content

- implement professional summary
- implement grouped skill presentation
- add proficiency labels only after confirmed
- implement production / CNC background prominently

### Phase 4: Proof of Work

- add selected project cards
- connect live URLs / case studies / repositories where appropriate
- verify every stack label against the actual project

### Phase 5: Career Information

- add concise experience timeline
- add education / learning section
- add CV CTA
- add professional contact links

### Phase 6: Site Integration

- add navigation entry
- add sitemap route
- ensure homepage or footer can link to the profile where appropriate
- verify no existing navigation or responsive layout regressions

### Phase 7: QA

Run:

```text
npm run lint
npm run typecheck
npm run build
```

Also manually verify:

- desktop layout
- mobile layout
- links
- keyboard navigation
- responsive cards
- project links
- CV link
- external profile links
- metadata
- no console errors

## Definition of Done

The Bruce Gordon profile page is complete when:

1. `/bruce-gordon` exists and matches BGrafX visually.
2. The hero displays **Bruce Gordon** and **Creator • Designer • Developer**.
3. Visitors can quickly understand Bruce's design, production, and development background.
4. Skills are grouped clearly and do not imply false proficiency.
5. Real projects provide evidence of the technologies and capabilities listed.
6. Relevant experience and education are represented accurately.
7. A formal CV / Resume is accessible through a clear CTA when the file is available.
8. Relevant professional/contact links work.
9. The route is integrated cleanly into site navigation and sitemap.
10. The page is responsive and accessible.
11. `npm run lint`, `npm run typecheck`, and `npm run build` all pass.

## Scope Control

Codex should implement the documented profile page and avoid unnecessary expansion.

Do not:

- redesign the entire BGrafX website
- replace existing branding
- invent new portfolio projects
- add social feeds
- add authentication
- create a CMS unless separately requested
- add databases or APIs without a demonstrated need
- create skill percentage meters

The objective is a polished, factual, personal professional profile within BGrafX, not a second website inside the website.
