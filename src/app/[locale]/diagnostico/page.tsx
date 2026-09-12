import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import DiagnosticoForm from "./DiagnosticoForm";

const TITLES: Record<string, string> = {
  es: "Diagnóstico gratuito: cuéntame tu proceso y te digo qué haría",
  en: "Free diagnosis: tell me your process and I'll tell you what I'd do",
  fr: "Diagnostic gratuit : expliquez-moi votre processus",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Explícame cómo funciona hoy tu proceso y qué te está costando. Lo reviso y te digo si compensa simplificarlo, automatizarlo, integrarlo, desarrollar algo a medida o no hacer nada.",
  en: "Explain how your process works today and what is costing you. I review it and tell you whether to simplify, automate, integrate, build custom software or do nothing.",
  fr: "Expliquez-moi votre processus actuel et ce qui vous coûte du temps. Je l'analyse avant de recommander quoi que ce soit.",
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

export default function DiagnosticoPage() {
  return <DiagnosticoForm />;
}
