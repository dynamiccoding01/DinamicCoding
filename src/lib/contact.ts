/** Datos de contacto de la empresa (los de sus piezas gráficas). */
export const contact = {
  /** Número de WhatsApp en formato internacional, solo dígitos. */
  whatsappNumber: "59163448209",
  whatsappDisplay: "+591 63448209",
} as const;

/** Enlace que abre un chat de WhatsApp con un mensaje ya escrito. */
export function whatsappUrl(
  message = "Hola, quiero hablar con ustedes sobre un proyecto.",
) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Mensaje para quien todavía no sabe qué solución necesita. */
export const ADVICE_MESSAGE =
  "Hola, necesito asesoría para saber qué solución me conviene.";
