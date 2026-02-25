# Audit Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all 26 issues identified in the 2026-02-24 full audit — covering branding, code bugs, Hebrew copy, SEO, and UX.

**Architecture:** Targeted file edits only — no refactoring or new abstractions. Each fix is surgical: change the minimum needed to fix the issue. This is a Next.js 16 App Router site with Tailwind v4, Sanity CMS, RTL Hebrew layout.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Sanity v5, CSS animations (Framer Motion being removed)

**Verification:** `npm run build` must pass after each phase. Visual verification via `npm run dev` for UI changes.

---

## PHASE 1 — Critical (4 tasks, ~1 hour)

---

### Task 1: Fix footer brand name "Royal Spinz" → "Ask Gamblers"

**Files:**
- Modify: `components/sections/footer.tsx` (lines 179, 199)

**Step 1: Open the file and find the two Royal Spinz strings**

Look for these two occurrences:
```tsx
// Line ~179
<Link href="/" className="font-heading text-xl font-black text-accent">
  Royal Spinz
</Link>
// Line ~199
<p className="mt-4">&copy; {new Date().getFullYear()} Royal Spinz. כל הזכויות שמורות.</p>
```

**Step 2: Replace both occurrences**

Line 179 — change brand link text:
```tsx
<Link href="/" className="font-heading text-xl font-black text-accent">
  Ask Gamblers
</Link>
```

Line 199 — change copyright:
```tsx
<p className="mt-4">&copy; {new Date().getFullYear()} Ask Gamblers. כל הזכויות שמורות.</p>
```

**Step 3: Verify**

Run: `npm run dev`
Open: `http://localhost:3000`
Check: Footer bottom — should show "Ask Gamblers" logo link and "© 2026 Ask Gamblers. כל הזכויות שמורות."

**Step 4: Commit**

```bash
git add "components/sections/footer.tsx"
git commit -m "fix: replace Royal Spinz with Ask Gamblers in footer branding"
```

---

### Task 2: Remove Framer Motion from faq-section.tsx

**Files:**
- Modify: `components/sections/faq-section.tsx`

**Background:** The project's `performance/replace-framer-motion` branch migrated animations to CSS classes defined in `app/globals.css`. The FAQ section was missed. Available CSS classes: `.animate-fade-in`, `.animate-slide-up`, `.animate-slide-up-delay-1/2/3`. The `animationDelay` style prop can handle per-item delays.

**Step 1: Remove the framer-motion import**

Remove line 3:
```tsx
import { motion } from "framer-motion";
```

**Step 2: Replace the FAQItem component**

Replace the entire `FAQItem` function (lines 34-70) with this CSS-animation version:

```tsx
function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="animate-fade-in border border-border-glass rounded-xl overflow-hidden bg-card-light/30"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-right hover:bg-card-light/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-bold text-text-primary pr-4">{item.question}</span>
        <span
          className="text-accent flex-shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0 }}
      >
        <p className="px-5 pb-5 text-text-secondary leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}
```

**Step 3: Verify Framer Motion is no longer imported**

Run:
```bash
grep -n "framer-motion" "components/sections/faq-section.tsx"
```
Expected: no output (zero matches)

**Step 4: Verify FAQ works visually**

Run: `npm run dev`
Open: `http://localhost:3000`
Scroll to FAQ section. Click each question — it should expand/collapse with smooth transition.

**Step 5: Commit**

```bash
git add "components/sections/faq-section.tsx"
git commit -m "perf: replace Framer Motion with CSS animations in FAQSection"
```

---

### Task 3: Fix hardcoded fake ratings in footer casino cards

**Files:**
- Modify: `components/sections/footer.tsx` (lines ~122-148)

**Background:** The footer fetches real casino data from Sanity (including `rating` field), but displays hardcoded 4 stars and "4.0/5" text. Fix: use `casino.rating` dynamically.

**Step 1: Find the hardcoded stars and rating badge**

Lines ~140-148 currently:
```tsx
{Array.from({ length: 5 }).map((_, idx) => (
  <span key={idx} className={idx < 4 ? 'text-lg' : 'text-lg'}>
    {idx < 4 ? '★' : '☆'}
  </span>
))}
<span className="text-xs font-bold text-accent">4.0/5</span>
```

