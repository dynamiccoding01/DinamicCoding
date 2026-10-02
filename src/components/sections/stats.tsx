"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";

type Stat = { value: number; suffix?: string; label: string };

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Proyectos entregados" },
  { value: 8, suffix: "+", label: "Años de experiencia" },
  { value: 30, suffix: "+", label: "Clientes satisfechos" },
  { value: 99, suffix: "%", label: "Satisfacción" },
];

function useCountUp(target: number, run: boolean, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    // Con movimiento reducido, el primer frame ya muestra el valor final.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = reduced ? 1 : Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return n;
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const n = useCountUp(stat.value, run);
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
        <span className="grad-text">
          {n}
          {stat.suffix}
        </span>
      </p>
      <p className="mt-2 text-sm text-muted">{stat.label}</p>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // También cubre navegadores sin IntersectionObserver.
    const fallback = window.setTimeout(() => setRun(true), 1000);
    if (typeof IntersectionObserver === "undefined") {
      return () => window.clearTimeout(fallback);
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section className="border-b border-line py-16">
      <Container>
        <div
          ref={ref}
          className="glass grid grid-cols-2 gap-8 rounded-3xl px-8 py-10 sm:py-12 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} run={run} />
          ))}
        </div>
      </Container>
    </section>
  );
}
