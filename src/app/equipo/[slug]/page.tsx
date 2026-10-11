import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  LayoutGrid,
  Link2,
  MapPin,
  User,
  Wrench,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { GithubCard } from "@/components/team/github-card";
import { PrintButton } from "@/components/team/print-button";
import { ProfileSection, TimelineItem } from "@/components/team/profile-section";
import { SocialLinks, hasSocialLinks } from "@/components/team/social-links";
import { RoleBadges } from "@/components/team/team-card";
import { contact } from "@/lib/contact";
import { getProjects, getTeam, getTeamMemberBySlug } from "@/lib/data";
import { DEMO_SLUG } from "@/lib/demo-profile";
import { githubUsername } from "@/lib/github";
import { siteUrl } from "@/lib/site";

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

/** "2021 – hoy", "2019 – 2021" o lo que haya. */
function period(start: string, end: string | null) {
  return [start, end ?? "hoy"].filter(Boolean).join(" – ");
}

/**
 * Perfil de una persona del equipo, con formato de CV. Cada sección se
 * muestra solo si tiene datos, así un perfil recién creado no queda con
 * huecos y se va completando desde el panel de administración.
 */
export default async function TeamMemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) notFound();

  const username = githubUsername(member.github_url);
  const projects = member.project_slugs.length
    ? (await getProjects()).filter((p) => member.project_slugs.includes(p.slug))
    : [];
  const hasStudies =
    member.education.length > 0 || member.certifications.length > 0;

  return (
    <div className="profile-print bg-surface-soft">
      <Container className="py-10 sm:py-14">
        <Link
          href="/equipo"
          className="no-print inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand-600"
        >
          <ArrowLeft size={16} />
          Volver al equipo
        </Link>

        {slug === DEMO_SLUG && (
          <p className="no-print mt-5 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-navy">
            <strong className="font-semibold">Perfil de demostración.</strong>{" "}
            Sus datos son de ejemplo y solo se ve en tu computadora, no en el
            sitio publicado.
          </p>
        )}

        {/* Cabecera */}
        <header className="card mt-6 flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8">
          <Avatar
            name={member.name}
            src={member.avatar_url}
            size={104}
            className="ring-4 ring-brand-50"
          />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy">
              {member.name}
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-soft">
              <span className="font-medium text-brand-600">{member.role}</span>
              {member.location && (
                <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={15} />
                  {member.location}
                </span>
              )}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <RoleBadges member={member} className="contents" />
              {member.years_experience != null && (
                <Badge>{member.years_experience}+ años de experiencia</Badge>
              )}
              {member.available && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-200">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Disponible para consultas
                </span>
              )}
            </div>

            {/* Solo en el PDF: cómo contactar a la empresa */}
            <p className="mt-4 hidden text-sm text-ink-soft print:block">
              Dynamic Coding · WhatsApp {contact.whatsappDisplay} ·{" "}
              {siteUrl.replace(/^https?:\/\//, "")}
            </p>
          </div>

          <div className="no-print flex flex-col gap-2.5 sm:w-52">
            <WhatsAppButton
              message={`Hola, quiero una asesoría con ${member.name}.`}
              size="md"
              className="w-full"
            >
              Pedir consulta
            </WhatsAppButton>
            <PrintButton className="w-full" />
          </div>
        </header>

        {/* Cuerpo: trayectoria a la izquierda, datos rápidos a la derecha */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.55fr_1fr] print:grid-cols-[1.55fr_1fr]">
          <div className="space-y-6">
            {(member.headline || member.bio) && (
              <ProfileSection Icon={User} title="Sobre mí">
                {member.headline && (
                  <p className="font-medium leading-relaxed text-ink">
                    {member.headline}
                  </p>
                )}
                {member.bio && (
                  <p className="mt-2 text-pretty leading-relaxed text-ink-soft">
                    {member.bio}
                  </p>
                )}
              </ProfileSection>
            )}

            {member.experience.length > 0 && (
              <ProfileSection Icon={Briefcase} title="Experiencia">
                <ol>
                  {member.experience.map((item, i) => (
                    <TimelineItem
                      key={`${item.title}-${item.start}`}
                      title={item.title}
                      subtitle={[item.organization, period(item.start, item.end)]
                        .filter(Boolean)
                        .join(" · ")}
                      last={i === member.experience.length - 1}
                    >
                      {item.description}
                    </TimelineItem>
                  ))}
                </ol>
              </ProfileSection>
            )}

            {hasStudies && (
              <ProfileSection Icon={GraduationCap} title="Formación y certificaciones">
                <ul className="space-y-4">
                  {member.education.map((item) => (
                    <li key={`${item.title}-${item.institution}`}>
                      <p className="font-semibold leading-snug text-ink">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        {[item.institution, item.year].filter(Boolean).join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>

                {member.certifications.length > 0 && (
                  <ul
                    className={
                      member.education.length > 0
                        ? "mt-5 space-y-3 border-t border-line pt-5"
                        : "space-y-3"
                    }
                  >
                    {member.certifications.map((cert) => (
                      <li
                        key={cert.name}
                        className="flex items-start justify-between gap-4"
                      >
                        <div>
                          <p className="text-sm font-semibold text-ink">{cert.name}</p>
                          <p className="text-sm text-muted">
                            {[cert.issuer, cert.year].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-print inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 hover:text-navy"
                          >
                            Verificar
                            <ArrowUpRight size={15} />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </ProfileSection>
            )}

            {projects.length > 0 && (
              <ProfileSection
                Icon={LayoutGrid}
                title="Proyectos en los que participó"
              >
                <ul className="grid gap-3 sm:grid-cols-2">
                  {projects.map((project) => (
                    <li key={project.id}>
                      <Link
                        href={`/proyectos/${project.slug}`}
                        className="group flex items-center gap-3.5 rounded-xl border border-line p-3 transition-colors hover:border-brand-300 hover:bg-brand-50"
                      >
                        <span className="relative h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-brand-100">
                          {project.cover_image && (
                            <Image
                              src={project.cover_image}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-cover object-top"
                            />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-navy">
                            {project.title}
                          </span>
                          <span className="block text-xs text-muted">
                            {project.category}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </ProfileSection>
            )}
          </div>

          <aside className="space-y-6">
            {username && <GithubCard username={username} />}

            {member.skills.length > 0 && (
              <ProfileSection Icon={Wrench} title="Habilidades">
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <Badge key={skill} tone="brand">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </ProfileSection>
            )}

            {hasSocialLinks(member) && (
              <ProfileSection Icon={Link2} title="Redes" className="no-print">
                <SocialLinks member={member} />
              </ProfileSection>
            )}
          </aside>
        </div>
      </Container>
    </div>
  );
}
