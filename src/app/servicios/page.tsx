import type { Metadata } from "next";
import { Lightbulb, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { AdviceCard, ServiceCard } from "@/components/services/service-card";
import { CTA } from "@/components/sections/cta";
import { ADVICE_MESSAGE } from "@/lib/contact";
import { serviceTypes } from "@/lib/services";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Siete tipos de página web para cada objetivo: landing page, página informativa, corporativa, catálogo digital, tienda online, reservas y personalizada. Además, asesoría y consultoría.",
};

const extras = [
  {
    Icon: Lightbulb,
    title: "Asesoría y consultoría",
    text: "Antes de construir, te ayudamos a decidir. Nos cuentas tu objetivo y te recomendamos el tipo de página que más le conviene a tu negocio.",
    cta: "Pide una asesoría",
    message: ADVICE_MESSAGE,
  },
  {
    Icon: Smartphone,
    title: "Aplicaciones y sistemas a medida",
    text: "Además de páginas web, desarrollamos aplicaciones móviles y sistemas de gestión para ordenar y automatizar los procesos de tu empresa.",
    cta: "Cuéntanos tu proyecto",
    message: "Hola, quiero consultar por una aplicación o un sistema a medida.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        title="No todas las páginas web son lo mismo"
        subtitle="Cada negocio necesita un sitio según sus objetivos, su rubro y la forma en que atiende a sus clientes. Estos son los siete tipos de página que desarrollamos."
      />

      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceTypes.map((type, i) => (
              <Reveal key={type.slug} delay={(i % 4) * 60} className="h-full">
                <ServiceCard type={type} index={i} />
              </Reveal>
            ))}
            <Reveal delay={180} className="h-full">
              <AdviceCard>
                <WhatsAppButton
                  message={ADVICE_MESSAGE}
                  variant="secondary"
                  size="md"
                  className="w-full"
                >
                  Pide una asesoría
                </WhatsAppButton>
              </AdviceCard>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-surface-soft py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {extras.map(({ Icon, title, text, cta, message }, i) => (
              <Reveal key={title} delay={i * 80} className="h-full">
                <div className="card flex h-full flex-col rounded-2xl p-7 sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon size={24} />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-bold text-navy">
                    {title}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
                    {text}
                  </p>
                  <div className="mt-6">
                    <WhatsAppButton message={message} size="md" variant="secondary">
                      {cta}
                    </WhatsAppButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
