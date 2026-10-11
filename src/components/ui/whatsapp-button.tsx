import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/contact";

/** Botón que abre un chat de WhatsApp con un mensaje ya escrito. */
export function WhatsAppButton({
  message,
  children = "Cotiza tu página web",
  size = "lg",
  variant = "primary",
  className,
}: {
  message?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Button
      href={whatsappUrl(message)}
      external
      size={size}
      variant={variant}
      className={className}
    >
      <WhatsAppIcon size={size === "sm" ? 16 : 18} />
      {children}
    </Button>
  );
}

/** Botón flotante de WhatsApp, presente en todas las páginas. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="wa-pulse fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
