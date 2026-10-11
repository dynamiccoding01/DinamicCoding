/** Datos de contacto de la empresa (los de sus piezas gráficas). */
export const contact = {
  /** Número de WhatsApp en formato internacional, solo dígitos. */
  whatsappNumber: "59163448209",
  whatsappDisplay: "+591 63448209",
  city: "Santa Cruz de la Sierra, Bolivia",
} as const;

/** Enlace que abre un chat de WhatsApp con un mensaje ya escrito. */
export function whatsappUrl(
  message = "Hola, quiero cotizar una página web.",
) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Mensaje para quien todavía no sabe qué tipo de página necesita. */
export const ADVICE_MESSAGE =
  "Hola, necesito asesoría para saber qué tipo de página web me conviene.";
