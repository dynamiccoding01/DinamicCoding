import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { contact } from "@/lib/contact";

export const alt = "Dynamic Coding — Soluciones digitales a la medida de tu negocio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen al compartir el sitio: logo real y mensaje central de la marca. */
export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/logo-dynamic-coding.png"),
    "base64",
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#f6f8fb",
          fontFamily: "sans-serif",
        }}
      >
        {/* Mensaje */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 760,
            padding: "64px 0 64px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 26px",
              backgroundColor: "#0274d7",
              color: "white",
              fontSize: 21,
              letterSpacing: 4,
            }}
          >
            CONSULTORES · ASESORÍA Y CONSULTORÍA
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 74,
                lineHeight: 1.08,
                letterSpacing: -2,
                color: "#083189",
              }}
            >
              <span>Soluciones digitales</span>
              <span style={{ display: "flex" }}>
                <span style={{ color: "#0274d7" }}>a tu medida</span>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 30,
                paddingLeft: 22,
                borderLeft: "5px solid #0274d7",
                fontSize: 28,
                lineHeight: 1.35,
                color: "#37445a",
              }}
            >
              Te asesoramos y desarrollamos lo que tu negocio necesita.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", color: "#083189" }}>
            <span style={{ fontSize: 30 }}>WhatsApp {contact.whatsappDisplay}</span>
          </div>
        </div>

        {/* Logo sobre panel blanco */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            borderLeft: "10px solid #083189",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${logo}`}
            width={340}
            height={257}
            alt=""
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
