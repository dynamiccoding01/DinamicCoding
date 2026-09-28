import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite servir imágenes remotas (por ejemplo, desde Supabase Storage).
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
