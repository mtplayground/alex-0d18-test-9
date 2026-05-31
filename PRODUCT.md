# Agent Team for Founders

Agent Team for Founders is a static Next.js landing page for a founder-focused software delivery offering. The page presents the headline "Agent Team for Founders", the tagline "You just talk, we handle the rest", value propositions, a four-step delivery flow, final CTA, and footer.

## Current Product

- Single-page marketing site built with Next.js 15 App Router, React 19, and TypeScript strict mode.
- Responsive landing page composed from `Header`, `Hero`, `Pitch`, `HowItWorks`, `CTA`, and `Footer` section components.
- Primary CTA links come from `NEXT_PUBLIC_CTA_URL`; site metadata URLs come from `NEXT_PUBLIC_SITE_URL`.
- SEO support includes Next Metadata API fields, Open Graph/Twitter metadata, dynamic 1200x630 Open Graph PNG generation, sitemap, robots, and Organization JSON-LD.
- Accessibility pass includes semantic `header`, `main`, and `footer` landmarks, a skip link, visible focus styling, verified heading hierarchy, and responsive checks at 320, 768, 1280, and 1920px.

## Architecture

- App entry points live in `app/`; reusable UI lives in `components/`; environment parsing lives in `lib/env.ts`.
- Styling uses Tailwind CSS with CSS custom properties in `app/globals.css`, Inter via `next/font`, and the shadcn/ui-style `Button` primitive.
- The app is configured for static export with `output: "export"` and unoptimized images in `next.config.mjs`.
- Static export output is generated into `out/`; generated build and test artifacts are ignored.

## Verification

- `npm run lint` runs ESLint with Next.js, TypeScript, and Tailwind rules.
- `npm test` runs Vitest + React Testing Library unit tests for landing sections.
- `npm run test:e2e` runs Playwright smoke, accessibility, focus, and responsive checks against the dev server on port 8080.
- `npm run verify:export` runs `next build`, serves `out/` locally, and verifies the homepage, 404 page, sitemap, robots, and Open Graph image.

## Conventions

- Required public environment variables are documented in `.env.example`.
- Development server commands bind to `0.0.0.0:8080`.
- Product-facing brand text is `Agent Team for Founders`; do not replace it with agent names or placeholders.
