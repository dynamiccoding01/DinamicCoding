-- ============================================================================
-- Dynamic Coding — Datos de ejemplo (opcional)
-- Ejecuta DESPUÉS de schema.sql para poblar la base con los mismos datos que
-- ves en modo demo. Luego puedes editarlos/agregarlos desde el panel admin.
-- ============================================================================

-- ---------- Proyectos -------------------------------------------------------
insert into public.projects
  (slug, title, summary, description, category, client, year, technologies, highlights, featured, sort_order, cover_image)
values
  ('plataforma-logistica-nova', 'Plataforma Logística Nova',
   'Sistema web de gestión de flotas y rutas en tiempo real para una empresa de distribución nacional.',
   'Desarrollamos una plataforma integral que centraliza la operación logística: seguimiento GPS de la flota en tiempo real, optimización automática de rutas, control de entregas con evidencia fotográfica y un panel de indicadores para gerencia. La solución redujo los tiempos de entrega en un 28% y eliminó el uso de planillas manuales.',
   'Aplicación web', 'Distribuidora Nova', 2024,
   ARRAY['Next.js','TypeScript','Node.js','PostgreSQL','Mapbox','Docker'],
   ARRAY['Seguimiento GPS en tiempo real','Optimización automática de rutas','App de conductor con evidencia de entrega','Panel de indicadores para gerencia'],
   true, 1, '/images/proj-logistica.jpg'),

  ('tienda-online-aurora', 'E-commerce Aurora',
   'Tienda online con pasarela de pagos, gestión de inventario y catálogo de más de 5.000 productos.',
   'Aurora es una tienda en línea de alto rendimiento construida para escalar. Integramos pasarela de pagos, control de stock en tiempo real, cupones, envíos calculados por zona y un checkout optimizado para conversión. El sitio carga en menos de un segundo y mejoró la tasa de conversión en un 35%.',
   'E-commerce', 'Comercial Aurora', 2024,
   ARRAY['Next.js','Stripe','Supabase','Tailwind CSS','Vercel'],
   ARRAY['Checkout optimizado para conversión','Inventario en tiempo real','Pasarela de pagos integrada','Rendimiento < 1s de carga'],
   true, 2, '/images/proj-ecommerce.jpg'),

  ('app-salud-vitalis', 'App Móvil Vitalis',
   'Aplicación móvil para agendar citas médicas, teleconsulta y seguimiento de tratamientos.',
   'Vitalis conecta pacientes con profesionales de la salud. Incluye agenda de citas, videollamada para teleconsulta, recordatorios de medicación e historial clínico. Cumple con estándares de privacidad de datos y funciona sin conexión para las funciones esenciales.',
   'App móvil', 'Clínica Vitalis', 2023,
   ARRAY['React Native','Expo','Node.js','PostgreSQL','WebRTC'],
   ARRAY['Teleconsulta por video','Recordatorios de medicación','Historial clínico seguro','Modo sin conexión'],
   true, 3, '/images/proj-mobile.jpg'),

  ('dashboard-financiero-quantum', 'Dashboard Financiero Quantum',
   'Tablero de análisis financiero con reportes automáticos y proyecciones basadas en datos.',
   'Construimos un panel que unifica las fuentes contables de la empresa y genera reportes automáticos, flujo de caja proyectado y alertas inteligentes. Los directivos pasaron de esperar reportes mensuales a tener información al día en segundos.',
   'Business Intelligence', 'Grupo Quantum', 2023,
   ARRAY['React','Python','FastAPI','PostgreSQL','Recharts'],
   ARRAY['Reportes automáticos','Flujo de caja proyectado','Alertas inteligentes','Integración con sistemas contables'],
   false, 4, '/images/proj-dashboard.jpg'),

  ('portal-educativo-lumen', 'Portal Educativo Lumen',
   'Plataforma de cursos en línea con videos, evaluaciones y certificados automáticos.',
   'Lumen es un LMS a la medida: gestión de cursos, reproducción de video protegida, evaluaciones automáticas, seguimiento de progreso y emisión de certificados. Soporta miles de estudiantes concurrentes sin degradar el rendimiento.',
   'Plataforma educativa', 'Instituto Lumen', 2022,
   ARRAY['Next.js','Supabase','Mux','Tailwind CSS'],
   ARRAY['Reproducción de video protegida','Evaluaciones automáticas','Certificados digitales','Seguimiento de progreso'],
   false, 5, '/images/proj-education.jpg'),

  ('sistema-inventario-kardex', 'Sistema de Inventario y Kardex',
   'Control de inventario con kardex valorizado, movimientos y reportes para múltiples almacenes.',
   'Sistema de gestión de inventario con kardex valorizado (PEPS/promedio), registro de entradas y salidas, transferencias entre almacenes, alertas de stock mínimo y reportes exportables. Diseñado para operar en tiempo real con múltiples sucursales.',
   'Sistema de gestión', 'Ferretería Central', 2022,
   ARRAY['React','Node.js','PostgreSQL','Express'],
   ARRAY['Kardex valorizado (PEPS / promedio)','Multi-almacén y transferencias','Alertas de stock mínimo','Reportes exportables'],
   false, 6, '/images/proj-inventory.jpg')
