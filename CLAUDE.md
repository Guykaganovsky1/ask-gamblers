# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ask Gamblers — Hebrew RTL casino affiliate website targeting the Israeli market. Revenue model: CPA/rev-share affiliate deals driving casino signups. Live at `askgamblers.co.il`.

## Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Run production server locally
- `npm run lint` — ESLint
- `npx tsc --noEmit` — Type-check without emitting
- `vercel --prod` — Deploy to production (manual; see Deployment)

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
└── sitemap.ts                    → Dynamic sitemap from Sanity

public/
└── robots.txt                    → Robots.txt (blocks /studio, /api, /go)
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
```

## Deployment

Hosted on **Vercel** (project `ask-gamblers`, team `toptips-projects`). Verified 2026-09-08: production responds with `server: Vercel` / `x-vercel-id`.

- Pushing to `main` does **not** deploy. Deploy manually from the repo root:
  ```bash
  vercel --prod
  ```
- Blog/casino content is published through Sanity, not git — content changes need no deploy.
- No Cloudways, no PM2, no `deploy.sh`, no autodeploy webhook. That pipeline was retired; ignore any older docs that mention it.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **ask-gamblers** (2014 symbols, 2581 relationships, 54 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/ask-gamblers/context` | Codebase overview, check index freshness |
| `gitnexus://repo/ask-gamblers/clusters` | All functional areas |
| `gitnexus://repo/ask-gamblers/processes` | All execution flows |
| `gitnexus://repo/ask-gamblers/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
