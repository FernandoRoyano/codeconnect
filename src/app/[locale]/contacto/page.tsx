"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";
import Accordion, { AccordionItem } from "@/components/Accordion";

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

  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError(t("submitError"));
    } finally {
      setIsSubmitting(false);
    }
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
      value: "codeconnectsl@gmail.com",
      href: "mailto:codeconnectsl@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
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
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 bg-mesh overflow-hidden">
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

      {/* Contact Info - tarjetas superpuestas al hero */}
      <section className="relative -mt-14 mb-8 sm:mb-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4 reveal">
            {contactInfo.map((info, index) => {
              const Inner = (
                <>
                  <div className="w-12 h-12 bg-[#71C648]/10 rounded-xl flex items-center justify-center text-[#71C648] flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-[#71C648] font-medium mb-0.5">{info.title}</div>
                    <div className="text-base font-semibold text-[#194973] truncate">{info.value}</div>
                  </div>
                </>
              );
              const baseCls =
                "flex items-center gap-4 bg-white rounded-2xl p-5 shadow-soft border border-[#e7e5e4] transition-all duration-300";
              return info.href ? (
                <a
                  key={index}
                  href={info.href}
                  className={`${baseCls} hover:shadow-soft-lg hover:border-[#71C648]/40 hover:-translate-y-0.5`}
                >
                  {Inner}
                </a>
              ) : (
                <div key={index} className={baseCls}>
                  {Inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 sm:py-24 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 reveal">
            {/* Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-[#e7e5e4]">
              <h2
                className="font-bold text-[#194973] tracking-tight mb-3"
                style={{ fontSize: "var(--fs-3xl)", lineHeight: 1.1 }}
              >
                {t("formTitle")}
              </h2>
              <p className="text-[#57534e] mb-8" style={{ fontSize: "var(--fs-base)" }}>
                {t("formSubtitle")}
              </p>

              {submitted ? (
                <div className="bg-[#71C648]/10 border border-[#71C648]/30 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-[#71C648] rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#194973] mb-2 tracking-tight">
                    {t("successTitle")}
                  </h3>
                  <p className="text-[#57534e]">
                    {t("successDesc")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        className="w-full px-4 py-3 rounded-xl border border-[#e7e5e4] bg-[#fafaf9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#71C648]/40 focus:border-[#71C648] transition-all"
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
                        className="w-full px-4 py-3 rounded-xl border border-[#e7e5e4] bg-[#fafaf9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#71C648]/40 focus:border-[#71C648] transition-all"
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
                        className="w-full px-4 py-3 rounded-xl border border-[#e7e5e4] bg-[#fafaf9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#71C648]/40 focus:border-[#71C648] transition-all"
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
                        className="w-full px-4 py-3 rounded-xl border border-[#e7e5e4] bg-[#fafaf9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#71C648]/40 focus:border-[#71C648] transition-all"
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
                      className="w-full px-4 py-3 rounded-xl border border-[#e7e5e4] bg-[#fafaf9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#71C648]/40 focus:border-[#71C648] transition-all"
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

                  {submitError && (
                    <div role="alert" className="bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
                      {submitError}
                    </div>
                  )}

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
              <h2
                className="font-bold text-[#194973] tracking-tight mb-3"
                style={{ fontSize: "var(--fs-3xl)", lineHeight: 1.1 }}
              >
                {t("faqTitle")}
              </h2>
              <p className="text-[#57534e] mb-8" style={{ fontSize: "var(--fs-base)" }}>
                {t("faqSubtitle")}
              </p>

              <Accordion>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} question={faq.question}>
                    {faq.answer}
                  </AccordionItem>
                ))}
              </Accordion>

              {/* CTA Card */}
              <div className="mt-8 relative bg-mesh rounded-2xl p-8 text-white overflow-hidden">
                <h3 className="text-xl font-bold mb-2 tracking-tight">{t("callTitle")}</h3>
                <p className="text-white/75 mb-5 leading-relaxed">
                  {t("callDesc")}
                </p>
                <Button href="/presupuesto" variant="primary">
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
