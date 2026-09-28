import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { TeamCard } from "@/components/team/team-card";
import { getTeam } from "@/lib/data";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Conoce al equipo de Dynamic Coding: desarrolladores, diseñadores e ingenieros. Haz clic en cada perfil para ver su experiencia y enlaces profesionales.",
};

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <PageHeader
        eyebrow="Nuestro equipo"
        title="Las personas detrás de Dynamic Coding"
        subtitle="Un equipo multidisciplinario de desarrolladores, diseñadores e ingenieros. Haz clic en cualquier perfil para conocerlo a fondo."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.id} delay={(i % 3) * 80}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
