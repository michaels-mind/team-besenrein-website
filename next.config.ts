import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Hier dein Supabase Hostname (aus deiner .env NEXT_PUBLIC_SUPABASE_URL)
      // Beispiel: 'ucwkbcckcihrymajouzx.supabase.co'
      {
        protocol: 'https',
        hostname: '**', // Erlaubt vorerst alle Domains für Bilder (einfacher für Entwicklung)
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
