import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { SocialLinks } from "@/components/team/social-links";
import { getTeam, getTeamMemberBySlug } from "@/lib/data";

// Los datos vienen de Supabase: se regenera como máximo cada 60 s.
export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams() {
  const team = await getTeam();
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return { title: "Perfil no encontrado" };
  return { title: `${member.name} — ${member.role}`, description: member.headline };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) notFound();

  return (
    <div className="pb-20">
      {/* Cabecera del perfil */}
      <section className="border-b border-line">
        <Container className="py-10 sm:py-14">
          <Link
            href="/equipo"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand-600"
          >
            <ArrowLeft size={16} />
            Volver al equipo
          </Link>

          <div className="mt-8 flex flex-col items-start gap-7 sm:flex-row sm:items-center">
            <Avatar
              name={member.name}
              src={member.avatar_url}
              size={128}
              className="ring-4 ring-brand-50"
            />
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {member.name}
              </h1>
              <p className="mt-1 text-lg font-medium text-brand-600">{member.role}</p>
              <p className="mt-3 max-w-xl text-pretty text-muted">
                {member.headline}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                {member.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={15} />
                    {member.location}
                  </span>
                )}
                {member.years_experience != null && (
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase size={15} />
                    {member.years_experience}+ años de experiencia
                  </span>
                )}
              </div>

              <SocialLinks member={member} className="mt-5" />
            </div>
          </div>
        </Container>
      </section>

      {/* Contenido del perfil */}
      <Container className="mt-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              Perfil profesional
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink-soft">
              {member.bio}
            </p>
          </div>

          <aside className="lg:col-span-1">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
                Habilidades
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <Badge key={skill} tone="brand">
                    {skill}
                  </Badge>
                ))}
              </div>

              <h3 className="mt-7 font-display text-sm font-semibold uppercase tracking-wide text-ink">
                Enlaces
              </h3>
              <div className="mt-4">
                <SocialLinks member={member} size="sm" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cyan/20 bg-cyan/5 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-600" />
                <p className="text-sm leading-relaxed text-ink-soft">
                  Disponible para colaborar en nuevos proyectos con Dynamic Coding.
                </p>
              </div>
              <Button href="/contacto" size="sm" className="mt-4 w-full">
                Trabajemos juntos
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
