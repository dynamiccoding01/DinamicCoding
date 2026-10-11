import type { TeamMember } from "./types";

/**
 * Perfil de demostración con TODAS las secciones llenas, para ver y probar el
 * diseño del perfil mientras el personal real todavía no está cargado.
 *
 * Solo existe en desarrollo (`npm run dev` → /equipo/demo): `data.ts` no lo
 * devuelve en producción y no aparece en la lista del equipo. Sus datos son
 * inventados a propósito; no copiarlos a seed.ts ni a la base de datos.
 */
export const DEMO_SLUG = "demo";

export const demoMember: TeamMember = {
  id: "demo",
  slug: DEMO_SLUG,
  name: "Perfil de ejemplo",
  role: "Cargo en la empresa",
  roles: ["desarrollador", "consultor"],
  headline: "Una frase corta que resume a qué se dedica y cómo ayuda al cliente.",
  bio: "Aquí va la presentación de la persona: quién es, en qué se especializa y cómo trabaja con los clientes. Dos o tres líneas escritas en primera o tercera persona, con un tono cercano y profesional.",
  avatar_url: null,
  skills: [
    "Páginas web",
    "Tiendas online",
    "Catálogos digitales",
    "Asesoría",
    "Diseño de interfaces",
  ],
  location: "Santa Cruz de la Sierra, Bolivia",
  years_experience: 5,
  available: true,
  experience: [
    {
      title: "Cargo actual",
      organization: "Dynamic Coding",
      start: "2024",
      end: null,
      description:
        "Qué hace en este puesto y qué resultados logró, en una o dos líneas.",
    },
    {
      title: "Cargo anterior",
      organization: "Nombre de la empresa",
      start: "2021",
      end: "2024",
      description: "Responsabilidades principales de esa etapa.",
    },
    {
      title: "Primer cargo",
      organization: "Otra empresa",
      start: "2019",
      end: "2021",
    },
  ],
  education: [
    {
      title: "Título o carrera",
      institution: "Universidad o instituto",
      year: "2019",
    },
  ],
  certifications: [
    {
      name: "Nombre de la certificación",
      issuer: "Entidad que la otorga",
      year: "2023",
      url: "https://example.com",
    },
    { name: "Otra certificación", issuer: "Otra entidad", year: "2022" },
  ],
  project_slugs: ["activa-sport", "catalogo-fernandez"],
  email: "nombre@example.com",
  // Usuario real, para que el bloque de GitHub muestre datos verdaderos.
  github_url: "https://github.com/Armand0777",
  linkedin_url: "https://www.linkedin.com/",
  website_url: null,
  twitter_url: null,
  instagram_url: "https://www.instagram.com/",
  facebook_url: "https://www.facebook.com/",
  tiktok_url: null,
  featured: false,
  sort_order: 0,
};
