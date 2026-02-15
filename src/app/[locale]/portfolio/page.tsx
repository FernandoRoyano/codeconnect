"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState(0);

  const projects = [
    {
      id: 1,
      title: t("p1Title"),
      category: t("p1Cat"),
      catIndex: 2,
      description: t("p1Desc"),
      results: [t("p1R0"), t("p1R1"), t("p1R2")],
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      testimonial: { quote: t("p1Quote"), author: t("p1Author"), role: t("p1Role") },
    },
    {
      id: 2,
      title: t("p2Title"),
      category: t("p2Cat"),
      catIndex: 2,
      description: t("p2Desc"),
      results: [t("p2R0"), t("p2R1"), t("p2R2")],
      technologies: ["React", "Node.js", "MongoDB", "Redsys"],
      testimonial: { quote: t("p2Quote"), author: t("p2Author"), role: t("p2Role") },
    },
    {
      id: 3,
      title: t("p3Title"),
      category: t("p3Cat"),
      catIndex: 1,
      description: t("p3Desc"),
      results: [t("p3R0"), t("p3R1"), t("p3R2")],
      technologies: ["Next.js", "Tailwind CSS", "Vercel", "Google Analytics"],
      testimonial: { quote: t("p3Quote"), author: t("p3Author"), role: t("p3Role") },
    },
    {
      id: 4,
      title: t("p4Title"),
      category: t("p4Cat"),
      catIndex: 1,
      description: t("p4Desc"),
      results: [t("p4R0"), t("p4R1"), t("p4R2")],
      technologies: ["Next.js", "Node.js", "Brevo", "Calendly"],
      testimonial: { quote: t("p4Quote"), author: t("p4Author"), role: t("p4Role") },
    },
    {
      id: 5,
      title: t("p5Title"),
      category: t("p5Cat"),
      catIndex: 3,
      description: t("p5Desc"),
      results: [t("p5R0"), t("p5R1"), t("p5R2")],
      technologies: ["React", "Node.js", "PostgreSQL", "PDF Generator"],
      testimonial: { quote: t("p5Quote"), author: t("p5Author"), role: t("p5Role") },
    },
    {
      id: 6,
      title: t("p6Title"),
      category: t("p6Cat"),
      catIndex: 4,
      description: t("p6Desc"),
      results: [t("p6R0"), t("p6R1"), t("p6R2")],
      technologies: ["React Native", "Firebase", "Node.js", "RevenueCat"],
      testimonial: { quote: t("p6Quote"), author: t("p6Author"), role: t("p6Role") },
    },
  ];

  const categories = [t("cat0"), t("cat1"), t("cat2"), t("cat3"), t("cat4")];

  const filteredProjects = activeFilter === 0
    ? projects
    : projects.filter((p) => p.catIndex === activeFilter);

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

      {/* Filter */}
      <section className="py-6 sm:py-8 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(index)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-colors ${
                  activeFilter === index
                    ? "bg-[#194973] text-white"
                    : "bg-gray-100 text-[#5A6D6D] hover:bg-[#71C648] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 sm:py-24 bg-[#f8f9fa]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#194973] to-[#71C648] relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-[#194973] px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#194973] mb-3 group-hover:text-[#71C648] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#5A6D6D] mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Results */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-[#194973] mb-2">
                      {t("resultsLabel")}
                    </h4>
                    <ul className="space-y-1">
                      {project.results.slice(0, 2).map((result, idx) => (
                        <li key={idx} className="flex items-center text-sm text-[#5A6D6D]">
                          <svg
                            className="w-4 h-4 mr-2 text-[#71C648] flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-[#f8f9fa] text-[#5A6D6D] px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Testimonial preview */}
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-[#5A6D6D] italic line-clamp-2 mb-2">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </p>
                    <p className="text-xs text-[#194973] font-medium">
                      {project.testimonial.author}, {project.testimonial.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-[#194973]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#71C648] mb-1 sm:mb-2">{t(`stat${i}`)}</div>
                <div className="text-sm sm:text-base text-gray-300">{t(`stat${i}Label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title={t("ctaTitle")}
            subtitle={t("ctaSubtitle")}
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/presupuesto" variant="primary" size="lg">
              {t("ctaCta1")}
            </Button>
            <Button href="/contacto" variant="outline" size="lg">
              {t("ctaCta2")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
