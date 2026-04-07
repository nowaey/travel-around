import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        ignored: ["**/node_modules/**", "**/.next/**", "**/.git/**"],
        aggregateTimeout: 300,
        poll: false,
      };
    }
    return config;
  },
};

export default nextConfig;
