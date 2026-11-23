import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

/** Llamado final a cotizar por WhatsApp. `message` personaliza el mensaje. */
export function CTA({
  title = "Hablemos de tu proyecto",
  text = "Cuéntanos de tu negocio y lo que quieres lograr. Te respondemos por WhatsApp.",
  message,
}: {
  title?: string;
  text?: string;
  message?: string;
}) {
  return (
    <section id="contacto" className="py-14 sm:py-24">
      <Container>
        <Reveal variant="zoom">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-800 to-navy-deep px-8 py-14 sm:px-14 sm:py-20">
            {/* Diagonal con la misma inclinación que la del fondo del sitio
                (ver .card-diagonal en globals.css). */}
            <div
              aria-hidden
              className="card-diagonal absolute inset-y-0 left-[calc(66%-3rem)] hidden w-12 bg-white/15 md:block"
            />
            <div
              aria-hidden
              className="card-diagonal absolute inset-y-0 left-[66%] right-[-30%] hidden bg-linear-to-b from-sky to-brand-500 md:block"
            />

            <div className="relative max-w-xl">
              <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-brand-100 lg:text-xl">
                {text}
              </p>
              <div className="mt-8">
                <WhatsAppButton message={message} variant="secondary">
                  Escríbenos
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
