import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

/**
 * Cabecera de páginas interiores: migas de pan, título y descripción sobre
 * banda clara.
 */
export function PageHeader({
  breadcrumb,
  title,
  subtitle,
  children,
}: {
  /** Nombre de la página en las migas de pan: «Inicio / {breadcrumb}». */
  breadcrumb: string;
  title: string;
  subtitle?: string;
  /** Contenido extra bajo el subtítulo (botones, enlaces). */
  children?: React.ReactNode;
}) {
  return (
    <section className="panel">
      <Container className="py-14 sm:py-16">
        <Breadcrumbs items={[{ label: breadcrumb }]} />
        <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
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
