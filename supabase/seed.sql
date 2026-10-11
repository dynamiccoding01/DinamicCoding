-- ============================================================================
-- Dynamic Coding — Datos iniciales
-- Ejecuta DESPUÉS de schema.sql. Carga los mismos proyectos y personas que el
-- sitio muestra sin base de datos (src/lib/seed.ts). Sin estos datos, el
-- portafolio y el equipo quedarían vacíos. Luego se editan desde el panel
-- admin o desde el Table Editor de Supabase.
-- ============================================================================

-- ---------- Proyectos -------------------------------------------------------
insert into public.projects
  (slug, title, summary, description, category, client, highlights, featured, sort_order, cover_image)
values
  ('activa-sport', 'Activa Sport',
   'Tienda online de calzado deportivo, pensada para comprar desde el celular.',
   'Tienda online de calzado deportivo. El cliente recorre el catálogo desde su celular, filtra por público y por marca, revisa los colores disponibles de cada modelo, guarda sus favoritos y arma su pedido desde el carrito.',
   'Tienda online', 'Activa Sport',
   ARRAY['Filtros por público y por marca','Variantes de color en cada modelo','Favoritos, carrito y pedidos','Consulta directa de cada producto'],
   true, 1, '/images/proyectos/activa-sport.png'),

  ('catalogo-fernandez', 'Catálogo Fernández',
   'Catálogo digital de calzado deportivo para venta por docena y media docena.',
   'Catálogo digital de calzado deportivo orientado a la venta por mayor. Destaca en portada los nuevos ingresos de la temporada y permite recorrer todos los modelos desde el celular, con acceso directo a las redes del negocio.',
   'Catálogo digital', 'Fernández',
   ARRAY['Nuevos ingresos destacados en portada','Venta por docena o media docena','Catálogo navegable desde el celular','Acceso directo a redes sociales'],
   true, 2, '/images/proyectos/fernandez.png')
on conflict (slug) do nothing;

-- ---------- Equipo ----------------------------------------------------------
insert into public.team_members
  (slug, name, role, roles, headline, bio, skills, location, available, featured, sort_order)
values
  ('armando-guerrero', 'Armando Guerrero', 'Fundador',
   ARRAY['desarrollador','consultor'],
   'Asesoro y desarrollo páginas web a la medida de cada negocio.',
   'Fundador de Dynamic Coding. Acompaña a cada cliente desde la primera asesoría hasta la publicación de su página web.',
   ARRAY['Páginas web','Tiendas online','Asesoría'],
   'Santa Cruz de la Sierra, Bolivia', true, true, 1)
on conflict (slug) do nothing;
