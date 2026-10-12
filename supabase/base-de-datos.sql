-- ############################################################################
-- #  DYNAMIC CODING — BASE DE DATOS COMPLETA (en español)                    #
-- #  Sitio público + sistema de clientes, proyectos y pagos                  #
-- #                                                                          #
-- #  Cómo usarlo:                                                            #
-- #    1. Supabase → SQL Editor → New query                                  #
-- #    2. Pega TODO este archivo y pulsa Run                                 #
-- #    3. Mira la fila del resultado: todo debe decir «bien»                 #
-- #                                                                          #
-- #  Sirve para una base nueva y para actualizar la que ya existe: si        #
-- #  encuentra las tablas antiguas en inglés, pasa sus datos a las nuevas    #
-- #  y recién después las elimina. Se puede volver a ejecutar sin romper     #
-- #  ni duplicar nada.                                                       #
-- #                                                                          #
-- #  Todos los identificadores (id) son UUID aleatorios: no se pueden        #
-- #  adivinar ni recorrer en orden.                                          #
-- ############################################################################
--
-- Quién puede hacer qué:
--   • Visitante del sitio: lee el portafolio publicado y el equipo visible, y
--     envía consultas. Nada más.
--   • Persona con cuenta: solo lo que le permite su ROL, y solo si su usuario
--     está ACTIVO. Un usuario dado de baja pierde el acceso al instante.
--   • Superadmin: todo, y es el único que gestiona usuarios, roles y permisos.
-- La base decide en cada operación (RLS). El panel no usa la clave secreta.

begin;

create schema if not exists privado;


-- ============================================================================
-- PARTE 1 · Tablas
-- ============================================================================

-- ---------- equipo: las personas de Dynamic Coding --------------------------
create table if not exists public.equipo (
  id                uuid primary key default gen_random_uuid(),
  ruta              text not null unique,           -- dirección: /equipo/<ruta>
  nombre            text not null,
  cargo             text not null,                  -- visible, ej. «Fundador»
  funciones         text[] not null default '{}',   -- desarrollador, consultor, promotor…
  frase             text not null default '',
  biografia         text not null default '',
  url_foto          text,
  habilidades       text[] not null default '{}',
  ubicacion         text,
  anios_experiencia int,
  disponible        boolean not null default false, -- «Disponible para consultas»
  -- Perfil estilo CV, en listas JSON:
  --   experiencia:     [{"cargo","organizacion","inicio","fin","descripcion"}]
  --   formacion:       [{"titulo","institucion","anio"}]
  --   certificaciones: [{"nombre","emisor","anio","url"}]
  -- Sin «fin» significa que sigue ahí (hoy).
  experiencia       jsonb not null default '[]',
  formacion         jsonb not null default '[]',
  certificaciones   jsonb not null default '[]',
  rutas_portafolio  text[] not null default '{}',   -- «ruta» de sus trabajos en el portafolio
  correo            text,                           -- se publica en el sitio
  url_github        text,
  url_linkedin      text,
  url_sitio_web     text,
  url_twitter       text,
  url_instagram     text,
  url_facebook      text,
  url_tiktok        text,
  destacado         boolean not null default false,
  orden             int not null default 0,
  visible           boolean not null default true,  -- false = no sale en el sitio
  creado_en         timestamptz not null default now()
);
create index if not exists equipo_orden_idx on public.equipo (orden);

-- ---------- clientes --------------------------------------------------------
create table if not exists public.clientes (
  id             uuid primary key default gen_random_uuid(),
  nombre         text not null check (char_length(nombre) between 2 and 120),
  empresa        text check (char_length(empresa) <= 160),
  telefono       text check (char_length(telefono) <= 40),
  correo         text check (
                   char_length(correo) <= 254
                   and correo ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
                 ),
  notas          text check (char_length(notas) <= 5000),
  promotor_id    uuid references public.equipo (id) on delete set null,  -- quién lo trajo
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz
);
create index if not exists clientes_nombre_idx on public.clientes (nombre);

-- ---------- proyectos: el trabajo para un cliente (privado) -----------------
create table if not exists public.proyectos (
  id                     uuid primary key default gen_random_uuid(),
  cliente_id             uuid not null references public.clientes (id) on delete restrict,
  nombre                 text not null check (char_length(nombre) between 2 and 160),
  tipo_pagina            text check (char_length(tipo_pagina) <= 80),
  descripcion            text check (char_length(descripcion) <= 5000),
  estado                 text not null default 'propuesta'
                           check (estado in ('propuesta', 'en_desarrollo', 'en_revision', 'entregado', 'cancelado')),
  precio_acordado        numeric(12, 2) check (precio_acordado >= 0),   -- en bolivianos
  fecha_inicio           date,
  fecha_entrega_prevista date,
  fecha_entrega          date,
  responsable_id         uuid references public.equipo (id) on delete set null,
  url_sitio              text check (char_length(url_sitio) <= 500),
  notas                  text check (char_length(notas) <= 5000),
  creado_en              timestamptz not null default now(),
  actualizado_en         timestamptz
);
create index if not exists proyectos_cliente_idx on public.proyectos (cliente_id);
create index if not exists proyectos_estado_idx on public.proyectos (estado);

-- ---------- portafolio: lo que se muestra en el sitio web -------------------
create table if not exists public.portafolio (
  id              uuid primary key default gen_random_uuid(),
  ruta            text not null unique,             -- dirección: /proyectos/<ruta>
  titulo          text not null,
  resumen         text not null,
  descripcion     text not null default '',
  categoria       text not null default 'Proyecto', -- tipo de página
  cliente         text,                             -- nombre que se muestra
  anio            int,
  tecnologias     text[] not null default '{}',
  caracteristicas text[] not null default '{}',     -- «Lo que construimos»
  imagen_portada  text,
  galeria         text[] not null default '{}',
  url_demo        text,
  url_repositorio text,
  destacado       boolean not null default false,
  orden           int not null default 0,
  publicado       boolean not null default true,    -- false = borrador
  proyecto_id     uuid references public.proyectos (id) on delete set null,
  creado_en       timestamptz not null default now()
);
create index if not exists portafolio_orden_idx on public.portafolio (orden);

