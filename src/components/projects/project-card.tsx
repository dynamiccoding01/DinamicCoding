import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

/**
 * Portada del proyecto sobre un panel con el tono de la marca. La imagen se
 * ancla arriba y se recorta por abajo, así una captura de celular «asoma» y
 * una captura horizontal queda enmarcada.
 */
function Cover({ project }: { project: Project }) {
  return (
    <div className="relative aspect-16/11 overflow-hidden bg-linear-to-b from-brand-100 to-brand-50">
      {project.cover_image ? (
        <div className="absolute inset-x-[27%] bottom-0 top-[10%] transition-transform duration-500 group-hover:-translate-y-2">
          <Image
            src={project.cover_image}
            alt={`Captura de ${project.title}`}
            fill
            sizes="(max-width: 640px) 50vw, 260px"
            className="object-cover object-top drop-shadow-[0_18px_22px_rgba(6,33,95,0.28)]"
          />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center px-6">
          <span className="text-center font-display text-xl font-extrabold tracking-tight text-navy">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}

const cardClass =
  "card card-hover group flex h-full flex-col overflow-hidden rounded-2xl";

/** Tarjeta de proyecto en la vitrina. Si tiene demo en vivo, enlaza a ella. */
export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <Cover project={project} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-navy">
            {project.category} - {project.title}
          </h3>
          {project.demo_url && (
            <ArrowUpRight
              size={20}
              className="mt-0.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600"
            />
          )}
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        {project.technologies.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge>+{project.technologies.length - 4}</Badge>
            )}
          </div>
        )}
      </div>
    </>
  );

  return project.demo_url ? (
    <a
      href={project.demo_url}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      {content}
    </a>
  ) : (
    <div className={cardClass}>{content}</div>
  );
}

/** Grilla de proyectos: dos columnas si son pocos, tres si hay más. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2",
        projects.length > 2 && "lg:grid-cols-3",
      )}
    >
      {projects.map((project, i) => (
        <Reveal
          key={project.id}
          variant="zoom"
          delay={(i % 3) * 150}
          className="h-full"
        >
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
