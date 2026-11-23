import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectGrid } from "@/components/projects/project-card";
import { getFeaturedProjects } from "@/lib/data";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();
  if (projects.length === 0) return null;

  return (
    <section id="proyectos" className="panel py-14 sm:py-24">
      <Container>
        <SectionHeading
          align="left"
          eyebrow="Proyectos"
          title="Páginas que ya están funcionando"
          subtitle="Una muestra del trabajo que hemos desarrollado para nuestros clientes."
          className="max-w-xl"
        />

        <div className="mt-12">
          <ProjectGrid projects={projects} />
        </div>
      </Container>
    </section>
  );
}
