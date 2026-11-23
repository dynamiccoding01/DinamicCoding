import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

// Solo respuestas que el sitio ya sostiene: sin plazos ni precios inventados.
const faqs = [
  {
    q: "¿Qué tipos de proyectos desarrollan?",
    a: "Desarrollamos páginas web, aplicaciones móviles y sistemas de gestión, siempre a la medida de cada negocio.",
  },
  {
    q: "¿Qué solución necesita mi negocio?",
    a: "Depende de lo que quieras lograr: promocionar una oferta, mostrar tus productos, recibir reservas, vender en línea o automatizar un proceso. Si todavía no lo tienes claro, te asesoramos para elegir antes de cotizar.",
  },
  {
    q: "¿Cómo es el proceso de trabajo?",
    a: "Primero conversamos para entender tu negocio y lo que quieres lograr. Luego te recomendamos la solución adecuada y te enviamos una cotización. Después diseñamos y desarrollamos tu proyecto, y al final lo publicamos.",
  },
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Depende del tipo de solución y de lo que necesite tu negocio, por eso cotizamos cada caso por separado. Escríbenos por WhatsApp, cuéntanos qué buscas y te enviamos una cotización.",
  },
  {
    q: "¿Necesito registrarme para consultar?",
    a: "No. Puedes conocer nuestros servicios, ver nuestros proyectos y escribirnos sin crear ninguna cuenta.",
  },
];

export function FAQ() {
  return (
    <section className="panel py-14 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos tus dudas"
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 90}>
              <details className="card group rounded-2xl px-6 py-1 transition-colors hover:border-brand-200">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 font-display text-base font-bold text-navy">
                  {faq.q}
                  <ChevronDown
                    size={20}
                    className="faq-chevron shrink-0 text-brand-500"
                  />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-ink-soft">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
