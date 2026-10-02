import type { NextConfig } from "next";

// Solo se optimizan imágenes remotas del Storage público de NUESTRO proyecto de
// Supabase. Abrirlo a cualquier host permitiría que terceros usen (y gasten)
// el optimizador de imágenes de Vercel. Imágenes locales: /public.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseUrl
      ? [new URL("/storage/v1/object/public/**", supabaseUrl)]
      : [],
  },
};

export default nextConfig;
