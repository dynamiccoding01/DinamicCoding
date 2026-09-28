import { cn } from "@/lib/utils";

type Tone = "brand" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
  neutral: "bg-slate-100 text-ink-soft ring-1 ring-slate-200",
};

/** Etiqueta pequeña para tecnologías, habilidades o categorías. */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
