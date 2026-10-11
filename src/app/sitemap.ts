import type { MetadataRoute } from "next";
import { getProjects, getTeam } from "@/lib/data";
import { serviceTypes } from "@/lib/services";
import { siteUrl as base } from "@/lib/site";

// Igual que las páginas: se regenera para incluir proyectos/perfiles nuevos.
export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/servicios`, lastModified: now, priority: 0.9 },
    { url: `${base}/proyectos`, lastModified: now, priority: 0.8 },
    { url: `${base}/equipo`, lastModified: now, priority: 0.7 },
    { url: `${base}/contacto`, lastModified: now, priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceTypes.map((type) => ({
    url: `${base}/servicios/${type.slug}`,
    lastModified: now,
    priority: 0.8,
  }));

  const [projects, team] = await Promise.all([getProjects(), getTeam()]);

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/proyectos/${p.slug}`,
    lastModified: now,
    priority: 0.6,
  }));

  const teamRoutes: MetadataRoute.Sitemap = team.map((m) => ({
    url: `${base}/equipo/${m.slug}`,
    lastModified: now,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...teamRoutes];
}
