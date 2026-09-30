import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";
import { sectors } from "@/content/sectors";
import { getProject } from "@/content/portfolio";
import { buildAlternates, SITE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sectors" });
  return {
    title: t("hubSeoTitle"),
    description: t("hubDescription"),
    alternates: buildAlternates(locale, "/soluciones"),
  };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sectors");

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("hubTitle"),
    itemListElement: sectors.map((sector, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: sector.name,
      url: `${SITE_URL}/${locale}/soluciones/${sector.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-24 bg-mesh overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9de377] mb-6">{t("hubEyebrow")}</p>
            <h1
              className="font-bold text-white tracking-tight mb-6 [text-wrap:balance]"
              style={{ fontSize: "var(--fs-5xl)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              {t("hubTitle")}
            </h1>
            <p className="text-white/75 max-w-2xl" style={{ fontSize: "var(--fs-lg)", lineHeight: 1.6 }}>
              {t("hubIntro")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 reveal">
            {sectors.map((sector) => {
              const cover = getProject(sector.projectSlugs[0]);
              return (
                <Link
                  key={sector.slug}
                  href={`/soluciones/${sector.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-[#e7e5e4] bg-white hover:border-[#71C648]/40 shadow-soft hover:shadow-soft-lg transition-all"
                >
                  {cover && (
                    <div className="relative aspect-[1440/1000] overflow-hidden bg-[#111A1D]">
                      <Image
                        src={cover.captures.desktop}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
                      />
                    </div>
                  )}
                  <div className="p-7 flex flex-col flex-1">
                    <h2 className="text-2xl font-bold text-[#194973] tracking-tight mb-3">{sector.name}</h2>
                    <p className="text-[#57534e] leading-relaxed mb-5 flex-1">{sector.metaDescription}</p>
                    <p className="text-xs text-[#78716c] mb-5">{sector.audience.join(" · ")}</p>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#39751f] group-hover:text-[#194973] transition-colors">
                      {t("hubCardCta")}
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#194973] mb-4">{t("ctaTitle")}</h2>
          <p className="text-lg text-[#57534e] mb-8 max-w-xl mx-auto">{t("ctaDesc")}</p>
          <Button href="/diagnostico" variant="primary" size="lg">{t("ctaButton")}</Button>
        </div>
      </section>
    </>
  );
}
