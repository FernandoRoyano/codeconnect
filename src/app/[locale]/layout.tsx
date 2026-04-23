import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const TITLES: Record<string, string> = {
  es: "CodeConnect | Desarrollo de Software a Medida para Salud",
  en: "CodeConnect | Custom Software Development for Healthcare",
  fr: "CodeConnect | Developpement de Logiciels sur Mesure pour la Sante",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Conectando ideas, creando soluciones. Desarrollo de aplicaciones web y software a medida para el sector salud. Licencia completa en propiedad, desarrollo rapido y precios competitivos.",
  en: "Connecting ideas, creating solutions. Custom web application and software development for the healthcare sector. Full ownership license, fast development, and competitive prices.",
  fr: "Connecter les idees, creer des solutions. Developpement d'applications web et de logiciels sur mesure pour le secteur de la sante. Licence complete en propriete, developpement rapide et prix competitifs.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const ogLocales: Record<string, string> = {
    es: "es_ES",
    en: "en_US",
    fr: "fr_FR",
  };

  return {
    title: {
      default: TITLES[locale] || TITLES.es,
      template: "%s | CodeConnect",
    },
    description: DESCRIPTIONS[locale] || DESCRIPTIONS.es,
    keywords: [
      "desarrollo web",
      "software a medida",
      "salud",
      "aplicaciones medicas",
      "tecnologia sanitaria",
      "codeconnect",
    ],
    authors: [{ name: "CodeConnect" }],
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title: TITLES[locale] || TITLES.es,
      description: DESCRIPTIONS[locale] || DESCRIPTIONS.es,
      type: "website",
      locale: ogLocales[locale] || ogLocales.es,
      siteName: "CodeConnect",
    },
    twitter: {
      card: "summary_large_image",
      title: TITLES[locale] || TITLES.es,
      description: DESCRIPTIONS[locale] || DESCRIPTIONS.es,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CodeConnect",
    url: "https://codeconnect.es",
    logo: "https://codeconnect.es/favicon.svg",
    description: DESCRIPTIONS[locale] || DESCRIPTIONS.es,
    contactPoint: {
      "@type": "ContactPoint",
      email: "codeconnectsl@gmail.com",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English", "French"],
    },
    sameAs: [],
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
