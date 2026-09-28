"use server";

import { getSupabase } from "./supabase/client";

export type ContactState = {
  status: "idle" | "success" | "error" | "demo";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
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
  const name = str(formData, "name");
  const email = str(formData, "email");
  const company = str(formData, "company");
  const phone = str(formData, "phone");
  const subject = str(formData, "subject");
  const message = str(formData, "message");

  // Honeypot anti-spam: si viene relleno, ignoramos silenciosamente.
  if (str(formData, "website")) {
    return { status: "success", message: "¡Gracias! Te contactaremos pronto." };
  }

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Ingresa tu nombre.";
  if (!EMAIL_RE.test(email)) errors.email = "Ingresa un correo válido.";
  if (message.length < 10)
    errors.message = "Cuéntanos un poco más (mínimo 10 caracteres).";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Revisa los campos marcados.", errors };
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
    console.error("[contacto] error al guardar consulta:", error.message);
    return {
      status: "error",
      message:
        "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por correo.",
    };
  }

  return {
    status: "success",
    message: "¡Gracias! Recibimos tu consulta y te responderemos pronto.",
  };
}
