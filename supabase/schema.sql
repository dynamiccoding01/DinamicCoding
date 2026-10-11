-- ============================================================================
-- Dynamic Coding — Esquema de base de datos (Supabase / PostgreSQL)
-- ----------------------------------------------------------------------------
-- Ejecuta este script en:  Supabase → SQL Editor → New query → Run
-- (pensado para un proyecto nuevo; se puede volver a ejecutar sin romper nada,
--  pero no altera tablas que ya existan).
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
  created_at   timestamptz not null default now()
);

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

-- ============================================================================
-- Permisos de la API (RLS sigue aplicando encima de estos GRANT)
-- ============================================================================
grant usage  on schema public to anon, authenticated;
grant select on public.projects, public.team_members to anon, authenticated;
grant insert on public.inquiries to anon, authenticated;
