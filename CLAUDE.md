# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

# Dynamic Coding — sitio público

Landing de la consultora/desarrolladora de software Dynamic Coding: servicios,
portafolio (`/proyectos`), equipo (`/equipo`) y formulario de consulta
(`/contacto`). Next.js 16 (App Router, Turbopack) + React 19 + TypeScript +
Tailwind v4 + Supabase + lucide-react. Deploy previsto en Vercel.

Todo el contenido, la UI y los comentarios del código están en español.

## Comandos

- `npm run dev` — servidor de desarrollo en http://localhost:3000 (también
  definido como `dev` en `.claude/launch.json` para el preview).
- `npm run build` / `npm run start` — build de producción y servirlo.
- `npm run lint` — ESLint (flat config: `core-web-vitals` + `typescript`).
- `npx tsc --noEmit` — chequeo de tipos.

No hay framework de tests ni script `test`.

## Arquitectura de dos proyectos (importante)

Este repo es SOLO el sitio público. Comparte la MISMA base de datos Supabase
con un proyecto de administración separado:

- Aquí: se LEEN `projects` y `team_members`; solo se INSERTA en `inquiries`
  (formulario de contacto). Clave `anon`, protegida por RLS.
- Proyecto admin (otro repo, con `service_role`): CRUD de contenido, kardex,
  movimientos y listado de consultas. No agregar funciones de administración
  aquí.

Cambiar una tabla afecta a ambos proyectos.

## Datos

- `src/lib/data.ts` es la única capa de lectura. `getSupabase()`
  (`src/lib/supabase/client.ts`) devuelve `null` si faltan las env vars y
  entonces se usan `seedProjects`/`seedTeam` de `src/lib/seed.ts` (modo demo).
  Cualquier error de consulta también cae al demo con un `console.warn("[data] …")`,
  así que una Supabase mal configurada se ve como "datos de ejemplo", no como error.
- Escritura: Server Action `submitInquiry` en `src/lib/actions.ts`, usada con
  `useActionState` en `src/components/contact/contact-form.tsx`. Valida en el
  servidor, tiene un honeypot (`website`) y devuelve `status: "demo"` si no hay
  Supabase. Si hay error devuelve `values` y el form los repone vía
  `defaultValue` (React 19 vacía el form tras cada acción; el `<select>`
  además necesita `key` para remontarse).
- Límites de las consultas: `src/lib/inquiry.ts` (servidor + `maxLength`) debe
  coincidir con los CHECK de `inquiries` en `supabase/schema.sql`. Un trigger
  (`private.inquiries_rate_limit`) limita la frecuencia de envíos y responde
  con el código `PT429`, que `actions.ts` traduce a un mensaje amable.
- Mantener sincronizados: `src/lib/types.ts` ↔ `src/lib/seed.ts` ↔
  `supabase/schema.sql` (tablas + RLS) ↔ `supabase/seed.sql`.
- RLS: lectura pública de `projects`/`team_members`; solo INSERT anónimo en
  `inquiries` (nunca SELECT anónimo).
- Las páginas con datos (y `sitemap.ts`) se prerenderizan en el build y se
  regeneran con ISR (`export const revalidate = 60`; `cacheComponents`
  desactivado). Una página nueva que lea de `data.ts` debe exportar lo mismo.
  Si Supabase está conectado pero las tablas están vacías, el sitio se ve
  vacío (el fallback al demo es solo para cliente nulo o error).
- `next.config.ts` solo admite imágenes remotas de
  `<NEXT_PUBLIC_SUPABASE_URL>/storage/v1/object/public/**`; cualquier otra URL
  externa en `cover_image`/`avatar_url` no se mostrará. Imágenes locales en
  `public/images`.

### Variables de entorno

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (clave
publishable/anon; sin ellas → modo demo) y, opcional, `NEXT_PUBLIC_SITE_URL`.
La URL pública del sitio sale de `src/lib/site.ts` (esa variable →
`VERCEL_PROJECT_PRODUCTION_URL` → localhost) y la usan `metadataBase`,
`sitemap.ts` y `robots.ts`. Plantilla versionada en `.env.local.example`
(excepción `!.env.local.example` en el `.gitignore`; el resto de `.env*` se
ignora).

## Deploy

Vercel (proyecto conectado al repo `dynamiccoding01/DinamicCoding`): cada push
a `main` publica en producción (https://dinamic-coding.vercel.app) y cada
rama/PR genera un preview. Las variables `NEXT_PUBLIC_*` se fijan en el build:
tras cambiarlas en Vercel hay que hacer Redeploy.

## UI y estilos

- Tema híbrido: cuerpo claro + hero oscuro con fondo "Aurora" animado. No hay
  modo oscuro ni theme toggle.
- Tailwind v4 sin `tailwind.config`: los tokens viven en `@theme` de
  `src/app/globals.css`. Usar `brand-50…900`, `navy`, `navy-deep`, `cyan`,
  `violet`, `ink`, `ink-soft`, `muted`, `line`, `surface`, `surface-soft` en vez
  de colores arbitrarios. La paleta sale de los azules del logo.
- Fuentes (`next/font` en `layout.tsx`): `font-sans` Inter, `font-display`
  Archivo, `font-mono` JetBrains Mono.
- Las utilidades propias de `globals.css` tienen variante clara y oscura:
  `.glass`/`.glass-dark`, `.grad-text`/`.grad-text-bright`,
  `.bg-grid`/`.bg-grid-on-dark`. Las variantes oscuras, `.aurora` y `.spot`
  son solo para secciones oscuras. `.card-glow` es el hover de tarjetas claras.
- Toda animación nueva debe desactivarse en el bloque
  `prefers-reduced-motion` al final de `globals.css`.
- `<Reveal>` (`src/components/ui/reveal.tsx`): `.reveal.is-visible` debe
  mantener `opacity: 1` explícito (no solo vía la animación) y el fallback de
  800 ms, o el contenido queda invisible en pestañas en segundo plano.
- ESLint incluye `react-hooks/set-state-in-effect`: no llamar `setState` de
  forma síncrona dentro de un `useEffect` (usar callbacks, timers o rAF).
- En superficies claras no usar `text-cyan` para texto (contraste ~1.7:1):
  usar `text-brand-600`. `cyan` es para el hero/footer oscuros.
- lucide-react v1.x no trae logos de marca: GitHub/LinkedIn/X están en
  `src/components/ui/brand-icons.tsx`.
- Server Components por defecto; solo son cliente `contact-form`, `navbar`,
  `stats`, `reveal` y `spotlight`. Combinar clases con `cn()` de
  `src/lib/utils.ts` (clsx + tailwind-merge).
- Estructura: `src/components/ui` (primitivas), `sections` (bloques de la
  home, compuestos en `src/app/page.tsx`), `layout` (navbar/footer), y
  `projects`/`team`/`contact` (tarjetas y formulario).

## Next.js 16

- `params` es una `Promise` en páginas, `generateMetadata`, etc.: hay que
  hacer `await params`.
- Los layouts usan el helper global `LayoutProps<"/">`.
- SEO por convención de archivos: `sitemap.ts`, `robots.ts`,
  `opengraph-image.tsx`, `icon.svg`, `not-found.tsx` en `src/app`.
