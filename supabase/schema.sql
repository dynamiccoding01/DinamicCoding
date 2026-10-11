-- ============================================================================
-- Dynamic Coding — Esquema de base de datos (Supabase / PostgreSQL)
-- ----------------------------------------------------------------------------
-- Ejecuta este script en:  Supabase → SQL Editor → New query → Run
-- Se puede volver a ejecutar sin romper ni duplicar nada.
--
-- Orden de los scripts:  1) schema.sql   2) seed.sql   3) admin.sql
-- admin.sql añade lo que necesita el panel de administración. Este script
-- retira los permisos de los usuarios con sesión, así que SIEMPRE que se
-- vuelva a ejecutar hay que ejecutar admin.sql después.
--
-- Este es el sitio PÚBLICO. Con Row Level Security (RLS):
--   • Cualquiera puede LEER  proyectos y equipo.
--   • Cualquiera puede ENVIAR (INSERT) una consulta, con límites de tamaño y
--     de frecuencia (anti-spam).
--   • NADIE puede leer las consultas de forma anónima (solo el panel de
--     administración, que es el otro proyecto).
-- ============================================================================

-- ---------- Tabla: projects (proyectos / portafolio) ------------------------
create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  summary      text not null,
  description  text not null default '',
  category     text not null default 'Proyecto',
  client       text,
  year         int,
  technologies text[] not null default '{}',
  highlights   text[] not null default '{}',
  cover_image  text,
  gallery      text[] not null default '{}',
  demo_url     text,
  repo_url     text,
  featured     boolean not null default false,
  sort_order   int not null default 0,
  is_published boolean not null default true,  -- false = borrador, no sale en el sitio
  created_at   timestamptz not null default now()
);
-- Para bases creadas antes de que existiera la columna.
alter table public.projects
  add column if not exists is_published boolean not null default true;

create index if not exists projects_sort_idx on public.projects (sort_order);

-- ---------- Tabla: team_members (equipo) ------------------------------------
create table if not exists public.team_members (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  name             text not null,
  role             text not null,                 -- cargo visible, ej. 'Fundador'
  roles            text[] not null default '{}',  -- 'desarrollador', 'consultor', 'promotor'…
  headline         text not null default '',
  bio              text not null default '',
  avatar_url       text,
  skills           text[] not null default '{}',
  location         text,
  years_experience int,
  available        boolean not null default false,  -- etiqueta «Disponible para consultas»
  -- Perfil estilo CV. Listas en JSON; la forma de cada entrada está en
  -- src/lib/types.ts (ExperienceItem, EducationItem, CertificationItem):
  --   experience:     [{"title","organization","start","end","description"}]
  --   education:      [{"title","institution","year"}]
  --   certifications: [{"name","issuer","year","url"}]
  experience       jsonb not null default '[]',
  education        jsonb not null default '[]',
  certifications   jsonb not null default '[]',
  project_slugs    text[] not null default '{}',    -- slug de sus proyectos
  email            text,
  github_url       text,   -- con esto el perfil muestra sus datos de GitHub
  linkedin_url     text,
  website_url      text,
  twitter_url      text,
  instagram_url    text,
  facebook_url     text,
  tiktok_url       text,
  featured         boolean not null default false,
  sort_order       int not null default 0,
  is_public        boolean not null default true,   -- false = no sale en el sitio (ej. promotores)
  created_at       timestamptz not null default now()
);
-- Para bases creadas antes de que existiera la columna.
alter table public.team_members
  add column if not exists is_public boolean not null default true;

create index if not exists team_members_sort_idx on public.team_members (sort_order);

