import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations for production
  compress: true,
  poweredByHeader: false,
  
  // React optimizations
  reactStrictMode: true,
  
  // Minimize client-side JS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize images and fonts
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
