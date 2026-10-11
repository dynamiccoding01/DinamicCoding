import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { TeamCard } from "@/components/team/team-card";
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
        eyebrow="Equipo"
        title="Las personas que te atienden"
        subtitle="Aquí sabes con quién hablas. Entra en cada perfil para conocer su rol y su experiencia."
      />

      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.id} delay={(i % 3) * 80} className="h-full">
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
