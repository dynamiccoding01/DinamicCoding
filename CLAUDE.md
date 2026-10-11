# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

# Dynamic Coding — sitio público

Sitio de Dynamic Coding / «DC Consultores · Asesoría y Consultoría» (Santa
Cruz de la Sierra, Bolivia). Su mensaje central es «No todas las páginas web
son lo mismo»: asesora al cliente y desarrolla uno de siete tipos de página.
Los clientes nunca se registran; el canal principal de contacto es WhatsApp.

Rutas: inicio, `/servicios` (+ una página por tipo), `/proyectos`, `/equipo`,
`/contacto`. Next.js 16 (App Router, Turbopack) + React 19 + TypeScript +
Tailwind v4 + Supabase + lucide-react. Desplegado en Vercel.

Todo el contenido, la UI y los comentarios del código están en español.

## Comandos

- `npm run dev` — servidor de desarrollo en http://localhost:3000 (también
  definido como `dev` en `.claude/launch.json` para el preview).
- `npm run build` / `npm run start` — build de producción y servirlo.
- `npm run lint` — ESLint (flat config: `core-web-vitals` + `typescript`).
- `npx tsc --noEmit` — chequeo de tipos.

No hay framework de tests ni script `test`.

## Contenido: solo datos reales

No agregar datos de relleno (cifras, testimonios, personas, proyectos,
teléfonos, correos). Lo que no se sabe se omite y se le pregunta al dueño.

- `src/lib/services.ts` — catálogo fijo: los siete tipos de página (`qué es`,
  `ideal para`, `need`) y los cinco públicos. Sale de las piezas gráficas de
  la marca; no vive en Supabase. Alimenta el hero, la grilla, la guía «¿Qué
  página necesita tu negocio?», `/servicios/[slug]`, el pie y el formulario.
- `src/lib/contact.ts` — WhatsApp, ciudad y `whatsappUrl(mensaje)`. Todo
  enlace a WhatsApp sale de ahí (`<WhatsAppButton>`, `<WhatsAppFab>`).
- `src/lib/seed.ts` — proyectos y personas reales con los que arranca el
  sitio (Activa Sport, Catálogo Fernández, el fundador).
- Un proyecto se asocia a un tipo de página cuando `project.category` es
  igual al `title` del tipo (así aparece en `/servicios/[slug]`).

## Arquitectura de dos proyectos (importante)

Este repo es SOLO el sitio público. Comparte la MISMA base de datos Supabase
con un proyecto de administración separado (aún no creado):

- Aquí: se LEEN `projects` y `team_members`; solo se INSERTA en `inquiries`
  (formulario de contacto). Clave `anon`, protegida por RLS.
- Proyecto admin (otro repo, con `service_role`): alta de personal con roles,
  proyectos, consultas, promotores y kardex. No agregar administración aquí.

Cambiar una tabla afecta a ambos proyectos.

## Datos

- `src/lib/data.ts` es la única capa de lectura. `getSupabase()`
  (`src/lib/supabase/client.ts`) devuelve `null` si faltan las env vars y
  entonces se usan `seedProjects`/`seedTeam`. Cualquier error de consulta
  también cae a esos datos con un `console.warn("[data] …")`.
- Si Supabase está conectado pero las tablas están vacías, el sitio se ve
  vacío: por eso `supabase/seed.sql` carga los mismos datos que `seed.ts`.
- Mantener sincronizados: `src/lib/types.ts` ↔ `src/lib/seed.ts` ↔
  `supabase/schema.sql` (tablas + RLS) ↔ `supabase/seed.sql`.
- Personal: `team_members.role` es el cargo visible y `roles` (text[]) los
  roles que cumple (`desarrollador`, `consultor`, `promotor`…); las etiquetas
  están en `src/lib/roles.ts`.
- Perfil estilo CV (`/equipo/[slug]`): `experience`, `education` y
  `certifications` son columnas jsonb con listas (forma en `types.ts`),
  `project_slugs` enlaza con `projects`, `available` muestra «Disponible para
  consultas». Cada sección se pinta solo si tiene datos; los datos los cargará
  el dueño desde el panel de administración, no desde este repo.
  `normalizeMember()` en `data.ts` descarta entradas incompletas en vez de
  romper la página.
- GitHub: si la persona tiene `github_url`, `src/lib/github.ts` lee sus datos
  públicos de la API (caché de 1 h, `GITHUB_TOKEN` opcional). Si falla, el
  bloque no se muestra. LinkedIn y las demás redes son solo enlaces (no
  tienen API pública utilizable).
- `/equipo/demo` es un perfil con todas las secciones llenas
  (`src/lib/demo-profile.ts`) para probar el diseño. Solo existe con
  `npm run dev`; en producción da 404. Sus datos son inventados a propósito.
- Formulario: Server Action `submitInquiry` (`src/lib/actions.ts`) con
  `useActionState` en `contact-form.tsx`. `/contacto` solo lo muestra si
  `isSupabaseConfigured()`; sin base de datos queda solo WhatsApp, para no
  recibir consultas que se perderían. Si hay error devuelve `values` y el
  form los repone vía `defaultValue` (React 19 vacía el form tras cada
  acción; el `<select>` además necesita `key` para remontarse).
- Límites de las consultas: `src/lib/inquiry.ts` (servidor + `maxLength`) debe
  coincidir con los CHECK de `inquiries` en `supabase/schema.sql`. Un trigger
  (`private.inquiries_rate_limit`) limita la frecuencia de envíos y responde
  con el código `PT429`, que `actions.ts` traduce a un mensaje amable.
