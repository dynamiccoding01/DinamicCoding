"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant = "up" | "left" | "right" | "zoom";

/**
 * Envuelve contenido y lo hace aparecer, una sola vez, cuando entra en el
 * viewport al hacer scroll. `variant` elige de dónde llega y `delay` (ms)
 * escalona varias piezas. Respeta `prefers-reduced-motion` (ver globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sin IntersectionObserver (navegadores muy viejos) se muestra de inmediato.
    // No hay otro temporizador: si todo se mostrara a los pocos segundos, lo
    // que está más abajo ya habría hecho su animación antes de llegar a verlo.
    if (typeof IntersectionObserver === "undefined") {
      const t = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal",
        variant !== "up" && `reveal--${variant}`,
        visible && "is-visible",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
