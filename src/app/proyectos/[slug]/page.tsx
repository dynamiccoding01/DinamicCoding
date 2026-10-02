import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Building2,
  Calendar,
  Tag,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getProjects } from "@/lib/data";

// Los datos vienen de Supabase: se regenera como máximo cada 60 s.
export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return { title: project.title, description: project.summary };
}

function MetaItem({
  Icon,
  label,
  value,
}: {
  Icon: typeof Tag;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10 text-brand-600 ring-1 ring-cyan/20">
        <Icon size={18} />
      </span>
      <div>
        <dt className="font-mono text-xs uppercase tracking-wide text-muted">
          {label}
        </dt>
        <dd className="text-sm font-semibold text-ink">{value}</dd>
      </div>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="pb-20">
      {/* Cabecera */}
      <section className="border-b border-line">
        <Container className="py-10 sm:py-14">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand-600"
          >
            <ArrowLeft size={16} />
            Volver a proyectos
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="brand">{project.category}</Badge>
            {project.year && (
              <span className="font-mono text-sm text-muted">{project.year}</span>
            )}
          </div>

          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            {project.summary}
          </p>
        </Container>
      </section>

      {/* Portada */}
      <Container>
        <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40 sm:aspect-[16/6]">
          {project.cover_image ? (
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="bg-grid flex h-full w-full items-center justify-center bg-gradient-to-br from-navy to-brand-500">
              <span className="px-6 text-center font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {project.title}
              </span>
            </div>
          )}
        </div>
      </Container>

      {/* Contenido */}
      <Container className="mt-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              Sobre el proyecto
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink-soft">
              {project.description}
            </p>

            {project.highlights.length > 0 && (
              <>
                <h3 className="mt-10 font-display text-xl font-semibold text-ink">
                  Lo que construimos
                </h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-600" />
                      <span className="text-sm leading-relaxed text-ink-soft">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {(project.demo_url || project.repo_url) && (
              <div className="mt-10 flex flex-wrap gap-3">
                {project.demo_url && (
                  <Button href={project.demo_url} external>
                    Ver demo
                    <ExternalLink size={16} />
                  </Button>
                )}
                {project.repo_url && (
                  <Button href={project.repo_url} external variant="secondary">
                    <GithubIcon size={16} />
                    Repositorio
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Barra lateral */}
          <aside className="lg:col-span-1">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
                Detalles
              </h3>
              <dl className="mt-5 space-y-5">
                {project.client && (
                  <MetaItem Icon={Building2} label="Cliente" value={project.client} />
                )}
                {project.year && (
                  <MetaItem Icon={Calendar} label="Año" value={String(project.year)} />
                )}
                <MetaItem Icon={Tag} label="Categoría" value={project.category} />
              </dl>

              <h3 className="mt-7 font-display text-sm font-semibold uppercase tracking-wide text-ink">
                Tecnologías
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} tone="brand">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cyan/20 bg-cyan/5 p-6 text-center">
              <p className="text-sm font-medium text-ink">¿Quieres algo similar?</p>
              <Button href="/contacto" size="sm" className="mt-4 w-full">
                Solicitar una consulta
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
