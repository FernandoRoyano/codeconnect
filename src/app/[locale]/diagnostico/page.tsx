import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import DiagnosticoForm from "./DiagnosticoForm";

const TITLES: Record<string, string> = {
  es: "Cuéntame tu caso: diagnóstico inicial sin compromiso",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Cuéntame qué quieres mejorar en tu clínica, gimnasio o centro de bienestar. Con una frase, tu nombre y tu email basta para empezar. Respuesta personal de Fernando Royano.",
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
    alternates: buildAlternates(locale, "/diagnostico"),
  };
}

export default async function DiagnosticoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DiagnosticoForm />;
}
