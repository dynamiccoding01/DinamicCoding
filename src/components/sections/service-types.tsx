import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { AdviceCard, ServiceCard } from "@/components/services/service-card";
import { ADVICE_MESSAGE } from "@/lib/contact";
import { serviceTypes } from "@/lib/services";

/** Grilla con los siete tipos de página y una tarjeta de asesoría. */
export function ServiceTypes() {
  return (
    <section id="servicios" className="border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Qué desarrollamos"
          title="Siete tipos de página, una para cada objetivo"
          subtitle="Antes de cotizar te ayudamos a elegir la que tu negocio necesita."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
  );
}
