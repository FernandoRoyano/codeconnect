import { OG_SIZE, renderOg } from "@/lib/og";
import { routing } from "@/i18n/routing";
import { getSector, sectors } from "@/content/sectors";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => sectors.map((sector) => ({ locale, sector: sector.slug })));
}

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "CodeConnect — Soluciones por sector";

export default async function OpengraphImage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector: slug } = await params;
  const sector = getSector(slug) ?? sectors[0];

  return renderOg({
    eyebrow: sector.eyebrow,
    headline: sector.title,
    sub: sector.audience.join(" · "),
    footer: "Web · Gestión · Automatización · Cobros",
  });
}
