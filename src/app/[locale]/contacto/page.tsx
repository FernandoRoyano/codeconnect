import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import ContactoContent from "./ContactoContent";

const TITLES: Record<string, string> = {
  es: "Contacto: Pide tu Presupuesto para Clínica, Gimnasio o Centro",
  en: "Contact: Request a Quote for Your Clinic, Gym or Center",
  fr: "Contact : Demandez un Devis pour votre Clinique ou Salle de Sport",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Cuéntanos tu proyecto y te enviaremos una primera orientación sin compromiso.",
  en: "Tell us about your project and we'll send you an initial, no-obligation assessment.",
  fr: "Parlez-nous de votre projet et nous vous enverrons une première orientation sans engagement.",
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
    alternates: buildAlternates(locale, "/contacto"),
  };
}

export default function ContactoPage() {
  return <ContactoContent />;
}
