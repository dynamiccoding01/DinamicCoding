import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Devuelve un cliente de Supabase si las variables de entorno están
 * configuradas; en caso contrario devuelve `null` para que la capa de datos
 * use los datos de ejemplo (modo demo).
 *
 * Este sitio público solo LEE proyectos/equipo e INSERTA consultas, protegido
 * por RLS. La clave anónima es pública por diseño (ver /supabase/base-de-datos.sql).
 */
let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    cached = null;
    return cached;
  }

  cached = createClient(url, anonKey, {
    auth: { persistSession: false },
  });
  return cached;
}

/** `true` cuando Supabase está configurado (no estamos en modo demo). */
export function isSupabaseConfigured(): boolean {
  return getSupabase() !== null;
}
