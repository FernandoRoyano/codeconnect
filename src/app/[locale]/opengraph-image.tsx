import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

// Sin `runtime = "edge"`: en edge esta ruta no se podia generar en build y se
// volvia a dibujar el PNG en cada peticion (3,4 s al compartir un enlace).
// Con `generateStaticParams` el PNG se genera una vez, al desplegar.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CodeConnect — Tecnología que elimina trabajo de tu negocio";

const TAGLINES: Record<string, { headline: string; sub: string }> = {
  es: {
    headline: "Tecnología que elimina trabajo de tu negocio.",
    sub: "Software, automatización e integraciones diseñados desde el problema.",
  },
};

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = TAGLINES[locale] ?? TAGLINES.es;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0F10",
          backgroundImage:
            "radial-gradient(at 20% 0%, rgba(32, 220, 194, 0.24) 0, transparent 48%), radial-gradient(at 80% 100%, rgba(17, 26, 29, 0.88) 0, transparent 55%)",
          padding: 80,
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#111A1D",
              border: "1px solid #2A3639",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <svg viewBox="0 0 256 160" width="52" height="34" aria-hidden="true">
              <g fill="none" stroke="#20DCC2" strokeWidth="27" strokeLinecap="round" strokeLinejoin="round">
                <path d="M109 45 84 20C68 4 42 4 26 20S10 62 26 78l31 31c16 16 42 16 58 0l33-33" />
                <path d="m147 115 25 25c16 16 42 16 58 0s16-42 0-58l-31-31c-16-16-42-16-58 0l-33 33" />
              </g>
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>CodeConnect</span>
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginTop: -4 }}>
              codeconnectsl.com
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#20DCC2",
            }}
          >
            Consultoría tecnológica · Product studio
          </span>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {t.headline}
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: 880,
            }}
          >
            {t.sub}
          </p>
        </div>

        {/* Footer pill */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: 18,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 4, background: "#20DCC2" }} />
            <span>Software · Automatización · IA · Integraciones</span>
          </div>
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.4)" }}>codeconnectsl.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
