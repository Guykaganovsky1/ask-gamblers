# Casino Raz Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Hebrew RTL casino affiliate website with blog, casino reviews, categories, and luxurious dark-themed animations.

**Architecture:** Next.js 15 App Router with Sanity v3 as headless CMS. Content is fetched via GROQ queries with ISR caching and webhook-based revalidation. Affiliate links redirect through an internal tracking route. Framer Motion handles all animations.

**Tech Stack:** Next.js 15, Sanity v3, Tailwind CSS v4, Framer Motion, TypeScript

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx`

**Step 1: Create Next.js app with TypeScript and Tailwind**

Run:
```bash
cd "/Users/guykaganovsky/Documents/Projects/casino raz"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack
```

When prompted, accept defaults. This scaffolds the project in the current directory.

**Step 2: Install additional dependencies**

Run:
```bash
npm install framer-motion next-sanity @sanity/image-url @sanity/vision @portabletext/react sanity
npm install -D @tailwindcss/typography
```

**Step 3: Configure standalone output for Cloudways**

In `next.config.ts`, set:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

**Step 4: Add Hebrew fonts to layout**

Update `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Heebo, Assistant, Inter } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "קזינו רז - המדריך המלא לקזינו אונליין",
  description: "ביקורות קזינו, בונוסים והמלצות - המדריך המלא שלך לעולם הקזינו האונליין",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${heebo.variable} ${assistant.variable} ${inter.variable} font-assistant bg-[#0A0A0F] text-[#F5F5F5] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

**Step 5: Set up Tailwind theme with casino colors**

Update `app/globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-background: #0A0A0F;
  --color-card: #1A1A2E;
  --color-gold: #D4AF37;
  --color-gold-light: #F0D060;
  --color-emerald-neon: #00E676;
  --color-text-primary: #F5F5F5;
  --color-text-muted: #9CA3AF;
  --color-border-glass: rgba(255, 255, 255, 0.08);

  --font-heading: var(--font-heebo);
  --font-body: var(--font-assistant);
  --font-mono: var(--font-inter);
}
```

**Step 6: Verify dev server starts**

Run: `npm run dev`
Expected: Server starts at localhost:3000, page renders with dark background and Hebrew metadata.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, fonts, and casino theme"
```

---

### Task 2: Set Up Sanity Studio and Schemas

**Files:**
- Create: `sanity.config.ts`, `sanity.cli.ts`, `sanity/env.ts`, `sanity/lib/client.ts`, `sanity/lib/image.ts`
- Create: `sanity/schemas/index.ts`, `sanity/schemas/casino.ts`, `sanity/schemas/post.ts`, `sanity/schemas/category.ts`, `sanity/schemas/author.ts`
- Create: `app/studio/[[...tool]]/page.tsx`

**Step 1: Create a Sanity project**

Run:
```bash
npx sanity@latest init --env .env.local
```

When prompted:
- Select "Create new project"
- Name: "casino-raz"
- Use default dataset: "production"
- Project output path: use current directory
- Select "Clean project with no predefined schema types"

This creates `sanity.config.ts`, `sanity.cli.ts`, and `.env.local` with project credentials.

**Step 2: Create Sanity env helper**

Create `sanity/env.ts`:
```ts
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
```

**Step 3: Create Sanity client**

Create `sanity/lib/client.ts`:
```ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
```

**Step 4: Create image URL helper**

Create `sanity/lib/image.ts`:
```ts
import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: Image) {
  return builder.image(source);
}
```

**Step 5: Create Category schema**

Create `sanity/schemas/category.ts`:
```ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "קטגוריה",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "תיאור",
      type: "text",
    }),
    defineField({
      name: "icon",
      title: "אייקון",
      type: "string",
      description: "שם האייקון (slots, poker, live, sports)",
    }),
  ],
});
```

**Step 6: Create Author schema**

Create `sanity/schemas/author.ts`:
```ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "כותב",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "תמונה",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "ביוגרפיה",
      type: "text",
    }),
  ],
});
```

**Step 7: Create Casino schema**

Create `sanity/schemas/casino.ts`:
```ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "casino",
  title: "קזינו",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "לוגו",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "דירוג",
      type: "number",
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: "description",
      title: "תיאור",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pros",
      title: "יתרונות",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "cons",
      title: "חסרונות",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bonusTitle",
      title: "כותרת בונוס",
      type: "string",
    }),
    defineField({
      name: "bonusAmount",
      title: "סכום בונוס",
      type: "string",
    }),
    defineField({
      name: "wageringRequirement",
      title: "דרישות הימור",
      type: "string",
    }),
    defineField({
      name: "affiliateLink",
      title: "קישור שותפים",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "קטגוריות",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "featured",
      title: "מומלץ",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "clicks",
      title: "קליקים",
      type: "number",
      initialValue: 0,
      readOnly: true,
    }),
  ],
});
```

**Step 8: Create Blog Post schema**

Create `sanity/schemas/post.ts`:
```ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "פוסט",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "כותרת",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "כותב",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "featuredImage",
      title: "תמונה ראשית",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "categories",
      title: "קטגוריות",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "תאריך פרסום",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "תוכן",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "טקסט חלופי",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "כותרת SEO",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "תיאור SEO",
      type: "text",
      validation: (rule) => rule.max(160),
    }),
  ],
});
```

**Step 9: Create schema index**

Create `sanity/schemas/index.ts`:
```ts
import casino from "./casino";
import post from "./post";
import category from "./category";
import author from "./author";