**Step 2: Replace with dynamic rating**

```tsx
{Array.from({ length: 5 }).map((_, idx) => (
  <span key={idx} className="text-lg">
    {idx < Math.round(casino.rating) ? '★' : '☆'}
  </span>
))}
<span className="text-xs font-bold text-accent">{casino.rating?.toFixed(1)}/5</span>
```

**Step 3: Verify**

Run: `npm run dev`
Open: `http://localhost:3000`, scroll to footer casino cards.
Stars and rating numbers should reflect actual Sanity data (will vary per casino if data differs).

**Step 4: Commit**

```bash
git add "components/sections/footer.tsx"
git commit -m "fix: use real casino.rating in footer cards instead of hardcoded 4.0/5"
```

---

### Task 4: Remove fake pagination from News page

**Files:**
- Modify: `app/(site)/news/page.tsx` (lines ~127-138)

**Background:** The pagination buttons 1/2/3 do nothing. Since there's no real pagination system, remove them rather than leave dead UI. If/when real pagination is needed, it should be implemented properly.

**Step 1: Delete the pagination block**

Remove lines ~127-138:
```tsx
{/* Pagination */}
<div className="mt-12 flex justify-center gap-2">
  <button className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent-light transition-colors">
    1
  </button>
  <button className="px-4 py-2 border border-border-glass text-text-muted hover:border-accent hover:text-accent rounded-lg transition-colors font-bold">
    2
  </button>
  <button className="px-4 py-2 border border-border-glass text-text-muted hover:border-accent hover:text-accent rounded-lg transition-colors font-bold">
    3
  </button>
</div>
```

**Step 2: Verify**

Run: `npm run dev`
Open: `http://localhost:3000/news`
The pagination row should be gone. Articles grid should show cleanly.

**Step 3: Commit**

```bash
git add "app/(site)/news/page.tsx"
git commit -m "fix: remove non-functional fake pagination from news page"
```

---

## PHASE 2 — High Priority (7 tasks, ~2 hours)

---

### Task 5: Translate English sidebar labels on News page

**Files:**
- Modify: `app/(site)/news/page.tsx` (lines ~161-165, ~228-232)

**Step 1: Find and replace English headings**

Find line ~162:
```tsx
<h3 className="font-heading text-base font-black text-text-primary">
  Recent News
</h3>
```
Replace with:
```tsx
<h3 className="font-heading text-base font-black text-text-primary">
  חדשות אחרונות
</h3>
```

Find line ~230:
```tsx
<h3 className="font-heading text-base font-black text-text-primary">
  New Casinos
</h3>
```
Replace with:
```tsx
<h3 className="font-heading text-base font-black text-text-primary">
  קזינו מובילים
</h3>
```

**Step 2: Verify**

Run: `npm run dev`
Open: `http://localhost:3000/news`
Sidebar section titles should now be in Hebrew.

**Step 3: Commit**

```bash
git add "app/(site)/news/page.tsx"
git commit -m "fix: translate English sidebar section titles to Hebrew on news page"
```

---

### Task 6: Fix SITE_URL fallback in root layout

**Files:**
- Modify: `app/layout.tsx` (line 27)

**Step 1: Update the fallback URL**

Change:
```tsx
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://phpstack-1553018-6228296.cloudwaysapps.com";
```
To:
```tsx
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";
```

**Step 2: Verify**

Run:
```bash
grep "phpstack" "app/layout.tsx"
```
Expected: no output.

**Step 3: Commit**

```bash
git add "app/layout.tsx"
git commit -m "fix: update SITE_URL fallback from Cloudways URL to askgamblers.co.il"
```

---

### Task 7: Fix dead "בדוק עכשיו" CTA button in footer casino cards

**Files:**
- Modify: `components/sections/footer.tsx` (line ~162)
- Note: The `footer.tsx` component is a server component. Need to import `Link` (already imported at top).

**Step 1: Verify Link is imported**

Check the top of `footer.tsx` — `import Link from "next/link"` should already exist.

**Step 2: Replace the dead button with a Link**

