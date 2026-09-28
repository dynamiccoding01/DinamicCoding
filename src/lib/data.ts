import { getSupabase } from "./supabase/client";
import { seedProjects, seedTeam } from "./seed";
import type { Project, TeamMember } from "./types";

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
    console.warn("[data] getProjects → usando demo:", error?.message);
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
    console.warn("[data] getProjectBySlug → usando demo:", error.message);
    return seedProjects.find((p) => p.slug === slug) ?? null;
  }
  return (data as Project | null) ?? null;
}

export async function getTeam(): Promise<TeamMember[]> {
  const supabase = getSupabase();
  if (!supabase) return seedTeam;

  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.warn("[data] getTeam → usando demo:", error?.message);
    return seedTeam;
  }
  return data as TeamMember[];
}

export async function getFeaturedTeam(): Promise<TeamMember[]> {
  const team = await getTeam();
  const featured = team.filter((m) => m.featured);
  return featured.length ? featured : team;
}

export async function getTeamMemberBySlug(
  slug: string,
): Promise<TeamMember | null> {
  const supabase = getSupabase();
  if (!supabase) return seedTeam.find((m) => m.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.warn("[data] getTeamMemberBySlug → usando demo:", error.message);
    return seedTeam.find((m) => m.slug === slug) ?? null;
  }
  return (data as TeamMember | null) ?? null;
}
