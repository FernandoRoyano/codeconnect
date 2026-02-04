import Link from "next/link";
import Button from "@/components/Button";

const featuredPost = {
  id: 1,
  slug: "transformacion-digital-sector-salud-2024",
  title: "Transformacion Digital en el Sector Salud: Tendencias 2024",
  excerpt:
    "Analizamos las principales tendencias tecnologicas que estan transformando la sanidad este ano: IA, telemedicina, interoperabilidad y mucho mas.",
  date: "15 Enero 2024",
  readTime: "8 min",
  category: "Tendencias",
  author: {
    name: "Dr. Carlos Martinez",
    role: "Director de Innovacion",
  },
};

const posts = [
  {
    id: 2,
    slug: "interoperabilidad-hl7-fhir-guia-practica",
    title: "Interoperabilidad HL7 FHIR: Guia Practica para Centros de Salud",
    excerpt:
      "Todo lo que necesitas saber sobre el estandar FHIR y como implementarlo en tu organizacion sanitaria.",
    date: "10 Enero 2024",
    readTime: "12 min",
    category: "Tecnico",
    author: {
      name: "Ana Lopez",
      role: "Arquitecta de Software",
    },
  },
  {
    id: 3,
    slug: "portal-pacientes-beneficios-implementacion",
    title: "Portal de Pacientes: Beneficios y Claves para una Implementacion Exitosa",
    excerpt:
      "Descubre como un portal de pacientes puede mejorar la experiencia de tus usuarios y optimizar la gestion de tu centro.",
    date: "5 Enero 2024",
    readTime: "6 min",
    category: "Producto",
    author: {
      name: "Maria Garcia",
      role: "Product Manager",
    },
  },
  {
    id: 4,
    slug: "seguridad-datos-sanitarios-rgpd",
    title: "Seguridad de Datos Sanitarios: Cumplimiento RGPD y Mejores Practicas",
    excerpt:
      "Guia completa sobre como proteger los datos de salud de tus pacientes y cumplir con la normativa europea.",
    date: "28 Diciembre 2023",
    readTime: "10 min",
    category: "Legal",
    author: {
      name: "Pablo Sanchez",
      role: "CISO",
    },
  },
  {
    id: 5,
    slug: "telemedicina-implementacion-paso-a-paso",
    title: "Telemedicina: Implementacion Paso a Paso en tu Centro de Salud",
    excerpt:
      "Una hoja de ruta practica para implementar servicios de telemedicina de forma efectiva y segura.",
    date: "20 Diciembre 2023",
    readTime: "9 min",
    category: "Guias",
    author: {
      name: "Elena Torres",
      role: "Consultora eHealth",
    },
  },
  {
    id: 6,
    slug: "inteligencia-artificial-diagnostico-medico",
    title: "Inteligencia Artificial en el Diagnostico Medico: Estado Actual y Futuro",
    excerpt:
      "Exploramos como la IA esta revolucionando el diagnostico medico y que podemos esperar en los proximos anos.",
    date: "15 Diciembre 2023",
    readTime: "7 min",
    category: "Tendencias",
    author: {
      name: "Dr. Juan Perez",
      role: "Director Medico",
    },
  },
];

const categories = [
  { name: "Todos", count: 24 },
  { name: "Tendencias", count: 8 },
  { name: "Tecnico", count: 6 },
  { name: "Producto", count: 5 },
  { name: "Guias", count: 3 },
  { name: "Legal", count: 2 },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#194973] to-[#0f3150]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block bg-[#71C648]/20 text-[#71C648] px-4 py-2 rounded-full text-sm font-medium mb-6">
              Noticias y Articulos
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Articulos, guias y tendencias sobre tecnologia aplicada al sector salud.
              Mantente al dia con las ultimas novedades.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-[#71C648] uppercase tracking-wider mb-6">
            Articulo Destacado
          </h2>
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <article className="grid lg:grid-cols-2 gap-8 items-center bg-[#f8f9fa] rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Image */}
              <div className="h-64 lg:h-full min-h-[300px] bg-gradient-to-br from-[#194973] to-[#71C648] relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-[#71C648] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:pr-12">
                <div className="flex items-center gap-4 text-sm text-[#5A6D6D] mb-4">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime} lectura</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#194973] mb-4 group-hover:text-[#71C648] transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-lg text-[#5A6D6D] mb-6 leading-relaxed">
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
      <section className="py-16 bg-[#f8f9fa]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-[#194973] mb-8">
                Ultimos Articulos
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
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
                          <span>•</span>
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
                <Button variant="outline">Cargar mas articulos</Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <h3 className="text-lg font-bold text-[#194973] mb-4">Categorias</h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={`/blog?categoria=${category.name.toLowerCase()}`}
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
                <h3 className="text-lg font-bold mb-2">Newsletter</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Recibe las ultimas novedades sobre tecnologia sanitaria en tu email.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71C648]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#71C648] hover:bg-[#5db33a] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Suscribirme
                  </button>
                </form>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#71C648] to-[#5db33a] rounded-2xl p-6 mt-8 text-white">
                <h3 className="text-lg font-bold mb-2">Tienes un proyecto?</h3>
                <p className="text-white/90 text-sm mb-4">
                  Hablemos sobre como podemos ayudarte a digitalizar tu centro de salud.
                </p>
                <Button href="/contacto" variant="white" size="sm" className="w-full">
                  Contactar
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
