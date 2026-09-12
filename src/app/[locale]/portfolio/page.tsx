import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import PortfolioContent from "./PortfolioContent";

const TITLES: Record<string, string> = {
  es: "Ejemplos de Software para Clínicas, Gimnasios y Bienestar",
  en: "Software Examples for Clinics, Gyms and Wellness Centers",
  fr: "Exemples de Logiciels pour Cliniques, Salles de Sport et Bien-être",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Demos conceptuales de CRM, webs y aplicaciones para clínicas, gimnasios y centros de bienestar.",
  en: "Concept demos of CRMs, websites and applications for clinics, gyms and wellness centers.",
  fr: "Démonstrations conceptuelles de CRM, sites web et applications pour cliniques, salles de sport et centres de bien-être.",
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
