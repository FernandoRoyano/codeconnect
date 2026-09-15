import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import PortfolioContent from "./PortfolioContent";

const TITLES: Record<string, string> = {
  es: "Ejemplos de Software para Clínicas, Gimnasios y Bienestar",
  en: "Software Examples for Clinics, Gyms and Wellness Centers",
  fr: "Exemples de Logiciels pour Cliniques, Salles de Sport et Bien-être",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Proyectos reales de webs y software para clientes y productos propios: TrainHub, Antea Salud, WellnessReal y más.",
  en: "Real website and software projects for clients and our own products: TrainHub, Antea Salud, WellnessReal and more.",
  fr: "Projets réels de sites web et logiciels pour nos clients et nos propres produits : TrainHub, Antea Salud, WellnessReal et plus.",
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

export default function PortfolioPage() {
  return <PortfolioContent />;
}