Find the CTA button block (~line 162):
```tsx
<div className="pt-2 border-t border-accent/10">
  <button className="w-full py-2 px-3 bg-accent/90 hover:bg-accent text-white font-bold text-sm rounded-lg transition-all duration-300 transform group-hover:scale-105 active:scale-95">
    בדוק עכשיו
  </button>
</div>
```

Replace with:
```tsx
<div className="pt-2 border-t border-accent/10">
  <Link
    href={`/go/${casino.slug.current}`}
    rel="nofollow sponsored"
    className="block w-full py-2 px-3 bg-accent/90 hover:bg-accent text-white font-bold text-sm rounded-lg transition-all duration-300 transform group-hover:scale-105 active:scale-95 text-center"
  >
    בדוק עכשיו
  </Link>
</div>
```

**Step 3: Verify**

Run: `npm run dev`
Open: `http://localhost:3000`, scroll to footer casino cards.
Click "בדוק עכשיו" — should navigate to `/go/{casino-slug}`.

**Step 4: Commit**

```bash
git add "components/sections/footer.tsx"
git commit -m "fix: replace dead button with Link in footer casino card CTA"
```

---

### Task 8: Replace hero `<a>` tags with Next.js `<Link>`

**Files:**
- Modify: `components/sections/hero.tsx` (lines 44, 50)

**Note:** `hero.tsx` is already `"use client"`. `Link` from `next/link` can be used.

**Step 1: Add Link import**

At the top of the file, after `"use client";`, add:
```tsx
import Link from "next/link";
```

**Step 2: Replace both `<a>` tags**

Replace first `<a>` tag (href="/casinos"):
```tsx
<Link
  href="/casinos"
  className="w-full sm:flex-1 text-base py-3 px-6 rounded-lg bg-accent text-background font-bold text-center hover:bg-accent/90 transition-colors"
>
  גלה את בתי הקזינו המובילים ←
</Link>
```

Replace second `<a>` tag (href="/blog"):
```tsx
<Link
  href="/blog"
  className="w-full sm:flex-1 text-base py-3 px-6 rounded-lg border border-accent text-accent font-bold text-center hover:bg-accent/10 transition-colors"
>
  קרא ביקורות מלאות
</Link>
```

**Step 3: Verify**

Run: `npm run dev`
Open: `http://localhost:3000`
Click hero CTAs — navigation should be instant (client-side), no full page reload.

**Step 4: Commit**

```bash
git add "components/sections/hero.tsx"
git commit -m "perf: replace <a> tags with Next.js Link in hero CTAs"
```

---

### Task 9: Remove non-functional newsletter form from News page

**Files:**
- Modify: `app/(site)/news/page.tsx` (lines ~289-311)

**Decision:** Remove the form rather than wire it up. Implementing a real newsletter requires an email service (Mailchimp, ConvertKit, etc.) which is out of scope. A broken form is worse than no form — it damages trust.

**Step 1: Delete the newsletter widget**

Remove the entire newsletter signup block (~lines 289-311):
```tsx
{/* Newsletter Signup */}
<div className="rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 p-6">
  <h3 className="font-heading text-lg font-black text-text-primary mb-3">
    הירשם לעדכונים
  </h3>
  <p className="text-sm text-text-muted mb-4">
    קבל חדשות קזינו חדשות ישר לתיבת הדואר שלך
  </p>
  <form className="space-y-3">
    <input
      type="email"
      placeholder="הכנס דוא״ל"
      className="w-full px-4 py-2 rounded-lg bg-background border border-border-glass text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent"
    />
    <button
      type="submit"
      className="w-full py-2 bg-accent hover:bg-accent-light text-white font-bold rounded-lg transition-colors"
    >
      הירשם
    </button>
  </form>
</div>
```

**Step 2: Verify**

Run: `npm run dev`
Open: `http://localhost:3000/news`
The sidebar should show only Recent News + Top Casinos widgets, no broken form.

**Step 3: Commit**

```bash
git add "app/(site)/news/page.tsx"
git commit -m "fix: remove non-functional newsletter form from news sidebar"
```

---

### Task 10: Remove broken SearchAction from WebSite schema

**Files:**
- Modify: `lib/seo.ts` (lines ~120-127)

