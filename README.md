# BGrafX

The portfolio and creative-studio website of Bruce Gordon, a South African graphic designer working across branding, websites, automation, signage and production.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- CSS Modules
- Motion for interface animation
- Self-hosted Barlow Condensed and Manrope fonts
- Vercel deployment

## Local development

```bash
npm install
npm run dev -- -p 3010
```

Open `http://localhost:3010`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Project structure

- `app/` — routes, metadata and page-level styles
- `components/` — shared navigation, footer, motion and Alyssa assistant UI
- `content/` — typed portfolio and homepage content
- `public/` — production images, favicons and social-preview assets
- `PRD.md`, `DESIGN.md`, `CODEX.md` — product, visual and implementation guidance

## Deployment

The GitHub `main` branch deploys to Vercel and serves [bgrafx.co.za](https://www.bgrafx.co.za/).

## License

Copyright © Bruce Gordon. All rights reserved. The code and design are proprietary.
