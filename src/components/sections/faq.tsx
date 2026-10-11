import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { contact } from "@/lib/contact";

const faqs = [
  {
    q: "¿Qué tipo de página necesito?",
    a: "Depende de lo que quieras lograr: promocionar una oferta, mostrar tus productos, recibir reservas o vender en línea. Si no estás seguro, escríbenos y te asesoramos para elegir.",
  },
  {
    q: "¿Cuánto cuesta una página web?",
    a: "Depende del tipo de página y de lo que necesite tu negocio. Escríbenos por WhatsApp, cuéntanos tu caso y te enviamos una cotización.",
  },
  {
    q: "¿Necesito registrarme para consultar?",
    a: "No. Puedes conocer nuestros servicios, ver nuestros proyectos y escribirnos sin crear ninguna cuenta.",
  },
  {
    q: "¿También desarrollan aplicaciones y sistemas?",
    a: "Sí. Además de páginas web, desarrollamos aplicaciones móviles y sistemas de gestión a medida.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: `Nuestra base está en ${contact.city}. Atendemos por WhatsApp al ${contact.whatsappDisplay}.`,
  },
];

export function FAQ() {
  return (
    <section className="border-b border-line bg-surface-soft py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos tus dudas"
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="card group rounded-2xl px-6 py-1 transition-colors hover:border-brand-200"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 font-display text-base font-bold text-navy">
                {faq.q}
                <ChevronDown size={20} className="faq-chevron shrink-0 text-brand-500" />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-ink-soft">{faq.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
