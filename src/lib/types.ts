/**
 * Tipos de dominio del sitio público de Dynamic Coding.
 * Reflejan las tablas de Supabase (ver /supabase/schema.sql).
 */

export interface Project {
  id: string;
  slug: string;
  /** Título del proyecto */
  title: string;
  /** Resumen corto para tarjetas */
  summary: string;
  /** Descripción larga para la página de detalle */
  description: string;
  /** Categoría, ej: "Aplicación web", "App móvil", "E-commerce" */
  category: string;
  /** Cliente o empresa para la que se desarrolló (opcional) */
  client: string | null;
  /** Año de entrega */
  year: number | null;
  /** Tecnologías usadas */
  technologies: string[];
  /** Puntos destacados / funcionalidades clave */
  highlights: string[];
  /** Imagen de portada (URL) */
  cover_image: string | null;
  /** Galería adicional (URLs) */
  gallery: string[];
  /** Enlace a demo en vivo (opcional) */
  demo_url: string | null;
  /** Enlace al repositorio (opcional) */
  repo_url: string | null;
  /** Si se destaca en la portada */
  featured: boolean;
  sort_order: number;
}

/** Un puesto en la trayectoria de la persona (perfil estilo CV). */
export interface ExperienceItem {
  /** Cargo, ej: "Desarrollador web" */
  title: string;
  /** Empresa u organización */
  organization: string;
  /** Inicio, texto libre: "2021" o "Mar 2021" */
  start: string;
  /** Fin; `null` significa que sigue ahí ("hoy") */
  end: string | null;
  /** Qué hizo o logró, en una o dos líneas (opcional) */
  description?: string;
}

/** Un estudio o título. */
export interface EducationItem {
  /** Título o carrera */
  title: string;
  institution: string;
  /** Año o periodo, texto libre (opcional) */
  year?: string;
}

/** Una certificación, con enlace para verificarla si existe. */
export interface CertificationItem {
  name: string;
  issuer?: string;
  year?: string;
  url?: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  /** Cargo visible, ej: "Fundador" */
  role: string;
  /**
   * Roles que cumple en la empresa: "desarrollador", "consultor",
   * "promotor"… Una persona puede tener varios. Etiquetas en lib/roles.ts
   */
  roles: string[];
  /** Frase corta que resume su perfil */
  headline: string;
  /** Biografía profesional larga */
  bio: string;
  /** Foto de perfil (URL) */
  avatar_url: string | null;
  /** Habilidades / stack principal */
  skills: string[];
  /** Ubicación (opcional) */
  location: string | null;
  /** Años de experiencia (opcional) */
  years_experience: number | null;
  /** Muestra la etiqueta «Disponible para consultas» */
  available: boolean;
  /** Trayectoria, de lo más reciente a lo más antiguo */
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  /** `slug` de los proyectos en los que participó (tabla projects) */
  project_slugs: string[];
  /** Enlaces profesionales y redes */
  email: string | null;
  /** Si existe, el perfil muestra además sus datos públicos de GitHub */
  github_url: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  /** Si se destaca en la portada */
  featured: boolean;
  sort_order: number;
}

/** Datos que envía el formulario público de consulta. */
export interface InquiryInput {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  message: string;
}
