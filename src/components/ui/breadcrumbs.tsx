import Link from "next/link";

type Crumb = { label: string; href?: string };

/**
 * Migas de pan sobre el título: «Inicio / Sección / Página». «Inicio» se
 * agrega solo; el último elemento es la página actual (en negrita, sin
 * enlace). No sale en la impresión del CV.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Inicio", href: "/" }, ...items];

  return (
    <nav aria-label="Migas de pan" className="no-print">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {trail.map((crumb, i) => {
          const current = i === trail.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-muted/50">
                  /
                </span>
              )}
              {current || !crumb.href ? (
                <span
                  aria-current={current ? "page" : undefined}
                  className="font-semibold text-navy"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-muted transition-colors hover:text-brand-600"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
