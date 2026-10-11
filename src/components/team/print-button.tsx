"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * «Descargar CV»: abre el diálogo de impresión del navegador, donde se elige
 * «Guardar como PDF». El formato del PDF sale del bloque `@media print` de
 * globals.css.
 */
export function PrintButton({ className }: { className?: string }) {
  return (
    <Button
      variant="secondary"
      size="md"
      className={className}
      onClick={() => window.print()}
    >
      <Download size={17} />
      Descargar CV
    </Button>
  );
}
