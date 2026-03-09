import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",
  
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
