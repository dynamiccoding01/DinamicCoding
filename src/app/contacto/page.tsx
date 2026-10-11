import type { Metadata } from "next";
import { MapPin, MessageSquare, UserCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Eyebrow } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ContactForm } from "@/components/contact/contact-form";
import { ADVICE_MESSAGE, contact, whatsappUrl } from "@/lib/contact";
import { serviceTypes } from "@/lib/services";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cotiza tu página web con Dynamic Coding. Escríbenos por WhatsApp y te asesoramos sin que tengas que registrarte.",
};

/** Mensajes rápidos: abren WhatsApp con el texto ya escrito. */
const quickMessages = [
  ...serviceTypes.map((type) => ({
    label: type.title,
    message: `Hola, quiero cotizar: ${type.title}.`,
  })),
  {
    label: "App o sistema a medida",
    message: "Hola, quiero consultar por una aplicación o un sistema a medida.",
  },
  { label: "No sé cuál necesito", message: ADVICE_MESSAGE },
];

const info = [
  {
    Icon: MapPin,
    title: "Dónde estamos",
    value: contact.city,
  },
  {
    Icon: UserCheck,
    title: "Sin registro",
    value: "No necesitas crear una cuenta para consultarnos.",
  },
  {
    Icon: MessageSquare,
    title: "Asesoría primero",
    value: "Te recomendamos el tipo de página antes de cotizar.",
  },
];

export default function ContactPage() {
  // El formulario guarda en Supabase. Mientras no esté conectado no se
  // muestra, para no recibir consultas que se perderían: queda WhatsApp.
  const formEnabled = isSupabaseConfigured();

  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Cotiza tu página web con nosotros"
        subtitle="Cuéntanos qué necesita tu negocio y te asesoramos. No hace falta registrarse."
      />

      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-5">
            {/* WhatsApp */}
            <div className="card rounded-2xl p-7 sm:p-9 lg:col-span-3">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-whatsapp text-white">
                  <WhatsAppIcon size={24} />
                </span>
                <div>
                  <Eyebrow>WhatsApp</Eyebrow>
                  <p className="font-display text-2xl font-extrabold tracking-tight text-navy">
                    {contact.whatsappDisplay}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-pretty leading-relaxed text-ink-soft">
                Es la forma más rápida de cotizar. Escríbenos directamente o
                elige lo que te interesa y abrimos el chat con el mensaje ya
                escrito.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {quickMessages.map(({ label, message }) => (
                  <li key={label}>
                    <a
                      href={whatsappUrl(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-navy"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <WhatsAppButton>Escríbenos por WhatsApp</WhatsAppButton>
              </div>
            </div>

            {/* Información */}
            <dl className="space-y-6 lg:col-span-2 lg:pl-4 lg:pt-3">
              {info.map(({ Icon, title, value }) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon size={20} />
                  </span>
                  <div>
                    <dt className="font-display text-base font-bold text-navy">
                      {title}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {formEnabled && (
        <section className="bg-surface-soft py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Eyebrow>Formulario</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy">
                ¿Prefieres dejarnos tus datos?
              </h2>
              <p className="mt-3 text-ink-soft">
                Completa el formulario y te contactamos nosotros.
              </p>
              <div className="card mt-8 rounded-2xl p-7 sm:p-9">
                <ContactForm />
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
