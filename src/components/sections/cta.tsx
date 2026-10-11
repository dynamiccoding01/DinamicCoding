import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { contact } from "@/lib/contact";

/** Llamado final a cotizar por WhatsApp. `message` personaliza el mensaje. */
export function CTA({
  title = "Cotiza tu página web con nosotros",
  text = "Cuéntanos qué necesita tu negocio y te recomendamos el tipo de página adecuado.",
  message,
}: {
  title?: string;
  text?: string;
  message?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-navy-deep px-8 py-14 sm:px-14 sm:py-16">
            {/* Formas diagonales de la marca */}
            <div
              aria-hidden
              className="shape-stripe absolute inset-y-0 right-8 hidden w-[40%] bg-white/15 md:block"
            />
            <div
              aria-hidden
              className="shape-diagonal absolute inset-y-0 right-0 hidden w-[40%] bg-gradient-to-b from-sky to-brand-500 md:block"
            />

            <div className="relative max-w-lg">
              <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-brand-100">
                {text}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <WhatsAppButton message={message} variant="secondary">
                  Escríbenos por WhatsApp
                </WhatsAppButton>
                <span className="font-display text-xl font-bold tracking-wide text-white">
                  {contact.whatsappDisplay}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
