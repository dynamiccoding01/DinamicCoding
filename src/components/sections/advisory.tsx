import { DoorOpen, Smartphone, Store, Target } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";

const reasons = [
  {
    Icon: Target,
    title: "Asesoramos primero",
    text: "Antes de cotizar entendemos tu objetivo y te recomendamos la solución adecuada.",
  },
  {
    Icon: Store,
    title: "A la medida de tu negocio",
    text: "Cada negocio necesita una solución según sus objetivos, su rubro y la forma en que atiende a sus clientes.",
  },
  {
    Icon: Smartphone,
    title: "Páginas web, apps y sistemas",
    text: "Desde una landing page hasta aplicaciones móviles y sistemas de gestión a medida.",
  },
  {
    Icon: DoorOpen,
    title: "Sin barreras",
    text: "No necesitas registrarte para conocernos.",
  },
];

/** Por qué elegirnos: cuatro razones, sin llamados a contactar. */
export function Advisory() {
  return (
    <section className="py-14 sm:py-24 lg:flex lg:fill-screen lg:items-center">
      <Container className="grid items-center gap-12 lg:max-w-360 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-14">
        <Reveal>
          <Eyebrow>¿Por qué elegirnos?</Eyebrow>
          <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
            Una solución pensada para tu negocio
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft lg:text-xl">
            No todos los negocios necesitan lo mismo. Por eso primero entendemos
            lo que necesitas y después lo desarrollamos.
          </p>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2">
          {reasons.map(({ Icon, title, text }, i) => (
            <li key={title}>
              <Reveal variant="zoom" delay={150 + i * 120} className="h-full">
                <div className="card card-hover group h-full rounded-3xl p-7 lg:p-9">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110">
                    <Icon size={28} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-navy lg:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted lg:text-lg">
                    {text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
