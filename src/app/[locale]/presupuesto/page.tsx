import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import PresupuestoWizard from "./PresupuestoWizard";

const TITLES: Record<string, string> = {
  es: "Calcula tu Presupuesto: Web, CRM o App a Medida",
  en: "Get Your Quote: Custom Website, CRM or App",
  fr: "Calculez votre Devis : Site Web, CRM ou Application sur Mesure",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Responde unas preguntas sobre tu clínica, gimnasio o centro y obtén un rango de precio orientativo al momento. Sin compromiso.",
  en: "Answer a few questions about your clinic, gym or center and get an instant price range. No obligation.",
  fr: "Répondez à quelques questions sur votre clinique ou salle de sport et obtenez une fourchette de prix immédiate.",
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

export default function PresupuestoPage() {
  return <PresupuestoWizard />;
}