**Background:** The WebSite structured data tells Google there's a search feature at `/search?q=...` but this route doesn't exist. Google may test it and mark the structured data as invalid.

**Step 1: Remove the potentialAction block**

In `generateWebSiteSchema()`, find and remove:
```tsx
potentialAction: {
  "@type": "SearchAction",
  target: {
    "@type": "EntryPoint",
    urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
  },
  "query-input": "required name=search_term_string",
},
```

The function should end with:
```tsx
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "he-IL",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
```

**Step 2: Verify**

Run:
```bash
grep -n "SearchAction\|search_term" "lib/seo.ts"
```
Expected: no output.

**Step 3: Commit**

```bash
git add "lib/seo.ts"
git commit -m "fix: remove SearchAction from WebSite schema (search route doesn't exist)"
```

---

### Task 11: Fix OG image format — SVG → PNG

**Files:**
- Create: `public/og-image.png` (1200×630 PNG)
- Modify: `app/layout.tsx` (OG images block, lines ~37-45)

**Step 1: Create an OG image**

Option A (quick): Take a screenshot of the homepage at 1200×630, save as `public/og-image.png`.

Option B (code): Use the existing `logo.svg` as inspiration. Create a simple 1200×630 dark card with the site name and tagline. This can be done with any image editor or an online tool.

