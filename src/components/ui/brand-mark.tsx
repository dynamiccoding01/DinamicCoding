import Link from "next/link";
import { cn } from "@/lib/utils";
// (cn se usa en BrandLogo para alternar colores en fondo claro/oscuro)

/** Símbolo de marca (evoca el `</>` del logo de Dynamic Coding). */
export function BrandMark({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-[10px] bg-gradient-to-br from-brand-500 to-brand-800 shadow-[0_6px_18px_-6px_rgba(47,138,217,0.7)]",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 56 40" fill="none" width={size * 0.6} height={size * 0.4}>
        <path d="M22 9 L11 20 L22 31" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 9 L45 20 L34 31" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="30.5" y1="7" x2="25.5" y2="33" stroke="#bfe0ff" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Marca completa: símbolo + "DYNAMIC CODING" (enlaza al inicio). */
export function BrandLogo({
  onClick,
  showTagline = false,
  onDark = false,
}: {
  onClick?: () => void;
  showTagline?: boolean;
  /** true cuando va sobre fondo oscuro (footer / hero). */
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-2.5"
      aria-label="Dynamic Coding — inicio"
    >
      <BrandMark size={38} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[17px] font-extrabold tracking-wide",
            onDark ? "text-white" : "text-ink",
          )}
        >
          DYNAMIC
          <span className={onDark ? "text-cyan" : "text-brand-600"}>CODING</span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 font-mono text-[8px] uppercase tracking-[0.18em]",
              onDark ? "text-slate-400" : "text-muted",
            )}
          >
            Innovación a través del código
          </span>
        )}
      </span>
    </Link>
  );
}
