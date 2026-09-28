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

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  /** Rol/cargo, ej: "Full-Stack Developer" */
  role: string;
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
  /** Enlaces profesionales */
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  twitter_url: string | null;
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
