import { getTranslations } from "next-intl/server";
import Button from "@/components/Button";

/* ── Mockup illustrations for each service ── */

function WebMockup() {
  return (
    <div className="w-full h-full flex flex-col rounded-xl overflow-hidden bg-white shadow-2xl">
      {/* Browser chrome */}
      <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-3 bg-white rounded-md px-3 py-1 text-[10px] sm:text-xs text-gray-400 border border-gray-200 truncate">
          https://tuempresa.com
        </div>
      </div>
      {/* Page content */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3 bg-gradient-to-br from-slate-50 to-white">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <div className="w-20 h-4 rounded bg-[#194973]" />
          <div className="flex gap-3">
            <div className="w-10 h-2.5 rounded bg-gray-200" />
            <div className="w-10 h-2.5 rounded bg-gray-200" />
            <div className="w-14 h-6 rounded-full bg-[#71C648]" />
          </div>
        </div>
        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 py-2">
          <div className="w-3/4 h-4 sm:h-5 rounded bg-[#194973]" />
          <div className="w-1/2 h-3 rounded bg-gray-200" />
          <div className="w-24 h-7 rounded-full bg-[#71C648] mt-1" />
        </div>
        {/* Cards row */}
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 flex flex-col gap-1.5">
              <div className="w-6 h-6 rounded-md bg-[#71C648]/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-sm bg-[#71C648]" />
              </div>
              <div className="w-full h-2 rounded bg-gray-200" />
              <div className="w-3/4 h-1.5 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CrmMockup() {
  const contacts = [
    { name: "María García", status: "bg-[#71C648]", amount: "€2.400" },
    { name: "Carlos López", status: "bg-yellow-400", amount: "€1.800" },
    { name: "Ana Martín", status: "bg-[#71C648]", amount: "€3.200" },
    { name: "Pedro Ruiz", status: "bg-blue-400", amount: "€950" },
  ];
  return (
    <div className="w-full h-full flex flex-col rounded-xl overflow-hidden bg-white shadow-2xl">
      {/* Top bar */}
      <div className="bg-[#194973] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#71C648]" />
          <span className="text-white text-[10px] sm:text-xs font-semibold tracking-wide">CRM</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-20 h-5 rounded bg-white/10 border border-white/20" />
          <div className="w-6 h-6 rounded-full bg-[#71C648] flex items-center justify-center text-[8px] text-white font-bold">MG</div>
        </div>
      </div>
      {/* Body */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-14 sm:w-16 bg-gray-50 border-r border-gray-100 py-3 flex flex-col items-center gap-3">
          {["bg-[#71C648]", "bg-gray-300", "bg-gray-300", "bg-gray-300"].map((c, i) => (
            <div key={i} className={`w-7 h-7 rounded-lg ${i === 0 ? "bg-[#71C648]/15" : ""} flex items-center justify-center`}>
              <div className={`w-3.5 h-3.5 rounded-sm ${c}`} />
            </div>
          ))}
        </div>
        {/* Main content */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col gap-2.5 overflow-hidden">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Clientes", val: "124", color: "text-[#194973]" },
              { label: "Pipeline", val: "€34k", color: "text-[#71C648]" },
              { label: "Cerrados", val: "89%", color: "text-[#194973]" },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
                <div className={`text-sm sm:text-base font-bold ${s.color}`}>{s.val}</div>
                <div className="text-[8px] sm:text-[9px] text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
          {/* Contact list */}
          <div className="flex-1 flex flex-col gap-1.5">
            {contacts.map((c, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50/80 rounded-lg px-2.5 py-1.5 hover:bg-gray-100 transition-colors">
                <div className={`w-2 h-2 rounded-full ${c.status}`} />
                <span className="text-[10px] sm:text-xs text-gray-700 flex-1 truncate">{c.name}</span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#194973]">{c.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BillingMockup() {
  return (
    <div className="w-full h-full flex flex-col rounded-xl overflow-hidden bg-white shadow-2xl">
      {/* Invoice header */}
      <div className="bg-gradient-to-r from-[#194973] to-[#1d5a8a] px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <span className="text-white text-xs sm:text-sm font-semibold">Factura #2024-087</span>
        </div>
        <span className="text-[10px] sm:text-xs bg-[#71C648] text-white px-2.5 py-0.5 rounded-full font-medium">Pagada</span>
      </div>
      {/* Invoice body */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
        {/* From / To */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-wider mb-1">De</div>
            <div className="text-[10px] sm:text-xs font-semibold text-[#194973]">CodeConnect</div>
            <div className="text-[9px] sm:text-[10px] text-gray-400">Madrid, ES</div>
          </div>
          <div>
            <div className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-wider mb-1">Para</div>
            <div className="text-[10px] sm:text-xs font-semibold text-[#194973]">Empresa S.L.</div>
            <div className="text-[9px] sm:text-[10px] text-gray-400">Barcelona, ES</div>
          </div>
        </div>
        {/* Line items */}
        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-[1fr,auto] gap-2 text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1.5 mb-1.5">
            <span>Concepto</span>
            <span>Importe</span>
          </div>
          {[
            { item: "Diseño Web Premium", price: "€1.200" },
            { item: "CRM Setup & Config", price: "€800" },
            { item: "Mantenimiento 3 meses", price: "€450" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr,auto] gap-2 py-1.5 border-b border-gray-50 text-[10px] sm:text-xs">
              <span className="text-gray-600">{row.item}</span>
              <span className="text-[#194973] font-medium">{row.price}</span>
            </div>
          ))}
        </div>
        {/* Total */}
        <div className="flex items-center justify-between bg-[#194973]/5 rounded-lg px-3 py-2">
          <span className="text-xs sm:text-sm font-semibold text-[#194973]">Total</span>
          <span className="text-base sm:text-lg font-bold text-[#194973]">€2.450</span>
        </div>
      </div>
    </div>
  );
}

export default async function ServiciosPage() {
  const t = await getTranslations("services");

  const services = [
    {
      id: "web",
      subtitle: t("webSubtitle"),
      title: t("webTitle"),
      description: t("webDesc"),
      features: [
        { title: t("webF0Title"), description: t("webF0Desc") },
        { title: t("webF1Title"), description: t("webF1Desc") },
        { title: t("webF2Title"), description: t("webF2Desc") },
        { title: t("webF3Title"), description: t("webF3Desc") },
      ],
      visual: <WebMockup />,
    },
    {
      id: "crm",
      subtitle: t("crmSubtitle"),
      title: t("crmTitle"),
      description: t("crmDesc"),
      features: [
        { title: t("crmF0Title"), description: t("crmF0Desc") },
        { title: t("crmF1Title"), description: t("crmF1Desc") },
        { title: t("crmF2Title"), description: t("crmF2Desc") },
        { title: t("crmF3Title"), description: t("crmF3Desc") },
      ],
      visual: <CrmMockup />,
    },
    {
      id: "facturacion",
      subtitle: t("billingSubtitle"),
      title: t("billingTitle"),
      description: t("billingDesc"),
      features: [
        { title: t("billingF0Title"), description: t("billingF0Desc") },
        { title: t("billingF1Title"), description: t("billingF1Desc") },
        { title: t("billingF2Title"), description: t("billingF2Desc") },
        { title: t("billingF3Title"), description: t("billingF3Desc") },
      ],
      visual: <BillingMockup />,
    },
  ];

  const extras = Array.from({ length: 6 }, (_, i) => ({
    title: t(`extra${i}Title`),
    description: t(`extra${i}Desc`),
  }));

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
            <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-12 sm:py-20 ${index % 2 === 0 ? "bg-white" : "bg-[#f8f9fa]"}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center`}>
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <span className="inline-block bg-[#71C648]/10 text-[#71C648] px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {service.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#194973] mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-[#5A6D6D] mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#71C648]/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[#71C648]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#194973]">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-[#5A6D6D]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button href="/presupuesto" variant="primary">
                  {t("requestBudget")}
                </Button>
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="bg-gradient-to-br from-[#194973]/10 to-[#71C648]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 aspect-[3/2] sm:aspect-[4/3] lg:aspect-square flex items-center justify-center">
                  <div className="w-full h-full">
                    {service.visual}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Extras */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl font-bold text-[#194973] mb-4">
              {t("extrasTitle")}
            </h2>
            <p className="text-[#5A6D6D] max-w-2xl mx-auto">
              {t("extrasSubtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {extras.map((extra, index) => (
              <div key={index} className="p-6 bg-[#f8f9fa] rounded-xl">
                <h3 className="font-semibold text-[#194973] mb-2">{extra.title}</h3>
                <p className="text-sm text-[#5A6D6D]">{extra.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-[#194973]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            {t("ctaTitle")}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t("ctaDesc")}
          </p>
          <Button href="/contacto" variant="primary" size="lg">
            {t("ctaButton")}
          </Button>
        </div>
      </section>
    </>
  );
}
