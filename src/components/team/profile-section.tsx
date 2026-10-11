import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconComponent =
  | LucideIcon
  | React.ComponentType<{ size?: number; className?: string }>;

/** Tarjeta de una sección del perfil (Experiencia, Habilidades, GitHub…). */
export function ProfileSection({
  Icon,
  title,
  action,
  className,
  children,
}: {
  Icon: IconComponent;
  title: string;
  /** Enlace o nota a la derecha del título (opcional). */
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("card rounded-2xl p-6", className)}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 font-display text-base font-bold text-navy">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <Icon size={17} />
          </span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

/** Entrada de una línea de tiempo (experiencia). */
export function TimelineItem({
  title,
  subtitle,
  children,
  last,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <li className={cn("relative pl-6", !last && "pb-6")}>
      {/* Línea y punto, el mismo motivo «línea con punto» de la marca */}
      {!last && (
        <span aria-hidden className="absolute bottom-0 left-[4px] top-2 w-px bg-brand-200" />
      )}
      <span
        aria-hidden
        className="absolute left-0 top-1.5 h-[9px] w-[9px] rounded-full bg-brand-500 ring-4 ring-white"
      />
      <p className="font-semibold leading-snug text-ink">{title}</p>
      {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      {children && (
        <div className="mt-2 text-sm leading-relaxed text-ink-soft">{children}</div>
      )}
    </li>
  );
}
