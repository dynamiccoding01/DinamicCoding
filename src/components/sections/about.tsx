import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BrandLogoFull } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";

const points = [
  {
    title: "Primero asesoramos",
    text: "Antes de cotizar entendemos tu objetivo y te recomendamos el tipo de página adecuado.",
  },
  {
    title: "Atención con nombre y apellido",
    text: "Sabes quién te atiende y puedes ver su perfil antes de escribir.",
  },
  {
    title: "Sin barreras",
    text: "No necesitas registrarte para conocernos ni para pedir una consulta.",
  },
];

export function About() {
  return (
    <section id="nosotros" className="border-b border-line py-20 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-soft px-8 py-16">
            <div
              aria-hidden
              className="shape-diagonal absolute inset-y-0 right-0 w-1/2 bg-brand-100/70"
            />
            <div
              aria-hidden
              className="shape-stripe absolute inset-y-0 right-6 w-1/2 bg-brand-200/70"
            />
            <BrandLogoFull className="relative mx-auto w-52" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Eyebrow>Quiénes somos</Eyebrow>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Te asesoramos antes de construir
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">
            Somos Dynamic Coding. Asesoramos a negocios, empresas,
            emprendedores, profesionales y marcas personales para elegir la
            página web que de verdad necesitan, y la desarrollamos a su medida.
          </p>

          <ul className="mt-7 space-y-4">
            {points.map((point) => (
              <li key={point.title} className="flex items-start gap-3">
                <CheckCircle2 size={21} className="mt-0.5 shrink-0 text-brand-500" />
                <p className="text-[15px] leading-relaxed text-ink-soft">
                  <strong className="font-semibold text-ink">{point.title}.</strong>{" "}
                  {point.text}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            Además de páginas web, desarrollamos aplicaciones móviles y
            sistemas de gestión a medida.
          </p>

          <div className="mt-8">
            <Button href="/equipo" variant="secondary">
              Conoce al equipo
              <ArrowRight size={16} />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
