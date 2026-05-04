import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CodeConnect — Tu negocio digital, sin agencia de por medio";

const TAGLINES: Record<string, { headline: string; sub: string }> = {
  es: {
    headline: "Tu negocio digital, sin agencia de por medio.",
    sub: "Webs, CRMs y apps a medida para clínicas, gimnasios y centros wellness.",
  },
  en: {
    headline: "Your business online, without the agency in between.",
    sub: "Custom web, CRM and apps for clinics, gyms and wellness centers.",
  },
  fr: {
    headline: "Votre entreprise en ligne, sans agence intermédiaire.",
    sub: "Sites, CRM et apps sur mesure pour cliniques, salles de sport et centres bien-être.",
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
          background: "#0f3150",
          backgroundImage:
            "radial-gradient(at 20% 0%, rgba(113, 198, 72, 0.35) 0, transparent 50%), radial-gradient(at 80% 100%, rgba(31, 90, 143, 0.7) 0, transparent 55%), radial-gradient(at 100% 0%, rgba(113, 198, 72, 0.15) 0, transparent 50%)",
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
              background: "linear-gradient(135deg, #71C648 0%, #5fb039 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            CC
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>CodeConnect</span>
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginTop: -4 }}>
              codeconnect.es
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
              color: "#71C648",
            }}
          >
            Salud · Fitness · Wellness
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
            <span style={{ width: 8, height: 8, borderRadius: 4, background: "#71C648" }} />
            <span>30+ proyectos · 100% satisfacción · Respuesta en 24h</span>
          </div>
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.4)" }}>codeconnect.es</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
