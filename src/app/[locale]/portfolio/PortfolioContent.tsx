"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "@/i18n/navigation";
import { CATEGORY_LABELS, projects, type ProjectCategory } from "@/content/portfolio";

export default function PortfolioContent() {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");

  const filters: { value: ProjectCategory | "all"; label: string }[] = [
    { value: "all", label: t("cat0") },
    { value: "web", label: CATEGORY_LABELS.web },
    { value: "software", label: CATEGORY_LABELS.software },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

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
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={activeFilter === filter.value}
                className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.value
                    ? "bg-[#194973] text-white shadow-soft"
                    : "text-[#57534e] hover:text-[#194973] hover:bg-[#fafaf9]"
                }`}
              >
                {filter.label}
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
                key={project.slug}
                className="relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-[#e7e5e4] hover:border-[#71C648]/40 group"
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
                      {project.sector}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="text-lg font-bold text-[#194973] tracking-tight group-hover:text-[#39751f] transition-colors">
                      <Link href={`/portfolio/${project.slug}`} className="after:absolute after:inset-0">
                        {project.title}
                      </Link>
                    </h2>
                    <span className={`flex-shrink-0 border px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                      project.kind === "client"
                        ? "bg-[#71C648]/10 text-[#39751f] border-[#71C648]/25"
                        : "bg-[#20DCC2]/10 text-[#13766d] border-[#20DCC2]/25"
                    }`}>
                      {project.badge}
                    </span>
                  </div>
                  <p className="text-sm text-[#57534e] mb-5 line-clamp-2 leading-relaxed">
                    {project.summary}
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

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#194973] group-hover:text-[#39751f] transition-colors">
                    {t("viewCase")}
                    <span aria-hidden>→</span>
                  </span>
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
