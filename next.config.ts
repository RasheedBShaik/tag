// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack handles image optimization automatically, 
  // but we must allow Sanity's domain for next/image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Keep logging for debugging those 45000ms timeouts
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;