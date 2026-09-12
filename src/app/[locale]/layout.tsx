import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/seo";

const TITLES: Record<string, string> = {
  es: "CodeConnect | Desarrollo de Software a Medida para Salud",
  en: "CodeConnect | Custom Software Development for Healthcare",
  fr: "CodeConnect | Developpement de Logiciels sur Mesure pour la Sante",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Desarrollo de aplicaciones web y software a medida para clínicas, gimnasios y centros de bienestar.",
  en: "Custom web application and software development for clinics, gyms and wellness centers.",
  fr: "Développement d'applications web et de logiciels sur mesure pour cliniques, salles de sport et centres de bien-être.",
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
    metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: DESCRIPTIONS[locale] || DESCRIPTIONS.es,
    contactPoint: {
      "@type": "ContactPoint",
      email: "codeconnectsl@gmail.com",
      contactType: "customer service",
      availableLanguage: ["Spanish"],
    },
    sameAs: [],
  };

  // Dirección completa no publicada hoy (solo "Madrid, España" en el footer) —
  // no se inventan calle/código postal; se declara solo lo verificable.
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Header />
      <main id="contenido" tabIndex={-1}>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