-- ---------- consultas: lo que llega del formulario del sitio ----------------
create table if not exists public.consultas (
  id             uuid primary key default gen_random_uuid(),
  nombre         text not null check (char_length(nombre) between 2 and 120),
  correo         text not null check (
                   char_length(correo) <= 254
                   and correo ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
                 ),
  empresa        text check (char_length(empresa) <= 160),
  telefono       text check (char_length(telefono) <= 40),
  asunto         text check (char_length(asunto) <= 120),
  mensaje        text not null check (char_length(mensaje) between 10 and 5000),
  estado         text not null default 'nueva'
                   check (estado in ('nueva', 'en_proceso', 'cerrada')),
  origen         text not null default 'web'
                   check (origen in ('web', 'whatsapp', 'llamada', 'otro')),
  asignado_a     uuid references public.equipo (id) on delete set null,
  notas          text check (char_length(notas) <= 5000),
  resultado      text check (resultado in ('propuesta_enviada', 'ganada', 'perdida', 'no_aplica')),
  cliente_id     uuid references public.clientes (id) on delete set null,  -- si se convirtió en cliente
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz
);
create index if not exists consultas_creado_idx on public.consultas (creado_en desc);
create index if not exists consultas_estado_idx on public.consultas (estado);

-- ---------- reuniones de un proyecto ----------------------------------------
create table if not exists public.reuniones (
  id             uuid primary key default gen_random_uuid(),
  proyecto_id    uuid not null references public.proyectos (id) on delete restrict,
  fecha          timestamptz not null default now(),
  modalidad      text not null default 'presencial'
                   check (modalidad in ('presencial', 'videollamada', 'llamada', 'whatsapp', 'otro')),
  resumen        text check (char_length(resumen) <= 5000),
  atendida_por   uuid references public.equipo (id) on delete set null,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz
);
create index if not exists reuniones_proyecto_idx on public.reuniones (proyecto_id, fecha desc);

-- ---------- cambios que pide el cliente en una reunión ----------------------
create table if not exists public.cambios (
  id             uuid primary key default gen_random_uuid(),
  reunion_id     uuid not null references public.reuniones (id) on delete restrict,
  descripcion    text not null check (char_length(descripcion) between 3 and 2000),
  estado         text not null default 'pendiente'
                   check (estado in ('pendiente', 'en_proceso', 'hecho', 'descartado')),
  prioridad      text not null default 'media'
                   check (prioridad in ('baja', 'media', 'alta')),
  costo_extra    numeric(12, 2) check (costo_extra >= 0),   -- en bolivianos
  responsable_id uuid references public.equipo (id) on delete set null,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz
);
create index if not exists cambios_reunion_idx on public.cambios (reunion_id);
create index if not exists cambios_estado_idx on public.cambios (estado);

-- ---------- pagos: cada cobro de un proyecto --------------------------------
-- El monto de un pago es la suma de su detalle. No se guarda aparte, para que
-- nunca puedan quedar dos cifras distintas.
create table if not exists public.pagos (
  id             uuid primary key default gen_random_uuid(),
  proyecto_id    uuid not null references public.proyectos (id) on delete restrict,
  fecha          date not null default current_date,
  forma_pago     text not null default 'efectivo'
                   check (forma_pago in ('efectivo', 'qr', 'transferencia', 'otro')),
  referencia     text check (char_length(referencia) <= 120),   -- nº de comprobante
  notas          text check (char_length(notas) <= 2000),
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz
);
create index if not exists pagos_proyecto_idx on public.pagos (proyecto_id, fecha desc);

-- ---------- detalle de pago: qué incluye cada cobro -------------------------
create table if not exists public.detalle_pago (
  id        uuid primary key default gen_random_uuid(),
  pago_id   uuid not null references public.pagos (id) on delete cascade,
  concepto  text not null check (char_length(concepto) between 2 and 200),
  monto     numeric(12, 2) not null check (monto > 0),   -- en bolivianos
  orden     int not null default 0,
  creado_en timestamptz not null default now()
);
create index if not exists detalle_pago_pago_idx on public.detalle_pago (pago_id);

-- ---------- roles -----------------------------------------------------------
create table if not exists public.roles (
  id          uuid primary key default gen_random_uuid(),
  clave       text not null unique check (clave ~ '^[a-z][a-z0-9_]{1,39}$'),
  nombre      text not null check (char_length(nombre) between 2 and 60),
  descripcion text check (char_length(descripcion) <= 300),
  de_sistema  boolean not null default false,   -- superadmin y admin: no se borran
  creado_en   timestamptz not null default now()
);

-- ---------- permisos: catálogo de lo que se puede hacer ---------------------
create table if not exists public.permisos (
  id          uuid primary key default gen_random_uuid(),
  clave       text not null unique,   -- «modulo.accion», ej. clientes.editar
  modulo      text not null,
  accion      text not null check (accion in ('ver', 'crear', 'editar', 'eliminar')),
  descripcion text not null
);

-- ---------- qué permisos tiene cada rol -------------------------------------
create table if not exists public.rol_permiso (
  id         uuid primary key default gen_random_uuid(),
  rol_id     uuid not null references public.roles (id) on delete cascade,
  permiso_id uuid not null references public.permisos (id) on delete cascade,
  unique (rol_id, permiso_id)
);

-- ---------- usuarios: las cuentas que entran al panel -----------------------
-- Una fila por cada cuenta de Supabase Auth. Se crea sola al crear la cuenta,
-- INACTIVA y sin rol: no puede hacer nada hasta que el superadmin la active.
create table if not exists public.usuarios (
  id             uuid primary key references auth.users (id) on delete cascade,
  nombre         text not null default '' check (char_length(nombre) <= 120),
  correo         text,
  rol_id         uuid references public.roles (id) on delete restrict,
  activo         boolean not null default false,   -- false = dado de baja
  equipo_id      uuid references public.equipo (id) on delete set null,  -- su perfil público
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz
);
create index if not exists usuarios_rol_idx on public.usuarios (rol_id);

-- ---------- historial: quién modificó qué y cuándo --------------------------
create table if not exists public.historial (
  id            uuid primary key default gen_random_uuid(),
  -- clock_timestamp() guarda el instante real de cada entrada, para poder
  -- ordenarlas aunque varias pertenezcan a una misma operación.
  fecha         timestamptz not null default clock_timestamp(),
  usuario_id    uuid,          -- vacío = SQL Editor o sistema
  usuario       text,          -- nombre o correo en ese momento
  accion        text not null check (accion in ('crear', 'editar', 'eliminar')),
  tabla         text not null,
  registro_id   uuid,
  datos_antes   jsonb,
  datos_despues jsonb
);
create index if not exists historial_fecha_idx on public.historial (fecha desc);
create index if not exists historial_tabla_idx on public.historial (tabla, registro_id);


-- ============================================================================
-- PARTE 2 · Roles y permisos iniciales
-- ----------------------------------------------------------------------------
-- Punto de partida. Desde el panel, el superadmin puede crear más roles y
-- cambiar qué permisos tiene cada uno; volver a ejecutar este archivo NO
-- deshace esos cambios (solo agrega lo que falte).
-- ============================================================================

