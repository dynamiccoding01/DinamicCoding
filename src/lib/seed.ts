import type { Project, TeamMember } from "./types";

/**
 * Datos iniciales del sitio.
 * Se usan automáticamente mientras Supabase no esté configurado. Una vez
 * conectado Supabase, se reemplazan por los de la base de datos (que parte de
 * estos mismos datos: ver /supabase/base-de-datos.sql). Ver /src/lib/data.ts
 *
 * Son proyectos y personas reales de la empresa: no agregar datos de relleno.
 */

export const seedProjects: Project[] = [
  {
    id: "seed-activa-sport",
    slug: "activa-sport",
    title: "Activa Sport",
    summary:
      "Tienda online de calzado deportivo, pensada para comprar desde el celular.",
    description:
      "Tienda online de calzado deportivo. El cliente recorre el catálogo desde su celular, filtra por público y por marca, revisa los colores disponibles de cada modelo, guarda sus favoritos y arma su pedido desde el carrito.",
    category: "Tienda online",
    client: "Activa Sport",
    year: null,
    technologies: [],
    highlights: [
      "Filtros por público y por marca",
      "Variantes de color en cada modelo",
      "Favoritos, carrito y pedidos",
      "Consulta directa de cada producto",
    ],
    cover_image: "/images/proyectos/activa-sport.png",
    gallery: [],
    demo_url: null,
    repo_url: null,
    featured: true,
    sort_order: 1,
  },
  {
    id: "seed-fernandez",
    slug: "catalogo-fernandez",
    title: "Catálogo Fernández",
    summary:
      "Catálogo digital de calzado deportivo para venta por docena y media docena.",
    description:
      "Catálogo digital de calzado deportivo orientado a la venta por mayor. Destaca en portada los nuevos ingresos de la temporada y permite recorrer todos los modelos desde el celular, con acceso directo a las redes del negocio.",
    category: "Catálogo digital",
    client: "Fernández",
    year: null,
    technologies: [],
    highlights: [
      "Nuevos ingresos destacados en portada",
      "Venta por docena o media docena",
      "Catálogo navegable desde el celular",
      "Acceso directo a redes sociales",
    ],
    cover_image: "/images/proyectos/fernandez.png",
    gallery: [],
    demo_url: null,
    repo_url: null,
    featured: true,
    sort_order: 2,
  },
];

export const seedTeam: TeamMember[] = [
  {
    id: "seed-armando-guerrero",
    slug: "armando-guerrero",
    name: "Armando Guerrero",
    role: "Fundador",
    roles: ["desarrollador", "consultor"],
    headline: "Asesoro y desarrollo páginas web a la medida de cada negocio.",
    bio: "Fundador de Dynamic Coding. Acompaña a cada cliente desde la primera asesoría hasta la publicación de su página web.",
    avatar_url: null,
    skills: ["Páginas web", "Tiendas online", "Asesoría"],
    location: "Santa Cruz de la Sierra, Bolivia",
    years_experience: null,
    available: true,
    // El resto del perfil (trayectoria, formación, redes) se carga desde el
    // panel de administración; mientras esté vacío, esas secciones no se ven.
    experience: [],
    education: [],
    certifications: [],
    project_slugs: [],
    email: null,
    github_url: null,
    linkedin_url: null,
    website_url: null,
    twitter_url: null,
    instagram_url: null,
    facebook_url: null,
    tiktok_url: null,
    featured: true,
    sort_order: 1,
  },
];
