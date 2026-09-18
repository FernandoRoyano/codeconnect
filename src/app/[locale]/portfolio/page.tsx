import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import PortfolioContent from "./PortfolioContent";

const TITLES: Record<string, string> = {
  es: "Ejemplos de Software para Clínicas, Gimnasios y Bienestar",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Proyectos reales de webs y software para clientes y productos propios: TrainHub, Antea Salud, WellnessReal y más.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: TITLES[locale] || TITLES.es,
    description: DESCRIPTIONS[locale] || DESCRIPTIONS.es,
    alternates: buildAlternates(locale, "/portfolio"),
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PortfolioContent />;
}