insert into public.permisos (clave, modulo, accion, descripcion)
select m.modulo || '.' || a.accion, m.modulo, a.accion, a.verbo || ' ' || m.nombre
from (values
  ('consultas',  'consultas'),
  ('clientes',   'clientes'),
  ('proyectos',  'proyectos'),
  ('reuniones',  'reuniones'),
  ('cambios',    'cambios pedidos por el cliente'),
  ('pagos',      'pagos y su detalle'),
  ('portafolio', 'el portafolio del sitio'),
  ('equipo',     'el equipo')
) as m (modulo, nombre)
cross join (values
  ('ver', 'Ver'), ('crear', 'Crear'), ('editar', 'Editar'), ('eliminar', 'Eliminar')
) as a (accion, verbo)
on conflict (clave) do nothing;

insert into public.permisos (clave, modulo, accion, descripcion)
values ('historial.ver', 'historial', 'ver', 'Ver el historial de cambios')
on conflict (clave) do nothing;

do $roles$
declare
  definicion record;
  nuevo uuid;
begin
  for definicion in
    select * from (values
      ('superadmin', 'Superadministrador', true,
       'Control total. Es el único que gestiona usuarios, roles y permisos.',
       array[]::text[]),
      ('admin', 'Administrador', true,
       'Todo el panel, salvo usuarios, roles y permisos.',
       array['%']),
      ('lider_de_proyecto', 'Líder de proyecto', false,
       'Lleva los proyectos de principio a fin.',
       array['consultas.ver', 'consultas.crear', 'consultas.editar',
             'clientes.ver', 'clientes.crear', 'clientes.editar',
             'proyectos.ver', 'proyectos.crear', 'proyectos.editar',
             'reuniones.ver', 'reuniones.crear', 'reuniones.editar',
             'cambios.ver', 'cambios.crear', 'cambios.editar',
             'pagos.ver',
             'portafolio.ver', 'portafolio.crear', 'portafolio.editar',
             'equipo.ver']),
      ('desarrollador', 'Desarrollador', false,
       'Ve los proyectos y atiende los cambios pedidos.',
       array['proyectos.ver', 'reuniones.ver', 'cambios.ver', 'cambios.editar',
             'portafolio.ver', 'equipo.ver']),
      ('disenador', 'Diseñador', false,
       'Ve los proyectos y atiende los cambios pedidos.',
       array['proyectos.ver', 'reuniones.ver', 'cambios.ver', 'cambios.editar',
             'portafolio.ver', 'equipo.ver']),
      ('consultor', 'Consultor', false,
       'Atiende consultas y clientes, y registra reuniones y cambios.',
       array['consultas.ver', 'consultas.crear', 'consultas.editar',
             'clientes.ver', 'clientes.crear', 'clientes.editar',
             'proyectos.ver',
             'reuniones.ver', 'reuniones.crear', 'reuniones.editar',
             'cambios.ver', 'cambios.crear', 'cambios.editar']),
      ('promotor', 'Promotor', false,
       'Registra consultas y clientes nuevos.',
       array['consultas.ver', 'consultas.crear', 'clientes.ver', 'clientes.crear']),
      ('soporte', 'Soporte', false,
       'Atiende consultas y los cambios de proyectos ya entregados.',
       array['consultas.ver', 'consultas.editar', 'clientes.ver', 'proyectos.ver',
             'reuniones.ver', 'cambios.ver', 'cambios.crear', 'cambios.editar'])
    ) as x (clave, nombre, de_sistema, descripcion, permisos)
  loop
    nuevo := null;
    insert into public.roles (clave, nombre, de_sistema, descripcion)
    values (definicion.clave, definicion.nombre, definicion.de_sistema, definicion.descripcion)
    on conflict (clave) do nothing
    returning id into nuevo;

    -- Solo al crearlo recibe sus permisos iniciales.
    if nuevo is not null then
      insert into public.rol_permiso (rol_id, permiso_id)
      select nuevo, p.id from public.permisos p
      where p.clave like any (definicion.permisos)
      on conflict do nothing;
    end if;
  end loop;
end
$roles$;


-- ============================================================================
-- PARTE 3 · Paso de los datos antiguos (tablas en inglés) a las nuevas
-- ----------------------------------------------------------------------------
-- Solo actúa si encuentra las tablas antiguas. Copia los datos conservando
-- sus id, comprueba que no falte ninguno y recién entonces borra lo antiguo.
-- Si algo fallara, no se guarda ningún cambio de todo este archivo.
-- ============================================================================
do $migracion$
declare
  faltan bigint;
