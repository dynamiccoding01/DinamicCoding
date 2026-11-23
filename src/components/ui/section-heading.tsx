import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** Etiqueta pequeña en mayúsculas que antecede a un título. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 before:mr-2.5 before:inline-block before:h-px before:w-6 before:bg-brand-500 before:align-middle",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Encabezado de sección con "eyebrow", título y subtítulo opcionales. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={150}>
        <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={300}>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
