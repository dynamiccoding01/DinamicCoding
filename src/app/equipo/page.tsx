import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { TeamDirectory } from "@/components/team/team-directory";
import { CTA } from "@/components/sections/cta";
import { getTeam } from "@/lib/data";

// Los datos vienen de Supabase: se regenera como máximo cada 60 s.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Conoce a las personas de Dynamic Coding que te asesoran y desarrollan tu página web.",
};

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <PageHeader
        breadcrumb="Equipo"
        title="Las personas que te atienden"
        subtitle="Aquí sabes con quién hablas. Entra en cada perfil para conocer su rol y su experiencia."
      />

      <section className="panel py-10 sm:py-12">
        <Container>
          {/* Solo lo que usa la tarjeta: el filtro corre en el navegador. */}
          <TeamDirectory
            members={team.map(({ id, slug, name, role, roles, headline, avatar_url }) => ({
              id,
              slug,
              name,
              role,
              roles,
              headline,
              avatar_url,
            }))}
          />
        </Container>
      </section>

      <CTA />
    </>
  );
}
