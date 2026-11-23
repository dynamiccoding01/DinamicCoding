import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { serviceTypes } from "@/lib/services";

/** Tarjeta con los siete tipos de página; el resaltado recorre las filas. */
function TypeList() {
  return (
    <div className="card rounded-2xl shadow-[0_30px_60px_-36px_rgba(6,33,95,0.65)]">
      <div className="flex items-center gap-1.5 border-b border-line px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-brand-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
        <span className="ml-2.5 text-xs font-medium text-muted">
          ¿Qué necesita tu negocio?
        </span>
      </div>
      <ul className="p-2.5">
        {serviceTypes.map((type, i) => (
          <li key={type.slug}>
            <Link
              href="#servicios"
              style={{ "--i": i } as React.CSSProperties}
              className="type-row flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-ink-soft hover:bg-brand-50! hover:text-navy! lg:gap-5 lg:px-5 lg:py-3.5"
            >
              <span className="w-5 font-display text-sm font-extrabold text-brand-500 lg:text-base">
                {i + 1}
              </span>
              <type.Icon
                size={18}
                className="shrink-0 text-brand-600 lg:size-5"
              />
              <span className="flex-1 text-sm font-semibold lg:text-base">
                {type.title}
              </span>
              <span className="type-check flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white lg:h-6 lg:w-6">
                <Check size={13} strokeWidth={3} className="lg:size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    // En pantalla grande va sin vidrio: atrás se ve nítida la diagonal del
    // fondo del sitio. En celular y tablet el texto la taparía, así que va en
    // vidrio como las demás secciones.
    // En lg ocupa la primera pantalla completa (menos la barra de 4rem). El
    // 100vh es respaldo para navegadores sin svh.
    <section
      id="inicio"
      className="relative max-lg:panel lg:flex lg:fill-screen lg:items-center"
    >
      <Container className="relative grid items-center gap-12 py-12 sm:py-16 lg:max-w-360 lg:px-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16 lg:py-[clamp(0.75rem,5svh,3rem)]">
        <div>
          <Reveal>
            <p className="slant inline-block bg-linear-to-r from-brand-700 to-brand-500 px-5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:px-6 sm:text-[11px] sm:tracking-[0.18em]">
              Consultores · Asesoría y consultoría
            </p>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-[clamp(2.75rem,8.3svh,3.6rem)]">
              <span className="xl:whitespace-nowrap">Soluciones digitales</span>{" "}
              <br className="hidden xl:block" />a la medida de{" "}
              <span className="underline-draw text-brand-500">tu negocio</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="pin mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft lg:text-[clamp(1rem,2.9svh,1.25rem)]">
              Páginas web, aplicaciones y sistemas de gestión según los
              objetivos de tu negocio, su rubro y la forma en que atiende a sus
              clientes. Te asesoramos para elegir lo que necesitas y lo
              desarrollamos a tu medida.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton />
              <Button href="#servicios" variant="secondary" size="lg">
                Ver qué desarrollamos
                <ArrowRight size={18} />
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={350} variant="right">
          <div className="float-slow mx-auto max-w-md lg:ml-auto lg:mr-0 lg:max-w-xl">
            <TypeList />
          </div>
        </Reveal>
      </Container>

      {/* Invita a seguir bajando; solo donde el hero ocupa la pantalla. */}
      <a
        href="#servicios"
        aria-label="Ver qué desarrollamos"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-brand-600/70 transition-colors hover:text-brand-600 lg:block"
      >
        <ChevronDown size={28} className="motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
