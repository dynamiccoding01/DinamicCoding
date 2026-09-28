-- ============================================================================
-- Dynamic Coding — Esquema de base de datos (Supabase / PostgreSQL)
-- ----------------------------------------------------------------------------
-- Ejecuta este script en:  Supabase → SQL Editor → New query → Run
--
-- Este es el sitio PÚBLICO. Con Row Level Security (RLS):
--   • Cualquiera puede LEER  proyectos y equipo.
--   • Cualquiera puede ENVIAR (INSERT) una consulta.
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
  created_at   timestamptz not null default now()
);

create index if not exists projects_sort_idx on public.projects (sort_order);

-- ---------- Tabla: team_members (equipo) ------------------------------------
create table if not exists public.team_members (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  name             text not null,
  role             text not null,
  headline         text not null default '',
  bio              text not null default '',
  avatar_url       text,
  skills           text[] not null default '{}',
  location         text,
  years_experience int,
  email            text,
  github_url       text,
  linkedin_url     text,
  website_url      text,
  twitter_url      text,
  featured         boolean not null default false,
  sort_order       int not null default 0,
  created_at       timestamptz not null default now()
);

create index if not exists team_members_sort_idx on public.team_members (sort_order);

-- ---------- Tabla: inquiries (consultas recibidas) --------------------------
create table if not exists public.inquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  company    text,
  phone      text,
  subject    text,
  message    text not null,
  status     text not null default 'new',   -- new | in_progress | closed (se gestiona en el panel admin)
  created_at timestamptz not null default now()
);

create index if not exists inquiries_created_idx on public.inquiries (created_at desc);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.projects     enable row level security;
alter table public.team_members enable row level security;
alter table public.inquiries    enable row level security;

-- Proyectos: lectura pública
drop policy if exists "public read projects" on public.projects;
create policy "public read projects"
  on public.projects for select
  to anon, authenticated
  using (true);

-- Equipo: lectura pública
drop policy if exists "public read team" on public.team_members;
create policy "public read team"
  on public.team_members for select
  to anon, authenticated
  using (true);

-- Consultas: cualquiera puede INSERTAR, nadie puede LEER de forma anónima.
drop policy if exists "public insert inquiries" on public.inquiries;
create policy "public insert inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

-- (No se crea policy de SELECT en inquiries: solo el service_role / panel admin
--  podrá leerlas. El service_role omite RLS por diseño.)