begin
  -- ----- team_members → equipo -----
  if to_regclass('public.team_members') is not null then
    alter table public.team_members
      add column if not exists roles text[] not null default '{}',
      add column if not exists available boolean not null default false,
      add column if not exists experience jsonb not null default '[]',
      add column if not exists education jsonb not null default '[]',
      add column if not exists certifications jsonb not null default '[]',
      add column if not exists project_slugs text[] not null default '{}',
      add column if not exists instagram_url text,
      add column if not exists facebook_url text,
      add column if not exists tiktok_url text,
      add column if not exists is_public boolean not null default true;

    execute $sql$
      insert into public.equipo (
        id, ruta, nombre, cargo, funciones, frase, biografia, url_foto, habilidades,
        ubicacion, anios_experiencia, disponible, experiencia, formacion,
        certificaciones, rutas_portafolio, correo, url_github, url_linkedin,
        url_sitio_web, url_twitter, url_instagram, url_facebook, url_tiktok,
        destacado, orden, visible, creado_en)
      select
        t.id, t.slug, t.name, t.role, t.roles, t.headline, t.bio, t.avatar_url, t.skills,
        t.location, t.years_experience, t.available,
        coalesce((
          select jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
            'cargo', e.item -> 'title', 'organizacion', e.item -> 'organization',
            'inicio', e.item -> 'start', 'fin', e.item -> 'end',
            'descripcion', e.item -> 'description')) order by e.n)
          from jsonb_array_elements(
            case when jsonb_typeof(t.experience) = 'array' then t.experience else '[]'::jsonb end
          ) with ordinality as e (item, n)), '[]'::jsonb),
        coalesce((
          select jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
            'titulo', e.item -> 'title', 'institucion', e.item -> 'institution',
            'anio', e.item -> 'year')) order by e.n)
          from jsonb_array_elements(
            case when jsonb_typeof(t.education) = 'array' then t.education else '[]'::jsonb end
          ) with ordinality as e (item, n)), '[]'::jsonb),
        coalesce((
          select jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
            'nombre', e.item -> 'name', 'emisor', e.item -> 'issuer',
            'anio', e.item -> 'year', 'url', e.item -> 'url')) order by e.n)
          from jsonb_array_elements(
            case when jsonb_typeof(t.certifications) = 'array' then t.certifications else '[]'::jsonb end
          ) with ordinality as e (item, n)), '[]'::jsonb),
        t.project_slugs, t.email, t.github_url, t.linkedin_url,
        t.website_url, t.twitter_url, t.instagram_url, t.facebook_url, t.tiktok_url,
        t.featured, t.sort_order, t.is_public, t.created_at
      from public.team_members t
      on conflict (id) do nothing
    $sql$;

    execute 'select count(*) from public.team_members t
             where not exists (select 1 from public.equipo e where e.id = t.id)' into faltan;
    if faltan > 0 then
      raise exception 'No se pudieron pasar % personas del equipo', faltan;
    end if;
  end if;

  -- ----- projects → portafolio -----
  if to_regclass('public.projects') is not null then
    alter table public.projects
      add column if not exists is_published boolean not null default true;

    execute $sql$
      insert into public.portafolio (
        id, ruta, titulo, resumen, descripcion, categoria, cliente, anio, tecnologias,
        caracteristicas, imagen_portada, galeria, url_demo, url_repositorio,
        destacado, orden, publicado, creado_en)
      select
        id, slug, title, summary, description, category, client, year, technologies,
        highlights, cover_image, gallery, demo_url, repo_url,
        featured, sort_order, is_published, created_at
      from public.projects
      on conflict (id) do nothing
    $sql$;

    execute 'select count(*) from public.projects p
             where not exists (select 1 from public.portafolio n where n.id = p.id)' into faltan;
    if faltan > 0 then
      raise exception 'No se pudieron pasar % proyectos del portafolio', faltan;
    end if;
  end if;

  -- ----- inquiries → consultas -----
  if to_regclass('public.inquiries') is not null then
    alter table public.inquiries
      add column if not exists assigned_to uuid,
      add column if not exists notes text,
      add column if not exists outcome text,
      add column if not exists source text not null default 'web',
      add column if not exists updated_at timestamptz;

    execute $sql$
      insert into public.consultas (
        id, nombre, correo, empresa, telefono, asunto, mensaje, estado, origen,
        asignado_a, notas, resultado, creado_en, actualizado_en)
      select
        i.id, i.name, i.email, i.company, i.phone, i.subject, i.message,
        case i.status when 'in_progress' then 'en_proceso' when 'closed' then 'cerrada' else 'nueva' end,
        case i.source when 'whatsapp' then 'whatsapp' when 'phone' then 'llamada'
                      when 'other' then 'otro' else 'web' end,
        (select e.id from public.equipo e where e.id = i.assigned_to),
        i.notes,
        case i.outcome when 'proposal_sent' then 'propuesta_enviada' when 'won' then 'ganada'
                       when 'lost' then 'perdida' when 'not_applicable' then 'no_aplica' end,
        i.created_at, i.updated_at
      from public.inquiries i
      on conflict (id) do nothing
    $sql$;

    execute 'select count(*) from public.inquiries i
             where not exists (select 1 from public.consultas c where c.id = i.id)' into faltan;
    if faltan > 0 then
      raise exception 'No se pudieron pasar % consultas', faltan;
    end if;
  end if;

  -- ----- audit_log → historial -----
  if to_regclass('public.audit_log') is not null then
    execute $sql$
      insert into public.historial (
        fecha, usuario_id, accion, tabla, registro_id, datos_antes, datos_despues)
      select
        a.at, a.user_id,
        case a.action when 'INSERT' then 'crear' when 'UPDATE' then 'editar' else 'eliminar' end,
        case a.table_name when 'projects' then 'portafolio' when 'team_members' then 'equipo'
                          when 'inquiries' then 'consultas' else a.table_name end,
        a.row_id, a.old_data, a.new_data
      from public.audit_log a
    $sql$;
    drop table public.audit_log;
  end if;

  -- ----- private.admin_users → usuarios con rol superadmin -----
  if to_regclass('private.admin_users') is not null then
    execute $sql$
      insert into public.usuarios (id, correo, rol_id, activo)
      select a.user_id, u.email, (select id from public.roles where clave = 'superadmin'), true
      from private.admin_users a join auth.users u on u.id = a.user_id
      on conflict (id) do update set rol_id = excluded.rol_id, activo = true
    $sql$;
  end if;

  -- ----- Lo antiguo ya no hace falta -----
  drop table if exists public.inquiries cascade;
  drop table if exists public.projects cascade;
  drop table if exists public.team_members cascade;
  drop function if exists public.current_user_is_admin();
  drop schema if exists private cascade;
end
$migracion$;


-- ============================================================================
-- PARTE 4 · Funciones de acceso
-- ----------------------------------------------------------------------------
-- Viven en el esquema «privado», que la API no expone.
-- ============================================================================

-- ¿La sesión actual es de un superadmin activo?
create or replace function privado.es_superadmin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.usuarios u
    join public.roles r on r.id = u.rol_id
    where u.id = (select auth.uid()) and u.activo and r.clave = 'superadmin'
  );
$$;

-- ¿La sesión actual tiene este permiso? Exige usuario ACTIVO: al dar de baja
-- a alguien, pierde todos sus permisos al instante.
create or replace function privado.tiene_permiso(permiso text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.usuarios u
    join public.roles r on r.id = u.rol_id
    where u.id = (select auth.uid())
      and u.activo
      and (
        r.clave = 'superadmin'
        or exists (
          select 1
          from public.rol_permiso rp
          join public.permisos p on p.id = rp.permiso_id
          where rp.rol_id = u.rol_id and p.clave = tiene_permiso.permiso
        )
      )
  );
$$;

-- ¿Puede subir o borrar esta imagen? Depende de la carpeta: equipo/ o portafolio/.
create or replace function privado.puede_gestionar_imagen(nombre text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select case split_part(puede_gestionar_imagen.nombre, '/', 1)
    when 'equipo' then
      privado.tiene_permiso('equipo.crear') or privado.tiene_permiso('equipo.editar')
    when 'portafolio' then
      privado.tiene_permiso('portafolio.crear') or privado.tiene_permiso('portafolio.editar')
    else false
  end;
$$;

revoke all on function privado.es_superadmin() from public;
revoke all on function privado.tiene_permiso(text) from public;
revoke all on function privado.puede_gestionar_imagen(text) from public;
grant usage on schema privado to authenticated;
grant execute on function privado.es_superadmin() to authenticated;
grant execute on function privado.tiene_permiso(text) to authenticated;
grant execute on function privado.puede_gestionar_imagen(text) to authenticated;

-- Lo que el panel pregunta al entrar:  supabase.rpc('mi_acceso')
-- Devuelve el rol y los permisos de la sesión. Sirve para decidir qué mostrar;
-- la protección real son las políticas de más abajo.
create or replace function public.mi_acceso()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'nombre', u.nombre,
    'correo', u.correo,
    'activo', u.activo,
    'rol', r.clave,
    'rol_nombre', r.nombre,
    'es_superadmin', u.activo and coalesce(r.clave = 'superadmin', false),
    'permisos', case
      when not u.activo or r.id is null then '[]'::jsonb
      when r.clave = 'superadmin' then (
        select coalesce(jsonb_agg(p.clave order by p.clave), '[]'::jsonb)
        from public.permisos p)
      else (
        select coalesce(jsonb_agg(p.clave order by p.clave), '[]'::jsonb)
        from public.rol_permiso rp
        join public.permisos p on p.id = rp.permiso_id
        where rp.rol_id = r.id)
    end
  )
  from public.usuarios u
  left join public.roles r on r.id = u.rol_id
  where u.id = (select auth.uid());
