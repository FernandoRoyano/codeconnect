import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import ContactoContent from "./ContactoContent";

const TITLES: Record<string, string> = {
  es: "Contacto: Pide tu Presupuesto para Clínica, Gimnasio o Centro",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Cuéntanos tu proyecto y te enviaremos una primera orientación sin compromiso.",
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

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactoContent />;
}