-- ---------- Tabla: inquiries (consultas recibidas) --------------------------
-- Los límites coinciden con src/lib/inquiry.ts (validación del formulario).
create table if not exists public.inquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 2 and 120),
  email      text not null check (
               char_length(email) <= 254
               and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
             ),
  company    text check (char_length(company) <= 160),
  phone      text check (char_length(phone) <= 40),
  subject    text check (char_length(subject) <= 120),
  message    text not null check (char_length(message) between 10 and 5000),
  -- Se gestiona en el panel admin.
  status     text not null default 'new'
               check (status in ('new', 'in_progress', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists inquiries_created_idx on public.inquiries (created_at desc);

-- ---------- Anti-spam: límite de frecuencia de consultas --------------------
-- • Máx. 3 consultas por correo cada 10 minutos.
-- • Máx. 20 consultas en total cada 10 minutos (frena envíos masivos).
-- El sitio reconoce el código PT429 y muestra un mensaje amable.
-- La función vive en el esquema `private`, que la API de Supabase no expone.
create schema if not exists private;

create or replace function private.inquiries_rate_limit()
returns trigger
language plpgsql
security definer          -- necesita contar filas que `anon` no puede leer
set search_path = ''
as $$
begin
  if (
    select count(*) from public.inquiries
    where lower(email) = lower(new.email)
      and created_at > now() - interval '10 minutes'
  ) >= 3
  or (
    select count(*) from public.inquiries
    where created_at > now() - interval '10 minutes'
  ) >= 20
  then
    raise exception 'Demasiadas consultas en poco tiempo'
      using errcode = 'PT429';
  end if;
  return new;
end;
$$;

drop trigger if exists inquiries_rate_limit on public.inquiries;
create trigger inquiries_rate_limit
  before insert on public.inquiries
  for each row execute function private.inquiries_rate_limit();

-- ---------- Consultas: valores que quien envía no puede elegir --------------
-- Quien envía una consulta por la API no decide su estado ni su fecha: sin
-- esto podría mandarla ya «cerrada» o con fecha antigua para saltarse el
-- límite de frecuencia. (El SQL Editor y service_role no pasan por aquí.)
create or replace function private.inquiries_force_defaults()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if current_user in ('anon', 'authenticated') then
    new.status := 'new';
    new.created_at := now();
  end if;
  return new;
end;
$$;

-- Se llama «a_…» para ejecutarse antes que inquiries_rate_limit (los triggers
-- de un mismo tipo corren en orden alfabético).
drop trigger if exists a_inquiries_force_defaults on public.inquiries;
create trigger a_inquiries_force_defaults
  before insert on public.inquiries
  for each row execute function private.inquiries_force_defaults();

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.projects     enable row level security;
alter table public.team_members enable row level security;
alter table public.inquiries    enable row level security;

-- Proyectos: lectura pública de los publicados (los borradores no salen)
drop policy if exists "public read projects" on public.projects;
create policy "public read projects"
  on public.projects for select
  to anon, authenticated
  using (is_published);

-- Equipo: lectura pública de quienes están marcados como visibles
drop policy if exists "public read team" on public.team_members;
create policy "public read team"
  on public.team_members for select
  to anon, authenticated
  using (is_public);

-- Consultas: cualquiera puede INSERTAR, nadie puede LEER de forma anónima.
drop policy if exists "public insert inquiries" on public.inquiries;
create policy "public insert inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

-- (No se crea policy de SELECT en inquiries: solo el service_role / panel admin
--  podrá leerlas. El service_role omite RLS por diseño.)

-- ============================================================================
-- Permisos de la API (RLS sigue aplicando encima de estos GRANT)
-- ============================================================================
-- Se parte de cero y se concede solo lo que el sitio público necesita: leer
-- proyectos y equipo, y enviar consultas. Nada de modificar ni borrar.
revoke all on public.projects, public.team_members, public.inquiries
  from anon, authenticated;
grant usage  on schema public to anon, authenticated;
grant select on public.projects, public.team_members to anon, authenticated;
grant insert on public.inquiries to anon, authenticated;

-- ============================================================================
-- Almacenamiento de imágenes (Supabase Storage)
-- ============================================================================
-- Carpeta pública «media» para las fotos del equipo y las capturas de los
-- proyectos. Se suben desde Supabase → Storage → media; después se copia la
-- URL pública del archivo en `avatar_url` o `cover_image`.
-- El sitio solo muestra imágenes externas que vengan de aquí.
do $$
begin
  if to_regclass('storage.buckets') is not null then
    insert into storage.buckets (id, name, public)
    values ('media', 'media', true)
    on conflict (id) do nothing;
  end if;
exception when others then
  raise notice 'No se pudo crear la carpeta de imágenes «media»: %', sqlerrm;
end
$$;
