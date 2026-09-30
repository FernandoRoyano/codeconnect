import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import Accordion, { AccordionItem } from "@/components/Accordion";
import { getSector, sectors } from "@/content/sectors";
import { getProject, type Project } from "@/content/portfolio";
import { getArticle } from "@/content/blog";
import type { Article } from "@/content/blog/types";
import { buildAlternates, ORGANIZATION_ID, SITE_URL } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => sectors.map((sector) => ({ locale, sector: sector.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}): Promise<Metadata> {
  const { locale, sector: slug } = await params;
  const sector = getSector(slug);
  if (!sector) return { title: "Sector no encontrado" };

  return {
    title: sector.seoTitle,
    description: sector.metaDescription,
    alternates: buildAlternates(locale, `/soluciones/${sector.slug}`),
    openGraph: {
      title: sector.seoTitle,
      description: sector.metaDescription,
      url: `${SITE_URL}/${locale}/soluciones/${sector.slug}`,
    },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}) {
  const { locale, sector: slug } = await params;
  setRequestLocale(locale);
  const sector = getSector(slug);
  if (!sector) notFound();

  const t = await getTranslations("sectors");
  const pageUrl = `${SITE_URL}/${locale}/soluciones/${sector.slug}`;
  const cases = sector.projectSlugs.map(getProject).filter((p): p is Project => Boolean(p));
  const guides = sector.articleSlugs.map(getArticle).filter((a): a is Article => Boolean(a));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: sector.seoTitle,
    description: sector.metaDescription,
    url: pageUrl,
    serviceType: "Desarrollo de software a medida",
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "España" },
    audience: { "@type": "BusinessAudience", audienceType: sector.audience.join(", ") },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t("solutionsTitle"),
      itemListElement: sector.solutions.map((solution) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: solution.title, description: solution.text },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb"), item: `${SITE_URL}/${locale}/soluciones` },
      { "@type": "ListItem", position: 3, name: sector.name },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sector.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      {[serviceJsonLd, breadcrumbJsonLd, faqJsonLd].map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-20 sm:pb-24 bg-mesh overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Migas de pan" className="mb-10 text-sm">
            <ol className="flex flex-wrap items-center gap-1.5 text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/soluciones" className="hover:text-white transition-colors">{t("breadcrumb")}</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white/90">{sector.name}</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9de377] mb-6">{sector.eyebrow}</p>
            <h1
              className="font-bold text-white tracking-tight mb-8 [text-wrap:balance]"
              style={{ fontSize: "var(--fs-5xl)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              {sector.title}
            </h1>
            <p className="text-white/75 mb-10 max-w-2xl" style={{ fontSize: "var(--fs-lg)", lineHeight: 1.6 }}>
              {sector.intro}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-10">
              <span className="text-xs uppercase tracking-widest text-white/60 font-medium mr-1">{t("audienceLabel")}</span>
              {sector.audience.map((item) => (
                <span
                  key={item}
                  className="text-xs font-medium text-white/85 bg-white/5 backdrop-blur border border-white/10 px-3 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>

            <Button href="/diagnostico" variant="primary" size="lg">
              {t("ctaButton")}
            </Button>
          </div>
        </div>
      </section>

      {/* Problemas */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t("problemsEyebrow")} title={t("problemsTitle")} />
          <div className="grid md:grid-cols-3 gap-px bg-[#e7e5e4] rounded-2xl overflow-hidden border border-[#e7e5e4] reveal">
            {sector.problems.map((problem, index) => (
              <div key={problem.title} className="bg-white p-7 sm:p-8">
                <span className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#194973] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="font-bold text-[#194973] mb-3 tracking-tight" style={{ fontSize: "var(--fs-xl)", lineHeight: 1.2 }}>
                  {problem.title}
                </h3>
                <p className="text-[#57534e] leading-relaxed">{problem.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soluciones */}
      <section className="py-20 sm:py-28 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t("solutionsEyebrow")} title={t("solutionsTitle")} />
          <div className="grid sm:grid-cols-2 gap-6 reveal">
            {sector.solutions.map((solution) => (
              <Link
                key={solution.title}
                href={solution.href}
                className="group flex flex-col rounded-2xl border border-[#e7e5e4] bg-white p-7 hover:border-[#71C648]/40 shadow-soft hover:shadow-soft-lg transition-all"
              >
                <h3 className="text-xl font-bold text-[#194973] tracking-tight mb-2">{solution.title}</h3>
                <p className="text-[#57534e] leading-relaxed mb-5 flex-1">{solution.text}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#39751f] group-hover:text-[#194973] transition-colors">
                  {t("solutionsMore")}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Casos */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t("casesEyebrow")} title={t("casesTitle")} />
          <div className="grid md:grid-cols-2 gap-8 reveal">
            {cases.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group block rounded-2xl overflow-hidden border border-[#e7e5e4] bg-[#fafaf9] hover:border-[#71C648]/40 shadow-soft hover:shadow-soft-lg transition-all"
              >
                <div className="relative aspect-[1440/1000] overflow-hidden bg-[#111A1D]">
                  <Image
                    src={project.captures.desktop}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#39751f] mb-2">{project.badge}</p>
                  <h3 className="text-xl font-bold text-[#194973] tracking-tight mb-2">{project.title}</h3>
                  <p className="text-[#57534e] leading-relaxed">{project.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guías del blog */}
      <section className="py-20 sm:py-28 bg-[#f3f7f1]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t("articlesEyebrow")} title={t("articlesTitle")} />
          <div className={`grid sm:grid-cols-2 ${guides.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6 reveal`}>
            {guides.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-[#dfe8dc] bg-white hover:shadow-soft-lg transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#39751f] mb-2">{article.category}</p>
                  <h3 className="font-bold text-[#194973] leading-snug mb-3 flex-1">{article.cardTitle ?? article.title}</h3>
                  <p className="text-xs text-[#78716c]">{t("readMinutes", { minutes: article.readMinutes })}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t("faqEyebrow")} title={t("faqTitle")} />
          <div className="reveal">
            <Accordion>
              {sector.faqs.map((faq) => (
                <AccordionItem key={faq.q} question={faq.q}>
                  {faq.a}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-28 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-mesh px-6 py-12 sm:px-12 sm:py-16 text-center shadow-soft-xl">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">{t("ctaDesc")}</p>
            <Button href="/diagnostico" variant="white" size="lg">{t("ctaButton")}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
