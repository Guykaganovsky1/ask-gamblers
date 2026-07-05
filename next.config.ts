import type { NextConfig } from "next";

const immutableStaticAssetHeaders = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
  { key: "CDN-Cache-Control", value: "public, max-age=31536000, immutable" },
  { key: "Vercel-CDN-Cache-Control", value: "public, max-age=31536000, immutable" },
];

const shortStaticAssetHeaders = [
  { key: "Cache-Control", value: "public, max-age=86400" },
  { key: "CDN-Cache-Control", value: "public, max-age=604800" },
  { key: "Vercel-CDN-Cache-Control", value: "public, max-age=604800" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,

  turbopack: {
    root: __dirname,
  },

  // Enable production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "@sanity/icons",
      "@sanity/image-url",
      "framer-motion",
    ],
  },

  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
    ];
    const noIndexHeaders = [
      ...securityHeaders,
      { key: "X-Robots-Tag", value: "noindex, noarchive" },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/studio/:path*",
        headers: noIndexHeaders,
      },
      {
        source: "/api/:path*",
        headers: noIndexHeaders,
      },
      {
        source: "/go/:path*",
        headers: noIndexHeaders,
      },
      {
        source: "/search",
        headers: noIndexHeaders,
      },
      {
        source: "/_next/static/:path*",
        headers: immutableStaticAssetHeaders,
      },
      {
        source: "/images/:path*",
        headers: immutableStaticAssetHeaders,
      },
      {
        source: "/ask-gamblers-logo.svg",
        headers: immutableStaticAssetHeaders,
      },
      {
        source: "/favicon-:size(\\d+x\\d+).png",
        headers: shortStaticAssetHeaders,
      },
      {
        source: "/apple-touch-icon.png",
        headers: shortStaticAssetHeaders,
      },
      {
        source: "/site.webmanifest.json",
        headers: shortStaticAssetHeaders,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
