"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/ui/brand-mark";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/equipo", label: "Equipo" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-lg">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <BrandLogo onClick={() => setOpen(false)} />

          {/* Escritorio */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-navy after:absolute after:inset-x-3.5 after:-bottom-px after:h-0.5 after:rounded-full after:bg-brand-500"
                    : "text-muted hover:text-navy",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <WhatsAppButton size="sm">Cotizar</WhatsAppButton>
          </div>

          {/* Botón menú móvil */}
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-soft hover:bg-slate-100 hover:text-ink md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-line bg-surface md:hidden">
          <Container>
            <div className="flex flex-col gap-1 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-brand-50 text-navy"
                      : "text-ink-soft hover:bg-slate-100 hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <WhatsAppButton size="md" className="mt-2 w-full">
                Cotiza tu página web
              </WhatsAppButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
