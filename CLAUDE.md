# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ask Gamblers — Hebrew RTL casino affiliate website targeting the Israeli market. Revenue model: CPA/rev-share affiliate deals driving casino signups. Live at `askgamblers.co.il`.

## Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build (standalone output, copies static assets into `.next/standalone/`)
- `npm run start` — Run production server on port 3334
- `npm run lint` — ESLint
- `npx tsc --noEmit` — Type-check without emitting
- `npm run prod:start` — Start via PM2 on Cloudways
- `npm run prod:reload` — Reload PM2 process (zero-downtime)
- `npm run prod:logs` — Tail PM2 logs

## Tech Stack

- **Next.js 16** (App Router, RSC, TypeScript)
- **Sanity v4** — Headless CMS, embedded studio at `/studio` (config: `sanity.config.ts`)
- **Tailwind CSS v4** — Styling via `@theme` block in `app/globals.css`
- **Framer Motion** — All animations (client components only)
- **Fonts:** Heebo (headings), Assistant (body), Inter (numbers/English)

## Architecture

### Route Structure

All public pages live under `app/(site)/` route group (shared Header + Footer + WhatsAppButton). Sanity Studio lives outside at `app/studio/[[...tool]]/`.

```
app/(site)/
├── page.tsx                      → Homepage
├── casinos/page.tsx              → Casino listing
├── casinos/[slug]/page.tsx       → Casino review (JSON-LD)
├── blog/page.tsx                 → Blog listing
├── blog/[slug]/page.tsx          → Blog post (Portable Text)
├── bonuses/page.tsx              → Bonuses listing
├── games/page.tsx                → Games listing
├── news/page.tsx                 → News listing
├── programs/page.tsx             → Programs listing
├── search/page.tsx               → Search
├── softwares/page.tsx            → Software providers listing
├── softwares/[slug]/page.tsx     → Software provider detail
└── comparisons/[comparison]/     → Casino comparisons

app/
├── studio/[[...tool]]/           → Sanity Studio (outside site layout)
├── go/[slug]/route.ts            → Affiliate redirect with click tracking
├── api/revalidate/route.ts       → Sanity webhook for ISR revalidation
├── api/autodeploy/route.ts       → Webhook endpoint for CI/CD deploy trigger
├── sitemap.ts                    → Dynamic sitemap from Sanity
└── robots.ts                     → Robots.txt (blocks /studio, /api, /go)
```

### Data Flow

Content is managed in Sanity Studio → fetched via GROQ queries → rendered with ISR (60s revalidate). On-demand revalidation via webhook at `/api/revalidate?secret=<token>` — dispatches `revalidatePath()` based on document `_type`.

Key files:
- `sanity/lib/queries.ts` — All GROQ queries (centralized)
- `sanity/lib/client.ts` — Sanity client (CDN-enabled read client)
- `sanity/lib/types.ts` — TypeScript interfaces for all Sanity documents
- `sanity/lib/image.ts` — Sanity image URL builder
- `lib/json-ld.ts` — Structured data (JSON-LD) generators
- `lib/seo.ts` / `lib/seo-integration.ts` — SEO metadata helpers
- `lib/animations.ts` — Shared Framer Motion animation configs

### Affiliate Links

All casino affiliate links go through `/go/[casino-slug]` which:
1. Fetches the real affiliate URL from Sanity
2. Increments click counter (fire-and-forget, requires `SANITY_WRITE_TOKEN`)
3. Redirects to the affiliate URL

All affiliate `<a>` tags must use `rel="nofollow sponsored"`.

### Sanity Schemas

Defined in `sanity/schemas/`: `casino.ts`, `post.ts`, `category.ts`, `author.ts`. Schema index in `sanity/schemas/index.ts`. There's also a `softwareProvider` type referenced in queries.

### Component Organization

- `components/ui/` — Reusable primitives (Button, CasinoCard, BlogCard, StarRating, AnimatedCounter, SectionHeading, etc.)
- `components/sections/` — Layout sections (Header, Footer, MobileMenu, Hero)

All animated components are client components (`"use client"`) using Framer Motion.

## Design System

Colors defined as CSS custom properties in `app/globals.css` via `@theme`:
- Background: `#0A0A0F`, Card: `#1A1A2E`, Gold: `#D4AF37`, Emerald: `#00E676`
- Use `text-gold`, `bg-card`, `border-border-glass`, etc. in Tailwind classes

RTL: Root `<html>` has `dir="rtl"` and `lang="he"`. Star ratings use `dir="ltr"` override.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<from sanity.io>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=https://askgamblers.co.il
SANITY_WRITE_TOKEN=<for click tracking>
SANITY_REVALIDATE_SECRET=<for webhook auth>
DEPLOY_SECRET=<for autodeploy webhook auth>
```

## Deployment

### Auto-deploy Pipeline (Current)

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) → calls `/api/autodeploy?secret=` webhook → server runs `deploy.sh` (git pull, npm ci, build, restart PM2).

### Cloudways Production

Standalone Node.js build (`output: "standalone"` in `next.config.ts`) served by PM2 on port 3334. The `deploy.sh` script handles the full deploy lifecycle on the server. PM2 config in `ecosystem.config.js`.
