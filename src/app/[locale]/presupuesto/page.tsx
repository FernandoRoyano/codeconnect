import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import PresupuestoWizard from "./PresupuestoWizard";

const TITLES: Record<string, string> = {
  es: "Calcula tu Presupuesto: Web, CRM o App a Medida",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Responde unas preguntas sobre tu clínica, gimnasio o centro y obtén un rango de precio orientativo al momento. Sin compromiso.",
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
    alternates: buildAlternates(locale, "/presupuesto"),
  };
}

export default async function PresupuestoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PresupuestoWizard />;
}
