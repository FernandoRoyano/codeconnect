import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";
import { CATEGORY_LABELS, getProject, projects } from "@/content/portfolio";
import { getSector } from "@/content/sectors";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: project.seoTitle,
    description: project.metaDescription,
    alternates: buildAlternates(locale, `/portfolio/${project.slug}`),
    openGraph: {
      type: "article",
      title: project.seoTitle,
      description: project.metaDescription,
      url: `${SITE_URL}/${locale}/portfolio/${project.slug}`,
      images: [{ url: `${SITE_URL}${project.captures.desktop}`, width: 1440, height: 1000, alt: project.title }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("portfolioCase");
  const tSectors = await getTranslations("sectors");
  const sector = project.sectorSlug ? getSector(project.sectorSlug) : undefined;
  const pageUrl = `${SITE_URL}/${locale}/portfolio/${project.slug}`;
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.seoTitle,
    description: project.metaDescription,
    url: pageUrl,
    image: `${SITE_URL}${project.captures.desktop}`,
    inLanguage: "es",
    genre: CATEGORY_LABELS[project.category],
    about: project.sector,
    keywords: project.technologies.join(", "),
    creator: { "@type": "Organization", name: "CodeConnect", url: SITE_URL },
    sameAs: project.url,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb"), item: `${SITE_URL}/${locale}/portfolio` },
      { "@type": "ListItem", position: 3, name: project.title },
    ],
  };

  const facts = [
    { label: t("sector"), value: project.sector },
    { label: t("type"), value: `${CATEGORY_LABELS[project.category]} · ${project.badge}` },
    { label: t("stack"), value: project.technologies.join(", ") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 bg-mesh overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Migas de pan" className="mb-8 text-sm">
            <ol className="flex flex-wrap items-center gap-1.5 text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">{t("breadcrumb")}</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white/90">{project.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block bg-white/5 border border-white/10 text-[#9de377] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                {project.sector}
              </span>
              <h1
                className="font-bold text-white tracking-tight mb-6 [text-wrap:balance]"
                style={{ fontSize: "var(--fs-5xl)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
              >
                {project.title}
              </h1>
              <p className="text-white/75 mb-8 max-w-xl" style={{ fontSize: "var(--fs-lg)", lineHeight: 1.6 }}>
                {project.summary}
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-white border-b border-white/30 hover:border-white pb-0.5 transition-colors"
              >
                {t("visit")}
                <span aria-hidden>↗</span>
              </a>
            </div>

            {/* Marco de navegador con la captura de escritorio y el móvil superpuesto */}
            <div className="relative pb-10 sm:pr-10">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-soft-xl bg-[#111A1D]">
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border-b border-white/10" aria-hidden>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <Image
                  src={project.captures.desktop}
                  alt={t("desktopAlt", { title: project.title })}
                  width={1440}
                  height={1000}
                  priority
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[28%] max-w-[170px] rounded-[1.4rem] overflow-hidden border-4 border-[#0b202f] shadow-soft-xl hidden sm:block">
                <Image
                  src={project.captures.mobile}
                  alt={t("mobileAlt", { title: project.title })}
                  width={430}
                  height={932}
                  sizes="170px"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_20rem] gap-12 lg:gap-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#194973] tracking-tight mb-4">{t("contextTitle")}</h2>
            <p className="text-lg text-[#57534e] leading-relaxed mb-12">{project.context}</p>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#194973] tracking-tight mb-6">{t("scopeTitle")}</h2>
            <ul className="space-y-4">
              {project.scope.map((item) => (
                <li key={item} className="flex gap-3 text-lg text-[#57534e] leading-relaxed">
                  <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#71C648]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            {sector && (
              <Link
                href={`/soluciones/${sector.slug}`}
                className="mt-10 inline-flex items-center gap-1.5 font-semibold text-[#39751f] hover:text-[#194973] transition-colors"
              >
                {tSectors("caseMore", { sector: sector.name.toLowerCase() })}
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 self-start rounded-2xl border border-[#e7e5e4] bg-[#fafaf9] p-6">
            <dl className="space-y-5">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-bold uppercase tracking-[0.15em] text-[#39751f] mb-1">{fact.label}</dt>
                  <dd className="text-[#194973] font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#194973] tracking-tight mb-8">{t("moreTitle")}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/portfolio/${other.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-[#e7e5e4] hover:border-[#71C648]/40 shadow-soft hover:shadow-soft-lg transition-all"
              >
                <div className="relative aspect-[16/10] bg-[#111A1D]">
                  <Image
                    src={other.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#39751f] mb-1">{other.sector}</p>
                  <p className="font-bold text-[#194973]">{other.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-mesh px-6 py-12 sm:px-12 text-center shadow-soft-xl">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">{t("ctaDesc")}</p>
            <Button href="/diagnostico" variant="white" size="lg">{t("ctaButton")}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
