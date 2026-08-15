# BGrafX

The portfolio and creative-studio website of Bruce Gordon, a South African graphic designer working across branding, websites, automation, signage and production.

## Product

BGrafX showcases Bruce's graphic design, branding, websites, practical automation and production-aware work, with a protected enquiry form, WhatsApp contact and Alyssa's guided enquiry hand-off.

For the current product contract and delivery state, see [PRD.md](./PRD.md) and [BGRAFX_V2_PLAN.md](./BGRAFX_V2_PLAN.md). Historical phase briefs in `docs/tasks/` are retained as implementation records.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- CSS Modules
- Motion for interface animation
- Self-hosted Barlow Condensed and Manrope fonts
- Vercel deployment
- Resend transactional email for project enquiries
- Cloudflare Turnstile for enquiry verification

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

### Required production environment variables

| Name | Purpose | Visibility |
| --- | --- | --- |
| `RESEND_API_KEY` | Enables server-side enquiry delivery. | Server-only secret |
| `TURNSTILE_SECRET_KEY` | Enables server-side Turnstile verification. | Server-only secret |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Renders the browser Turnstile widget. | Public site key |

Do not place values in source, documentation or local shared files. Configure them in the deployment environment. The current sender address is an operational placeholder until a BGrafX mail domain is verified in Resend.

## License

Copyright © Bruce Gordon. All rights reserved. The code and design are proprietary.
