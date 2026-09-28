import type { Metadata } from "next";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos sobre tu proyecto. Solicita una consulta con Dynamic Coding y te respondemos con una propuesta.",
};

const info = [
  {
    Icon: Mail,
    title: "Correo",
    value: "hola@dynamiccoding.dev",
    href: "mailto:hola@dynamiccoding.dev",
  },
  {
    Icon: Clock,
    title: "Tiempo de respuesta",
    value: "Menos de 24 horas hábiles",
  },
  {
    Icon: MapPin,
    title: "Trabajamos",
    value: "100% remoto, en toda Latinoamérica",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Solicita una consulta"
        subtitle="Cuéntanos qué necesitas y te respondemos con una propuesta. La primera consulta no tiene costo."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Información */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-brand-600">
                <MessageSquare size={20} />
                <h2 className="font-display text-lg font-semibold text-ink">Hablemos</h2>
              </div>
              <p className="mt-4 text-pretty leading-relaxed text-muted">
                Estamos listos para escuchar tu idea. Completa el formulario o
                escríbenos directamente; siempre hay una persona del equipo
                atenta a responderte.
              </p>

              <dl className="mt-8 space-y-6">
                {info.map(({ Icon, title, value, href }) => (
                  <div key={title} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                      <Icon size={20} />
                    </span>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-wide text-muted">
                        {title}
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-ink">
                        {href ? (
                          <a href={href} className="hover:text-brand-600">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* Formulario */}
            <div className="lg:col-span-3">
              <div className="glass rounded-2xl p-7 sm:p-9">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
