import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import { CvDocument, type PdfImage } from "@/components/team/cv-document";
import { getProjects, getTeamMemberBySlug } from "@/lib/data";

// Lee de Supabase como el perfil: se regenera como máximo cada 60 s.
export const revalidate = 60;

/** Detecta JPG o PNG por sus primeros bytes; react-pdf no acepta otros. */
function asPdfImage(bytes: Buffer): PdfImage | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return { data: bytes, format: "jpg" };
  if (bytes[0] === 0x89 && bytes[1] === 0x50) return { data: bytes, format: "png" };
  return null;
}

/**
 * Foto del perfil. Solo se lee de `public/images` o del Storage público de
 * nuestro Supabase (lo mismo que admite next.config.ts); si no se puede, el
 * CV sale con las iniciales.
 */
async function loadPhoto(url: string | null): Promise<PdfImage | null> {
  if (!url) return null;
  const storage = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`;
  try {
    if (url.startsWith("/images/") && !url.includes("..")) {
      return asPdfImage(await readFile(join(process.cwd(), "public", url)));
    }
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && url.startsWith(storage)) {
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (res.ok) return asPdfImage(Buffer.from(await res.arrayBuffer()));
    }
  } catch (error) {
    console.warn("[cv] no se pudo leer la foto:", error);
  }
  return null;
}

/** «Descargar CV»: el perfil de una persona del equipo como PDF. */
export async function GET(
  _request: Request,
  ctx: RouteContext<"/equipo/[slug]/cv">,
) {
  const { slug } = await ctx.params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return new Response("Perfil no encontrado", { status: 404 });

  const [projects, photo, logo] = await Promise.all([
    member.project_slugs.length
      ? getProjects().then((all) =>
          all.filter((p) => member.project_slugs.includes(p.slug)),
        )
      : [],
    loadPhoto(member.avatar_url),
    readFile(join(process.cwd(), "public/brand/logo-dc.png")),
  ]);

  const pdf = await renderToBuffer(
    CvDocument({ member, projects, photo, logo: { data: logo, format: "png" } }),
  );

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="cv-${slug}.pdf"`,
    },
  });
}