The OG image should be:
- **Dimensions:** 1200×630px
- **Format:** PNG (not SVG, not WebP — Facebook requires PNG/JPEG)
- **Content:** Dark background (#0B0E14), purple accent, "Ask Gamblers" text, Hebrew tagline
- **Save to:** `public/og-image.png`

**Step 2: Update layout.tsx OG image configuration**

Find the `images` array in the `openGraph` block (~line 37):
```tsx
images: [
  {
    url: `${SITE_URL}/logo.svg`,
    width: 600,
    height: 120,
    alt: "Ask Gamblers Logo",
  },
],
```

Replace with:
```tsx
images: [
  {
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
    alt: "Ask Gamblers - המדריך המלא לקזינו באינטרנט",
  },
],
```

Also update Twitter card images (line ~52):
```tsx
images: [`${SITE_URL}/og-image.png`],
```

**Step 3: Verify image exists**

Run:
```bash
ls -la "public/og-image.png"
```
Expected: file exists with size > 0.

**Step 4: Commit**

```bash
git add "public/og-image.png" "app/layout.tsx"
git commit -m "fix: replace SVG with PNG OG image for proper social media sharing"
```

---

## PHASE 3 — Medium Priority (7 tasks, ~1.5 hours)

---

### Task 12: Fix "קזינוים" typo in footer

**Files:**
- Modify: `components/sections/footer.tsx` (line ~93)

**Step 1: Find and fix the typo**

Find:
```tsx
<p className="text-xs text-text-muted/70 mt-1 font-medium tracking-wide">קזינוים מובחרים ומדורגים</p>
```

Replace with:
```tsx
<p className="text-xs text-text-muted/70 mt-1 font-medium tracking-wide">קזינו מובחרים ומדורגים</p>
```

**Step 2: Commit**

```bash
git add "components/sections/footer.tsx"
git commit -m "fix: correct Hebrew plural 'קזינוים' → 'קזינו' in footer subtitle"
```

---

### Task 13: Improve SEO page titles for all section pages

**Files:**
- Modify: `app/(site)/bonuses/page.tsx` (line ~7)
- Modify: `app/(site)/games/page.tsx` (line ~7)
- Modify: `app/(site)/news/page.tsx` (line ~27)
- Modify: `app/(site)/blog/page.tsx` (line ~14)

**Step 1: Update bonuses page title**

Find:
```tsx
title: "בונוסים | Ask Gamblers",
```
Replace with:
```tsx
title: "בונוסים קזינו 2026 — הצעות בלעדיות, ספינים וקאשבק | Ask Gamblers",
```

**Step 2: Update games page title**

Find:
```tsx
title: "משחקים | Ask Gamblers",
```
Replace with:
```tsx
title: "משחקי קזינו אונליין 2026 — סלוטים, רולטה, בלאקג'ק | Ask Gamblers",
```

**Step 3: Update news page title**

Find:
```tsx
title: "חדשות | Ask Gamblers",
```
Replace with:
```tsx
title: "חדשות קזינו ישראל 2026 — עדכונים שוטפים | Ask Gamblers",
```

**Step 4: Update blog page title**

Find:
```tsx
title: "בלוג | Ask Gamblers",
```
Replace with:
```tsx
title: "בלוג קזינו ישראל — מדריכים, טיפים ואסטרטגיות 2026 | Ask Gamblers",
```

**Step 5: Verify**

Run: `npm run build` — should complete without errors.

**Step 6: Commit**

```bash
git add "app/(site)/bonuses/page.tsx" "app/(site)/games/page.tsx" "app/(site)/news/page.tsx" "app/(site)/blog/page.tsx"
git commit -m "seo: improve page titles with year, keywords, and better descriptions"
```

---

### Task 14: Remove duplicate preload tag

**Files:**
- Modify: `app/(site)/layout.tsx` (lines 8-10)

**Background:** `<link rel="preload" href="/images/hero-bg.webp">` appears in BOTH `app/layout.tsx` (root, correct location) AND `app/(site)/layout.tsx`. The site layout version creates duplicate preload. Remove from site layout only.

**Step 1: Remove the `<head>` block entirely from SiteLayout**

In `app/(site)/layout.tsx`, remove:
```tsx
<head>
  <link rel="preload" as="image" href="/images/hero-bg.webp" />
</head>
```

The file should become:
```tsx
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { BackToTop } from "@/components/sections/back-to-top";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
```

**Step 2: Verify root layout still has the preload**

Run:
```bash
grep "hero-bg" "app/layout.tsx"
```
Expected: one match (the preload in root layout).

**Step 3: Commit**

```bash
git add "app/(site)/layout.tsx"
git commit -m "fix: remove duplicate preload tag and invalid <head> from SiteLayout"
```

---

### Task 15: Apply seoTitle/seoDescription from Sanity in blog post pages

**Files:**
- Find first: `app/(site)/blog/[slug]/page.tsx` (this file should exist — read it first)

**Step 1: Read the blog post page**

```bash
cat "app/(site)/blog/[slug]/page.tsx"
```

**Step 2: Find the generateMetadata function**

Look for `export async function generateMetadata`. If it exists, check whether it uses `seoTitle` and `seoDescription` from the Sanity query result.

**Step 3: Update generateMetadata to use Sanity SEO fields**

The `POST_BY_SLUG_QUERY` already fetches `seoTitle` and `seoDescription`. In `generateMetadata`:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<BlogPost>(POST_BY_SLUG_QUERY, { slug });
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || "";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

  return {
    title: `${title} | Ask Gamblers`,
    description,
    alternates: { canonical: `${baseUrl}/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/blog/${slug}`,
    },
  };
}
```

**Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

**Step 5: Commit**

```bash
git add "app/(site)/blog/[slug]/page.tsx"
git commit -m "seo: use Sanity seoTitle and seoDescription in blog post metadata"
```

---

### Task 16: Remove fake social sameAs links from Organization schema

**Files:**
- Modify: `lib/seo.ts` (lines ~93-98)

**Step 1: Remove the sameAs array from generateOrganizationSchema**

Find:
```tsx
sameAs: [
  "https://www.facebook.com/askgamblersil",
  "https://twitter.com/askgamblersil",
  "https://t.me/askgamblersil",
  "https://www.instagram.com/askgamblersil",
],
```

Remove the entire `sameAs` property. If real social accounts exist later, this can be re-added.

**Step 2: Verify**

Run:
```bash
grep -n "sameAs\|facebook\|twitter\|telegram\|instagram" "lib/seo.ts"
```
Expected: no output.

**Step 3: Commit**

```bash
git add "lib/seo.ts"
git commit -m "fix: remove unverified social media sameAs links from Organization schema"
```

---

### Task 17: Remove unused styled-components dependency

**Files:**
- Modify: `package.json`
- Run: `npm install` to update lockfile

**Step 1: Verify styled-components is truly unused**

Run:
```bash
grep -r "styled-components\|createGlobalStyle\|css\`" --include="*.tsx" --include="*.ts" "app/" "components/" "lib/"
```
Expected: no output confirming it's unused.

**Step 2: Remove from package.json**

In `package.json`, remove from `dependencies`:
```json
"styled-components": "^6.3.9",
```

**Step 3: Update lockfile**

Run:
```bash
npm install
```

**Step 4: Verify build still works**

Run: `npm run build`
Expected: build succeeds.

**Step 5: Commit**

```bash
git add "package.json" "package-lock.json"
git commit -m "chore: remove unused styled-components dependency"
```

---

## PHASE 4 — Low Priority (5 tasks, ~30 minutes)

---

### Task 18: Improve homepage metadata title

**Files:**
- Modify: `app/layout.tsx` (lines 30, 33, 50)

**Step 1: Update all three title occurrences**

Find and replace all instances of:
```
"Ask Gamblers - המדריך המלא לקזינו באינטרנט"
```
With:
```
"Ask Gamblers - בתי קזינו מומלצים בישראל 2026 | ביקורות ובונוסים"
```

There should be 3 occurrences: `metadata.title`, `openGraph.title`, and `twitter.title`.

**Step 2: Verify**

Run:
```bash
grep -c "המדריך המלא לקזינו באינטרנט" "app/layout.tsx"
```
Expected: `0` (all replaced).

**Step 3: Commit**

```bash
git add "app/layout.tsx"
git commit -m "seo: improve homepage title with year and location keywords"
```

---

### Task 19: Fix semantic inversion "למדו להנצח" in copywriting config

**Files:**
- Modify: `config/copywriting-config.ts` (line ~136)

**Background:** "להנצח" = to be defeated (niphal form). "לנצח" = to win. This A/B test variant means the opposite of what's intended.

**Step 1: Fix the copy**

Find:
```tsx
benefit: 'למדו להנצח',
```
Replace with:
```tsx
benefit: 'למדו לנצח',
```

**Step 2: Also fix "שמנצחים" while here**

Find in the same file (line ~26):
```tsx
heading: 'טיפים שמנצחים — המדריך השלם לשחקנים ישראלים 2026',
```
Replace with:
```tsx
heading: 'טיפים מנצחים — המדריך השלם לשחקנים ישראלים 2026',
```

**Step 3: Commit**

```bash
git add "config/copywriting-config.ts"
git commit -m "fix: correct Hebrew copy errors in copywriting config - 'להנצח'→'לנצח', 'שמנצחים'→'מנצחים'"
```

---

### Task 20: Mark completed JSON-LD task in CONTEXT.md

**Files:**
- Modify: `CONTEXT.md` (line ~213)

**Step 1: Update the checklist item**

Find:
```markdown
- [ ] Update JSON-LD URLs from `casinoraz.co.il` to `askgamblers.co.il` (in `lib/seo.ts`)
```
Replace with:
```markdown
- [x] Update JSON-LD URLs from `casinoraz.co.il` to `askgamblers.co.il` (in `lib/seo.ts`)
```

**Step 2: Commit**

```bash
git add "CONTEXT.md"
git commit -m "docs: mark JSON-LD URL update as completed in CONTEXT.md"
```

---

## Final Verification

After all tasks, run the full verification:

```bash
# 1. TypeScript check
npx tsc --noEmit

# 2. Lint check
npm run lint

# 3. Production build
npm run build

# 4. Manual checks via dev server
npm run dev
```

**Manual checklist on dev server:**
- [ ] Footer shows "Ask Gamblers" (not "Royal Spinz")
- [ ] Footer casino cards show real ratings
- [ ] Footer CTA links navigate to `/go/{slug}`
- [ ] Hero CTAs navigate without page reload
- [ ] FAQ expands/collapses smoothly (no Framer Motion)
- [ ] News page: no fake pagination, no broken form
- [ ] News sidebar: Hebrew titles ("חדשות אחרונות", "קזינו מובילים")
- [ ] Footer subtitle: "קזינו מובחרים" (not "קזינוים")
- [ ] All page titles improved (check /bonuses, /games, /news, /blog)

**Final commit:**
```bash
git add .
git commit -m "chore: post-audit cleanup complete - all 22 fixes applied"
```
