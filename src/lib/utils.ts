import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases de Tailwind resolviendo conflictos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Periodo de un puesto: "2021 – hoy", "2019 – 2021" o lo que haya. */
export function period(start: string, end: string | null) {
  return [start, end ?? "hoy"].filter(Boolean).join(" – ");
}
