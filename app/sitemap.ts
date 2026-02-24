import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

interface SitemapItem {
  slug: { current: string };
  _updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [casinos, posts, categories] = await Promise.all([
    client.fetch<SitemapItem[]>(groq`*[_type == "casino"]{ slug, _updatedAt }`),
    client.fetch<SitemapItem[]>(groq`*[_type == "post"]{ slug, _updatedAt }`),
    client.fetch<SitemapItem[]>(groq`*[_type == "category"]{ slug, _updatedAt }`),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/casinos`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/softwares`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const casinoPages = casinos.map((c) => ({
    url: `${BASE_URL}/casinos/${c.slug.current}`,
    lastModified: new Date(c._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const postPages = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug.current}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${BASE_URL}/softwares/${c.slug.current}`,
    lastModified: new Date(c._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...casinoPages, ...postPages, ...categoryPages];
}
