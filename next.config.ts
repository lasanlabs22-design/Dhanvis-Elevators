import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: lets a phone on the same Wi-Fi load the dev server's scripts (Next blocks other origins by default)
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
