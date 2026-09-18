import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import DiagnosticoForm from "./DiagnosticoForm";

const TITLES: Record<string, string> = {
  es: "Diagnóstico gratuito: cuéntame tu proceso y te digo qué haría",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Explícame cómo funciona hoy tu proceso y qué te está costando. Lo reviso y te digo si compensa simplificarlo, automatizarlo, integrarlo, desarrollar algo a medida o no hacer nada.",
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
