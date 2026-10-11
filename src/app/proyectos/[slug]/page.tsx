import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Tag,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { serviceTypes } from "@/lib/services";

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
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100">
        <Icon size={18} />
      </span>
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-muted">
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

  // Si la categoría coincide con un tipo de página, enlaza a ese servicio.
  const service = serviceTypes.find((t) => t.title === project.category);

  return (
    <article>
      {/* Cabecera con la captura */}
      <section className="border-b border-line bg-surface-soft">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand-600"
            >
              <ArrowLeft size={16} />
              Volver a proyectos
            </Link>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Badge tone="brand">{project.category}</Badge>
              {project.year && (
                <span className="text-sm text-muted">{project.year}</span>
              )}
            </div>

            <h1 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              {project.title}
            </h1>
            <p className="pin mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
              {project.summary}
            </p>
          </div>

          {project.cover_image && (
            <div className="relative mx-auto h-[26rem] w-full max-w-sm">
              <div
                aria-hidden
                className="shape-diagonal absolute inset-x-0 bottom-0 top-10 rounded-3xl bg-gradient-to-br from-brand-800 to-navy-deep"
              />
              <Image
                src={project.cover_image}
                alt={`Captura de ${project.title}`}
                fill
                sizes="(max-width: 1024px) 80vw, 384px"
                className="object-contain drop-shadow-[0_22px_28px_rgba(6,33,95,0.35)]"
                priority
              />
            </div>
          )}
        </Container>
      </section>

      {/* Contenido */}
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">
              Sobre el proyecto
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink-soft">
              {project.description}
            </p>

            {project.highlights.length > 0 && (
              <>
                <h3 className="mt-10 font-display text-xl font-bold text-navy">
                  Lo que construimos
                </h3>
                <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-500" />
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
                    Ver en vivo
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
            <div className="card rounded-2xl p-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy">
                Detalles
              </h3>
              <dl className="mt-5 space-y-5">
                {project.client && (
                  <MetaItem Icon={Building2} label="Cliente" value={project.client} />
                )}
                {project.year && (
                  <MetaItem Icon={Calendar} label="Año" value={String(project.year)} />
                )}
                <MetaItem Icon={Tag} label="Tipo" value={project.category} />
              </dl>

              {project.technologies.length > 0 && (
                <>
                  <h3 className="mt-7 font-display text-sm font-bold uppercase tracking-wide text-navy">
                    Tecnologías
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} tone="brand">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </>
              )}

              {service && (
                <Link
                  href={`/servicios/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-navy"
                >
                  Ver este tipo de página
                  <ArrowRight size={15} />
                </Link>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center">
              <p className="text-sm font-semibold text-navy">
                ¿Quieres algo similar para tu negocio?
              </p>
              <WhatsAppButton
                message={`Hola, vi el proyecto ${project.title} y quiero algo similar.`}
                size="md"
                className="mt-4 w-full"
              >
                Cotiza por WhatsApp
              </WhatsAppButton>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
