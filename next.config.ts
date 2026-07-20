import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // SVG logos live in /public and are served directly; remote patterns can be
    // added here once event imagery is hosted.
    formats: ["image/avif", "image/webp"],
  },
  // three.js / R3F ships ESM that benefits from transpilation in some setups.
  transpilePackages: ["three"],
};

export default nextConfig;
