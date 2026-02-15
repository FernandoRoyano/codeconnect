"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";

export default function ContactoPage() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
    servicio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      title: t("infoEmail"),
      value: "info@codeconnect.es",
      href: "mailto:info@codeconnect.es",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      title: t("infoPhone"),
      value: "+34 900 000 000",
      href: "tel:+34900000000",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      title: t("infoLocation"),
      value: t("infoLocationValue"),
      href: null as string | null,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
  ];

  const faqs = [
    { question: t("faq0Q"), answer: t("faq0A") },
    { question: t("faq1Q"), answer: t("faq1A") },
    { question: t("faq2Q"), answer: t("faq2A") },
    { question: t("faq3Q"), answer: t("faq3A") },
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

      {/* Contact Info */}
      <section className="py-8 sm:py-12 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#71C648]/10 rounded-xl flex items-center justify-center text-[#71C648]">
                  {info.icon}
                </div>
                <div>
                  <div className="text-sm text-[#5A6D6D]">{info.title}</div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-lg font-medium text-[#194973] hover:text-[#71C648] transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <div className="text-lg font-medium text-[#194973]">{info.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-24 bg-[#f8f9fa]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#194973] mb-2">
                {t("formTitle")}
              </h2>
              <p className="text-[#5A6D6D] mb-8">
                {t("formSubtitle")}
              </p>

              {submitted ? (
                <div className="bg-[#71C648]/10 border border-[#71C648] rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-[#71C648] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#194973] mb-2">
                    {t("successTitle")}
                  </h3>
                  <p className="text-[#5A6D6D]">
                    {t("successDesc")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-[#194973] mb-2">
                        {t("labelName")}
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all"
                        placeholder={t("phName")}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#194973] mb-2">
                        {t("labelEmail")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all"
                        placeholder={t("phEmail")}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-[#194973] mb-2">
                        {t("labelPhone")}
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all"
                        placeholder={t("phPhone")}
                      />
                    </div>
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-[#194973] mb-2">
                        {t("labelCompany")}
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all"
                        placeholder={t("phCompany")}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="servicio" className="block text-sm font-medium text-[#194973] mb-2">
                      {t("labelService")}
                    </label>
                    <select
                      id="servicio"
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all"
                    >
                      <option value="">{t("optDefault")}</option>
                      <option value="web">{t("optWeb")}</option>
                      <option value="software">{t("optSoftware")}</option>
                      <option value="apps">{t("optApps")}</option>
                      <option value="consultoria">{t("optConsulting")}</option>
                      <option value="otro">{t("optOther")}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-[#194973] mb-2">
                      {t("labelMessage")}
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      rows={5}
                      value={formData.mensaje}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all resize-none"
                      placeholder={t("phMessage")}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("submitting") : t("submit")}
                  </Button>

                  <p className="text-sm text-[#5A6D6D] text-center">
                    {t("privacyNote")}{" "}
                    <Link href={"/politica-privacidad" as never} className="text-[#71C648] hover:underline">
                      {t("privacyLink")}
                    </Link>
                  </p>
                </form>
              )}
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-3xl font-bold text-[#194973] mb-2">
                {t("faqTitle")}
              </h2>
              <p className="text-[#5A6D6D] mb-8">
                {t("faqSubtitle")}
              </p>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm group"
                  >
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <h3 className="font-semibold text-[#194973] pr-4">
                        {faq.question}
                      </h3>
                      <span className="text-[#71C648] group-open:rotate-180 transition-transform">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-4 text-[#5A6D6D] leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>

              {/* CTA Card */}
              <div className="mt-8 bg-[#194973] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-2">{t("callTitle")}</h3>
                <p className="text-gray-300 mb-4">
                  {t("callDesc")}
                </p>
                <Button href="/presupuesto" variant="white">
                  {t("callButton")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
