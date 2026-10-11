import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ProjectGrid } from "@/components/projects/project-card";
import { CTA } from "@/components/sections/cta";
import { getProjects } from "@/lib/data";
import { getServiceType, serviceTypes } from "@/lib/services";

// Muestra proyectos de Supabase: se regenera como máximo cada 60 s.
export const revalidate = 60;

type Params = { slug: string };

export function generateStaticParams() {
  return serviceTypes.map((type) => ({ slug: type.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const type = getServiceType(slug);
  if (!type) return { title: "Servicio no encontrado" };
  return { title: type.title, description: type.description };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const type = getServiceType(slug);
  if (!type) notFound();

  const index = serviceTypes.indexOf(type);
  const others = serviceTypes.filter((t) => t.slug !== type.slug);
  const projects = (await getProjects()).filter(
    (project) => project.category === type.title,
  );
  const quoteMessage = `Hola, quiero cotizar: ${type.title}.`;

  return (
    <>
      {/* Cabecera */}
      <section className="relative overflow-hidden border-b border-line bg-surface-soft">
        <div
          aria-hidden
          className="shape-diagonal pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[26rem] bg-brand-100/60 md:block"
        />
        <div
          aria-hidden
          className="shape-stripe pointer-events-none absolute bottom-0 right-10 top-0 hidden w-[26rem] bg-brand-200/60 md:block"
        />
        <Container className="relative py-12 sm:py-16">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand-600"
          >
            <ArrowLeft size={16} />
            Todos los servicios
          </Link>

          <div className="mt-7 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white">
              <type.Icon size={28} />
            </span>
            <Eyebrow>
              Tipo de página {index + 1} de {serviceTypes.length}
            </Eyebrow>
          </div>

          <h1 className="mt-5 text-balance font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            {type.title}
          </h1>
          <p className="pin mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
            {type.description}
          </p>
          <div className="mt-8">
            <WhatsAppButton message={quoteMessage}>
              Cotiza tu {type.title.toLowerCase()}
            </WhatsAppButton>
          </div>
        </Container>
      </section>

      {/* Ideal para + otros tipos */}
      <section className="border-b border-line py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">
              Ideal para
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {type.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={21} className="mt-0.5 shrink-0 text-brand-500" />
                  <span className="text-[15px] leading-relaxed text-ink-soft">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="card mt-10 rounded-2xl bg-surface-soft p-6">
              <p className="text-[15px] leading-relaxed text-ink-soft">
                <strong className="font-semibold text-ink">
                  ¿No estás seguro de que sea la que necesitas?
                </strong>{" "}
                Escríbenos, cuéntanos tu objetivo y te asesoramos antes de
                cotizar.
              </p>
            </div>
          </div>

          <aside>
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-navy">
              Otros tipos de página
            </h2>
            <ul className="card mt-4 divide-y divide-line overflow-hidden rounded-2xl">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/servicios/${other.slug}`}
                    className="group flex items-center gap-3 px-4 py-3 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-navy"
                  >
                    <other.Icon size={17} className="shrink-0 text-brand-500" />
                    <span className="flex-1">{other.title}</span>
                    <ArrowRight
                      size={15}
                      className="text-brand-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      {/* Proyectos de este tipo */}
      {projects.length > 0 && (
        <section className="border-b border-line bg-surface-soft py-16 sm:py-20">
          <Container>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">
              Un ejemplo de nuestro trabajo
            </h2>
            <div className="mt-8">
              <ProjectGrid projects={projects} />
            </div>
          </Container>
        </section>
      )}

      <CTA
        title={`Cotiza tu ${type.title.toLowerCase()}`}
        text="Cuéntanos qué necesita tu negocio y te respondemos por WhatsApp."
        message={quoteMessage}
      />
    </>
  );
}