export const schemaTypes = [casino, post, category, author];
```

**Step 10: Update sanity.config.ts to use schemas**

Update `sanity.config.ts`:
```ts
"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { projectId, dataset } from "./sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool(), visionTool({ defaultApiVersion: "2024-01-01" })],
});
```

**Step 11: Create Sanity Studio route**

Create `app/studio/[[...tool]]/page.tsx`:
```tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

**Step 12: Verify Studio loads**

Run: `npm run dev`
Navigate to `http://localhost:3000/studio`
Expected: Sanity Studio loads with the 4 content types visible in the sidebar.

**Step 13: Commit**

```bash
git add -A
git commit -m "feat: set up Sanity Studio with casino, post, category, and author schemas"
```

---

### Task 3: Create GROQ Queries

**Files:**
- Create: `sanity/lib/queries.ts`

**Step 1: Write all GROQ queries**

Create `sanity/lib/queries.ts`:
```ts
import { groq } from "next-sanity";

// Casino queries
export const CASINOS_QUERY = groq`
  *[_type == "casino"] | order(rating desc) {
    _id,
    name,
    slug,
    logo,
    rating,
    description,
    bonusTitle,
    bonusAmount,
    featured,
    categories[]->{ _id, name, slug }
  }
`;

export const FEATURED_CASINOS_QUERY = groq`
  *[_type == "casino" && featured == true] | order(rating desc) [0...6] {
    _id,
    name,
    slug,
    logo,
    rating,
    description,
    bonusTitle,
    bonusAmount,
    categories[]->{ _id, name, slug }
  }
`;

export const CASINO_BY_SLUG_QUERY = groq`
  *[_type == "casino" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    logo,
    rating,
    description,
    pros,
    cons,
    bonusTitle,
    bonusAmount,
    wageringRequirement,
    affiliateLink,
    featured,
    clicks,
    categories[]->{ _id, name, slug }
  }
`;

// Blog post queries
export const POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featuredImage,
    publishedAt,
    author->{ name, avatar },
    categories[]->{ _id, name, slug },
    "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..."
  }
`;

export const LATEST_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    featuredImage,
    publishedAt,
    author->{ name, avatar },
    categories[]->{ _id, name, slug }
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    featuredImage,
    publishedAt,
    body,
    seoTitle,
    seoDescription,
    author->{ name, avatar, bio },
    categories[]->{ _id, name, slug }
  }
`;

// Category queries
export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    icon,
    "casinoCount": count(*[_type == "casino" && references(^._id)]),
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    icon,
    "casinos": *[_type == "casino" && references(^._id)] | order(rating desc) {
      _id, name, slug, logo, rating, description, bonusTitle, bonusAmount
    },
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      _id, title, slug, featuredImage, publishedAt,
      author->{ name, avatar }
    }
  }
`;

