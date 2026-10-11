import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectGrid } from "@/components/projects/project-card";
import { getFeaturedProjects } from "@/lib/data";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();
  if (projects.length === 0) return null;

  return (
    <section className="border-b border-line py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Proyectos"
            title="Páginas que ya están funcionando"
            subtitle="Una muestra del trabajo que hemos desarrollado para nuestros clientes."
            className="max-w-xl"
          />
          <Button href="/proyectos" variant="secondary" size="sm">
            Ver todos
            <ArrowRight size={16} />
          </Button>
        </div>

        <Reveal className="mt-12">
          <ProjectGrid projects={projects} />
        </Reveal>
      </Container>
    </section>
  );
}