$$;
revoke all on function public.mi_acceso() from public, anon;
grant execute on function public.mi_acceso() to authenticated;

-- Registra un pago y su detalle de una sola vez (o todo o nada).
--   p_detalle: [{"concepto": "Diseño", "monto": 500}, …]
create or replace function public.registrar_pago(
  p_proyecto uuid,
  p_fecha date,
  p_forma_pago text,
  p_referencia text,
  p_notas text,
  p_detalle jsonb
)
returns uuid
language plpgsql
set search_path = ''
as $$
declare
  nuevo uuid;
begin
  if jsonb_typeof(p_detalle) is distinct from 'array' or jsonb_array_length(p_detalle) = 0 then
    raise exception 'Un pago necesita al menos un concepto' using errcode = '22023';
  end if;

  insert into public.pagos (proyecto_id, fecha, forma_pago, referencia, notas)
  values (p_proyecto, coalesce(p_fecha, current_date), coalesce(p_forma_pago, 'efectivo'),
          p_referencia, p_notas)
  returning id into nuevo;

  insert into public.detalle_pago (pago_id, concepto, monto, orden)
  select nuevo, d.item ->> 'concepto', (d.item ->> 'monto')::numeric, d.n::int
  from jsonb_array_elements(p_detalle) with ordinality as d (item, n);

  return nuevo;
end;
$$;
revoke all on function public.registrar_pago(uuid, date, text, text, text, jsonb) from public, anon;
grant execute on function public.registrar_pago(uuid, date, text, text, text, jsonb) to authenticated;

-- Convierte una consulta en cliente, copiando sus datos de contacto.
create or replace function public.convertir_consulta_en_cliente(p_consulta uuid)
returns uuid
language plpgsql
set search_path = ''
as $$
declare
  consulta public.consultas;
  nuevo uuid;
begin
  select * into consulta from public.consultas where id = p_consulta;
  if not found then
    raise exception 'La consulta no existe' using errcode = 'P0002';
  end if;
  if consulta.cliente_id is not null then
    return consulta.cliente_id;
  end if;

  insert into public.clientes (nombre, empresa, telefono, correo)
  values (consulta.nombre, consulta.empresa, consulta.telefono, consulta.correo)
  returning id into nuevo;

  update public.consultas set cliente_id = nuevo where id = p_consulta;
  return nuevo;
end;
$$;
revoke all on function public.convertir_consulta_en_cliente(uuid) from public, anon;
grant execute on function public.convertir_consulta_en_cliente(uuid) to authenticated;

