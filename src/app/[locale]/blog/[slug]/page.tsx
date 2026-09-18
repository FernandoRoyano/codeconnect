import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ArticleBody from "@/components/blog/ArticleBody";
import { articles, getArticle } from "@/content/blog";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articles.map((article) => ({ locale, slug: article.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Artículo no encontrado" };

  return {
    title: article.title,
    description: article.metaDescription,
    alternates: buildAlternates(locale, `/blog/${article.slug}`),
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.metaDescription,
      url: `${SITE_URL}/${locale}/blog/${article.slug}`,
      publishedTime: article.date,
      images: [
        {
          url: `${SITE_URL}${article.image}`,
          width: 1536,
          height: 960,
          alt: article.title,
        },
      ],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  // Datos estructurados del articulo. El autor y la fecha son los mismos que ve
  // el lector en la cabecera, no metadatos aparte.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    image: `${SITE_URL}${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "es",
    author: { "@type": "Person", name: "Fernando Royano" },
    publisher: {
      "@type": "Organization",
      name: "CodeConnect",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/codeconnect-logo.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/blog/${article.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: article.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="pt-28 sm:pt-32 pb-12 bg-gradient-to-br from-[#194973] to-[#0f3150]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors mb-6"
          >
            <span aria-hidden>←</span> Blog
          </Link>
          <span className="inline-block bg-[#71C648]/20 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
            {article.category}
          </span>
          <h1
            className="font-bold text-white tracking-tight mb-5"
            style={{ fontSize: "var(--fs-3xl)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            {article.title}
          </h1>
          <p className="text-white/70 leading-relaxed mb-7" style={{ fontSize: "var(--fs-lg)" }}>
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#71C648] text-[#12324a] font-bold flex items-center justify-center">
              FR
            </div>
            <div className="text-sm">
              <div className="font-medium text-white">Fernando Royano</div>
              <div className="text-white/70">
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                {" · "}
                {article.readMinutes} min de lectura
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:rounded-3xl">
            <Image
              src={article.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <article className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ArticleBody blocks={article.body} />

          {article.sources && article.sources.length > 0 && (
            <section className="mt-14 pt-8 border-t border-[#e7e5e4] max-w-2xl">
              <h2 className="text-xs uppercase tracking-wider text-[#5A6D6D] font-bold mb-4">Fuentes</h2>
              <ul className="space-y-2">
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#39751f] underline hover:text-[#194973] break-words"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#78716c] mt-4 leading-relaxed">
                Las fechas y los importes de las normas cambian. Este artículo refleja la situación
                en el momento de escribirlo; comprueba la fuente oficial antes de tomar una decisión.
              </p>
            </section>
          )}

          <aside className="mt-12 rounded-3xl bg-[#0f3150] p-7 sm:p-9 text-white max-w-2xl">
            <h2 className="font-bold tracking-tight mb-3" style={{ fontSize: "var(--fs-xl)" }}>
              ¿Te ha pasado algo parecido en tu centro?
            </h2>
            <p className="text-white/70 leading-relaxed mb-6" style={{ fontSize: "var(--fs-sm)" }}>
              Cuéntame cómo funciona hoy tu proceso y qué te está costando. Lo reviso antes de
              recomendarte nada, y si creo que no compensa tocar nada, te lo diré.
            </p>
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-1.5 bg-[#71C648] hover:bg-[#5db33a] text-[#12324a] font-semibold px-6 py-3 rounded-full transition-all"
            >
              Cuéntame tu caso
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </aside>

          {related.length > 0 && (
            <section className="mt-14 max-w-2xl">
              <h2 className="text-xs uppercase tracking-wider text-[#5A6D6D] font-bold mb-5">Seguir leyendo</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}` as never}
                    className="group block rounded-2xl border border-[#e7e5e4] p-5 hover:border-[#71C648]/60 transition-colors"
                  >
                    <span className="text-[11px] uppercase tracking-wider text-[#39751f] font-bold">
                      {item.category}
                    </span>
                    <p className="font-bold text-[#194973] mt-2 leading-snug group-hover:text-[#39751f] transition-colors">
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
