import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceType } from "@/lib/services";

/** Tarjeta de un tipo de página. Enlaza a su página de detalle. */
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
      className="card card-hover group flex h-full flex-col rounded-2xl p-6"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-navy group-hover:text-white group-hover:ring-navy">
          <type.Icon size={22} />
        </span>
        <span className="font-display text-2xl font-extrabold text-brand-100">
          {index + 1}
        </span>
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-navy">
        {type.title}
      </h3>
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
