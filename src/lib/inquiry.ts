/**
 * Límites del formulario de consulta (servidor y `maxLength` del cliente).
 * Deben coincidir con los CHECK de la tabla `consultas` en
 * supabase/base-de-datos.sql.
 */
export const INQUIRY_LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  company: { max: 160 },
  phone: { max: 40 },
  subject: { max: 120 },
  message: { min: 10, max: 5000 },
} as const;

export type InquiryField = keyof typeof INQUIRY_LIMITS;
