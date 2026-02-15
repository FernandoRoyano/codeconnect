import { getTranslations } from "next-intl/server";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";

export default async function Home() {
  const t = await getTranslations("home");

  const services = [
    {
      title: t("svcWebTitle"),
      description: t("svcWebDesc"),
      href: "/servicios#web",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      features: [t("svcWebF0"), t("svcWebF1"), t("svcWebF2")],
    },
    {
      title: t("svcCrmTitle"),
      description: t("svcCrmDesc"),
      href: "/servicios#crm",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      features: [t("svcCrmF0"), t("svcCrmF1"), t("svcCrmF2")],
    },
    {
      title: t("svcBillingTitle"),
      description: t("svcBillingDesc"),
      href: "/servicios#facturacion",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      features: [t("svcBillingF0"), t("svcBillingF1"), t("svcBillingF2")],
    },
  ];

  const benefits = [
    {
      title: t("benefit0Title"),
      description: t("benefit0Desc"),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
    },
    {
      title: t("benefit1Title"),
      description: t("benefit1Desc"),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      ),
    },
    {
      title: t("benefit2Title"),
      description: t("benefit2Desc"),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      title: t("benefit3Title"),
      description: t("benefit3Desc"),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      ),
    },
  ];

  const clients = Array.from({ length: 10 }, (_, i) => t(`client${i}`));

  const steps = [
    { step: "1", title: t("step1Title"), description: t("step1Desc") },
    { step: "2", title: t("step2Title"), description: t("step2Desc") },
    { step: "3", title: t("step3Title"), description: t("step3Desc") },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#194973] to-[#0f3150] overflow-hidden">
        <div className="absolute top-20 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-[#71C648]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-[#71C648]/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="inline-block bg-[#71C648]/20 text-[#71C648] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                {t("heroBadge")}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
                {t("heroTitle")}
                <span className="text-[#71C648]">{t("heroHighlight")}</span>
              </h1>
              <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                {t("heroDesc1")}
                <br /><br />
                {t("heroDesc2")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/presupuesto" variant="primary" size="lg">
                  {t("heroCta1")}
                </Button>
                <Button href="/servicios" variant="outline-light" size="lg">
                  {t("heroCta2")}
                </Button>
              </div>
            </div>
            {/* Hero Image - Dashboard mockup */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                    alt={t("heroImgAlt")}
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#71C648]/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#71C648]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{t("heroStats")}</div>
                      <div className="text-lg font-bold text-[#194973]">+127%</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#71C648] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[#194973]">{t("heroNotification")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#194973] mb-6">
                {t("problemTitle")}
              </h2>
              <div className="space-y-4 text-lg text-[#5A6D6D]">
                <p>{t("problemP1")}</p>
                <p>{t("problemP2")}</p>
                <p className="font-medium text-[#194973]">{t("problemP3")}</p>
              </div>
            </div>
            <div className="bg-[#f8f9fa] rounded-2xl p-8">
              <h3 className="font-bold text-[#194973] mb-4">{t("workWith")}</h3>
              <ul className="space-y-3">
                {clients.map((item, index) => (
                  <li key={index} className="flex items-center text-[#5A6D6D]">
                    <svg className="w-5 h-5 mr-3 text-[#71C648]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-12 sm:py-20 bg-[#f8f9fa]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t("servicesTitle")}
            subtitle={t("servicesSubtitle")}
          />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t("benefitsTitle")}
            subtitle={t("benefitsSubtitle")}
          />

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-2xl hover:bg-[#f8f9fa] transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-[#71C648]/10 rounded-xl flex items-center justify-center text-[#71C648]">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#194973] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#5A6D6D] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-20 bg-[#194973]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t("howTitle")}
            subtitle={t("howSubtitle")}
            light
          />

          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#71C648] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Section - Company Presence */}
      <section className="py-12 sm:py-20 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#71C648]/10 text-[#71C648] px-3 py-1 rounded-full text-sm font-medium mb-4">
                {t("aboutBadge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#194973] mb-6">
                {t("aboutTitle")}
              </h2>
              <p className="text-lg text-[#5A6D6D] mb-6 leading-relaxed">
                {t("aboutP1")}
              </p>
              <p className="text-lg text-[#5A6D6D] mb-8 leading-relaxed">
                {t("aboutP2")}
              </p>
              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#71C648]">{t("aboutStat1")}</div>
                  <div className="text-xs sm:text-sm text-[#5A6D6D]">{t("aboutStat1Label")}</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#71C648]">{t("aboutStat2")}</div>
                  <div className="text-xs sm:text-sm text-[#5A6D6D]">{t("aboutStat2Label")}</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#71C648]">{t("aboutStat3")}</div>
                  <div className="text-xs sm:text-sm text-[#5A6D6D]">{t("aboutStat3Label")}</div>
                </div>
              </div>
            </div>
            {/* Visual - Modern office/tech image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt={t("aboutImgAlt")}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#194973]/80 via-transparent to-transparent flex items-end">
                  <div className="p-4 sm:p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl sm:text-2xl font-bold">Code</span>
                      <div className="flex">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#71C648] rounded-full"></div>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#194973] border-2 border-white rounded-full -ml-2"></div>
                      </div>
                      <span className="text-xl sm:text-2xl font-bold">nnect</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-200">{t("aboutTitle")}</p>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 bg-[#71C648]/20 rounded-2xl -z-10"></div>
              <div className="hidden sm:block absolute -top-6 -left-6 w-24 h-24 bg-[#194973]/10 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with background */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#194973]/95 to-[#71C648]/90"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            {t("ctaTitle")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("ctaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/presupuesto" variant="white" size="lg">
              {t("ctaCta1")}
            </Button>
            <Button href="/contacto" variant="outline-light" size="lg">
              {t("ctaCta2")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
