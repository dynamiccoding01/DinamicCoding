# Dynamic Coding — Sitio público

Sitio de **Dynamic Coding** · *DC Consultores, Asesoría y Consultoría* (Santa
Cruz de la Sierra, Bolivia). Su mensaje central: **«No todas las páginas web son
lo mismo»**. Presenta los siete tipos de página que desarrolla la empresa, sus
proyectos y su equipo, y permite cotizar por WhatsApp sin registrarse.

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

La **administración** (agregar/editar proyectos y equipo, gestionar las
consultas) vive en un **proyecto aparte** que comparte la misma base de datos
Supabase. Los scripts SQL de ambos proyectos están aquí, en `supabase/`.

## Empezar

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Sin configurar Supabase, el sitio muestra los
datos iniciales de `src/lib/seed.ts` (proyectos y personas reales) y el contacto
es solo por WhatsApp: el formulario aparece cuando hay base de datos.

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

Las fotos del equipo y las capturas de proyectos se suben a **Storage →
media** (carpeta pública que crea `schema.sql`); la URL pública del archivo se
pega en `avatar_url` o `cover_image`.

### Seguridad (RLS)

- Lectura pública de `projects` y `team_members`.
- Inserción pública en `inquiries`, pero **nadie** puede leerlas de forma
  anónima (solo el panel admin con `service_role`).
- `inquiries` tiene límites de tamaño por campo y un límite de frecuencia
  (3 consultas por correo y 20 en total cada 10 minutos).
- A `anon` solo se le concede leer proyectos y equipo e insertar consultas;
  no puede modificar ni borrar nada.

## Estructura

```
src/
  app/
    page.tsx                # Inicio
    servicios/              # Los 7 tipos de página + detalle [slug]
    proyectos/              # Vitrina + detalle [slug]
    equipo/                 # Grilla + perfil [slug]
    contacto/               # WhatsApp y formulario de consulta
  components/               # UI, secciones, layout, tarjetas, formulario
  lib/
    services.ts             # Catálogo: 7 tipos de página y públicos
    contact.ts              # WhatsApp y ciudad
    data.ts                 # Acceso a datos (Supabase o datos iniciales)
    seed.ts                 # Datos iniciales (proyectos y personas reales)
    types.ts                # Tipos de dominio
    roles.ts                # Etiquetas de los roles del personal
    actions.ts              # Server Action del formulario
    inquiry.ts              # Límites del formulario (= CHECK de la DB)
    site.ts                 # URL pública del sitio (SEO)
    supabase/client.ts      # Cliente de Supabase
public/
  brand/                    # Logo (PNG transparente)
  images/proyectos/         # Capturas de los proyectos
supabase/
  schema.sql                # 1) Tablas, RLS y límites del sitio público
  seed.sql                  # 2) Datos iniciales (los mismos de seed.ts)
  admin.sql                 # 3) Capa del panel de administración (otro repo)
```

## Scripts

- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run start` — servir el build
- `npm run lint` — ESLint
