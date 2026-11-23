"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/ui/brand-mark";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { cn } from "@/lib/utils";

// Todo vive en la landing: cada enlace lleva a una sección (`id`).
const links = [
  { href: "/", id: "inicio", label: "Inicio" },
  { href: "/#servicios", id: "servicios", label: "Servicios" },
  { href: "/#proyectos", id: "proyectos", label: "Proyectos" },
  { href: "/#contacto", id: "contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState("inicio");
  const pathname = usePathname();

  // Sombra suave cuando la página ya bajó y resaltado de la sección visible.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const link of links) {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const isActive = (id: string) => pathname === "/" && section === id;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-lg transition-shadow duration-300",
        scrolled && "shadow-[0_10px_30px_-20px_rgba(6,33,95,0.45)]",
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <BrandLogo onClick={() => setOpen(false)} />

          {/* Escritorio */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.id) ? "location" : undefined}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3.5 after:-bottom-px after:h-0.5 after:origin-left after:rounded-full after:bg-brand-500 after:transition-transform after:duration-300",
                  isActive(link.id)
                    ? "text-navy after:scale-x-100"
                    : "text-muted hover:text-navy after:scale-x-0 hover:after:scale-x-100",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <WhatsAppButton size="sm">Contáctanos</WhatsAppButton>
          </div>

          {/* Botón menú móvil */}
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-soft hover:bg-slate-100 hover:text-ink lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
          <Container>
            <div className="flex flex-col gap-1 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.id) ? "location" : undefined}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive(link.id)
                      ? "bg-brand-50 text-navy"
                      : "text-ink-soft hover:bg-slate-100 hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <WhatsAppButton size="md" className="mt-2 w-full">
                Contáctanos
              </WhatsAppButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
