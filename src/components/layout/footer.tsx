import Link from "next/link";
import { MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { BrandLogoFull } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import { serviceTypes } from "@/lib/services";
import { contact, whatsappUrl } from "@/lib/contact";

const quickLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Equipo", href: "/equipo" },
  { label: "Contacto", href: "/contacto" },
];

const linkClass = "text-ink-soft transition-colors hover:text-brand-600";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface-soft">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Marca */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Dynamic Coding — inicio" className="inline-block">
              <BrandLogoFull />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Asesoría y consultoría para que cada negocio tenga la página web
              que realmente necesita.
            </p>
          </div>

          {/* Navegación */}
          <nav className="lg:col-span-2" aria-label="Navegación del pie">
            <h2 className="font-display text-sm font-bold text-navy">Navegación</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tipos de página */}
          <nav className="lg:col-span-3" aria-label="Tipos de página">
            <h2 className="font-display text-sm font-bold text-navy">Tipos de página</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceTypes.map((type) => (
                <li key={type.slug}>
                  <Link href={`/servicios/${type.slug}`} className={linkClass}>
                    {type.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold text-navy">Contacto</h2>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-semibold text-navy transition-colors hover:text-brand-600"
                >
                  <WhatsAppIcon size={18} className="text-whatsapp" />
                  {contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-ink-soft">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-500" />
                <span>{contact.city}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* TODO: enlazar /terminos y /privacidad cuando existan esas páginas. */}
        <div className="mt-12 border-t border-line pt-6 text-sm text-muted">
          <p>© {year} Dynamic Coding. Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