// Affiliate redirect
export const CASINO_AFFILIATE_QUERY = groq`
  *[_type == "casino" && slug.current == $slug][0] {
    _id,
    affiliateLink,
    clicks
  }
`;
```

**Step 2: Commit**

```bash
git add sanity/lib/queries.ts
git commit -m "feat: add GROQ queries for casinos, posts, and categories"
```

---

### Task 4: Build UI Components

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/casino-card.tsx`
- Create: `components/ui/blog-card.tsx`
- Create: `components/ui/category-card.tsx`
- Create: `components/ui/star-rating.tsx`
- Create: `components/ui/animated-counter.tsx`
- Create: `components/ui/section-heading.tsx`

**Step 1: Create Button component**

Create `components/ui/button.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  rel?: string;
  className?: string;
}

export function Button({ href, children, variant = "primary", rel, className = "" }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-xl px-6 py-3 font-heading font-bold text-sm transition-all duration-300";
  const variants = {
    primary: "bg-gradient-to-l from-gold to-gold-light text-background hover:shadow-[0_0_24px_rgba(212,175,55,0.4)]",
    outline: "border border-gold/40 text-gold hover:bg-gold/10",
  };

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Link href={href} rel={rel} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}
```

**Step 2: Create StarRating component**

Create `components/ui/star-rating.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ rating, size = "md" }: StarRatingProps) {
  const sizes = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };

  return (
    <div className="flex gap-1" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.svg
          key={star}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: star * 0.1 }}
          viewport={{ once: true }}
          className={`${sizes[size]} ${star <= rating ? "text-gold" : "text-text-muted/30"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
}
```

**Step 3: Create AnimatedCounter component**

Create `components/ui/animated-counter.tsx`:
```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  const numericMatch = value.match(/(\d[\d,]*)/);
  const targetNum = numericMatch ? parseInt(numericMatch[1].replace(/,/g, ""), 10) : 0;
  const prefix = numericMatch ? value.slice(0, numericMatch.index) : "";
  const suffix = numericMatch ? value.slice((numericMatch.index || 0) + numericMatch[1].length) : value;

  useEffect(() => {
    if (!isInView || targetNum === 0) return;
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * targetNum);
      setDisplay(start.toLocaleString());
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, targetNum]);

  if (targetNum === 0) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {prefix}{display}{suffix}
    </span>
  );
}
```

**Step 4: Create SectionHeading component**

Create `components/ui/section-heading.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`font-heading text-3xl font-bold text-text-primary md:text-4xl ${className}`}
    >
      {children}
      <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-l from-gold to-gold-light" />
    </motion.h2>
  );
}
```

**Step 5: Create CasinoCard component**

Create `components/ui/casino-card.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StarRating } from "./star-rating";
import { AnimatedCounter } from "./animated-counter";
import { Button } from "./button";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";

interface CasinoCardProps {
  name: string;
  slug: { current: string };
  logo: SanityImage;
  rating: number;
  description: string;
  bonusTitle?: string;
  bonusAmount?: string;
  index?: number;
}

export function CasinoCard({
  name, slug, logo, rating, description, bonusTitle, bonusAmount, index = 0,
}: CasinoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6, boxShadow: "0 0 30px rgba(212,175,55,0.15)" }}
      className="group relative overflow-hidden rounded-2xl border border-border-glass bg-card/80 p-6 backdrop-blur-md"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gold/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <div className="relative h-16 w-32">
          <Image
            src={urlFor(logo).width(256).height(128).url()}
            alt={name}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="font-heading text-xl font-bold">{name}</h3>
        <StarRating rating={rating} />
        {bonusAmount && (
          <div className="rounded-lg bg-gold/10 px-4 py-2">
            <p className="text-xs text-text-muted">{bonusTitle}</p>
            <p className="font-heading text-lg font-bold text-gold">
              <AnimatedCounter value={bonusAmount} />
            </p>
          </div>
        )}
        <p className="text-sm text-text-muted line-clamp-2">{description}</p>
        <div className="flex gap-3">
          <Button href={`/go/${slug.current}`} rel="nofollow sponsored">
            שחק עכשיו
          </Button>
          <Button href={`/casinos/${slug.current}`} variant="outline">
            קרא ביקורת
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
```

**Step 6: Create BlogCard component**

Create `components/ui/blog-card.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";

interface BlogCardProps {
  title: string;
  slug: { current: string };
  featuredImage?: SanityImage;
  publishedAt?: string;
  author?: { name: string };
  index?: number;
}

