-- ============================================================================
-- Dynamic Coding — Capa de administración (Supabase / PostgreSQL)
-- ----------------------------------------------------------------------------
-- Lo que necesita el PANEL DE ADMINISTRACIÓN (proyecto aparte) para trabajar
-- sobre la misma base de datos que el sitio público.
--
-- Orden de los scripts:  1) schema.sql   2) seed.sql   3) admin.sql
-- Ejecuta este script en:  Supabase → SQL Editor → New query → Run
-- Se puede volver a ejecutar sin romper nada. Hay que volver a ejecutarlo cada
-- vez que se ejecute schema.sql, porque ese script retira estos permisos.
--
-- Modelo de seguridad:
--   • El panel NO usa la clave service_role. Entra con usuario y contraseña
--     (Supabase Auth) y la base de datos decide qué puede hacer cada sesión.
--   • Solo las personas anotadas en private.admin_users son administradoras.
--     Un usuario con sesión que no esté en esa lista no puede hacer nada más
--     que un visitante anónimo.
--   • Todo cambio hecho desde el panel queda registrado en audit_log.
-- ============================================================================

create schema if not exists private;

-- ---------- 1. Quién es administrador ---------------------------------------
-- Vive en el esquema `private`, que la API no expone: no se puede leer ni
-- modificar desde el navegador. Se gestiona solo desde el SQL Editor.
create table if not exists private.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
revoke all on private.admin_users from anon, authenticated;

-- ¿La sesión actual es de un administrador?
create or replace function private.is_admin()
returns boolean
language sql
stable
security definer          -- lee admin_users, que nadie más puede leer
set search_path = ''
as $$
  select exists (
    select 1 from private.admin_users where user_id = (select auth.uid())
  );
$$;

-- Las políticas de abajo llaman a esta función con el rol de la sesión.
revoke all on function private.is_admin() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

-- Lo mismo, pero accesible para el panel:  supabase.rpc('current_user_is_admin')
-- Sirve para decidir qué mostrar; la protección real son las políticas.
create or replace function public.current_user_is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select private.is_admin();
$$;
revoke all on function public.current_user_is_admin() from public, anon;
grant execute on function public.current_user_is_admin() to authenticated;

-- ---------- 2. Consultas: campos de gestión ---------------------------------
alter table public.inquiries
  add column if not exists assigned_to uuid
    references public.team_members (id) on delete set null,
  add column if not exists notes text
    check (char_length(notes) <= 5000),
  add column if not exists outcome text
    check (outcome in ('proposal_sent', 'won', 'lost', 'not_applicable')),
  -- De dónde vino: 'web' es el formulario del sitio; el resto las anota el
  -- administrador a mano (por ejemplo, una consulta que llegó por WhatsApp).
  add column if not exists source text not null default 'web'
    check (source in ('web', 'whatsapp', 'phone', 'other')),
  add column if not exists updated_at timestamptz;

create index if not exists inquiries_status_idx on public.inquiries (status);

-- Quien no es administrador no puede fijar estos campos al enviar una consulta.
create or replace function private.inquiries_protect_admin_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    new.assigned_to := null;
    new.notes := null;
    new.outcome := null;
    new.source := 'web';
    new.updated_at := null;
  end if;
  return new;
end;
$$;

drop trigger if exists b_inquiries_protect_admin_fields on public.inquiries;
create trigger b_inquiries_protect_admin_fields
  before insert on public.inquiries
  for each row execute function private.inquiries_protect_admin_fields();

-- Al editar una consulta, anota cuándo.
create or replace function private.inquiries_touch()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists inquiries_touch on public.inquiries;
create trigger inquiries_touch
  before update on public.inquiries
  for each row execute function private.inquiries_touch();

-- ---------- 3. Permisos del administrador -----------------------------------
-- El GRANT abre la puerta a los usuarios con sesión; la política (RLS) solo
-- deja pasar a los administradores.
grant select, insert, update, delete
  on public.projects, public.team_members, public.inquiries
  to authenticated;

drop policy if exists "admin all projects" on public.projects;
create policy "admin all projects"
  on public.projects for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

drop policy if exists "admin all team" on public.team_members;
create policy "admin all team"
  on public.team_members for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

drop policy if exists "admin all inquiries" on public.inquiries;
create policy "admin all inquiries"
  on public.inquiries for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- ---------- 4. Registro de cambios (auditoría) ------------------------------
