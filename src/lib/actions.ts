"use server";

import { getSupabase } from "./supabase/client";
import { INQUIRY_LIMITS, type InquiryField } from "./inquiry";

export type ContactState = {
  status: "idle" | "success" | "error" | "demo";
  message?: string;
  errors?: Partial<Record<InquiryField, string>>;
  /**
   * Lo que envió el usuario. React 19 vacía el formulario al terminar la
   * acción, así que el cliente lo vuelve a rellenar con esto si hubo error.
   */
  values?: Record<InquiryField, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Recibe el formulario público de consulta, valida y lo guarda en Supabase
 * (tabla `inquiries`). Estas consultas se administran desde el proyecto de
 * administración. Si Supabase aún no está configurado, responde en modo demo.
 */
export async function submitInquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values: Record<InquiryField, string> = {
    name: str(formData, "name"),
    email: str(formData, "email"),
    company: str(formData, "company"),
    phone: str(formData, "phone"),
    subject: str(formData, "subject"),
    message: str(formData, "message"),
  };
  const { name, email, company, phone, subject, message } = values;

  // Honeypot anti-spam: si viene relleno, ignoramos silenciosamente.
  if (str(formData, "website")) {
    return { status: "success", message: "¡Gracias! Te contactaremos pronto." };
  }

  const errors: ContactState["errors"] = {};
  for (const field of Object.keys(INQUIRY_LIMITS) as InquiryField[]) {
    const { max } = INQUIRY_LIMITS[field];
    if (values[field].length > max) errors[field] = `Máximo ${max} caracteres.`;
  }
  if (name.length < INQUIRY_LIMITS.name.min) errors.name = "Ingresa tu nombre.";
  if (!EMAIL_RE.test(email)) errors.email = "Ingresa un correo válido.";
  if (message.length < INQUIRY_LIMITS.message.min)
    errors.message = `Cuéntanos un poco más (mínimo ${INQUIRY_LIMITS.message.min} caracteres).`;

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      errors,
      values,
    };
  }

  const supabase = getSupabase();

  // Modo demo: sin Supabase configurado no persistimos, pero confirmamos al usuario.
  if (!supabase) {
    console.info("[contacto] (demo) consulta recibida:", {
      name,
      email,
      subject,
    });
    return {
      status: "demo",
      message:
        "¡Gracias! Recibimos tu mensaje (modo demo: aún no se guarda en la base de datos).",
    };
  }

  const { error } = await supabase.from("inquiries").insert({
    name,
    email,
    company: company || null,
    phone: phone || null,
    subject: subject || null,
    message,
  });

  if (error) {
    // PT429: límite de envíos por correo (trigger en supabase/schema.sql).
    if (error.code === "PT429") {
      return {
        status: "error",
        message:
          "Ya recibimos varias consultas tuyas hace un momento. Espera unos minutos antes de enviar otra.",
        values,
      };
    }
    console.error("[contacto] error al guardar consulta:", error.message);
    return {
      status: "error",
      message:
        "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por correo.",
      values,
    };
  }

  return {
    status: "success",
    message: "¡Gracias! Recibimos tu consulta y te responderemos pronto.",
  };
}
