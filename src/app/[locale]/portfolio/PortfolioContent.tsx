"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";

/* Visual abstracto por categoría — sin imágenes, 100% CSS/SVG */
function ProjectVisual({ index, title, category }: { index: number; title: string; category: string }) {
  const patterns = [
    // 1 - Web
    { bg: "from-[#194973] to-[#1f5a8f]", accent: "#71C648" },
    // 2 - CRM / Software
    { bg: "from-[#0f3150] to-[#194973]", accent: "#71C648" },
    // 3 - Facturación
    { bg: "from-[#194973] via-[#1f5a8f] to-[#71C648]", accent: "#fafaf9" },
    // 4 - App
    { bg: "from-[#0f3150] to-[#71C648]", accent: "#fff" },
  ];
  const p = patterns[Math.min(index - 1, patterns.length - 1)] ?? patterns[0];
  const initial = title.charAt(0).toUpperCase();

  return (
    <div className={`relative h-44 bg-gradient-to-br ${p.bg} overflow-hidden`}>
      {/* mesh pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(at 20% 20%, rgb(113 198 72 / 0.35) 0, transparent 45%), radial-gradient(at 80% 80%, rgb(255 255 255 / 0.12) 0, transparent 50%)",
        }}
      />
      {/* grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* initial as monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[120px] font-bold text-white/10 leading-none select-none"
          aria-hidden
          style={{ letterSpacing: "-0.05em" }}
        >
          {initial}
        </span>
      </div>
      {/* category badge */}
      <div className="absolute bottom-4 left-4">
        <span className="bg-white/90 backdrop-blur text-[#194973] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
          {category}
        </span>
      </div>
    </div>
  );
}

export default function PortfolioContent() {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState(0);
  const demoLabel = t("demoLabel");

  const projects = [
    {
      id: 1,
      title: t("p1Title"),
      category: t("p1Cat"),
      catIndex: 2,
      description: t("p1Desc"),
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    },
    {
      id: 2,
      title: t("p2Title"),
      category: t("p2Cat"),
      catIndex: 2,
      description: t("p2Desc"),
      technologies: ["React", "Node.js", "MongoDB", "Redsys"],
    },
    {
      id: 3,
      title: t("p3Title"),
      category: t("p3Cat"),
      catIndex: 1,
      description: t("p3Desc"),
      technologies: ["Next.js", "Tailwind CSS", "Vercel", "Google Analytics"],
    },
    {
      id: 4,
      title: t("p4Title"),
      category: t("p4Cat"),
      catIndex: 1,
      description: t("p4Desc"),
      technologies: ["Next.js", "Node.js", "Brevo", "Calendly"],
    },
    {
      id: 5,
      title: t("p5Title"),
      category: t("p5Cat"),
      catIndex: 3,
      description: t("p5Desc"),
      technologies: ["React", "Node.js", "PostgreSQL", "PDF Generator"],
    },
    {
      id: 6,
      title: t("p6Title"),
      category: t("p6Cat"),
      catIndex: 4,
      description: t("p6Desc"),
      technologies: ["React Native", "Firebase", "Node.js", "RevenueCat"],
    },
  ];

  const categories = [t("cat0"), t("cat1"), t("cat2"), t("cat3"), t("cat4")];

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
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(index)}
                aria-pressed={activeFilter === index}
                className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === index
                    ? "bg-[#194973] text-white shadow-soft"
                    : "text-[#57534e] hover:text-[#194973] hover:bg-[#fafaf9]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 sm:py-28 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 reveal">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-[#e7e5e4] hover:border-[#71C648]/40 group"
              >
                {/* Visual — abstract pattern por categoría */}
                <ProjectVisual index={project.catIndex} title={project.title} category={project.category} />

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[#194973] tracking-tight group-hover:text-[#71C648] transition-colors">
                      {project.title}
                    </h3>
                    <span className="flex-shrink-0 bg-[#194973]/5 text-[#194973]/70 border border-[#194973]/10 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase">
                      {demoLabel}
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