create table if not exists public.audit_log (
  id         bigint generated always as identity primary key,
  at         timestamptz not null default now(),
  user_id    uuid,          -- quién lo hizo; null = SQL Editor o sistema
  action     text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  table_name text not null,
  row_id     uuid,
  old_data   jsonb,
  new_data   jsonb
);

create index if not exists audit_log_at_idx on public.audit_log (at desc);

alter table public.audit_log enable row level security;
revoke all on public.audit_log from anon, authenticated;
grant select on public.audit_log to authenticated;

-- Solo lectura, y solo para administradores. Nadie puede editarlo ni borrarlo
-- por la API: lo escribe únicamente el trigger de abajo.
drop policy if exists "admin read audit" on public.audit_log;
create policy "admin read audit"
  on public.audit_log for select
  to authenticated
  using ((select private.is_admin()));

-- Con el argumento 'summary' no se copia la fila entera: de las consultas solo
-- se guardan los campos de gestión, para no duplicar datos personales.
create or replace function private.audit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  summary boolean := coalesce(tg_argv[0], '') = 'summary';
  before_data jsonb;
  after_data jsonb;
  target uuid;
begin
  if tg_op in ('UPDATE', 'DELETE') then
    target := old.id;
    before_data := to_jsonb(old);
  end if;
  if tg_op in ('INSERT', 'UPDATE') then
    target := new.id;
    after_data := to_jsonb(new);
  end if;

  if summary then
    before_data := jsonb_build_object(
      'status', before_data -> 'status',
      'assigned_to', before_data -> 'assigned_to',
      'outcome', before_data -> 'outcome'
    );
    after_data := case when after_data is null then null else jsonb_build_object(
      'status', after_data -> 'status',
      'assigned_to', after_data -> 'assigned_to',
      'outcome', after_data -> 'outcome'
    ) end;
  end if;

  insert into public.audit_log (user_id, action, table_name, row_id, old_data, new_data)
  values ((select auth.uid()), tg_op, tg_table_name, target, before_data, after_data);

  return coalesce(new, old);
end;
$$;

drop trigger if exists audit_projects on public.projects;
create trigger audit_projects
  after insert or update or delete on public.projects
  for each row execute function private.audit();

drop trigger if exists audit_team_members on public.team_members;
create trigger audit_team_members
  after insert or update or delete on public.team_members
  for each row execute function private.audit();

-- Las consultas que envía el público no se auditan (ya son su propio registro);
-- sí lo que el panel hace con ellas.
drop trigger if exists audit_inquiries on public.inquiries;
create trigger audit_inquiries
  after update or delete on public.inquiries
  for each row execute function private.audit('summary');

-- ---------- 5. Imágenes: quién puede subir a la carpeta «media» -------------
-- Leer las imágenes por su URL pública no necesita permiso (la carpeta es
-- pública). Subir, reemplazar, borrar y listar: solo administradores.
do $$
begin
  if to_regclass('storage.objects') is null then
    return;
  end if;

  update storage.buckets
  set file_size_limit = 5242880,  -- 5 MB
      allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp', 'image/avif']
  where id = 'media';

  drop policy if exists "admin read media" on storage.objects;
  create policy "admin read media" on storage.objects for select to authenticated
    using (bucket_id = 'media' and (select private.is_admin()));

  drop policy if exists "admin upload media" on storage.objects;
  create policy "admin upload media" on storage.objects for insert to authenticated
    with check (bucket_id = 'media' and (select private.is_admin()));

  drop policy if exists "admin update media" on storage.objects;
  create policy "admin update media" on storage.objects for update to authenticated
    using (bucket_id = 'media' and (select private.is_admin()))
    with check (bucket_id = 'media' and (select private.is_admin()));

  drop policy if exists "admin delete media" on storage.objects;
  create policy "admin delete media" on storage.objects for delete to authenticated
    using (bucket_id = 'media' and (select private.is_admin()));
exception when others then
  raise notice 'No se pudieron crear las reglas de la carpeta «media»: %', sqlerrm;
end
$$;

-- ---------- 6. Cómo nombrar a un administrador ------------------------------
-- 1) Crea el usuario en Supabase → Authentication → Users → Add user.
-- 2) Ejecuta esto, cambiando el correo:
--
--   insert into private.admin_users (user_id)
--   select id from auth.users where email = 'tu-correo@ejemplo.com'
--   on conflict do nothing;
--
-- Para quitarle el acceso:
--
--   delete from private.admin_users
--   where user_id = (select id from auth.users where email = 'tu-correo@ejemplo.com');
