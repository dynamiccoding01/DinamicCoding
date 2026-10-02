import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/brand-icons";
import { BrandLogo } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";

const socialClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-slate-300 transition-colors hover:border-cyan/40 hover:text-cyan";

const quickLinks = [
  { label: "Inicio", href: "/" },
  { label: "Quiénes somos", href: "/#nosotros" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Equipo", href: "/equipo" },
  { label: "Contacto", href: "/contacto" },
];

const serviceGroups = [
  {
    title: "Desarrollo",
    items: ["Aplicaciones web", "Aplicaciones móviles", "Sistemas & ERP", "E-commerce"],
  },
  {
    title: "Consultoría",
    items: ["Arquitectura de software", "Diseño UI/UX", "Cloud & DevOps"],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#070c18] text-slate-400">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Marca */}
          <div className="lg:col-span-4">
            <BrandLogo onDark showTagline />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Tu aliado para construir software con estilo, calidad y resultados.
              Más de 8 años convirtiendo ideas en productos digitales.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={socialClass}>
                <GithubIcon size={18} />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialClass}>
                <LinkedinIcon size={18} />
              </a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X" className={socialClass}>
                <XIcon size={16} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <nav className="lg:col-span-2">
            <h4 className="font-display text-base font-bold text-white">Enlaces rápidos</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-cyan">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-bold text-white">Nuestros servicios</h4>
            <div className="mt-5 space-y-5">
              {serviceGroups.map((group) => (
                <div key={group.title}>
                  <p className="font-display text-sm font-semibold text-cyan">{group.title}</p>
                  <ul className="mt-2 space-y-2 border-l border-white/10 pl-4 text-sm">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Link href="/contacto" className="transition-colors hover:text-cyan">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-bold text-white">Contacto</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-cyan" />
                <span>Lima, Perú — 100% remoto en toda Latinoamérica</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-cyan" />
                <a href="tel:+51999000000" className="hover:text-cyan">+51 999 000 000</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-cyan" />
                <a href="mailto:hola@dynamiccoding.dev" className="hover:text-cyan">
                  hola@dynamiccoding.dev
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        {/* TODO: volver a enlazar /terminos y /privacidad cuando existan esas páginas. */}
        <div className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-slate-500 sm:text-left">
          <p>© {year} Dynamic Coding. Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
