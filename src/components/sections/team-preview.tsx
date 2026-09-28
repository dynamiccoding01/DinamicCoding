import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { TeamCard } from "@/components/team/team-card";
import { getFeaturedTeam } from "@/lib/data";

export async function TeamPreview() {
  const team = await getFeaturedTeam();

  return (
    <section className="border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Nuestro equipo"
          title="Las personas detrás del código"
          subtitle="Un equipo multidisciplinario. Haz clic en cualquier perfil para conocer su experiencia, habilidades y enlaces profesionales."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.slice(0, 3).map((member, i) => (
            <Reveal key={member.id} delay={i * 80}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/equipo" variant="secondary">
            Conocer a todo el equipo
            <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
