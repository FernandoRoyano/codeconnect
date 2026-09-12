import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Button from "@/components/Button";
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
    // Contenido de ejemplo pendiente de sustituir por artículos reales (Fase 3) — no indexar hasta entonces.
    robots: { index: false, follow: false },
  };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");

  // Sin slug, sin fecha y sin tiempo de lectura: los articulos todavia no
  // existen. Inventar esos tres campos era lo que hacia la version anterior,
  // con enlaces a /blog/[slug] que devolvian 404.
  const featuredPost = {
    title: t("featuredTitle"),
    excerpt: t("featuredExcerpt"),
    category: t("featuredCat"),
    author: { name: t("featuredAuthor"), role: t("featuredRole") },
  };

  const posts = [
    {
      id: 2,
      title: t("post1Title"),
      excerpt: t("post1Excerpt"),
      category: t("post1Cat"),
      author: { name: t("post1Author"), role: t("post1Role") },
    },
    {
      id: 3,
      title: t("post2Title"),
      excerpt: t("post2Excerpt"),
      category: t("post2Cat"),
      author: { name: t("post2Author"), role: t("post2Role") },
    },
    {
      id: 4,
      title: t("post3Title"),
      excerpt: t("post3Excerpt"),
      category: t("post3Cat"),
      author: { name: t("post3Author"), role: t("post3Role") },
    },
    {
      id: 5,
      title: t("post4Title"),
      excerpt: t("post4Excerpt"),
      category: t("post4Cat"),
      author: { name: t("post4Author"), role: t("post4Role") },
    },
    {
      id: 6,
      title: t("post5Title"),
      excerpt: t("post5Excerpt"),
      category: t("post5Cat"),
      author: { name: t("post5Author"), role: t("post5Role") },
    },
  ];

  // Los contadores salen de los articulos que hay, no de una cifra a mano: la
  // version anterior anunciaba 24 articulos cuando siempre hubo 6.
  const allPosts = [featuredPost, ...posts];
  const countBy = (label: string) => allPosts.filter((p) => p.category === label).length;

  const categories = [
    { name: t("catAll"), count: allPosts.length },
    { name: t("catTrends"), count: countBy(t("catTrends")) },
    { name: t("catTech"), count: countBy(t("catTech")) },
    { name: t("catProduct"), count: countBy(t("catProduct")) },
    { name: t("catGuides"), count: countBy(t("catGuides")) },
    { name: t("catLegal"), count: countBy(t("catLegal")) },
  ].filter((c) => c.count > 0);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-[#194973] to-[#0f3150]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block bg-[#71C648]/20 text-[#71C648] px-4 py-2 rounded-full text-sm font-medium mb-4 sm:mb-6">
              {t("heroBadge")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-[#71C648] uppercase tracking-wider mb-4 sm:mb-6">
            {t("featuredLabel")}
          </h2>
            <article className="grid lg:grid-cols-2 gap-0 lg:gap-8 items-center bg-[#f8f9fa] rounded-2xl sm:rounded-3xl overflow-hidden">
              {/* Image */}
              <div className="h-48 sm:h-64 lg:h-full lg:min-h-[300px] bg-gradient-to-br from-[#111A1D] to-[#20DCC2] relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-[#71C648] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8 lg:pr-12">
                <div className="flex items-center gap-4 text-sm mb-3 sm:mb-4">
                  <span className="inline-block bg-[#194973]/10 text-[#194973] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    {t("comingSoon")}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#194973] mb-3 sm:mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-base sm:text-lg text-[#5A6D6D] mb-4 sm:mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#194973] rounded-full flex items-center justify-center text-white font-bold">
                    {featuredPost.author.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-medium text-[#194973]">
                      {featuredPost.author.name}
                    </div>
                    <div className="text-sm text-[#5A6D6D]">
                      {featuredPost.author.role}
                    </div>
                  </div>
                </div>
              </div>
            </article>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-16 bg-[#f8f9fa]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-[#194973] mb-8">
                {t("latestTitle")}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                    <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg h-full flex flex-col">
                      {/* Image */}
                      <div className="h-48 bg-gradient-to-br from-[#111A1D]/80 to-[#20DCC2]/80 relative">
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-white/90 text-[#194973] px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-4 text-sm mb-3">
                          <span className="inline-block bg-[#194973]/10 text-[#194973] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                            {t("comingSoon")}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#194973] mb-3">
                          {post.title}
                        </h3>
                        <p className="text-[#5A6D6D] mb-4 flex-grow line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 pt-4 border-t">
                          <div className="w-8 h-8 bg-[#194973] rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {post.author.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="text-sm text-[#5A6D6D]">
                            {post.author.name}
                          </span>
                        </div>
                      </div>
                    </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <h3 className="text-lg font-bold text-[#194973] mb-4">{t("categoriesTitle")}</h3>
                <ul className="space-y-3">
                  {/* Sin enlace: el filtro por categoria no esta implementado y
                      ?categoria= no lo lee nadie. */}
                  {categories.map((category) => (
                    <li key={category.name} className="flex justify-between items-center text-[#5A6D6D]">
                      <span>{category.name}</span>
                      <span className="bg-[#f8f9fa] px-2 py-1 rounded text-sm">
                        {category.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-[#194973] rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">{t("newsletterTitle")}</h3>
                <p className="text-gray-300 text-sm mb-4">
                  {t("newsletterDesc")}
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder={t("newsletterPlaceholder")}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71C648]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#71C648] hover:bg-[#5db33a] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    {t("newsletterButton")}
                  </button>
                </form>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#20DCC2] to-[#14BFA9] rounded-2xl p-6 mt-8 text-[#0B0F10]">
                <h3 className="text-lg font-bold mb-2">{t("sidebarCtaTitle")}</h3>
                <p className="text-white/90 text-sm mb-4">
                  {t("sidebarCtaDesc")}
                </p>
                <Button href="/contacto" variant="white" size="sm" className="w-full">
                  {t("sidebarCtaButton")}
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
