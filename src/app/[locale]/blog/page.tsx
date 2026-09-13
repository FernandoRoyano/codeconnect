import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { articles, categoryCounts } from "@/content/blog";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Blog",
    alternates: buildAlternates(locale, "/blog"),
    robots: { index: true, follow: true },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

export default async function BlogPage() {
  const t = await getTranslations("blog");

  // Una sola fuente: las tarjetas salen del mismo sitio que los articulos, asi
  // que no pueden quedarse desincronizadas del texto que abren.
  const [featured, ...rest] = articles;
  const categories = categoryCounts();

  return (
    <>
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-[#194973] to-[#0f3150]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block bg-[#71C648]/20 text-[#71C648] px-4 py-2 rounded-full text-sm font-medium mb-4 sm:mb-6">
              {t("heroBadge")}
            </span>
            <h1
              className="font-bold text-white tracking-tight mb-4 sm:mb-6"
              style={{ fontSize: "var(--fs-4xl)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              {t("heroTitle")}
            </h1>
            <p className="text-white/70 max-w-3xl mx-auto" style={{ fontSize: "var(--fs-lg)" }}>
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Destacado */}
      <section className="py-8 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-[#71C648] uppercase tracking-wider mb-4 sm:mb-6">
            {t("featuredLabel")}
          </h2>
          <Link href={`/blog/${featured.slug}` as never} className="group block">
            <article className="grid lg:grid-cols-2 gap-0 lg:gap-8 items-center bg-[#f8f9fa] rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-52 overflow-hidden sm:h-72 lg:h-full lg:min-h-[360px]">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F10]/65 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-white/95 text-[#194973] px-3 py-1 rounded-full text-sm font-semibold">
                    {featured.category}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-8 lg:pr-12">
                <div className="flex items-center gap-3 text-sm text-[#5A6D6D] mb-3 sm:mb-4">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span aria-hidden>&bull;</span>
                  <span>{featured.readMinutes} min</span>
                </div>
                <h3
                  className="font-bold text-[#194973] mb-3 sm:mb-4 tracking-tight group-hover:text-[#71C648] transition-colors"
                  style={{ fontSize: "var(--fs-2xl)", lineHeight: 1.2 }}
                >
                  {featured.title}
                </h3>
                <p className="text-[#5A6D6D] mb-4 sm:mb-6 leading-relaxed" style={{ fontSize: "var(--fs-base)" }}>
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#194973] rounded-full flex items-center justify-center text-white font-bold">
                    FR
                  </div>
                  <div>
                    <div className="font-medium text-[#194973]">Fernando Royano</div>
                    <div className="text-sm text-[#5A6D6D]">Fundador de CodeConnect</div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#f8f9fa]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-[#194973] mb-8">{t("latestTitle")}</h2>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {rest.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}` as never} className="group">
                    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative h-44 overflow-hidden sm:h-48">
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F10]/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-white/95 text-[#194973] px-3 py-1 rounded-full text-sm font-semibold">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-3 text-sm text-[#5A6D6D] mb-3">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span aria-hidden>&bull;</span>
                          <span>{post.readMinutes} min</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#194973] mb-3 leading-snug group-hover:text-[#71C648] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-[#5A6D6D] mb-4 flex-grow leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center gap-3 pt-4 border-t border-[#f1f1f0]">
                          <div className="w-8 h-8 bg-[#194973] rounded-full flex items-center justify-center text-white text-sm font-medium">
                            FR
                          </div>
                          <span className="text-sm text-[#5A6D6D]">Fernando Royano</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <h2 className="text-lg font-bold text-[#194973] mb-4">{t("categoriesTitle")}</h2>
                {/* Sin enlace: el filtro por categoría no está implementado. */}
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category.name} className="flex justify-between items-center text-[#5A6D6D]">
                      <span>{category.name}</span>
                      <span className="bg-[#f8f9fa] px-2 py-1 rounded text-sm">{category.count}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#194973] to-[#0f3150] rounded-2xl p-6 text-white">
                <h2 className="text-lg font-bold mb-2">{t("sidebarCtaTitle")}</h2>
                <p className="text-white/70 text-sm mb-5 leading-relaxed">{t("sidebarCtaDesc")}</p>
                <Link
                  href="/diagnostico"
                  className="inline-flex w-full items-center justify-center gap-1.5 bg-[#71C648] hover:bg-[#5db33a] text-[#12324a] font-semibold px-5 py-2.5 rounded-full transition-all text-sm"
                >
                  {t("sidebarCtaButton")}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
