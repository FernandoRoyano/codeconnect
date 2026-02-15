import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";

export default async function BlogPage() {
  const t = await getTranslations("blog");

  const featuredPost = {
    slug: "transformacion-digital-sector-salud-2024",
    title: t("featuredTitle"),
    excerpt: t("featuredExcerpt"),
    date: t("featuredDate"),
    readTime: t("featuredTime"),
    category: t("featuredCat"),
    author: { name: t("featuredAuthor"), role: t("featuredRole") },
  };

  const posts = [
    {
      id: 2,
      slug: "interoperabilidad-hl7-fhir-guia-practica",
      title: t("post1Title"),
      excerpt: t("post1Excerpt"),
      date: t("post1Date"),
      readTime: t("post1Time"),
      category: t("post1Cat"),
      author: { name: t("post1Author"), role: t("post1Role") },
    },
    {
      id: 3,
      slug: "portal-pacientes-beneficios-implementacion",
      title: t("post2Title"),
      excerpt: t("post2Excerpt"),
      date: t("post2Date"),
      readTime: t("post2Time"),
      category: t("post2Cat"),
      author: { name: t("post2Author"), role: t("post2Role") },
    },
    {
      id: 4,
      slug: "seguridad-datos-sanitarios-rgpd",
      title: t("post3Title"),
      excerpt: t("post3Excerpt"),
      date: t("post3Date"),
      readTime: t("post3Time"),
      category: t("post3Cat"),
      author: { name: t("post3Author"), role: t("post3Role") },
    },
    {
      id: 5,
      slug: "telemedicina-implementacion-paso-a-paso",
      title: t("post4Title"),
      excerpt: t("post4Excerpt"),
      date: t("post4Date"),
      readTime: t("post4Time"),
      category: t("post4Cat"),
      author: { name: t("post4Author"), role: t("post4Role") },
    },
    {
      id: 6,
      slug: "inteligencia-artificial-diagnostico-medico",
      title: t("post5Title"),
      excerpt: t("post5Excerpt"),
      date: t("post5Date"),
      readTime: t("post5Time"),
      category: t("post5Cat"),
      author: { name: t("post5Author"), role: t("post5Role") },
    },
  ];

  const categories = [
    { name: t("catAll"), count: 24 },
    { name: t("catTrends"), count: 8 },
    { name: t("catTech"), count: 6 },
    { name: t("catProduct"), count: 5 },
    { name: t("catGuides"), count: 3 },
    { name: t("catLegal"), count: 2 },
  ];

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
          <Link href={`/blog/${featuredPost.slug}` as never} className="group block">
            <article className="grid lg:grid-cols-2 gap-0 lg:gap-8 items-center bg-[#f8f9fa] rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Image */}
              <div className="h-48 sm:h-64 lg:h-full lg:min-h-[300px] bg-gradient-to-br from-[#194973] to-[#71C648] relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-[#71C648] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8 lg:pr-12">
                <div className="flex items-center gap-4 text-sm text-[#5A6D6D] mb-3 sm:mb-4">
                  <span>{featuredPost.date}</span>
                  <span>&bull;</span>
                  <span>{featuredPost.readTime} {t("readSuffix")}</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#194973] mb-3 sm:mb-4 group-hover:text-[#71C648] transition-colors">
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
          </Link>
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
                  <Link key={post.id} href={`/blog/${post.slug}` as never} className="group">
                    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Image */}
                      <div className="h-48 bg-gradient-to-br from-[#194973]/80 to-[#71C648]/80 relative">
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-white/90 text-[#194973] px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-4 text-sm text-[#5A6D6D] mb-3">
                          <span>{post.date}</span>
                          <span>&bull;</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#194973] mb-3 group-hover:text-[#71C648] transition-colors">
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
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-12 text-center">
                <Button variant="outline">{t("loadMore")}</Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <h3 className="text-lg font-bold text-[#194973] mb-4">{t("categoriesTitle")}</h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={`/blog?categoria=${category.name.toLowerCase()}` as never}
                        className="flex justify-between items-center text-[#5A6D6D] hover:text-[#71C648] transition-colors"
                      >
                        <span>{category.name}</span>
                        <span className="bg-[#f8f9fa] px-2 py-1 rounded text-sm">
                          {category.count}
                        </span>
                      </Link>
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
              <div className="bg-gradient-to-br from-[#71C648] to-[#5db33a] rounded-2xl p-6 mt-8 text-white">
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
