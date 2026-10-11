import Image from "next/image";
import { cn } from "@/lib/utils";

/** Devuelve las iniciales (máx. 2) a partir de un nombre completo. */
function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Avatar del perfil. Muestra la foto si existe `src`; de lo contrario un
 * marcador con degradado e iniciales.
 */
export function Avatar({
  name,
  src,
  size = 96,
  className,
}: {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-black/5",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500 to-navy font-display font-bold text-white">
          <span style={{ fontSize: size * 0.36 }}>{initials(name)}</span>
        </div>
      )}
    </div>
  );
}
