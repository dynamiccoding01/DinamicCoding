import { ImageResponse } from "next/og";

export const alt = "Dynamic Coding — Consultora y desarrolladora de software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#070c18",
          backgroundImage:
            "radial-gradient(700px 480px at 12% 4%, rgba(47,138,217,0.40), transparent 60%), radial-gradient(700px 480px at 96% 26%, rgba(124,108,255,0.38), transparent 60%), radial-gradient(600px 420px at 60% 108%, rgba(56,214,245,0.30), transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #2f8ad9, #123a6e)",
              color: "white",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            {"</>"}
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: 1, color: "white" }}>
            DYNAMIC
            <span style={{ color: "#38d6f5" }}>CODING</span>
          </div>
        </div>

        {/* Titular */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: "#eaf1fb",
              maxWidth: 940,
            }}
          >
            Construimos el software que tu empresa
            <span style={{ color: "#38d6f5", marginLeft: 16 }}>necesita.</span>
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: "#b7c8e2" }}>
            Aplicaciones web, móviles y sistemas de gestión a la medida.
          </div>
        </div>

        {/* Pie */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#8ea3c0" }}>
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 6, background: "#38d6f5" }} />
          dynamiccoding.dev
        </div>
      </div>
    ),
    { ...size },
  );
}
