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
        "text-xs font-semibold uppercase tracking-[0.16em] text-brand-600",
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
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
