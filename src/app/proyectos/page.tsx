import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Explora los proyectos de software que hemos desarrollado en Dynamic Coding: aplicaciones web, móviles y sistemas de gestión.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Portafolio"
        title="Nuestros proyectos"
        subtitle="Cada proyecto es un problema de negocio resuelto con software. Haz clic en cualquiera para ver de qué se trata y cómo lo construimos."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 3) * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
