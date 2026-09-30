import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/content/portfolio";
import { articles } from "@/content/blog";
import { AUTHOR_IMAGE, AUTHOR_LINKEDIN, buildAlternates, ORGANIZATION_ID, PERSON_ID, SITE_URL } from "@/lib/seo";

const STACK = ["Next.js", "React", "TypeScript", "Supabase", "Stripe", "Tailwind CSS", "Vercel"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("seoTitle"),
    description: t("description"),
    alternates: buildAlternates(locale, "/sobre-nosotros"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tHome = await getTranslations("home");

  const ownProjects = projects.filter((p) => p.kind === "own");
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const principles = [0, 1, 2, 3, 4].map((i) => ({
    title: tHome(`benefit${i}Title`),
    description: tHome(`benefit${i}Desc`),
  }));
  const steps = [1, 2, 3].map((i) => ({ title: tHome(`step${i}Title`), description: tHome(`step${i}Desc`) }));

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}/${locale}/sobre-nosotros`,
    name: t("seoTitle"),
    description: t("description"),
    about: { "@id": ORGANIZATION_ID },
    mainEntity: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Fernando Royano",
      jobTitle: t("founderRole"),
      url: `${SITE_URL}/${locale}/sobre-nosotros`,
      image: `${SITE_URL}${AUTHOR_IMAGE}`,
      sameAs: [AUTHOR_LINKEDIN],
      worksFor: { "@id": ORGANIZATION_ID },
      knowsAbout: ["Desarrollo full stack", "Software a medida", "Automatización", "Salud digital", "Fitness"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />

      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-24 bg-mesh overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9de377] mb-6">{t("eyebrow")}</p>
            <h1
              className="font-bold text-white tracking-tight mb-8 [text-wrap:balance]"
              style={{ fontSize: "var(--fs-5xl)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              {tHome("aboutTitle")}
            </h1>
            <p className="text-white/80 mb-4" style={{ fontSize: "var(--fs-lg)", lineHeight: 1.6 }}>
              {tHome("aboutP1")}
            </p>
            <p className="text-white/70" style={{ fontSize: "var(--fs-lg)", lineHeight: 1.6 }}>
              {tHome("aboutP2")}
            </p>
          </div>
        </div>
      </section>

      {/* Fundador */}
      <section id="fernando-royano" className="py-20 sm:py-28 bg-white scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39751f] mb-6">{t("founderEyebrow")}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <Image
                src={AUTHOR_IMAGE}
                alt={t("founderPhotoAlt")}
                width={176}
                height={176}
                sizes="176px"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover ring-8 ring-[#eff8ea] shadow-soft-lg"
              />
              <div>
                <h2 className="text-3xl font-bold text-[#194973] tracking-tight">Fernando Royano</h2>
                <p className="text-[#57534e] mb-4">{t("founderRole")}</p>
                <a
                  href={AUTHOR_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#194973] hover:text-[#39751f] transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                  {t("linkedin")}
                </a>
              </div>
            </div>
          </div>
          <div>
            <p className="text-lg text-[#57534e] leading-relaxed mb-8">{t("founderBio")}</p>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#39751f] mb-3">{t("stackTitle")}</h3>
            <ul className="flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <li
                  key={tech}
                  className="bg-[#fafaf9] text-[#194973] border border-[#e7e5e4] px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Productos propios */}
      <section className="py-20 sm:py-28 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t("ownEyebrow")} title={t("ownTitle")} subtitle={t("ownSubtitle")} />
          <div className="grid md:grid-cols-3 gap-6 reveal">
            {ownProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group block rounded-2xl overflow-hidden border border-[#e7e5e4] bg-white hover:border-[#71C648]/40 shadow-soft hover:shadow-soft-lg transition-all"
              >
                <div className="relative aspect-[1440/1000] overflow-hidden bg-[#111A1D]">
                  <Image
                    src={project.captures.desktop}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#39751f] mb-2">{project.sector}</p>
                  <h3 className="text-xl font-bold text-[#194973] tracking-tight mb-2">{project.title}</h3>
                  <p className="text-sm text-[#57534e] leading-relaxed">{project.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Principios y proceso */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t("principlesEyebrow")} title={tHome("benefitsTitle")} subtitle={tHome("benefitsSubtitle")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e7e5e4] rounded-2xl overflow-hidden border border-[#e7e5e4] reveal">
            {principles.map((item) => (
              <div key={item.title} className="bg-white p-7 sm:p-8">
                <h3 className="font-bold text-[#194973] mb-2 tracking-tight" style={{ fontSize: "var(--fs-xl)", lineHeight: 1.2 }}>
                  {item.title}
                </h3>
                <p className="text-[#57534e] leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
            <div className="hidden lg:flex bg-[#eff8ea] p-8 flex-col justify-center gap-5">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#194973] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-[#194973]">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 sm:py-28 bg-[#f3f7f1]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39751f] mb-4">{t("writingEyebrow")}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#194973]">{t("writingTitle")}</h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-1.5 font-semibold text-[#194973] hover:text-[#39751f] transition-colors">
              {t("writingAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latest.map((article) => (
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
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#39751f] mb-2">{article.category}</p>
                  <h3 className="font-bold text-[#194973] leading-snug">{article.cardTitle ?? article.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-white">
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
