import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceMockup } from "@/components/services/service-mockup";
import type { ServiceType } from "@/lib/services";

/**
 * Tarjeta de un tipo de página con su maqueta sobre un panel de marca
 * (anclada arriba y recortada por abajo, como las portadas de proyectos).
 * Enlaza a su página de detalle.
 */
export function ServiceCard({
  type,
  index,
}: {
  type: ServiceType;
  index: number;
}) {
  return (
    <Link
      href={`/servicios/${type.slug}`}
      className="card card-hover group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-brand-100 to-brand-50">
        <div className="absolute inset-x-[9%] top-[14%] transition-transform duration-500 motion-safe:group-hover:-translate-y-2">
          <ServiceMockup
            type={type}
            className="drop-shadow-[0_14px_18px_rgba(6,33,95,0.18)]"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-navy">
            {type.title}
          </h3>
          <span className="font-display text-2xl font-extrabold leading-none text-brand-100">
            {index + 1}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {type.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          Ver detalle
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

/** Tarjeta de cierre de la grilla: invita a pedir asesoría. */
export function AdviceCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-gradient-to-br from-brand-800 to-navy-deep p-6 text-white">
      <h3 className="font-display text-lg font-bold">¿No sabes cuál elegir?</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-100">
        Cuéntanos qué quieres lograr y te recomendamos el tipo de página
        adecuado para tu negocio.
      </p>
      <div className="mt-5">{children}</div>
    </div>
  );
}
