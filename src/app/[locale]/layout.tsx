import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import { AUTHOR_IMAGE, AUTHOR_LINKEDIN, ORGANIZATION_ID, PERSON_ID, SITE_URL } from "@/lib/seo";

const TITLES: Record<string, string> = {
  es: "CodeConnect | Software a medida para clínicas, gimnasios y bienestar",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Webs, automatizaciones y software a medida para clínicas, gimnasios y centros de bienestar. Menos tareas manuales y procesos conectados, de la reserva al cobro.",
};

const OG_LOCALES: Record<string, string> = {
  es: "es_ES",
};

/**
 * Namespaces que necesitan los componentes cliente. El resto de textos
 * (`home`, `services`, `blog`) se resuelven en servidor con `getTranslations`,
 * así que no tienen por qué viajar en el HTML de cada página.
 */
const CLIENT_NAMESPACES = [
  "header",
  "footer",
  "logo",
  "serviceCard",
  "contact",
  "portfolio",
  "cookieBanner",
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: TITLES[locale] || TITLES.es,
      template: "%s | CodeConnect",
    },
    description: DESCRIPTIONS[locale] || DESCRIPTIONS.es,
    authors: [{ name: "CodeConnect" }],
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title: TITLES[locale] || TITLES.es,
      description: DESCRIPTIONS[locale] || DESCRIPTIONS.es,
      type: "website",
      locale: OG_LOCALES[locale] || OG_LOCALES.es,
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

  setRequestLocale(locale);

  const messages: Record<string, unknown> = (await import(`../../../messages/${locale}.json`)).default;
  const clientMessages = Object.fromEntries(
    CLIENT_NAMESPACES.map((namespace) => [namespace, messages[namespace]]),
  );

  // Dirección completa no publicada hoy (solo "Madrid, España" en el footer) —
  // no se inventan calle/código postal; se declara solo lo verificable.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: "CodeConnect",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/codeconnect-logo.svg`,
    image: `${SITE_URL}/brand/codeconnect-logo.svg`,
    description: DESCRIPTIONS[locale] || DESCRIPTIONS.es,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressCountry: "ES",
    },
    areaServed: { "@type": "Country", name: "España" },
    founder: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Fernando Royano",
      url: `${SITE_URL}/es/sobre-nosotros`,
      image: `${SITE_URL}${AUTHOR_IMAGE}`,
      sameAs: [AUTHOR_LINKEDIN],
    },
    knowsAbout: [
      "Software a medida",
      "Automatización de procesos",
      "Desarrollo web",
      "Integraciones",
      "Software para clínicas",
      "Software para gimnasios",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${SITE_URL}/es/contacto`,
      availableLanguage: ["Spanish"],
    },
  };
  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Header />
      <main id="contenido" tabIndex={-1}>{children}</main>
      <Footer />
      <CookieBanner />
      <Analytics />
    </NextIntlClientProvider>
  );
}
