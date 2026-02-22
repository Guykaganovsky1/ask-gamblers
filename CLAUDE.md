# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Casino Raz — Hebrew RTL casino affiliate website targeting the Israeli market. Revenue model: CPA/rev-share affiliate deals driving casino signups.

## Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build (standalone output for Cloudways)
- `npm run start` — Run production server
- `npm run lint` — ESLint
- `npx tsc --noEmit` — Type-check without emitting

## Tech Stack

- **Next.js 16** (App Router, RSC, TypeScript)
- **Sanity v5** — Headless CMS, embedded studio at `/studio`
- **Tailwind CSS v4** — Styling via `@theme` block in `globals.css`
- **Framer Motion** — All animations
- **Fonts:** Heebo (headings), Assistant (body), Inter (numbers/English)

## Architecture

### Route Structure

All public pages live under `app/(site)/` route group which applies the shared layout (header + footer). The Sanity Studio lives outside this group at `app/studio/[[...tool]]/`.

```
app/
├── (site)/          → SiteLayout (header/footer)
│   ├── page.tsx              → Homepage (hero + featured casinos + categories + latest posts)
│   ├── casinos/page.tsx      → Casino listing
│   ├── casinos/[slug]/       → Casino review (with JSON-LD)
│   ├── blog/page.tsx         → Blog listing
│   ├── blog/[slug]/          → Blog post (Portable Text + sidebar)
│   ├── categories/page.tsx   → Categories index
│   └── categories/[slug]/    → Category detail (casinos + posts)
├── studio/[[...tool]]/       → Sanity Studio (outside site layout)
├── go/[slug]/route.ts        → Affiliate redirect with click tracking
├── api/revalidate/route.ts   → Sanity webhook for ISR revalidation
├── sitemap.ts                → Dynamic sitemap from Sanity content
└── robots.ts                 → Robots.txt (blocks /studio, /api, /go)
```

### Data Flow

Content is managed in Sanity Studio → fetched via GROQ queries → rendered with ISR (60s revalidate). On-demand revalidation via webhook at `/api/revalidate?secret=<token>`.

All GROQ queries are centralized in `sanity/lib/queries.ts`. The Sanity client is in `sanity/lib/client.ts`.

### Affiliate Links

All casino affiliate links go through `/go/[casino-slug]` which:
1. Fetches the real affiliate URL from Sanity
2. Increments click counter (fire-and-forget, requires `SANITY_WRITE_TOKEN`)
3. Redirects to the affiliate URL

All affiliate `<a>` tags use `rel="nofollow sponsored"`.

### Sanity Schemas

Defined in `sanity/schemas/`: `casino.ts`, `post.ts`, `category.ts`, `author.ts`. Schema index in `sanity/schemas/index.ts`.

### Component Organization

- `components/ui/` — Reusable primitives (Button, CasinoCard, BlogCard, CategoryCard, StarRating, AnimatedCounter, SectionHeading)
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
NEXT_PUBLIC_SITE_URL=https://casinoraz.co.il
SANITY_WRITE_TOKEN=<for click tracking>
SANITY_REVALIDATE_SECRET=<for webhook auth>
```

## Deployment

### Vercel (Recommended)
1. Connect GitHub repo to Vercel
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `NEXT_PUBLIC_SITE_URL`
3. Deploy - auto-deploys on git push

### Cloudways (Legacy)
See `.claude/skills/cloudways-deployment-skill.md` for detailed Node.js + PM2 setup.

Configured with `output: "standalone"` in `next.config.ts` for Node.js deployment.
