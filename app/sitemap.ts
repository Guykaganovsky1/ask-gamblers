import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";
const STATIC_LAST_MODIFIED = new Date("2026-07-03");

interface SitemapItem {
  slug: { current: string };
  _updatedAt: string;
}

interface CategorySitemapItem extends SitemapItem {
  name?: string;
}

function encodePathSegment(value: string) {
  return encodeURIComponent(value).replace(/'/g, "%27");
}

function isAsciiSlug(value: string) {
  return /^[a-z0-9-]+$/.test(value);
}

const CANONICAL_CATEGORY_SLUG_BY_NAME: Record<string, string> = {
  "הימורי ספורט": "sports",
  "רולטה": "roulette",
  "פוקר": "poker",
};

const CANONICAL_CATEGORY_SLUG_BY_SLUG: Record<string, string> = {
  "הימורי ספורט": "sports",
  "רולטה": "roulette",
  "פוקר": "poker",
};

function canonicalCategorySlug(category: CategorySitemapItem) {
  return CANONICAL_CATEGORY_SLUG_BY_NAME[category.name || ""] || CANONICAL_CATEGORY_SLUG_BY_SLUG[category.slug.current] || category.slug.current;
}

function dedupeCategories(categories: CategorySitemapItem[]) {
  const seen = new Set<string>();

  return [...categories]
    .filter((category) => category?.slug?.current)
    .sort((a, b) => Number(!isAsciiSlug(canonicalCategorySlug(a))) - Number(!isAsciiSlug(canonicalCategorySlug(b))))
    .filter((category) => {
      const key = canonicalCategorySlug(category).trim().toLocaleLowerCase("he-IL");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let casinos: SitemapItem[] = [];
  let posts: SitemapItem[] = [];
  let categories: CategorySitemapItem[] = [];

  try {
    [casinos, posts, categories] = await Promise.all([
      client.fetch<SitemapItem[]>(groq`*[_type == "casino"]{ slug, _updatedAt }`),
      client.fetch<SitemapItem[]>(groq`*[_type == "post"]{ slug, _updatedAt }`),
      client.fetch<CategorySitemapItem[]>(groq`*[_type == "category"]{ name, slug, _updatedAt }`),
    ]);
  } catch (error) {
    console.error("Failed to fetch sitemap data:", error);
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/casinos`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/news`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/bonuses`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/games`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/softwares`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/review-methodology`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/affiliate-disclosure`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/responsible-gambling`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
  ];

  const casinoPages = (casinos || []).filter(c => c?.slug?.current).map((c) => ({
    url: `${BASE_URL}/casinos/${c.slug.current}`,
    lastModified: new Date(c._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const postPages = (posts || []).filter(p => p?.slug?.current).map((p) => ({
    url: `${BASE_URL}/blog/${p.slug.current}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryPages = dedupeCategories(categories || []).map((c) => ({
    url: `${BASE_URL}/categories/${encodePathSegment(canonicalCategorySlug(c))}`,
    lastModified: new Date(c._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...casinoPages, ...postPages, ...categoryPages];
}
