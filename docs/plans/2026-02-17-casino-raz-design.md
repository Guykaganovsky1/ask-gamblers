# Ask Gamblers — Design Document

Casino affiliate website targeting the Israeli market (Hebrew, RTL) focused on driving signups via CPA/rev-share affiliate deals.

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript, React Server Components)
- **CMS:** Sanity v3 (embedded studio at `/studio`)
- **Styling:** Tailwind CSS v4 + RTL plugin
- **Animations:** Framer Motion
- **Fonts:** Heebo (headings), Assistant (body), Inter (numbers/English)
- **Deployment:** Node.js standalone on Cloudways
- **Language:** Hebrew, full RTL (`dir="rtl"`)

## Project Structure

```
ask-gamblers/
├── app/
│   ├── (site)/
│   │   ├── page.tsx              # Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/page.tsx   # Blog post
│   │   ├── categories/
│   │   │   ├── page.tsx          # Categories index
│   │   │   └── [slug]/page.tsx   # Category page
│   │   ├── casinos/
│   │   │   ├── page.tsx          # Casino listing
│   │   │   └── [slug]/page.tsx   # Casino review
│   │   └── layout.tsx            # Site layout (nav/footer)
│   ├── studio/[[...index]]/      # Sanity Studio
│   ├── go/[slug]/route.ts        # Affiliate link redirect
│   └── api/revalidate/route.ts   # Sanity webhook revalidation
├── components/
│   ├── ui/                       # Base components (buttons, cards)
│   └── sections/                 # Page sections (hero, casino grid)
├── sanity/
│   ├── schemas/                  # Content type schemas
│   └── lib/                      # GROQ queries, client setup
├── lib/                          # Utilities, constants
└── public/                       # Static assets
```

## Sanity Content Schemas

- **Casino** — name, logo, rating (1-5), description, pros/cons, bonus details, affiliate link, category references
- **Blog Post** — title, slug, body (Portable Text), author, category, featured image, SEO fields
- **Category** — name, slug, description, icon
- **Author** — name, avatar, bio

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero with animated casino visuals, featured casinos grid, latest blog posts, category quick-links |
| Casino Listing | `/casinos` | Filterable/sortable grid of casino cards with ratings |
| Casino Review | `/casinos/[slug]` | Rating breakdown, pros/cons, bonus details, affiliate CTA |
| Blog Listing | `/blog` | Paginated blog posts with category filter |
| Blog Post | `/blog/[slug]` | Portable Text article, related posts, sidebar with top casinos |
| Categories Index | `/categories` | Grid of all categories with icons |
| Category Page | `/categories/[slug]` | Casinos + blog posts filtered by category |

## Visual Design

**Color palette:**
- Background: `#0A0A0F` (deep black, subtle purple undertones)
- Primary accent: `#D4AF37` (gold) — CTAs, ratings, highlights
- Secondary accent: `#00E676` (neon emerald) — success states, live indicators
- Text: `#F5F5F5` (primary), `#9CA3AF` (secondary muted)
- Cards: `#1A1A2E` with backdrop blur (glassmorphism)

**Design elements:**
- Glassmorphism cards with subtle borders and glow effects
- Gold gradient borders on featured casinos
- Subtle background patterns (card suits, chip textures at low opacity)
- Star ratings with gold fill animation on scroll

**Animations (Framer Motion):**
- Hero: floating casino chips/cards with parallax, staggered headline reveal
- Casino cards: fade-up + scale on scroll, hover lift with glow
- Page transitions: smooth fade between routes
- CTAs: pulse glow on affiliate buttons
- Numbers: count-up for ratings and bonus amounts
- Navigation: underline slide on active link, mobile menu slide-in
- Blog cards: staggered entrance on listing page

## Data Flow & Caching

- ISR with 60-second revalidation for casino reviews and blog posts
- Sanity webhook triggers on-demand revalidation via `/api/revalidate`
- GROQ queries colocated in `sanity/lib/queries.ts`

```
Sanity Studio → Sanity CDN → webhook → /api/revalidate → Next.js rebuilds page
```

**Affiliate links:**
- Internal redirect via `/go/[casino-slug]` — enables click tracking and URL swaps in Sanity
- `rel="nofollow sponsored"` on all affiliate links
- Click counter stored in Sanity

**Images:**
- Sanity image CDN with auto-resize, WebP, blur placeholders
- `next/image` with Sanity loader

## SEO

- Dynamic `metadata` per page from Sanity SEO fields
- Auto-generated `sitemap.xml` and `robots.txt`
- Open Graph images per casino/blog post
- JSON-LD structured data for reviews (star ratings in Google)

## Layout

- Sticky header: logo, nav (Home, Casinos, Blog, Categories), RTL
- Animated mobile hamburger menu with slide-in drawer
- Footer: links, gambling responsibility disclaimer, social icons
