import { OG_SIZE, renderOg } from "@/lib/og";
import { routing } from "@/i18n/routing";

// Sin `runtime = "edge"`: en edge esta ruta no se podia generar en build y se
// volvia a dibujar el PNG en cada peticion (3,4 s al compartir un enlace).
// Con `generateStaticParams` el PNG se genera una vez, al desplegar.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "CodeConnect — Tecnología que elimina trabajo de tu negocio";

const TAGLINES: Record<string, { headline: string; sub: string }> = {
  es: {
    headline: "Tecnología que elimina trabajo de tu negocio.",
    sub: "Software a medida y automatización para clínicas, gimnasios y centros de bienestar.",
  },
};

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = TAGLINES[locale] ?? TAGLINES.es;

  return renderOg({
    eyebrow: "Consultoría tecnológica · Product studio",
    headline: t.headline,
    sub: t.sub,
  });
}
