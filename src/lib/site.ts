/**
 * URL pública del sitio (metadataBase, sitemap y robots).
 * 1. `NEXT_PUBLIC_SITE_URL` si está definida (dominio propio).
 * 2. En Vercel, el dominio de producción del proyecto
 *    (`VERCEL_PROJECT_PRODUCTION_URL`, ej. dinamic-coding.vercel.app; si se
 *    agrega un dominio propio en Vercel, pasa a ser ese).
 * 3. En local, http://localhost:3000.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