on conflict (slug) do nothing;

-- ---------- Equipo ----------------------------------------------------------
insert into public.team_members
  (slug, name, role, headline, bio, skills, location, years_experience, email, github_url, linkedin_url, featured, sort_order)
values
  ('armando-guerrero', 'Armando Guerrero', 'Founder & Full-Stack Developer',
   'Construyo productos digitales de punta a punta.',
   'Fundador de Dynamic Coding. Más de 8 años diseñando y desarrollando aplicaciones web y móviles. Especializado en arquitecturas escalables con Next.js, Node.js y bases de datos relacionales. Me apasiona convertir problemas de negocio en software claro, rápido y mantenible.',
   ARRAY['Next.js','TypeScript','Node.js','PostgreSQL','Supabase','AWS'],
   'Lima, Perú', 8, 'armando@dynamiccoding.dev', 'https://github.com/', 'https://linkedin.com/', true, 1),

  ('valentina-rios', 'Valentina Ríos', 'Frontend Engineer & UI Designer',
   'Interfaces bonitas que además funcionan.',
   'Ingeniera frontend con ojo de diseñadora. Traduzco ideas y wireframes en interfaces accesibles y pulidas. Trabajo con React, Tailwind y sistemas de diseño para que cada producto se sienta cuidado en cada detalle.',
   ARRAY['React','Next.js','Tailwind CSS','Figma','Accesibilidad','Framer Motion'],
   'Bogotá, Colombia', 6, 'valentina@dynamiccoding.dev', 'https://github.com/', 'https://linkedin.com/', true, 2),

  ('mateo-fernandez', 'Mateo Fernández', 'Backend Engineer',
   'APIs sólidas y datos que no fallan.',
   'Especialista en backend y bases de datos. Diseño APIs robustas, seguras y bien documentadas, y me obsesiona el rendimiento de las consultas. Experiencia en sistemas de alto tráfico y arquitecturas orientadas a servicios.',
   ARRAY['Node.js','Python','PostgreSQL','Redis','Docker','GraphQL'],
   'Buenos Aires, Argentina', 7, 'mateo@dynamiccoding.dev', 'https://github.com/', 'https://linkedin.com/', true, 3),

  ('camila-torres', 'Camila Torres', 'Mobile Developer',
   'Apps móviles que la gente disfruta usar.',
   'Desarrolladora móvil enfocada en experiencias fluidas en iOS y Android. Trabajo con React Native y Flutter, cuidando el rendimiento y la sensación nativa. He publicado apps con miles de usuarios activos.',
   ARRAY['React Native','Flutter','Expo','Swift','Kotlin'],
   'Santiago, Chile', 5, 'camila@dynamiccoding.dev', 'https://github.com/', 'https://linkedin.com/', false, 4),

  ('diego-ramirez', 'Diego Ramírez', 'DevOps & Cloud Engineer',
   'Infraestructura estable, despliegues sin drama.',
   'Me encargo de que todo lo que construimos corra rápido, seguro y sin caídas. Automatizo despliegues, monitoreo y escalado en la nube. Experiencia con AWS, contenedores y pipelines de CI/CD.',
   ARRAY['AWS','Docker','Kubernetes','Terraform','CI/CD','Linux'],
   'Ciudad de México, México', 9, 'diego@dynamiccoding.dev', 'https://github.com/', 'https://linkedin.com/', false, 5)
on conflict (slug) do nothing;