export function BlogCard({ title, slug, featuredImage, publishedAt, author, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/blog/${slug.current}`} className="group block overflow-hidden rounded-2xl border border-border-glass bg-card/60 backdrop-blur-md transition-all hover:border-gold/20">
        {featuredImage && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={urlFor(featuredImage).width(640).height(360).url()}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <h3 className="font-heading text-lg font-bold leading-tight group-hover:text-gold transition-colors">
            {title}
          </h3>
          <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
            {author && <span>{author.name}</span>}
            {publishedAt && (
              <>
                <span>•</span>
                <time>{new Date(publishedAt).toLocaleDateString("he-IL")}</time>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
```

**Step 7: Create CategoryCard component**

Create `components/ui/category-card.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CATEGORY_ICONS: Record<string, string> = {
  slots: "🎰",
  poker: "🃏",
  live: "🎥",
  sports: "⚽",
  roulette: "🎡",
  blackjack: "🂡",
};

interface CategoryCardProps {
  name: string;
  slug: { current: string };
  description?: string;
  icon?: string;
  casinoCount?: number;
  postCount?: number;
  index?: number;
}

export function CategoryCard({ name, slug, description, icon, casinoCount, postCount, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        href={`/categories/${slug.current}`}
        className="group flex flex-col items-center gap-3 rounded-2xl border border-border-glass bg-card/60 p-6 text-center backdrop-blur-md transition-all hover:border-gold/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
      >
        <span className="text-4xl">{icon ? CATEGORY_ICONS[icon] || "🎲" : "🎲"}</span>
        <h3 className="font-heading text-lg font-bold group-hover:text-gold transition-colors">{name}</h3>
        {description && <p className="text-sm text-text-muted line-clamp-2">{description}</p>}
        <div className="flex gap-4 text-xs text-text-muted">
          {casinoCount !== undefined && <span>{casinoCount} קזינו</span>}
          {postCount !== undefined && <span>{postCount} מאמרים</span>}
        </div>
      </Link>
    </motion.div>
  );
}
```

**Step 8: Verify components compile**

Run: `npm run dev`
Expected: No TypeScript or build errors.

**Step 9: Commit**

```bash
git add components/
git commit -m "feat: add UI components — button, casino card, blog card, category card, star rating, counter"
```

---

### Task 5: Build Layout — Header and Footer

**Files:**
- Create: `components/sections/header.tsx`
- Create: `components/sections/footer.tsx`
- Create: `components/sections/mobile-menu.tsx`
- Create: `app/(site)/layout.tsx`

**Step 1: Create Header component**

Create `components/sections/header.tsx`:
```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MobileMenu } from "./mobile-menu";

const NAV_LINKS = [
  { href: "/", label: "ראשי" },
  { href: "/casinos", label: "קזינו" },
  { href: "/blog", label: "בלוג" },
  { href: "/categories", label: "קטגוריות" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-glass bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-heading text-2xl font-black text-gold">
          קזינו רז
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-heading text-sm font-semibold text-text-primary transition-colors hover:text-gold"
            >
              {link.label}
              <motion.span
                className="absolute -bottom-1 right-0 h-0.5 w-0 bg-gold"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="תפריט"
        >
          <span className="block h-0.5 w-6 bg-text-primary" />
          <span className="block h-0.5 w-6 bg-text-primary" />
          <span className="block h-0.5 w-4 bg-text-primary" />
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
    </header>
  );
}
```

**Step 2: Create MobileMenu component**

Create `components/sections/mobile-menu.tsx`:
```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-card border-l border-border-glass p-8"
          >
            <button onClick={onClose} className="mb-8 self-start text-2xl text-text-muted hover:text-text-primary">
              ✕
            </button>
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-3 font-heading text-lg font-bold text-text-primary transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
```

**Step 3: Create Footer component**

Create `components/sections/footer.tsx`:
```tsx
import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/casinos", label: "קזינו" },
  { href: "/blog", label: "בלוג" },
  { href: "/categories", label: "קטגוריות" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-glass bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Link href="/" className="font-heading text-xl font-black text-gold">
            קזינו רז
          </Link>
          <nav className="flex gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-border-glass pt-8 text-center text-xs text-text-muted">
          <p className="mx-auto max-w-2xl">
            הימורים עלולים לגרום להתמכרות. שחק באחריות. מותר מגיל 18+ בלבד.
            האתר מכיל קישורי שותפים.
          </p>
          <p className="mt-4">&copy; {new Date().getFullYear()} קזינו רז. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 4: Create site layout**

Create `app/(site)/layout.tsx`:
```tsx
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
```

**Step 5: Move the default page into the site route group**

Move `app/page.tsx` to `app/(site)/page.tsx` with a simple placeholder:
```tsx
export default function HomePage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <h1 className="font-heading text-4xl font-black text-gold">קזינו רז</h1>
    </div>
  );
}
```

**Step 6: Verify layout renders**

Run: `npm run dev`
Expected: Homepage shows header with nav, centered title, footer with disclaimer.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add site layout with header, mobile menu, and footer"
```

