import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";

/** Cabecera de páginas interiores: título y descripción sobre banda clara. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Contenido extra bajo el subtítulo (botones, enlaces). */
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface-soft">
      {/* Formas diagonales de la marca, muy tenues */}
      <div
        aria-hidden
        className="shape-diagonal pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[26rem] bg-brand-100/60 md:block"
      />
      <div
        aria-hidden
        className="shape-stripe pointer-events-none absolute bottom-0 right-10 top-0 hidden w-[26rem] bg-brand-200/60 md:block"
      />
      <Container className="relative py-14 sm:py-16">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-2 max-w-3xl text-balance font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </Container>
    </section>
  );
}
