import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "i.etsystatic.com",
      },
      {
        protocol: "https",
        hostname: "makerworld.bblmw.com",
      },
      {
        // Product images now come from the real /api/Products backend —
        // this is the CDN host its seed data currently points at.
        protocol: "https",
        hostname: "media.printables.com",
      },
    ],
  },
};

export default nextConfig;
