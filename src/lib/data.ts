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
 */

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabase();
  if (!supabase) return seedProjects;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.warn("[data] getProjects → usando datos iniciales:", error?.message);
    return seedProjects;
  }
  return data as Project[];
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
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.warn("[data] getProjectBySlug → usando datos iniciales:", error.message);
    return seedProjects.find((p) => p.slug === slug) ?? null;
  }
  return (data as Project | null) ?? null;
}

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const strings = (v: unknown) =>
  Array.isArray(v) ? v.map(text).filter(Boolean) : [];
const objects = (v: unknown): Record<string, unknown>[] =>
  Array.isArray(v) ? v.filter((x) => x && typeof x === "object") : [];

/**
 * Deja una fila de `team_members` con la forma de `TeamMember`. Las columnas
 * jsonb (experience, education, certifications) las escribe una persona desde
 * el panel, así que las entradas incompletas se descartan en vez de romper la
 * página; lo mismo si faltan columnas que el perfil espera.
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

export async function getTeam(): Promise<TeamMember[]> {
  const supabase = getSupabase();
  if (!supabase) return seedTeam.map(normalizeMember);

  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.warn("[data] getTeam → usando datos iniciales:", error?.message);
    return seedTeam.map(normalizeMember);
  }
  return (data as TeamMember[]).map(normalizeMember);
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
    .from("team_members")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.warn(
      "[data] getTeamMemberBySlug → usando datos iniciales:",
      error.message,
    );
    return fromSeed();
  }
  return data ? normalizeMember(data as TeamMember) : null;
}
