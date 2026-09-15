"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";

export default function PortfolioContent() {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState(0);

  const projects = [
    {
      id: 9,
      title: "TrainHub",
      category: t("p9Cat"),
      catIndex: 3,
      image: "/images/portfolio/trainhub-product.webp",
      description: t("p9Desc"),
      technologies: ["Next.js", "React", "TypeScript", "Stripe"],
      kind: "own" as const,
      badge: t("commercialProductLabel"),
      url: "https://train-hub-five.vercel.app/",
    },
    {
      id: 10,
      title: "WellnessReal",
      category: t("p10Cat"),
      catIndex: 1,
      image: "/images/portfolio/wellnessreal-project.webp",
      description: t("p10Desc"),
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      kind: "own" as const,
      badge: t("ownProjectLabel"),
      url: "https://wellnessreal.es/",
    },
    {
      id: 11,
      title: "Diego Royano Nutricionista",
      category: t("p11Cat"),
      catIndex: 1,
      image: "/images/portfolio/diego-royano-client.webp",
      description: t("p11Desc"),
      technologies: ["Next.js", "React", "TypeScript", "CSS"],
      kind: "client" as const,
      badge: t("clientLabel"),
      url: "https://patologia-digestiva.vercel.app/",
    },
    {
      id: 12,
      title: "Antea Salud",
      category: t("p12Cat"),
      catIndex: 1,
      image: "/images/portfolio/antea-salud-project.webp",
      description: t("p12Desc"),
      technologies: ["Next.js", "React", "TypeScript", "CSS Modules"],
      kind: "own" as const,
      badge: t("ownLiveProjectLabel"),
      url: "https://anteasalud.com/",
    },
    {
      id: 7,
      title: t("p7Title"),
      category: t("p7Cat"),
      catIndex: 1,
      image: "/images/portfolio/escapa-cantabria-client.webp",
      description: t("p7Desc"),
      technologies: ["Next.js", "React", "TypeScript"],
      kind: "client" as const,
      badge: t("clientLabel"),
      url: "https://autocaravanasescapacantabria.com/",
    },
    {
      id: 8,
      title: t("p8Title"),
      category: t("p8Cat"),
      catIndex: 1,
      image: "/images/portfolio/caniches-con-amor-client.webp",
      description: t("p8Desc"),
      technologies: ["Next.js", "React", "TypeScript"],
      kind: "client" as const,
      badge: t("clientLabel"),
      url: "https://canichesconamor.com/",
    },
  ];

  const categories = [
    { index: 0, label: t("cat0") },
    { index: 1, label: t("cat1") },
    { index: 3, label: t("cat3") },
  ];

  const filteredProjects = activeFilter === 0
    ? projects
    : projects.filter((p) => p.catIndex === activeFilter);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-24 bg-mesh overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 text-[#71C648] px-4 py-1.5 rounded-full text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#71C648]" />
              {t("heroBadge")}
            </span>
            <h1
              className="font-bold text-white tracking-tight mb-6"
              style={{ fontSize: "var(--fs-5xl)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              {t("heroTitle")}
            </h1>
            <p
              className="text-white/70 max-w-2xl mx-auto"
              style={{ fontSize: "var(--fs-lg)", lineHeight: 1.6 }}
            >
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Filter — segmented pills */}
      <section className="sticky top-16 z-30 py-4 bg-white/80 backdrop-blur-xl border-b border-[#e7e5e4]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={t("filterLabel")}>
            {categories.map((category) => (
              <button
                key={category.index}
                onClick={() => setActiveFilter(category.index)}
                aria-pressed={activeFilter === category.index}
                className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === category.index
                    ? "bg-[#194973] text-white shadow-soft"
                    : "text-[#57534e] hover:text-[#194973] hover:bg-[#fafaf9]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 sm:py-28 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 reveal">
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-[#e7e5e4] hover:border-[#71C648]/40 group"
              >
                <div className="relative h-52 overflow-hidden bg-[#111A1D]">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F10]/55 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-[#111A1D] px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[#194973] tracking-tight group-hover:text-[#71C648] transition-colors">
                      {project.title}
                    </h3>
                    <span className={`flex-shrink-0 border px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                      project.kind === "client"
                        ? "bg-[#71C648]/10 text-[#39751f] border-[#71C648]/25"
                        : "bg-[#20DCC2]/10 text-[#13766d] border-[#20DCC2]/25"
                    }`}>
                      {project.badge}
                    </span>
                  </div>
                  <p className="text-sm text-[#57534e] mb-5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-[#fafaf9] text-[#57534e] border border-[#e7e5e4] px-2 py-0.5 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#194973] hover:text-[#39751f] transition-colors"
                  >
                    {t("visitProject")}
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-white">
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
