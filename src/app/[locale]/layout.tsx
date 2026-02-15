import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import "../globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const titles: Record<string, string> = {
    es: "CodeConnect | Desarrollo de Software a Medida para Salud",
    en: "CodeConnect | Custom Software Development for Healthcare",
    fr: "CodeConnect | Developpement de Logiciels sur Mesure pour la Sante",
  };

  const descriptions: Record<string, string> = {
    es: "Conectando ideas, creando soluciones. Desarrollo de aplicaciones web y software a medida para el sector salud. Licencia completa en propiedad, desarrollo rapido y precios competitivos.",
    en: "Connecting ideas, creating solutions. Custom web application and software development for the healthcare sector. Full ownership license, fast development, and competitive prices.",
    fr: "Connecter les idees, creer des solutions. Developpement d'applications web et de logiciels sur mesure pour le secteur de la sante. Licence complete en propriete, developpement rapide et prix competitifs.",
  };

  const ogLocales: Record<string, string> = {
    es: "es_ES",
    en: "en_US",
    fr: "fr_FR",
  };

  return {
    title: {
      default: titles[locale] || titles.es,
      template: "%s | CodeConnect",
    },
    description: descriptions[locale] || descriptions.es,
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
      title: titles[locale] || titles.es,
      description: descriptions[locale] || descriptions.es,
      type: "website",
      locale: ogLocales[locale] || ogLocales.es,
      siteName: "CodeConnect",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.es,
      description: descriptions[locale] || descriptions.es,
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

  return (
    <html lang={locale}>
      <body
        className={`${roboto.variable} ${robotoSlab.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
