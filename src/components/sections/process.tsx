import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    title: "Conversamos",
    text: "Nos cuentas tu negocio y lo que quieres lograr, por WhatsApp y sin registrarte.",
  },
  {
    title: "Te asesoramos",
    text: "Te recomendamos el tipo de página que te conviene y te enviamos una cotización.",
  },
  {
    title: "La desarrollamos",
    text: "Diseñamos y construimos tu página a la medida de tu negocio.",
  },
  {
    title: "La publicamos",
    text: "La dejamos en línea, lista para que tus clientes la encuentren y te escriban.",
  },
];

/** Cómo trabajamos: de la primera conversación a la página publicada. */
export function Process() {
  return (
    <section className="border-b border-line bg-surface-soft py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="De la idea a tu página, en cuatro pasos"
        />

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              {/* Línea que une los pasos en escritorio */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-14 right-0 top-5 hidden h-px bg-brand-200 lg:block"
                />
              )}
              <Reveal delay={i * 80}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-base font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
