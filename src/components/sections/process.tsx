"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  AdviceScene,
  BuildScene,
  ChatScene,
  LaunchScene,
} from "@/components/sections/process-scenes";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Conversamos",
    tag: "Por WhatsApp",
    text: "Nos cuentas tu negocio y lo que quieres lograr, por WhatsApp y sin registrarte.",
  },
  {
    title: "Te asesoramos",
    tag: "Con cotización",
    text: "Te recomendamos la solución que te conviene y te enviamos una cotización.",
  },
  {
    title: "La desarrollamos",
    tag: "A tu medida",
    text: "Diseñamos y construimos tu proyecto a la medida de tu negocio.",
  },
  {
    title: "La publicamos",
    tag: "En línea",
    text: "La dejamos en línea, lista para que tus clientes la encuentren y te escriban.",
  },
];

/** Capa de la escena: solo la del paso actual se ve. */
function layer(active: boolean) {
  return cn(
    "absolute inset-0 flex items-center justify-center p-8 transition-all duration-500 motion-reduce:transition-none",
    active
      ? "opacity-100"
      : "pointer-events-none opacity-0 motion-safe:translate-y-3",
  );
}

/** Escena de la derecha: una animación propia por paso (process-scenes.tsx). */
function Stage({ step }: { step: number }) {
  const scenes = [ChatScene, AdviceScene, BuildScene, LaunchScene];
  return (
    <div
      aria-hidden
      className="relative h-[clamp(20rem,56svh,34rem)] overflow-hidden rounded-3xl border border-line bg-linear-to-b from-brand-100 to-brand-50 shadow-[0_30px_60px_-36px_rgba(6,33,95,0.5)]"
    >
      {scenes.map((Scene, i) => (
        <div key={i} className={layer(step === i)}>
          <Scene on={step === i} />
        </div>
      ))}
    </div>
  );
}

/**
 * Cómo trabajamos. En escritorio la escena queda fija mientras se hace scroll:
 * el paso activo avanza, la línea se llena y la imagen cambia. En pantallas
 * chicas son cuatro tarjetas normales.
 */
export function Process() {
  const [step, setStep] = useState(0);
  const track = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (window.innerWidth < 1024) return;
      // La escena se fija bajo la barra (4rem) durante la altura de la sección.
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight + 64);
      const p = Math.min(1, Math.max(0, (64 - r.top) / span));
      const s = Math.min(steps.length - 1, Math.floor(p * steps.length));
      setStep(s);
      list.current?.style.setProperty(
        "--f",
        String(Math.min(1, p * steps.length - s)),
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    onScroll();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="proceso" ref={track} className="lg:h-[400svh]">
      <div className="lg:sticky lg:top-16 lg:flex lg:h-[calc(100svh-4rem)] lg:items-center">
        <Container className="grid gap-14 py-14 sm:py-24 lg:max-w-360 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-14 lg:py-0">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Cómo trabajamos"
              title="De la idea a tu proyecto, en cuatro pasos"
            />
            <p className="mt-5 hidden text-sm font-semibold text-brand-600 lg:block">
              Paso {step + 1} de {steps.length}
            </p>

            {/* Pantallas chicas: tarjetas */}
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 80} className="h-full">
                    <div className="card h-full rounded-2xl p-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-base font-extrabold text-white">
                        {i + 1}
                      </span>
                      <h3 className="mt-5 font-display text-lg font-bold text-navy">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-500">
                        {s.tag}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {s.text}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            {/* Escritorio: línea de tiempo ligada al scroll */}
            <ol ref={list} className="mt-12 hidden lg:block">
              {steps.map((s, i) => {
                const active = i === step;
                const done = i < step;
                return (
                  <li
                    key={s.title}
                    className="relative flex gap-5 pb-9 last:pb-0"
                  >
                    {i < steps.length - 1 && (
                      <>
                        <span
                          aria-hidden
                          className="absolute bottom-0 left-[19.5px] top-10 w-px bg-line"
                        />
                        <span
                          aria-hidden
                          className={cn(
                            "absolute bottom-0 left-[19.5px] top-10 w-px origin-top bg-brand-500",
                            done && "scale-y-100",
                            !active && !done && "scale-y-0",
                          )}
                          style={
                            active
                              ? { transform: "scaleY(var(--f, 0))" }
                              : undefined
                          }
                        />
                      </>
                    )}
                    <span
                      className={cn(
                        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-base font-extrabold transition-all duration-300",
                        active &&
                          "border-brand-500 bg-brand-500 text-white shadow-[0_0_0_5px_rgba(2,116,215,0.18)]",
                        done && "border-navy bg-navy text-white",
                        !active && !done && "border-line bg-surface text-muted",
                      )}
                    >
                      {done ? <Check size={18} strokeWidth={3} /> : i + 1}
                    </span>
                    <div className="pt-1.5">
                      <h3
                        className={cn(
                          "flex flex-wrap items-baseline gap-x-3 font-display text-xl font-bold transition-colors duration-300",
                          active ? "text-navy" : "text-navy/45",
                        )}
                      >
                        {s.title}
                        <small
                          className={cn(
                            "font-sans text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300",
                            active ? "text-brand-500" : "text-muted/70",
                          )}
                        >
                          {s.tag}
                        </small>
                      </h3>
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300",
                          active
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <p className="overflow-hidden pt-1.5 leading-relaxed text-muted">
                          {s.text}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="hidden lg:block">
            <Stage step={step} />
          </div>
        </Container>
      </div>
    </section>
  );
}
