import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const faqs = [
  {
    q: "¿Cuánto tarda en desarrollarse un proyecto?",
    a: "Depende del alcance. Un MVP suele tomar entre 4 y 8 semanas, mientras que una plataforma completa puede llevar algunos meses. Tras la primera consulta te damos un cronograma claro por etapas.",
  },
  {
    q: "¿Cómo es el proceso de trabajo?",
    a: "Trabajamos por entregas: descubrimiento y definición, diseño, desarrollo iterativo con demos frecuentes, pruebas y lanzamiento. Mantienes visibilidad y control en todo momento.",
  },
  {
    q: "¿Cuánto cuesta desarrollar mi software?",
    a: "Cada proyecto es único, así que cotizamos según tus necesidades. La primera consulta no tiene costo: la usamos para entender tu idea y entregarte una propuesta con alcance y precio.",
  },
  {
    q: "¿Dan soporte después del lanzamiento?",
    a: "Sí. Ofrecemos planes de mantenimiento, monitoreo y mejoras continuas para que tu producto siga funcionando y evolucionando sin problemas.",
  },
  {
    q: "¿De quién es el código que desarrollan?",
    a: "Tuyo. Al finalizar te entregamos el repositorio y la documentación: el código y la propiedad intelectual son 100% de tu empresa.",
  },
  {
    q: "¿Trabajan de forma remota?",
    a: "Sí, trabajamos 100% remoto con clientes de toda Latinoamérica, con reuniones y comunicación constante por los canales que prefieras.",
  },
];

export function FAQ() {
  return (
    <section className="border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos tus dudas"
          subtitle="Lo que más nos preguntan antes de empezar a trabajar juntos."
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="glass group rounded-2xl px-6 py-1 transition-colors hover:border-brand-200"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 font-display text-base font-semibold text-ink">
                {faq.q}
                <ChevronDown size={20} className="faq-chevron shrink-0 text-brand-600" />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
