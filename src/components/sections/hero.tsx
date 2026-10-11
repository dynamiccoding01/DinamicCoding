import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { contact } from "@/lib/contact";
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
          ¿Qué página necesita tu negocio?
        </span>
      </div>
      <ul className="p-2.5">
        {serviceTypes.map((type, i) => (
          <li key={type.slug}>
            <Link
              href={`/servicios/${type.slug}`}
              style={{ "--i": i } as React.CSSProperties}
              className="type-row flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-ink-soft hover:bg-brand-50! hover:text-navy!"
            >
              <span className="w-5 font-display text-sm font-extrabold text-brand-500">
                {i + 1}
              </span>
              <type.Icon size={18} className="shrink-0 text-brand-600" />
              <span className="flex-1 text-sm font-semibold">{type.title}</span>
              <span className="type-check flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white">
                <Check size={13} strokeWidth={3} />
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
    <section className="relative overflow-hidden border-b border-line bg-surface-soft">
      {/* Formas diagonales de la marca */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block"
      >
        <div className="shape-stripe absolute inset-y-0 -left-10 w-full bg-gradient-to-b from-sky to-brand-500" />
        <div className="shape-diagonal absolute inset-0 bg-gradient-to-br from-brand-800 to-navy-deep" />
      </div>

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24">
        <div>
          <Reveal>
            <p className="slant inline-block bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:px-6 sm:text-[11px] sm:tracking-[0.18em]">
              Consultores · Asesoría y consultoría
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
              No todas las páginas web son{" "}
              <span className="text-brand-500">lo mismo</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="pin mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
              Cada negocio necesita un sitio web según sus objetivos, su rubro y
              la forma en que atiende a sus clientes. Te asesoramos para elegir
              el tuyo y lo desarrollamos a tu medida.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton />
              <Button href="/servicios" variant="secondary" size="lg">
                Ver tipos de página
                <ArrowRight size={18} />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-7 inline-flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} className="text-brand-500" />
              {contact.city}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="float-slow mx-auto max-w-md lg:ml-auto lg:mr-0">
            <TypeList />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
