import type { MetadataRoute } from "next";

// Disable Next.js default robots.txt - using custom static file
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [],
  };
}
