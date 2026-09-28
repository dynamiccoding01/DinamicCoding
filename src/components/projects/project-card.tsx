import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

/** Portada del proyecto: imagen si existe, si no un marcador con degradado. */
function Cover({ project }: { project: Project }) {
  if (project.cover_image) {
    return (
      <Image
        src={project.cover_image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  return (
    <div className="bg-grid flex h-full w-full items-center justify-center bg-gradient-to-br from-navy to-brand-500 transition-transform duration-500 group-hover:scale-105">
      <span className="px-6 text-center font-display text-lg font-bold tracking-tight text-white/95">
        {project.title}
      </span>
    </div>
  );
}

/** Tarjeta de proyecto en la vitrina. Enlaza a la página de detalle. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="glass card-glow group flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Cover project={project} />
        <div className="absolute left-4 top-4">
          <Badge tone="brand" className="bg-surface/70 backdrop-blur">
            {project.category}
          </Badge>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-brand-700">
            {project.title}
          </h3>
          <ArrowUpRight
            size={20}
            className="mt-0.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600"
          />
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge>+{project.technologies.length - 4}</Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
