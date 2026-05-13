import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";
const PRIVATE_PATHS = ["/studio/", "/api/", "/go/", "/search"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "anthropic-ai", "Amazonbot", "o1-preview", "o1-mini"],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
