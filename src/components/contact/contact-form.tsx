"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { submitInquiry, type ContactState } from "@/lib/actions";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const services = [
  "Aplicación web",
  "Aplicación móvil",
  "Sistema de gestión / ERP",
  "E-commerce",
  "Consultoría / arquitectura",
  "Diseño UI/UX",
  "Otro",
];

const inputBase =
  "mt-2 w-full rounded-xl border bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/25";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 text-base font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Enviando…" : "Enviar consulta"}
      {!pending && <Send size={17} />}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn(
          inputBase,
          "h-11",
          error ? "border-red-400" : "border-line focus:border-brand-400",
        )}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitInquiry, initialState);

  if (state.status === "success" || state.status === "demo") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">
          ¡Mensaje enviado!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && state.message && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" name="name" required placeholder="Tu nombre" error={state.errors?.name} />
        <Field label="Correo electrónico" name="email" type="email" required placeholder="tu@correo.com" error={state.errors?.email} />
        <Field label="Empresa" name="company" placeholder="Opcional" />
        <Field label="Teléfono" name="phone" placeholder="Opcional" />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-ink">
          ¿En qué te ayudamos?
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue=""
          className={cn(inputBase, "h-11 border-line focus:border-brand-400")}
        >
          <option value="" disabled>
            Selecciona un servicio…
          </option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Mensaje <span className="text-brand-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Cuéntanos sobre tu proyecto o necesidad…"
          aria-invalid={!!state.errors?.message}
          className={cn(
            inputBase,
            "py-3",
            state.errors?.message ? "border-red-400" : "border-line focus:border-brand-400",
          )}
        />
        {state.errors?.message && (
          <p className="mt-1.5 text-xs text-red-600">{state.errors.message}</p>
        )}
      </div>

      {/* Honeypot anti-spam (oculto para humanos) */}
      <div aria-hidden className="hidden">
        <label>
          No llenar
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="pt-1">
        <SubmitButton />
        <p className="mt-3 text-xs text-muted">
          Al enviar aceptas que te contactemos para responder tu consulta.
        </p>
      </div>
    </form>
  );
}
