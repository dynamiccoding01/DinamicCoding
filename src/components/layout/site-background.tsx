/** Corte diagonal de la marca: franja celeste y bloque azul a la derecha. */
function Diagonal() {
  return (
    <div className="site-bg-diag absolute inset-y-0 right-0 w-[46%]">
      <div className="shape-stripe absolute inset-y-0 -left-10 w-full bg-linear-to-b from-sky to-brand-500" />
      <div className="shape-diagonal absolute inset-0 bg-linear-to-br from-brand-800 to-navy-deep" />
    </div>
  );
}

/**
 * Fondo fijo de todo el sitio. Arriba se ve nítido; al bajar aparece encima
 * una copia desenfocada y aclarada (`.site-bg-soft` en globals.css): la
 * diagonal nunca se pierde, pero no compite con el contenido, que va en
 * secciones de vidrio (`panel`).
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="no-print pointer-events-none fixed inset-0 -z-10 bg-surface-soft"
    >
      <Diagonal />
      <div className="site-bg-soft absolute inset-0">
        <div className="absolute inset-0 blur-xl">
          <Diagonal />
        </div>
        <div className="absolute inset-0 bg-surface/35 max-md:bg-surface/70" />
      </div>
    </div>
  );
}
