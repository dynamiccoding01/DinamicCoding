import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { ProjectGrid } from "@/components/projects/project-card";
import { CTA } from "@/components/sections/cta";
import { getProjects } from "@/lib/data";

// Los datos vienen de Supabase: se regenera como máximo cada 60 s.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Páginas web, catálogos digitales y tiendas online que hemos desarrollado en Dynamic Coding.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Proyectos"
        title="Páginas que ya están funcionando"
        subtitle="Cada proyecto responde a un objetivo distinto. Entra en cualquiera para ver de qué se trata."
      />

      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <Reveal>
            <ProjectGrid projects={projects} />
          </Reveal>
        </Container>
      </section>

      <CTA />
    </>
  );
}
