import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ADVICE_MESSAGE } from "@/lib/contact";
import { serviceTypes } from "@/lib/services";

/** Guía de asesoría: lo que quiere lograr el cliente → tipo de página. */
export function Guide() {
  return (
    <section className="border-b border-line bg-surface-soft py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Asesoría</Eyebrow>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              ¿Qué página necesita tu negocio?
            </h2>
            <p className="pin mt-6 text-pretty text-lg leading-relaxed text-ink-soft">
              Lo primero es elegir bien. Ubica lo que quieres lograr y mira qué
              tipo de página te conviene.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              ¿Tu caso no aparece o tienes dudas? Escríbenos y te asesoramos,
              sin registrarte.
            </p>
            <div className="mt-7">
              <WhatsAppButton message={ADVICE_MESSAGE}>
                Pide una asesoría
              </WhatsAppButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="card divide-y divide-line overflow-hidden rounded-2xl">
            {serviceTypes.map((type) => (
              <li key={type.slug}>
                <Link
                  href={`/servicios/${type.slug}`}
                  className="group flex flex-col gap-2.5 px-5 py-4 transition-colors hover:bg-brand-50 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
                >
                  <span className="text-[15px] leading-snug text-ink-soft">
                    {type.need}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-bold text-navy sm:self-auto">
                    <type.Icon size={17} className="text-brand-500" />
                    {type.title}
                    <ArrowRight
                      size={15}
                      className="text-brand-500 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
