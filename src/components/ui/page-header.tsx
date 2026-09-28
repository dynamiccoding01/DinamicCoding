import { Container } from "@/components/ui/container";

/** Cabecera de páginas interiores (título + descripción sobre banda oscura). */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  highlight,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Palabra final del título con degradado animado. */
  highlight?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface-soft">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
      <Container className="relative py-16 sm:py-20">
        {eyebrow && (
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-balance font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          {title}
          {highlight && <> <span className="grad-text">{highlight}</span></>}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
