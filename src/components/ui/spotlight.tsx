"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Envuelve contenido y proyecta un brillo radial que sigue el cursor.
 * Aplica la clase `.spot` (ver globals.css) y actualiza --mx / --my.
 */
export function Spotlight({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      data-active={active}
      className={cn("spot", className)}
    >
      {children}
    </Comp>
  );
}
