"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceMockup } from "@/components/services/service-mockup";
import { serviceTypes } from "@/lib/services";
import { cn } from "@/lib/utils";

/**
 * Los siete tipos de página: la vista grande muestra el que está elegido (al
 * pasar el cursor, enfocar o hacer clic) y la lista a la derecha lo cambia.
 */
export function ServiceTypes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = serviceTypes[activeIndex];

  return (
    <section
      id="servicios"
      className="panel py-14 sm:py-24 lg:flex lg:fill-screen lg:items-center lg:py-[clamp(1rem,4svh,3rem)]"
    >
      <Container className="lg:max-w-360 lg:px-14">
        <SectionHeading
          eyebrow="Qué desarrollamos"
          title="Una solución para cada objetivo"
          subtitle="Cada negocio necesita algo distinto. Elige lo que se ajusta a lo que quieres lograr; te asesoramos antes de cotizar."
        />

        <div>
          <div className="mt-14 grid gap-6 lg:mt-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
            <Reveal
              variant="zoom"
              delay={150}
              className="hidden h-full lg:block"
            >
              <div className="card flex h-full flex-col overflow-hidden rounded-3xl">
                <div className="relative flex aspect-16/10 items-center lg:aspect-auto lg:h-[clamp(16rem,42svh,34rem)] justify-center overflow-hidden bg-linear-to-b from-brand-100 to-brand-50 p-[6%]">
                  <ServiceMockup
                    key={active.slug}
                    type={active}
                    detailed
                    className="h-full w-auto max-w-full drop-shadow-[0_14px_18px_rgba(6,33,95,0.18)]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold text-navy">
                    {active.title}
                  </h3>
                  <p className="leading-relaxed text-muted">
                    {active.description}
                  </p>
                </div>
              </div>
            </Reveal>

            <ul className="flex flex-col self-center border-b border-line">
              {serviceTypes.map((type, i) => {
                const isActive = i === activeIndex;
                return (
                  <li key={type.slug} className="border-t border-line">
                    <Reveal variant="right" delay={250 + i * 100}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onMouseEnter={() => setActiveIndex(i)}
                        onFocus={() => setActiveIndex(i)}
                        onClick={() => setActiveIndex(i)}
                        className="group flex w-full items-center gap-5 py-[clamp(0.4rem,1.5svh,1.25rem)] text-left lg:gap-6"
                      >
                        <span
                          className={cn(
                            "w-7 shrink-0 font-display text-sm font-bold transition-colors",
                            isActive ? "text-brand-500" : "text-muted",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "min-w-0 flex-1 transition-transform duration-300",
                            isActive && "motion-safe:translate-x-2",
                          )}
                        >
                          <span
                            className={cn(
                              "block font-display text-[clamp(1.25rem,3.2svh,2.25rem)] font-extrabold leading-tight tracking-tight transition-colors",
                              isActive
                                ? "text-navy"
                                : "text-navy/50 group-hover:text-navy/80",
                            )}
                          >
                            {type.title}
                          </span>
                          {/* El subtítulo solo se despliega en el tipo elegido. */}
                          <span
                            className={cn(
                              "grid transition-[grid-template-rows,opacity] duration-300",
                              isActive
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0",
                            )}
                          >
                            <span className="overflow-hidden">
                              <span className="block pt-1 text-sm leading-snug text-muted">
                                {type.need}
                              </span>
                            </span>
                          </span>
                        </span>
                      </button>
                    </Reveal>
                    {/* Celular: la vista del tipo se despliega bajo su fila, así
                        se ve al tocarlo (en escritorio va en la tarjeta grande). */}
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-500 lg:hidden",
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        {isActive && (
                          <div className="mb-5 mt-2 overflow-hidden rounded-2xl border border-line bg-white">
                            <div className="flex aspect-16/10 items-center justify-center bg-linear-to-b from-brand-100 to-brand-50 p-[6%]">
                              <ServiceMockup
                                type={type}
                                detailed
                                className="h-full w-auto max-w-full drop-shadow-[0_14px_18px_rgba(6,33,95,0.18)]"
                              />
                            </div>
                            <p className="p-4 text-sm leading-relaxed text-muted">
                              {type.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
