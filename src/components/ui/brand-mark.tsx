import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Monograma «DC» del logo de Dynamic Coding. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-dc.png"
      alt=""
      width={480}
      height={276}
      priority
      className={cn("h-9 w-auto", className)}
    />
  );
}

/** Marca de la barra superior: monograma + «DYNAMIC CODING» (enlaza al inicio). */
export function BrandLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-2.5"
      aria-label="Dynamic Coding — inicio"
    >
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-extrabold tracking-wide text-brand-700">
          DYNAMIC CODING
        </span>
        <span className="mt-1 hidden text-[8.5px] font-medium uppercase tracking-[0.14em] text-muted sm:block">
          Innovación a través del código
        </span>
      </span>
    </Link>
  );
}

/** Logo completo (monograma, nombre y lema), para el pie y «Quiénes somos». */
export function BrandLogoFull({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-dynamic-coding.png"
      alt="Dynamic Coding — Innovación a través del código"
      width={720}
      height={544}
      className={cn("h-auto w-40", className)}
    />
  );
}