---

### Task 6: Build Homepage

**Files:**
- Create: `components/sections/hero.tsx`
- Modify: `app/(site)/page.tsx`

**Step 1: Create Hero section**

Create `components/sections/hero.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FLOATING_ITEMS = ["🎰", "🃏", "🎲", "💎", "🏆", "♠️", "♦️", "♣️"];

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4">
      {/* Floating casino elements */}
      {FLOATING_ITEMS.map((item, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-4xl opacity-10"
          initial={{
            x: `${(i * 12.5) % 100}%`,
            y: `${(i * 17) % 100}%`,
          }}
          animate={{
            y: [
              `${(i * 17) % 100}%`,
              `${((i * 17) + 15) % 100}%`,
              `${(i * 17) % 100}%`,
            ],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item}
        </motion.span>
      ))}

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading text-5xl font-black leading-tight md:text-7xl"
        >
          המדריך המלא
          <br />
          <span className="bg-gradient-to-l from-gold to-gold-light bg-clip-text text-transparent">
            לקזינו אונליין
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-lg text-text-muted"
        >
          ביקורות מקצועיות, בונוסים בלעדיים והמלצות מומחים — הכל במקום אחד
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Button href="/casinos">גלה קזינו מומלצים</Button>
          <Button href="/blog" variant="outline">קרא מאמרים</Button>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Build Homepage with all sections**

Update `app/(site)/page.tsx`:
```tsx
import { client } from "@/sanity/lib/client";
import { FEATURED_CASINOS_QUERY, LATEST_POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Hero } from "@/components/sections/hero";
import { CasinoCard } from "@/components/ui/casino-card";
import { BlogCard } from "@/components/ui/blog-card";
import { CategoryCard } from "@/components/ui/category-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export default async function HomePage() {
  const [casinos, posts, categories] = await Promise.all([
    client.fetch(FEATURED_CASINOS_QUERY),
    client.fetch(LATEST_POSTS_QUERY),
    client.fetch(CATEGORIES_QUERY),
  ]);

  return (
    <>
      <Hero />

      {/* Featured Casinos */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading>קזינו מומלצים</SectionHeading>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {casinos.map((casino: any, i: number) => (
            <CasinoCard key={casino._id} {...casino} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/casinos" variant="outline">כל הקזינו &larr;</Button>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading>קטגוריות</SectionHeading>
        <div className="mt-10 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat: any, i: number) => (
            <CategoryCard key={cat._id} {...cat} index={i} />
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading>מאמרים אחרונים</SectionHeading>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any, i: number) => (
            <BlogCard key={post._id} {...post} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/blog" variant="outline">כל המאמרים &larr;</Button>
        </div>
      </section>
    </>
  );
}
```

**Step 3: Verify homepage renders**

Run: `npm run dev`
Expected: Homepage shows hero, empty casino/blog/category sections (no Sanity data yet). No errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: build homepage with hero, featured casinos, categories, and latest posts sections"
```

---

### Task 7: Build Casino Pages

**Files:**
- Create: `app/(site)/casinos/page.tsx`
- Create: `app/(site)/casinos/[slug]/page.tsx`

**Step 1: Create Casino Listing page**

Create `app/(site)/casinos/page.tsx`:
```tsx
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CASINOS_QUERY } from "@/sanity/lib/queries";
import { CasinoCard } from "@/components/ui/casino-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "קזינו מומלצים | קזינו רז",
  description: "רשימת הקזינו המובילים עם ביקורות, דירוגים ובונוסים בלעדיים",
};

export default async function CasinosPage() {
  const casinos = await client.fetch(CASINOS_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading>כל הקזינו</SectionHeading>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {casinos.map((casino: any, i: number) => (
          <CasinoCard key={casino._id} {...casino} index={i} />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Create Casino Review page**

Create `app/(site)/casinos/[slug]/page.tsx`:
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { CASINO_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { StarRating } from "@/components/ui/star-rating";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";
import { casinoReviewJsonLd } from "@/lib/json-ld";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const casino = await client.fetch(CASINO_BY_SLUG_QUERY, { slug });
  if (!casino) return {};
  return {
    title: `${casino.name} - ביקורת | קזינו רז`,
    description: casino.description,
  };
}

export default async function CasinoReviewPage({ params }: Props) {
  const { slug } = await params;
  const casino = await client.fetch(CASINO_BY_SLUG_QUERY, { slug });
  if (!casino) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative h-20 w-40">
          <Image
            src={urlFor(casino.logo).width(320).height(160).url()}
            alt={casino.name}
            fill
            className="object-contain"
          />
        </div>
        <h1 className="font-heading text-4xl font-black">{casino.name}</h1>
        <StarRating rating={casino.rating} size="lg" />
      </div>

      {/* Bonus box */}
      {casino.bonusAmount && (
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center">
          <p className="text-sm text-text-muted">{casino.bonusTitle}</p>
          <p className="mt-2 font-heading text-3xl font-black text-gold">
            <AnimatedCounter value={casino.bonusAmount} />
          </p>
          {casino.wageringRequirement && (
            <p className="mt-2 text-xs text-text-muted">דרישות הימור: {casino.wageringRequirement}</p>
          )}
          <div className="mt-6">
            <Button href={`/go/${casino.slug.current}`} rel="nofollow sponsored">
              קבל בונוס
            </Button>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl font-bold">סקירה</h2>
        <p className="mt-4 text-text-muted leading-relaxed">{casino.description}</p>
      </div>

      {/* Pros & Cons */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {casino.pros?.length > 0 && (
          <div className="rounded-2xl border border-emerald-neon/20 bg-emerald-neon/5 p-6">
            <h3 className="font-heading text-lg font-bold text-emerald-neon">יתרונות</h3>
            <ul className="mt-4 space-y-2">
              {casino.pros.map((pro: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                  <span className="text-emerald-neon">&check;</span> {pro}
                </li>
              ))}
            </ul>
          </div>
        )}
        {casino.cons?.length > 0 && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <h3 className="font-heading text-lg font-bold text-red-400">חסרונות</h3>
            <ul className="mt-4 space-y-2">
              {casino.cons.map((con: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                  <span className="text-red-400">&times;</span> {con}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Categories */}
      {casino.categories?.length > 0 && (
        <div className="mt-12">
          <h3 className="font-heading text-lg font-bold">קטגוריות</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {casino.categories.map((cat: any) => (
              <span key={cat._id} className="rounded-full border border-border-glass bg-card px-4 py-1 text-sm text-text-muted">
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* JSON-LD structured data for SEO (data sourced from our own Sanity CMS) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(casinoReviewJsonLd(casino)),
        }}
      />
    </div>
  );
}
```

Note: The `dangerouslySetInnerHTML` usage here is safe — the data comes exclusively from our Sanity CMS (trusted, admin-only content), not from user input. This is the standard Next.js pattern for JSON-LD.

**Step 3: Verify casino pages compile**

Run: `npm run dev`
Navigate to `/casinos`
Expected: Empty listing page renders without errors.

**Step 4: Commit**

```bash
git add app/\(site\)/casinos/
git commit -m "feat: add casino listing and review pages"
```

---

### Task 8: Build Blog Pages

**Files:**
- Create: `app/(site)/blog/page.tsx`
- Create: `app/(site)/blog/[slug]/page.tsx`

**Step 1: Create Blog Listing page**

Create `app/(site)/blog/page.tsx`:
```tsx
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { BlogCard } from "@/components/ui/blog-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "בלוג | קזינו רז",
  description: "מאמרים, מדריכים וטיפים לעולם הקזינו האונליין",
};

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading>בלוג</SectionHeading>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any, i: number) => (
          <BlogCard key={post._id} {...post} index={i} />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Create Blog Post page**

Create `app/(site)/blog/[slug]/page.tsx`:
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY, FEATURED_CASINOS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { CasinoCard } from "@/components/ui/casino-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });
  if (!post) return {};
  return {
    title: post.seoTitle || `${post.title} | קזינו רז`,
    description: post.seoDescription || "",
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8 overflow-hidden rounded-xl">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || ""}
          width={800}
          height={450}
          className="w-full object-cover"
        />
      </div>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, topCasinos] = await Promise.all([
    client.fetch(POST_BY_SLUG_QUERY, { slug }),
    client.fetch(FEATURED_CASINOS_QUERY),
  ]);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
        {/* Article */}
        <article>
          {post.featuredImage && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl">
              <Image
                src={urlFor(post.featuredImage).width(900).height(500).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <h1 className="font-heading text-3xl font-black md:text-4xl">{post.title}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
            {post.author && <span>{post.author.name}</span>}
            {post.publishedAt && (
              <>
                <span>&bull;</span>
                <time>{new Date(post.publishedAt).toLocaleDateString("he-IL")}</time>
              </>
            )}
          </div>
          {post.categories?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.categories.map((cat: any) => (
                <span key={cat._id} className="rounded-full border border-border-glass bg-card px-3 py-1 text-xs text-text-muted">
                  {cat.name}
                </span>
              ))}
            </div>
          )}
          <div className="prose prose-invert mt-8 max-w-none prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-muted prose-a:text-gold">
            {post.body && <PortableText value={post.body} components={portableTextComponents} />}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <SectionHeading className="text-xl">קזינו מומלצים</SectionHeading>
            <div className="mt-6 flex flex-col gap-4">
              {topCasinos.slice(0, 3).map((casino: any, i: number) => (
                <CasinoCard key={casino._id} {...casino} index={i} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
```

**Step 3: Verify blog pages compile**

Run: `npm run dev`
Navigate to `/blog`
Expected: Empty blog listing renders without errors.

**Step 4: Commit**

```bash
git add app/\(site\)/blog/
git commit -m "feat: add blog listing and post pages with Portable Text rendering"
```

---

### Task 9: Build Category Pages

**Files:**
- Create: `app/(site)/categories/page.tsx`
- Create: `app/(site)/categories/[slug]/page.tsx`

**Step 1: Create Categories Index page**

Create `app/(site)/categories/page.tsx`:
```tsx
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { CategoryCard } from "@/components/ui/category-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "קטגוריות | קזינו רז",
  description: "גלה קזינו לפי קטגוריה - סלוטים, פוקר, קזינו חי ועוד",
};

export default async function CategoriesPage() {
  const categories = await client.fetch(CATEGORIES_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading>קטגוריות</SectionHeading>
      <div className="mt-10 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat: any, i: number) => (
          <CategoryCard key={cat._id} {...cat} index={i} />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Create Category Detail page**

Create `app/(site)/categories/[slug]/page.tsx`:
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { CasinoCard } from "@/components/ui/casino-card";
import { BlogCard } from "@/components/ui/blog-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug });
  if (!category) return {};
  return {
    title: `${category.name} | קזינו רז`,
    description: category.description || `קזינו ומאמרים בקטגוריית ${category.name}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug });
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading>{category.name}</SectionHeading>
      {category.description && (
        <p className="mt-4 max-w-2xl text-text-muted">{category.description}</p>
      )}

      {/* Casinos in category */}
      {category.casinos?.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold">קזינו</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.casinos.map((casino: any, i: number) => (
              <CasinoCard key={casino._id} {...casino} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Posts in category */}
      {category.posts?.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold">מאמרים</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.posts.map((post: any, i: number) => (
              <BlogCard key={post._id} {...post} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

**Step 3: Verify category pages compile**

Run: `npm run dev`
Navigate to `/categories`
Expected: Empty categories page renders.

**Step 4: Commit**

```bash
git add app/\(site\)/categories/
git commit -m "feat: add category listing and detail pages"
```

---

### Task 10: Affiliate Redirect Route and Revalidation API

**Files:**
- Create: `app/go/[slug]/route.ts`
- Create: `app/api/revalidate/route.ts`

**Step 1: Create affiliate redirect route**

Create `app/go/[slug]/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { CASINO_AFFILIATE_QUERY } from "@/sanity/lib/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const readClient = createClient({ projectId, dataset, apiVersion, useCdn: false });
  const casino = await readClient.fetch(CASINO_AFFILIATE_QUERY, { slug });

  if (!casino?.affiliateLink) {
    return NextResponse.redirect(new URL("/casinos", request.url));
  }

  // Increment click count (fire and forget, requires write token)
  const writeToken = process.env.SANITY_WRITE_TOKEN;
  if (writeToken) {
    const writeClient = createClient({ projectId, dataset, apiVersion, token: writeToken, useCdn: false });
    writeClient.patch(casino._id).inc({ clicks: 1 }).commit().catch(() => {});
  }

  return NextResponse.redirect(casino.affiliateLink);
}
```

**Step 2: Create revalidation webhook route**

Create `app/api/revalidate/route.ts`:
```ts
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const type = body?._type;

    switch (type) {
      case "casino":
        revalidatePath("/casinos");
        revalidatePath(`/casinos/${body?.slug?.current}`);
        revalidatePath("/");
        break;
      case "post":
        revalidatePath("/blog");
        revalidatePath(`/blog/${body?.slug?.current}`);
        revalidatePath("/");
        break;
      case "category":
        revalidatePath("/categories");
        revalidatePath(`/categories/${body?.slug?.current}`);
        revalidatePath("/");
        break;
      default:
        revalidatePath("/");
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
```

**Step 3: Add env vars to .env.local**

Append to `.env.local`:
```
SANITY_WRITE_TOKEN=your_write_token_here
SANITY_REVALIDATE_SECRET=your_secret_here
```

**Step 4: Commit**

```bash
git add app/go/ app/api/
git commit -m "feat: add affiliate redirect with click tracking and Sanity revalidation webhook"
```

---

### Task 11: SEO — Sitemap, Robots, JSON-LD

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `lib/json-ld.ts`

**Step 1: Create dynamic sitemap**

Create `app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://casinoraz.co.il";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [casinos, posts, categories] = await Promise.all([
    client.fetch(groq`*[_type == "casino"]{ slug, _updatedAt }`),
    client.fetch(groq`*[_type == "post"]{ slug, _updatedAt }`),
    client.fetch(groq`*[_type == "category"]{ slug, _updatedAt }`),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/casinos`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const casinoPages = casinos.map((c: any) => ({
    url: `${BASE_URL}/casinos/${c.slug.current}`,
    lastModified: new Date(c._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const postPages = posts.map((p: any) => ({
    url: `${BASE_URL}/blog/${p.slug.current}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryPages = categories.map((c: any) => ({
    url: `${BASE_URL}/categories/${c.slug.current}`,
    lastModified: new Date(c._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...casinoPages, ...postPages, ...categoryPages];
}
```

**Step 2: Create robots.txt**

Create `app/robots.ts`:
```ts
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://casinoraz.co.il";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/", "/go/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

**Step 3: Create JSON-LD helper for casino reviews**

Create `lib/json-ld.ts`:
```ts
export function casinoReviewJsonLd(casino: {
  name: string;
  description: string;
  rating: number;
  slug: { current: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      name: casino.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: casino.rating,
      bestRating: 5,
    },
    description: casino.description,
    publisher: {
      "@type": "Organization",
      name: "קזינו רז",
    },
  };
}
```

**Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts lib/json-ld.ts
git commit -m "feat: add sitemap, robots.txt, and JSON-LD structured data helper"
```

---

### Task 12: Final Wiring and Smoke Test

**Step 1: Add NEXT_PUBLIC_SITE_URL to .env.local**

Append: `NEXT_PUBLIC_SITE_URL=https://casinoraz.co.il`

**Step 2: Run full build**

Run: `npm run build`
Expected: Build succeeds with all pages generated.

**Step 3: Run production server locally**

Run: `npm run start`
Expected: All pages load, no 500 errors. Studio accessible at `/studio`.

**Step 4: Commit any remaining changes**

```bash
git add -A
git commit -m "chore: final wiring and build verification"
```
