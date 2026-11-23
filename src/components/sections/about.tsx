import { BrandLogoFull } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="nosotros" className="panel py-14 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal variant="left">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-soft px-8 py-10 sm:py-16">
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

        <Reveal variant="right" delay={200}>
          <Eyebrow>Quiénes somos</Eyebrow>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Te asesoramos antes de construir
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">
            Somos Dynamic Coding. Asesoramos a negocios, empresas,
            emprendedores, profesionales y marcas personales para elegir la
            solución digital que de verdad necesitan (páginas web, aplicaciones o
            sistemas), y la desarrollamos a su medida.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
