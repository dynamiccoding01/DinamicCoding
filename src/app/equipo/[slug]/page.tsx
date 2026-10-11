import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SocialLinks } from "@/components/team/social-links";
import { RoleBadges } from "@/components/team/team-card";
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

  const firstName = member.name.split(" ")[0];

  return (
    <div>
      {/* Cabecera del perfil */}
      <section className="border-b border-line bg-surface-soft">
        <Container className="py-12 sm:py-16">
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
              className="ring-4 ring-white"
            />
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                {member.name}
              </h1>
              <p className="mt-1 text-lg font-medium text-brand-600">{member.role}</p>
              <RoleBadges member={member} className="mt-3 flex flex-wrap gap-2" />
              <p className="mt-4 max-w-xl text-pretty text-ink-soft">
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
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">
              Perfil profesional
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink-soft">
              {member.bio}
            </p>
          </div>

          <aside className="lg:col-span-1">
            {member.skills.length > 0 && (
              <div className="card rounded-2xl p-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy">
                  En qué te puede ayudar
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <Badge key={skill} tone="brand">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center">
              <p className="text-sm font-semibold text-navy">
                ¿Quieres una asesoría con {firstName}?
              </p>
              <WhatsAppButton
                message={`Hola, quiero una asesoría con ${member.name}.`}
                size="md"
                className="mt-4 w-full"
              >
                Pide tu consulta
              </WhatsAppButton>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