-- Para nombrar al primer superadmin. Solo funciona desde el SQL Editor:
--   select privado.nombrar_superadmin('tu-correo@ejemplo.com');
create or replace function privado.nombrar_superadmin(p_correo text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  cuenta uuid;
begin
  select id into cuenta from auth.users where lower(email) = lower(trim(p_correo));
  if cuenta is null then
    raise exception 'No existe una cuenta con el correo %. Créala primero en Authentication → Users.', p_correo;
  end if;

  insert into public.usuarios (id, correo, rol_id, activo)
  values (cuenta, lower(trim(p_correo)),
          (select id from public.roles where clave = 'superadmin'), true)
  on conflict (id) do update set rol_id = excluded.rol_id, activo = true;

  return 'Listo: ' || lower(trim(p_correo)) || ' ahora es superadmin.';
end;
$$;
revoke all on function privado.nombrar_superadmin(text) from public;


-- ============================================================================
-- PARTE 5 · Reglas automáticas (triggers)
-- ============================================================================

-- ---------- Consultas: valores que quien envía no puede elegir --------------
create or replace function privado.consultas_forzar_valores()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  -- Sin esto se podría enviar una consulta ya «cerrada» o con fecha antigua
  -- para saltarse el límite de frecuencia. (El SQL Editor no pasa por aquí.)
  if current_user in ('anon', 'authenticated') then
    new.estado := 'nueva';
    new.creado_en := now();
  end if;
  return new;
end;
$$;

-- Los campos de gestión solo los fija quien tiene permiso en el panel.
-- (Sin «security definer»: así current_user es quien de verdad hace la petición.)
create or replace function privado.consultas_proteger_gestion()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  restringir boolean := false;
begin
  if current_user = 'anon' then
    restringir := true;
  elsif current_user = 'authenticated' then
    restringir := not privado.tiene_permiso('consultas.crear');
  end if;

  if restringir then
    new.asignado_a := null;
    new.notas := null;
    new.resultado := null;
    new.cliente_id := null;
    new.origen := 'web';
    new.actualizado_en := null;
  end if;
  return new;
end;
$$;

-- Anti-spam: máx. 3 consultas por correo y 20 en total cada 10 minutos.
-- El sitio reconoce el código PT429 y muestra un mensaje amable.
create or replace function privado.consultas_limite_frecuencia()
returns trigger
language plpgsql
security definer          -- necesita contar filas que el visitante no puede leer
set search_path = ''
as $$
begin
  if (
    select count(*) from public.consultas
    where lower(correo) = lower(new.correo)
      and creado_en > now() - interval '10 minutes'
  ) >= 3
  or (
    select count(*) from public.consultas
    where creado_en > now() - interval '10 minutes'
  ) >= 20
  then
    raise exception 'Demasiadas consultas en poco tiempo'
      using errcode = 'PT429';
  end if;
  return new;
end;
$$;

-- Los triggers de un mismo tipo corren en orden alfabético: primero «a_», luego
-- «b_» y al final «limite_frecuencia».
drop trigger if exists a_forzar_valores on public.consultas;
create trigger a_forzar_valores
  before insert on public.consultas
  for each row execute function privado.consultas_forzar_valores();

drop trigger if exists b_proteger_gestion on public.consultas;
create trigger b_proteger_gestion
  before insert on public.consultas
  for each row execute function privado.consultas_proteger_gestion();

drop trigger if exists limite_frecuencia on public.consultas;
create trigger limite_frecuencia
  before insert on public.consultas
  for each row execute function privado.consultas_limite_frecuencia();

-- ---------- Al editar, anota cuándo -----------------------------------------
create or replace function privado.marcar_actualizacion()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.actualizado_en := now();
  return new;
end;
$$;

do $$
declare
  tabla text;
begin
  foreach tabla in array array[
    'consultas', 'clientes', 'proyectos', 'reuniones', 'cambios', 'pagos', 'usuarios']
  loop
    execute format('drop trigger if exists marcar_actualizacion on public.%I', tabla);
    execute format(
      'create trigger marcar_actualizacion before update on public.%I
       for each row execute function privado.marcar_actualizacion()', tabla);
  end loop;
end
$$;

-- ---------- Roles: los de sistema no se borran ni se renombran --------------
create or replace function privado.roles_proteger()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    if old.de_sistema then
      raise exception 'El rol «%» es del sistema y no se puede eliminar', old.nombre
        using errcode = 'P0001';
    end if;
    return old;
  end if;

  if tg_op = 'UPDATE' then
    if old.de_sistema then
      new.clave := old.clave;
      new.de_sistema := true;
      return new;
    end if;
  end if;

  -- Desde el panel no se pueden crear roles «de sistema».
  if current_user in ('anon', 'authenticated') then
    new.de_sistema := false;
  end if;
  return new;
end;
$$;

drop trigger if exists proteger on public.roles;
create trigger proteger
  before insert or update or delete on public.roles
  for each row execute function privado.roles_proteger();

-- ---------- Usuarios: siempre debe quedar un superadmin activo --------------
create or replace function privado.usuarios_conservar_superadmin()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  rol_superadmin uuid;
begin
  select id into rol_superadmin from public.roles where clave = 'superadmin';

  if old.activo and old.rol_id = rol_superadmin and not exists (
    select 1 from public.usuarios where activo and rol_id = rol_superadmin
  ) then
    raise exception 'Debe quedar al menos un superadmin activo' using errcode = 'P0001';
  end if;
  return null;
end;
$$;

drop trigger if exists conservar_superadmin on public.usuarios;
create trigger conservar_superadmin
  after update or delete on public.usuarios
  for each row execute function privado.usuarios_conservar_superadmin();

-- ---------- Usuarios: se crean solos al crear la cuenta ---------------------
create or replace function privado.usuarios_desde_cuenta()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.usuarios (id, correo)
  values (new.id, new.email)
  on conflict (id) do update set correo = excluded.correo;
  return new;
exception when others then
  -- Crear la cuenta nunca debe fallar por esto; el usuario se puede enlazar
  -- después volviendo a ejecutar este archivo.
  raise warning 'No se pudo enlazar la cuenta con la tabla usuarios: %', sqlerrm;
  return new;
end;
$$;

do $$
begin
  drop trigger if exists usuarios_desde_cuenta on auth.users;
  create trigger usuarios_desde_cuenta
    after insert or update of email on auth.users
    for each row execute function privado.usuarios_desde_cuenta();
exception when others then
  raise notice 'No se pudo enlazar las cuentas con la tabla usuarios: %', sqlerrm;
end
$$;

-- Las cuentas que ya existían quedan inactivas y sin rol hasta que se decida.
insert into public.usuarios (id, correo)
select id, email from auth.users
on conflict (id) do nothing;

-- ---------- Historial -------------------------------------------------------
-- Argumentos del trigger:
--   (ninguno)          guarda la fila completa
--   'sin', col, col…   guarda la fila sin esas columnas (datos personales)
--   'solo', col, col…  guarda únicamente esas columnas
create or replace function privado.registrar_historial()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  modo text := coalesce(tg_argv[0], 'todo');
  columnas text[] := '{}';
  antes jsonb;
  despues jsonb;
  registro uuid;
  quien uuid := (select auth.uid());
begin
  for i in 1 .. tg_nargs - 1 loop
    columnas := columnas || tg_argv[i];
  end loop;

  if tg_op in ('UPDATE', 'DELETE') then
    registro := old.id;
    antes := to_jsonb(old);
  end if;
  if tg_op in ('INSERT', 'UPDATE') then
    registro := new.id;
    despues := to_jsonb(new);
  end if;

  if modo = 'sin' then
    antes := antes - columnas;
    despues := despues - columnas;
  elsif modo = 'solo' then
    antes := (select jsonb_object_agg(c, antes -> c) from unnest(columnas) c where antes is not null);
    despues := (select jsonb_object_agg(c, despues -> c) from unnest(columnas) c where despues is not null);
  end if;

  insert into public.historial (
    usuario_id, usuario, accion, tabla, registro_id, datos_antes, datos_despues)
  values (
    quien,
    (select coalesce(nullif(u.nombre, ''), u.correo) from public.usuarios u where u.id = quien),
    case tg_op when 'INSERT' then 'crear' when 'UPDATE' then 'editar' else 'eliminar' end,
    tg_table_name, registro, antes, despues);

  return null;
end;
$$;

do $$
declare
  regla record;
begin
  for regla in
    select * from (values
      ('portafolio',   'insert or update or delete', ''),
      ('equipo',       'insert or update or delete', ''),
      -- Lo que envía el público no se registra (ya es su propio registro); sí lo
      -- que el panel hace después, y sin copiar datos personales.
      ('consultas',    'update or delete',
       $a$'solo', 'estado', 'origen', 'asignado_a', 'resultado', 'cliente_id'$a$),
      ('clientes',     'insert or update or delete', $a$'sin', 'correo', 'telefono', 'notas'$a$),
      ('proyectos',    'insert or update or delete', ''),
      ('reuniones',    'insert or update or delete', ''),
      ('cambios',      'insert or update or delete', ''),
      ('pagos',        'insert or update or delete', ''),
      ('detalle_pago', 'insert or update or delete', ''),
      ('usuarios',     'insert or update or delete', $a$'sin', 'correo'$a$),
      ('roles',        'insert or update or delete', ''),
      ('rol_permiso',  'insert or update or delete', '')
    ) as x (tabla, cuando, argumentos)
  loop
    execute format('drop trigger if exists registrar_historial on public.%I', regla.tabla);
    execute format(
      'create trigger registrar_historial after %s on public.%I
       for each row execute function privado.registrar_historial(%s)',
      regla.cuando, regla.tabla, regla.argumentos);
  end loop;
end
$$;


-- ============================================================================
-- PARTE 6 · Seguridad por fila (RLS) y permisos de la API
-- ============================================================================

-- Se parte de cero y se concede solo lo necesario. Las políticas de abajo
-- deciden, fila por fila, quién pasa.
revoke all on
  public.equipo, public.portafolio, public.consultas, public.clientes,
  public.proyectos, public.reuniones, public.cambios, public.pagos,
  public.detalle_pago, public.roles, public.permisos, public.rol_permiso,
  public.usuarios, public.historial
from anon, authenticated;

grant usage on schema public to anon, authenticated;

-- Visitante del sitio
grant select on public.portafolio, public.equipo to anon;
grant insert on public.consultas to anon;

-- Persona con sesión (las políticas exigen además el permiso de su rol)
grant select, insert, update, delete on
  public.equipo, public.portafolio, public.consultas, public.clientes,
  public.proyectos, public.reuniones, public.cambios, public.pagos,
  public.detalle_pago
to authenticated;
grant select on public.historial, public.permisos to authenticated;
grant select, insert, update, delete on public.roles to authenticated;
grant select, insert, delete on public.rol_permiso to authenticated;
grant select on public.usuarios to authenticated;
grant update (nombre, rol_id, activo, equipo_id) on public.usuarios to authenticated;

-- ---------- Tablas del panel: una política por acción y permiso -------------
do $$
declare
  regla record;
begin
  for regla in
    select * from (values
      ('portafolio', 'portafolio'), ('equipo', 'equipo'), ('clientes', 'clientes'),
      ('proyectos', 'proyectos'), ('reuniones', 'reuniones'), ('cambios', 'cambios'),
      ('pagos', 'pagos'), ('detalle_pago', 'pagos')
    ) as x (tabla, modulo)
  loop
    execute format('alter table public.%I enable row level security', regla.tabla);

    execute format('drop policy if exists "panel ver" on public.%I', regla.tabla);
    execute format(
      'create policy "panel ver" on public.%I for select to authenticated
       using ((select privado.tiene_permiso(%L)))', regla.tabla, regla.modulo || '.ver');

    execute format('drop policy if exists "panel crear" on public.%I', regla.tabla);
    execute format(
      'create policy "panel crear" on public.%I for insert to authenticated
       with check ((select privado.tiene_permiso(%L)))', regla.tabla, regla.modulo || '.crear');

    execute format('drop policy if exists "panel editar" on public.%I', regla.tabla);
    execute format(
      'create policy "panel editar" on public.%I for update to authenticated
       using ((select privado.tiene_permiso(%L)))
       with check ((select privado.tiene_permiso(%L)))',
      regla.tabla, regla.modulo || '.editar', regla.modulo || '.editar');

    execute format('drop policy if exists "panel eliminar" on public.%I', regla.tabla);
    execute format(
      'create policy "panel eliminar" on public.%I for delete to authenticated
       using ((select privado.tiene_permiso(%L)))', regla.tabla, regla.modulo || '.eliminar');
  end loop;
end
$$;

-- ---------- Lo que ve el sitio público --------------------------------------
drop policy if exists "sitio ve lo publicado" on public.portafolio;
create policy "sitio ve lo publicado"
  on public.portafolio for select
  to anon, authenticated
  using (publicado);

drop policy if exists "sitio ve al equipo visible" on public.equipo;
create policy "sitio ve al equipo visible"
  on public.equipo for select
  to anon, authenticated
  using (visible);

-- ---------- Consultas -------------------------------------------------------
alter table public.consultas enable row level security;

-- Cualquiera puede ENVIAR una consulta; leerlas exige permiso.
drop policy if exists "cualquiera envia consultas" on public.consultas;
create policy "cualquiera envia consultas"
  on public.consultas for insert
  to anon, authenticated
  with check (true);

drop policy if exists "panel ver" on public.consultas;
create policy "panel ver"
  on public.consultas for select
  to authenticated
  using ((select privado.tiene_permiso('consultas.ver')));

drop policy if exists "panel editar" on public.consultas;
create policy "panel editar"
  on public.consultas for update
  to authenticated
  using ((select privado.tiene_permiso('consultas.editar')))
  with check ((select privado.tiene_permiso('consultas.editar')));

drop policy if exists "panel eliminar" on public.consultas;
create policy "panel eliminar"
  on public.consultas for delete
  to authenticated
  using ((select privado.tiene_permiso('consultas.eliminar')));

-- ---------- Historial: solo lectura -----------------------------------------
-- Nadie puede editarlo ni borrarlo por la API: lo escribe solo la base.
alter table public.historial enable row level security;

drop policy if exists "panel ver" on public.historial;
create policy "panel ver"
  on public.historial for select
  to authenticated
  using ((select privado.tiene_permiso('historial.ver')));

-- ---------- Usuarios, roles y permisos: solo el superadmin ------------------
alter table public.usuarios enable row level security;
alter table public.roles enable row level security;
alter table public.permisos enable row level security;
alter table public.rol_permiso enable row level security;

-- Cada persona ve su propia fila; el superadmin, todas.
drop policy if exists "ver usuarios" on public.usuarios;
create policy "ver usuarios"
  on public.usuarios for select
  to authenticated
  using (id = (select auth.uid()) or (select privado.es_superadmin()));

-- Activar, dar de baja o cambiar el rol: solo el superadmin.
drop policy if exists "superadmin edita usuarios" on public.usuarios;
create policy "superadmin edita usuarios"
  on public.usuarios for update
  to authenticated
  using ((select privado.es_superadmin()))
  with check ((select privado.es_superadmin()));

drop policy if exists "superadmin gestiona roles" on public.roles;
create policy "superadmin gestiona roles"
  on public.roles for all
  to authenticated
  using ((select privado.es_superadmin()))
  with check ((select privado.es_superadmin()));

drop policy if exists "superadmin ve permisos" on public.permisos;
create policy "superadmin ve permisos"
  on public.permisos for select
  to authenticated
  using ((select privado.es_superadmin()));

drop policy if exists "superadmin gestiona permisos de roles" on public.rol_permiso;
create policy "superadmin gestiona permisos de roles"
  on public.rol_permiso for all
  to authenticated
  using ((select privado.es_superadmin()))
  with check ((select privado.es_superadmin()));


-- ============================================================================
-- PARTE 7 · Datos iniciales (solo en una base recién creada)
-- ============================================================================
do $inicio$
begin
  if exists (select 1 from public.portafolio)
     or exists (select 1 from public.equipo)
     or exists (select 1 from public.historial) then
    return;   -- la base ya tiene datos: no se toca nada
  end if;

  insert into public.portafolio
    (ruta, titulo, resumen, descripcion, categoria, cliente, caracteristicas, destacado, orden, imagen_portada)
  values
    ('activa-sport', 'Activa Sport',
     'Tienda online de calzado deportivo, pensada para comprar desde el celular.',
     'Tienda online de calzado deportivo. El cliente recorre el catálogo desde su celular, filtra por público y por marca, revisa los colores disponibles de cada modelo, guarda sus favoritos y arma su pedido desde el carrito.',
     'Tienda online', 'Activa Sport',
     array['Filtros por público y por marca', 'Variantes de color en cada modelo', 'Favoritos, carrito y pedidos', 'Consulta directa de cada producto'],
     true, 1, '/images/proyectos/activa-sport.png'),

    ('catalogo-fernandez', 'Catálogo Fernández',
     'Catálogo digital de calzado deportivo para venta por docena y media docena.',
     'Catálogo digital de calzado deportivo orientado a la venta por mayor. Destaca en portada los nuevos ingresos de la temporada y permite recorrer todos los modelos desde el celular, con acceso directo a las redes del negocio.',
     'Catálogo digital', 'Fernández',
     array['Nuevos ingresos destacados en portada', 'Venta por docena o media docena', 'Catálogo navegable desde el celular', 'Acceso directo a redes sociales'],
     true, 2, '/images/proyectos/fernandez.png');

  insert into public.equipo
    (ruta, nombre, cargo, funciones, frase, biografia, habilidades, ubicacion, disponible, destacado, orden)
  values
    ('armando-guerrero', 'Armando Guerrero', 'Fundador',
     array['desarrollador', 'consultor'],
     'Asesoro y desarrollo páginas web a la medida de cada negocio.',
     'Fundador de Dynamic Coding. Acompaña a cada cliente desde la primera asesoría hasta la publicación de su página web.',
     array['Páginas web', 'Tiendas online', 'Asesoría'],
     'Santa Cruz de la Sierra, Bolivia', true, true, 1);
end
$inicio$;


-- ============================================================================
-- PARTE 8 · Imágenes (Supabase Storage)
-- ----------------------------------------------------------------------------
-- Carpeta pública «imagenes»: fotos del equipo (equipo/…) y capturas del
-- portafolio (portafolio/…). Verlas por su dirección no necesita permiso;
-- subir, reemplazar, borrar y listar exige el permiso del módulo.
-- ============================================================================
do $$
begin
  if to_regclass('storage.buckets') is null or to_regclass('storage.objects') is null then
    return;
  end if;

  insert into storage.buckets (id, name, public)
  values ('imagenes', 'imagenes', true)
  on conflict (id) do nothing;

  update storage.buckets
  set file_size_limit = 5242880,   -- 5 MB
      allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp', 'image/avif']
  where id = 'imagenes';

  -- Reglas de la versión anterior, en inglés.
  drop policy if exists "admin read media" on storage.objects;
  drop policy if exists "admin upload media" on storage.objects;
  drop policy if exists "admin update media" on storage.objects;
  drop policy if exists "admin delete media" on storage.objects;

  drop policy if exists "panel lista imagenes" on storage.objects;
  create policy "panel lista imagenes" on storage.objects for select to authenticated
    using (bucket_id = 'imagenes' and privado.puede_gestionar_imagen(name));

  drop policy if exists "panel sube imagenes" on storage.objects;
  create policy "panel sube imagenes" on storage.objects for insert to authenticated
    with check (bucket_id = 'imagenes' and privado.puede_gestionar_imagen(name));

  drop policy if exists "panel reemplaza imagenes" on storage.objects;
  create policy "panel reemplaza imagenes" on storage.objects for update to authenticated
    using (bucket_id = 'imagenes' and privado.puede_gestionar_imagen(name))
    with check (bucket_id = 'imagenes' and privado.puede_gestionar_imagen(name));

  drop policy if exists "panel borra imagenes" on storage.objects;
  create policy "panel borra imagenes" on storage.objects for delete to authenticated
    using (bucket_id = 'imagenes' and privado.puede_gestionar_imagen(name));
exception when others then
  raise notice 'No se pudieron crear las reglas de la carpeta «imagenes»: %', sqlerrm;
end
$$;

-- Avisa a la API de Supabase que la estructura cambió.
notify pgrst, 'reload schema';

commit;


-- ============================================================================
-- PARTE 9 · Cómo nombrar al primer superadmin
-- ----------------------------------------------------------------------------
-- 1) Crea tu cuenta en Supabase → Authentication → Users → Add user.
-- 2) Ejecuta esto, cambiando el correo:
--
--      select privado.nombrar_superadmin('tu-correo@ejemplo.com');
--
-- A las demás personas las activas y les das su rol desde el panel.
-- ============================================================================


-- ============================================================================
-- PARTE 10 · Comprobación final
-- ----------------------------------------------------------------------------
-- Es lo último que se ejecuta: Supabase muestra esta fila como resultado.
-- Todo debe decir «bien». «superadmins» será 0 hasta que te nombres (parte 9).
-- ============================================================================
select
  case when (
    select count(*) from information_schema.columns
    where table_schema = 'public' and column_name = 'id' and data_type = 'uuid'
      and table_name in (
        'equipo', 'portafolio', 'consultas', 'clientes', 'proyectos', 'reuniones',
        'cambios', 'pagos', 'detalle_pago', 'roles', 'permisos', 'rol_permiso',
        'usuarios', 'historial')
  ) = 14 then 'bien' else 'FALTA' end as tablas_con_id_uuid,
  case when to_regclass('public.projects') is null
        and to_regclass('public.team_members') is null
        and to_regclass('public.inquiries') is null
        and to_regclass('public.audit_log') is null
       then 'bien' else 'FALTA' end as sin_tablas_en_ingles,
  case when (
    select count(*) from pg_tables
    where schemaname = 'public' and rowsecurity
      and tablename in (
        'equipo', 'portafolio', 'consultas', 'clientes', 'proyectos', 'reuniones',
        'cambios', 'pagos', 'detalle_pago', 'roles', 'permisos', 'rol_permiso',
        'usuarios', 'historial')
  ) = 14 then 'bien' else 'FALTA' end as seguridad_activa,
  case when (select count(*) from public.roles) >= 8
        and (select count(*) from public.permisos) = 33
       then 'bien' else 'FALTA' end as roles_y_permisos,
  case when exists (
    select 1 from pg_trigger t
    where t.tgname = 'usuarios_desde_cuenta' and t.tgrelid = 'auth.users'::regclass
  ) then 'bien' else 'FALTA' end as cuentas_enlazadas,
  case when (
    select count(*) from storage.buckets where id = 'imagenes' and public
  ) = 1 then 'bien' else 'FALTA' end as carpeta_de_imagenes,
  case when (
    select count(*) from pg_policies
    where schemaname = 'storage' and policyname like 'panel % imagenes'
  ) = 4 then 'bien' else 'FALTA' end as reglas_de_imagenes,
  (select count(*) from public.portafolio) as portafolio,
  (select count(*) from public.equipo) as equipo,
  (select count(*) from public.consultas) as consultas,
  (select count(*) from public.usuarios u join public.roles r on r.id = u.rol_id
    where u.activo and r.clave = 'superadmin') as superadmins;
