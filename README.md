# Dynamic Coding — Sitio público

Landing page de la consultora y desarrolladora de software **Dynamic Coding**.
Muestra los servicios, el portafolio de proyectos y los perfiles del equipo, e
incluye un formulario de consulta para clientes.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (PostgreSQL) para datos y recepción de consultas
- **lucide-react** para íconos
- Deploy recomendado: **Vercel**

## Arquitectura de dos proyectos

Este repo es el **sitio público** (visibilidad y consulta):

- **Lee** de Supabase: `projects` y `team_members`.
- **Escribe** en Supabase: inserta en `inquiries` cuando un cliente envía el
  formulario de contacto.
- **No** administra contenido.

La **administración** (agregar/editar proyectos y equipo, kardex, movimientos,
listado de consultas) vive en un **proyecto aparte** que comparte la misma base
de datos Supabase.

## Empezar

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Sin configurar Supabase, el sitio funciona en
**modo demo** con los datos de ejemplo de `src/lib/seed.ts`.

## Conectar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, ejecuta `supabase/schema.sql` (tablas, RLS, límites y
   anti-spam) y luego `supabase/seed.sql`. Sin datos, las tablas vacías dejan
   el portafolio y el equipo en blanco.
3. Copia `.env.local.example` a `.env.local` y completa con
   **Project Settings → Data API / API Keys**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (clave *publishable* o *anon*; nunca la
     *secret* / *service_role*)
4. Reinicia `npm run dev`. El sitio pasará a leer/escribir en Supabase
   automáticamente.
5. En producción: pon las mismas dos variables en **Vercel → Settings →
   Environment Variables** y haz **Redeploy**.

Los cambios de contenido en Supabase aparecen en el sitio en ~1 minuto (ISR).

### Seguridad (RLS)

- Lectura pública de `projects` y `team_members`.
- Inserción pública en `inquiries`, pero **nadie** puede leerlas de forma
  anónima (solo el panel admin con `service_role`).
- `inquiries` tiene límites de tamaño por campo y un límite de frecuencia
  (3 consultas por correo y 20 en total cada 10 minutos).

## Estructura

```
src/
  app/
    page.tsx                # Inicio (hero, servicios, proyectos, equipo, CTA)
    proyectos/              # Vitrina + detalle [slug]
    equipo/                 # Grilla + perfil [slug]
    contacto/               # Formulario de consulta
  components/               # UI, secciones, layout, tarjetas, formulario
  lib/
    data.ts                 # Acceso a datos (Supabase o demo)
    seed.ts                 # Datos de ejemplo (modo demo)
    types.ts                # Tipos de dominio
    actions.ts              # Server Action del formulario
    inquiry.ts              # Límites del formulario (= CHECK de la DB)
    site.ts                 # URL pública del sitio (SEO)
    supabase/client.ts      # Cliente de Supabase
supabase/
  schema.sql                # Tablas + RLS
  seed.sql                  # Datos de ejemplo (opcional)
```

## Scripts

- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run start` — servir el build
- `npm run lint` — ESLint
