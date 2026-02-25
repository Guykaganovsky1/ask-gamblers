# Full Audit Report & Fix Plan — Ask Gamblers
**Date:** 2026-02-24
**Branch:** `performance/replace-framer-motion`
**Scope:** Code quality, Hebrew content, UX/UI, SEO, Design

---

## Audit Findings by Severity

### 🔴 CRITICAL (fix immediately)

| ID | File | Issue |
|----|------|-------|
| C1 | `components/sections/footer.tsx:179,199` | Footer shows "Royal Spinz" — wrong brand name after rebrand |
| C2 | `components/sections/faq-section.tsx:3` | Framer Motion still imported despite performance migration branch |
| C3 | `components/sections/footer.tsx:141,146` | Footer casino cards have hardcoded fake ratings (always 4★, 4.0/5) |
| C4 | `app/(site)/news/page.tsx:128-138` | Pagination buttons are fake — clicking does nothing |

### 🟠 HIGH

| ID | File | Issue |
|----|------|-------|
| H1 | `app/(site)/news/page.tsx:162,230` | "Recent News" and "New Casinos" sidebar titles in English on Hebrew site |
| H2 | `app/layout.tsx:27` | SITE_URL fallback exposes raw Cloudways URL to crawlers |
| H3 | `components/sections/footer.tsx:162` | Casino card CTA is a `<button>` with no navigation — dead click |
| H4 | `components/sections/hero.tsx:44,50` | Hero CTAs use `<a>` not `<Link>` — full page reload on click |
| H5 | `app/(site)/news/page.tsx:297-309` | Newsletter form has no onSubmit handler — silently does nothing |
| H6 | `lib/seo.ts:122` | WebSite SearchAction points to `/search` which doesn't exist |
| H7 | `app/layout.tsx:39` | OG image is SVG format — won't render on Facebook/Twitter/LinkedIn |

### 🟡 MEDIUM

| ID | File | Issue |
|----|------|-------|
| M1 | `components/sections/footer.tsx:93` | "קזינוים" — incorrect Hebrew plural for "casino" |
| M2 | `components/sections/hero.tsx:48` | Arrow direction `←` in RTL context — verify intent |
| M3 | Multiple pages | SEO page titles too short — missing year and keywords |
| M4 | `app/(site)/news/page.tsx:15-22` | Fake deterministic view counts — deceptive social proof |
| M5 | `app/layout.tsx:64` + `app/(site)/layout.tsx:9` | `preload` tag duplicated in two layouts |
| M6 | `sanity/lib/queries.ts:88-89` | `seoTitle`/`seoDescription` fetched but never applied to metadata |
| M7 | `lib/seo.ts:93-98` | Fake social media `sameAs` links — accounts likely don't exist |
| M8 | `package.json:23` | `styled-components` is an unused dependency |
| M9 | `app/(site)/layout.tsx:9` | `<head>` element in layout body — invalid HTML |

### 🔵 LOW

| ID | File | Issue |
|----|------|-------|
| L1 | `app/layout.tsx:30` | Homepage title generic — add year and "ישראל" keyword |
| L2 | `CONTEXT.md:213` | JSON-LD URL update marked pending but already done |
| L3 | `components/sections/footer.tsx:134` | `casino.icon` always renders 🎰 (field not in GROQ query) |
| L4 | `config/copywriting-config.ts:26` | "שמנצחים" sounds odd — prefer "מנצחים" |
| L5 | `config/copywriting-config.ts:136` | "למדו להנצח" means "learn to LOSE" — semantic inversion, wrong meaning |
| L6 | `config/copywriting-config.ts:55` | "50+ מאמרים" hardcoded, not dynamic from Sanity |

---

## Summary

| Area | Critical | High | Medium | Low | Total |
|------|----------|------|--------|-----|-------|
| Branding | 1 | — | — | — | 1 |
| Code/Bugs | 3 | 3 | 3 | 1 | 10 |
| Hebrew content | — | 1 | 2 | 3 | 6 |
| SEO | — | 3 | 3 | 1 | 7 |
| UX/UI | — | — | 1 | — | 1 |
| **Total** | **4** | **7** | **9** | **6** | **26** |

---

## Fix Implementation Plan

### Phase 1 — Critical (deploy immediately, ~1-2 hours)

1. **C1** Fix footer brand name: "Royal Spinz" → "Ask Gamblers"
2. **C2** Remove Framer Motion from `faq-section.tsx`, replace with CSS animations pattern from `globals.css`
3. **C3** Wire footer casino cards to use real `casino.rating` from Sanity data
4. **C4** Remove fake pagination or implement real pagination with `slice()` and state

### Phase 2 — High priority (~2-3 hours)

5. **H1** Translate "Recent News" → "חדשות אחרונות", "New Casinos" → "קזינו חדשים"
6. **H2** Change `layout.tsx` SITE_URL fallback to `"https://askgamblers.co.il"`
7. **H3** Replace footer `<button>` CTA with `<Link href={/go/${slug.current}} rel="nofollow sponsored">`
8. **H4** Replace hero `<a>` tags with Next.js `<Link>`
9. **H5** Remove newsletter form or add proper submit handler + API route
10. **H6** Remove SearchAction from WebSite schema (no search page exists)
11. **H7** Create an OG PNG image (1200×630), update metadata to use it

### Phase 3 — Medium (~2 hours)

12. **M1** Fix "קזינוים" → "קזינו" in footer subtitle
13. **M3** Improve all page `<title>` tags with year and keywords
14. **M5** Remove duplicate `preload` from `app/(site)/layout.tsx`
15. **M6** Use `seoTitle`/`seoDescription` from Sanity in blog post `generateMetadata()`
16. **M7** Remove fake `sameAs` social links from Organization schema
17. **M8** Remove `styled-components` from `package.json`
18. **M9** Remove `<head>` from `app/(site)/layout.tsx`, move preload to root layout only

### Phase 4 — Low (~30 min)

19. **L1** Improve homepage title: add year + "ישראל"
20. **L2** Mark JSON-LD URL task as done in CONTEXT.md
21. **L4** Fix "שמנצחים" → "מנצחים" in copywriting config
22. **L5** Fix "למדו להנצח" → "למדו לנצח" in AB_TEST_VARIATIONS