- RLS: lectura pública de `projects`/`team_members`; solo INSERT anónimo en
  `inquiries` (nunca SELECT anónimo).
- Las páginas con datos (y `sitemap.ts`) se prerenderizan en el build y se
  regeneran con ISR (`export const revalidate = 60`; `cacheComponents`
  desactivado). Una página nueva que lea de `data.ts` debe exportar lo mismo.
- `next.config.ts` solo admite imágenes remotas de
  `<NEXT_PUBLIC_SUPABASE_URL>/storage/v1/object/public/**`; cualquier otra URL
  externa en `cover_image`/`avatar_url` no se mostrará. Imágenes locales en
  `public/images`.

### Variables de entorno

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (clave
publishable/anon) y, opcionales, `NEXT_PUBLIC_SITE_URL` y `GITHUB_TOKEN`
(secreto, solo servidor). La URL pública del
sitio sale de `src/lib/site.ts` (esa variable →
`VERCEL_PROJECT_PRODUCTION_URL` → localhost) y la usan `metadataBase`,
`sitemap.ts` y `robots.ts`. Plantilla versionada en `.env.local.example`
(excepción `!.env.local.example` en el `.gitignore`; el resto de `.env*` se
ignora).

## Deploy

Vercel (proyecto conectado al repo `dynamiccoding01/DinamicCoding`): cada push
a `main` publica en producción (https://dinamic-coding.vercel.app). Las
variables `NEXT_PUBLIC_*` se fijan en el build: tras cambiarlas en Vercel hay
que hacer Redeploy.

**Flujo de trabajo pedido por el dueño: todo va directo a `main`.** No crear
ramas ni pull requests. Como cada push se publica al instante, antes de
empujar hay que pasar `npm run lint`, `npx tsc --noEmit` y `npm run build`, y
revisar en el navegador lo que cambie a la vista.

## UI y estilos

- Tema claro, minimalista y profesional, alineado con las piezas gráficas de
  la marca. No hay modo oscuro. El dueño pidió sobriedad: animaciones
  discretas, sin efectos llamativos.
- Tailwind v4 sin `tailwind.config`: los tokens viven en `@theme` de
  `src/app/globals.css` y son los colores medidos del logo y los flyers.
  Usar `brand-50…900`, `navy` (titulares), `navy-deep`, `sky`, `whatsapp`,
  `ink`, `ink-soft`, `muted`, `line`, `surface`, `surface-soft`; no colores
  arbitrarios. Títulos en `text-navy`, botón primario `bg-navy`.
- Fuentes (`next/font` en `layout.tsx`): `font-sans` Inter y `font-display`
  Archivo. No se usa tipografía monoespaciada.
- Clases propias en `@layer components` de `globals.css` (así las utilidades
  de Tailwind pueden sobrescribirlas): `.card` y `.card-hover` (tarjetas),
  y los motivos de la marca `.slant` (banda en paralelogramo), `.pin` (línea
  con punto junto a textos de apoyo), `.shape-diagonal` / `.shape-stripe`
  (formas diagonales del hero, cabeceras y llamado final).
- «Descargar CV» (`print-button.tsx`) abre la impresión del navegador; el
  formato del PDF es el bloque `@media print` de `globals.css` (oculta
  navegación, pie y todo lo que lleve `.no-print`, y baja la base de `rem`).
- Animaciones: `<Reveal>` al hacer scroll, `.type-row` (resaltado que recorre
  la lista del hero, solo CSS), `.float-slow` y `.wa-pulse`. Toda animación
  nueva debe desactivarse en el bloque `prefers-reduced-motion` del final.
- `<Reveal>` (`src/components/ui/reveal.tsx`): `.reveal.is-visible` debe
  mantener `opacity: 1` explícito (no solo vía la animación) y el fallback de
  800 ms, o el contenido queda invisible en pestañas en segundo plano.
- ESLint incluye `react-hooks/set-state-in-effect`: no llamar `setState` de
  forma síncrona dentro de un `useEffect` (usar callbacks, timers o rAF).
- Logo: `public/brand/logo-dc.png` (monograma) y `logo-dynamic-coding.png`
  (completo), PNG transparentes generados desde el JPG que entregó el dueño
  (no hay vectorial). Es azul: sobre fondo oscuro no contrasta, así que el
  logo siempre va sobre superficies claras. `src/app/icon.png` y
  `apple-icon.png` salen del monograma; `opengraph-image.tsx` lee el PNG del
  disco.
- Portadas de proyecto: capturas de celular con fondo transparente en
  `public/images/proyectos`. `ProjectCard` las ancla arriba y las recorta por
  abajo sobre un panel de marca; el detalle las muestra completas.
- lucide-react v1.x no trae logos de marca: GitHub, LinkedIn, X, WhatsApp,
  Instagram, Facebook y TikTok están en `src/components/ui/brand-icons.tsx`
  (paths de Simple Icons).
- Server Components por defecto; solo son cliente `contact-form`, `navbar`,
  `reveal` y `print-button`. Combinar clases con `cn()` de `src/lib/utils.ts`.
- Estructura: `src/components/ui` (primitivas), `sections` (bloques de la
  home, compuestos en `src/app/page.tsx`), `layout` (navbar/footer), y
  `services`/`projects`/`team`/`contact`.

## Next.js 16

- `params` es una `Promise` en páginas, `generateMetadata`, etc.: hay que
  hacer `await params`.
- Los layouts usan el helper global `LayoutProps<"/">`.
- SEO por convención de archivos: `sitemap.ts`, `robots.ts`,
  `opengraph-image.tsx`, `icon.png`, `apple-icon.png`, `not-found.tsx` en
  `src/app`.
