import { getSupabase } from "./supabase/client";
import { DEMO_SLUG, demoMember } from "./demo-profile";
import { seedProjects, seedTeam } from "./seed";
import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  Project,
  TeamMember,
} from "./types";

/**
 * Capa de acceso a datos.
 * Si Supabase está configurado, lee de la base de datos; de lo contrario usa
 * los datos de ejemplo. Ante cualquier error de red/consulta, cae al demo para
 * que el sitio nunca quede en blanco.
 *
 * La base de datos está en español (tablas `portafolio` y `equipo`, ver
 * /supabase/base-de-datos.sql). Aquí, y solo aquí, se traduce cada fila a los
 * tipos del sitio (`Project`, `TeamMember`).
 */

type Row = Record<string, unknown>;

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const textOrNull = (v: unknown) => text(v) || null;
const numberOrNull = (v: unknown) =>
  typeof v === "number" && Number.isFinite(v) ? v : null;
const strings = (v: unknown) =>
  Array.isArray(v) ? v.map(text).filter(Boolean) : [];
const objects = (v: unknown): Row[] =>
  Array.isArray(v) ? v.filter((x) => x && typeof x === "object") : [];

/** Fila de `portafolio` → `Project`. */
function toProject(row: Row): Project {
  return {
    id: text(row.id),
    slug: text(row.ruta),
    title: text(row.titulo),
    summary: text(row.resumen),
    description: text(row.descripcion),
    category: text(row.categoria),
    client: textOrNull(row.cliente),
    year: numberOrNull(row.anio),
    technologies: strings(row.tecnologias),
    highlights: strings(row.caracteristicas),
    cover_image: textOrNull(row.imagen_portada),
    gallery: strings(row.galeria),
    demo_url: textOrNull(row.url_demo),
    repo_url: textOrNull(row.url_repositorio),
    featured: row.destacado === true,
    sort_order: numberOrNull(row.orden) ?? 0,
  };
}

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabase();
  if (!supabase) return seedProjects;

  const { data, error } = await supabase
    .from("portafolio")
    .select("*")
    .order("orden", { ascending: true });

  if (error || !data) {
    console.warn("[data] getProjects → usando datos iniciales:", error?.message);
    return seedProjects;
  }
  return (data as Row[]).map(toProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  return (featured.length ? featured : projects).slice(0, 3);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = getSupabase();
  if (!supabase) return seedProjects.find((p) => p.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("portafolio")
    .select("*")
    .eq("ruta", slug)
    .maybeSingle();

  if (error) {
    console.warn("[data] getProjectBySlug → usando datos iniciales:", error.message);
    return seedProjects.find((p) => p.slug === slug) ?? null;
  }
  return data ? toProject(data as Row) : null;
}

/**
 * Deja un `TeamMember` listo para mostrar. Las listas del perfil (experience,
 * education, certifications) las escribe una persona desde el panel, así que
 * las entradas incompletas se descartan en vez de romper la página.
 */
function normalizeMember(row: TeamMember): TeamMember {
  const experience: ExperienceItem[] = objects(row.experience)
    .filter((e) => text(e.title))
    .map((e) => ({
      title: text(e.title),
      organization: text(e.organization),
      start: text(e.start),
      end: text(e.end) || null,
      description: text(e.description) || undefined,
    }));
  const education: EducationItem[] = objects(row.education)
    .filter((e) => text(e.title))
    .map((e) => ({
      title: text(e.title),
      institution: text(e.institution),
      year: text(e.year) || undefined,
    }));
  const certifications: CertificationItem[] = objects(row.certifications)
    .filter((c) => text(c.name))
    .map((c) => ({
      name: text(c.name),
      issuer: text(c.issuer) || undefined,
      year: text(c.year) || undefined,
      url: /^https?:\/\//.test(text(c.url)) ? text(c.url) : undefined,
    }));

  return {
    ...row,
    roles: strings(row.roles),
    skills: strings(row.skills),
    project_slugs: strings(row.project_slugs),
    available: row.available === true,
    experience,
    education,
    certifications,
    instagram_url: row.instagram_url ?? null,
    facebook_url: row.facebook_url ?? null,
    tiktok_url: row.tiktok_url ?? null,
  };
}

/**
 * Fila de `equipo` → `TeamMember`. Las listas JSON también están en español:
 *   experiencia:     [{cargo, organizacion, inicio, fin, descripcion}]
 *   formacion:       [{titulo, institucion, anio}]
 *   certificaciones: [{nombre, emisor, anio, url}]
 */
function toMember(row: Row): TeamMember {
  return normalizeMember({
    id: text(row.id),
    slug: text(row.ruta),
    name: text(row.nombre),
    role: text(row.cargo),
    roles: strings(row.funciones),
    headline: text(row.frase),
    bio: text(row.biografia),
    avatar_url: textOrNull(row.url_foto),
    skills: strings(row.habilidades),
    location: textOrNull(row.ubicacion),
    years_experience: numberOrNull(row.anios_experiencia),
    available: row.disponible === true,
    experience: objects(row.experiencia).map((e) => ({
      title: text(e.cargo),
      organization: text(e.organizacion),
      start: text(e.inicio),
      end: textOrNull(e.fin),
      description: text(e.descripcion) || undefined,
    })),
    education: objects(row.formacion).map((e) => ({
      title: text(e.titulo),
      institution: text(e.institucion),
      year: text(e.anio) || undefined,
    })),
    certifications: objects(row.certificaciones).map((c) => ({
      name: text(c.nombre),
      issuer: text(c.emisor) || undefined,
      year: text(c.anio) || undefined,
      url: text(c.url) || undefined,
    })),
    project_slugs: strings(row.rutas_portafolio),
    email: textOrNull(row.correo),
    github_url: textOrNull(row.url_github),
    linkedin_url: textOrNull(row.url_linkedin),
    website_url: textOrNull(row.url_sitio_web),
    twitter_url: textOrNull(row.url_twitter),
    instagram_url: textOrNull(row.url_instagram),
    facebook_url: textOrNull(row.url_facebook),
    tiktok_url: textOrNull(row.url_tiktok),
    featured: row.destacado === true,
    sort_order: numberOrNull(row.orden) ?? 0,
  });
}

export async function getTeam(): Promise<TeamMember[]> {
  const supabase = getSupabase();
  if (!supabase) return seedTeam.map(normalizeMember);

  const { data, error } = await supabase
    .from("equipo")
    .select("*")
    .order("orden", { ascending: true });

  if (error || !data) {
    console.warn("[data] getTeam → usando datos iniciales:", error?.message);
    return seedTeam.map(normalizeMember);
  }
  return (data as Row[]).map(toMember);
}

export async function getTeamMemberBySlug(
  slug: string,
): Promise<TeamMember | null> {
  // Perfil de demostración con todas las secciones llenas: solo en desarrollo.
  if (process.env.NODE_ENV === "development" && slug === DEMO_SLUG) {
    return demoMember;
  }

  const fromSeed = () => {
    const member = seedTeam.find((m) => m.slug === slug);
    return member ? normalizeMember(member) : null;
  };

  const supabase = getSupabase();
  if (!supabase) return fromSeed();

  const { data, error } = await supabase
    .from("equipo")
    .select("*")
    .eq("ruta", slug)
    .maybeSingle();

  if (error) {
    console.warn(
      "[data] getTeamMemberBySlug → usando datos iniciales:",
      error.message,
    );
    return fromSeed();
  }
  return data ? toMember(data as Row) : null;
}
