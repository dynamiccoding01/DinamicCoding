import {
  Globe,
  Smartphone,
  Boxes,
  Cloud,
  PenTool,
  Lightbulb,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const services = [
  { Icon: Globe, title: "Desarrollo web", description: "Aplicaciones y sitios web rápidos, escalables y optimizados para buscadores con Next.js y React." },
  { Icon: Smartphone, title: "Aplicaciones móviles", description: "Apps nativas y multiplataforma para iOS y Android con una experiencia fluida y cuidada." },
  { Icon: Boxes, title: "Sistemas de gestión", description: "ERP, inventarios, kardex y paneles a la medida para digitalizar y ordenar tu operación." },
  { Icon: Lightbulb, title: "Consultoría & arquitectura", description: "Te ayudamos a definir la solución, elegir el stack y diseñar una arquitectura que escale." },
  { Icon: PenTool, title: "Diseño UI/UX", description: "Interfaces claras, accesibles y atractivas, pensadas para que tus usuarios logren su objetivo." },
  { Icon: Cloud, title: "Cloud & DevOps", description: "Despliegue, monitoreo y escalado en la nube con procesos automatizados y seguros." },
];

export function Services() {
  return (
    <section id="servicios" className="border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Qué hacemos"
          title="Servicios pensados para tu negocio"
          subtitle="Cubrimos todo el ciclo de vida del producto, desde la idea hasta la operación en producción."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 60}>
              <div className="glass card-glow group h-full rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <service.Icon size={24} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
