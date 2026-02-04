"use client";

import { useState } from "react";
import Button from "@/components/Button";

const contactInfo = [
  {
    title: "Email",
    value: "info@codeconnect.es",
    href: "mailto:info@codeconnect.es",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Telefono",
    value: "+34 900 000 000",
    href: "tel:+34900000000",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    title: "Ubicacion",
    value: "Madrid, Espana",
    href: null,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    question: "Cuanto tiempo tarda un proyecto tipico?",
    answer: "Depende del alcance, pero un proyecto medio suele estar entre 2-4 meses. Trabajamos con metodologias agiles para entregar valor desde las primeras semanas.",
  },
  {
    question: "Incluye el precio el soporte posterior?",
    answer: "Si, todos nuestros proyectos incluyen un periodo de garantia y soporte. Ademas, ofrecemos planes de mantenimiento opcionales.",
  },
  {
    question: "Puedo modificar el software una vez entregado?",
    answer: "Por supuesto. Entregas la licencia completa del codigo fuente. Es tuyo para modificarlo, ampliarlo o adaptarlo como necesites.",
  },
  {
    question: "Trabajais con centros de cualquier tamano?",
    answer: "Si, trabajamos tanto con pequenas clinicas como con grandes redes hospitalarias. Adaptamos las soluciones al tamano y necesidades de cada organizacion.",
  },
];

export default function ContactoPage() {
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

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#194973] to-[#0f3150]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block bg-[#71C648]/20 text-[#71C648] px-4 py-2 rounded-full text-sm font-medium mb-6">
              Hablemos
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contacto
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tienes un proyecto en mente? Cuentanos y te ayudaremos a hacerlo realidad.
              Sin compromiso.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
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
      <section className="py-24 bg-[#f8f9fa]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#194973] mb-2">
                Envianos un mensaje
              </h2>
              <p className="text-[#5A6D6D] mb-8">
                Rellena el formulario y nos pondremos en contacto contigo en menos de 24 horas.
              </p>

              {submitted ? (
                <div className="bg-[#71C648]/10 border border-[#71C648] rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-[#71C648] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#194973] mb-2">
                    Mensaje enviado!
                  </h3>
                  <p className="text-[#5A6D6D]">
                    Gracias por contactarnos. Te responderemos lo antes posible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-[#194973] mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#194973] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-[#194973] mb-2">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all"
                        placeholder="+34 600 000 000"
                      />
                    </div>
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-[#194973] mb-2">
                        Empresa / Centro
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all"
                        placeholder="Nombre de tu organizacion"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="servicio" className="block text-sm font-medium text-[#194973] mb-2">
                      Que servicio te interesa?
                    </label>
                    <select
                      id="servicio"
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona una opcion</option>
                      <option value="web">Desarrollo Web</option>
                      <option value="software">Software a Medida</option>
                      <option value="apps">Apps Moviles</option>
                      <option value="consultoria">Consultoria</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-[#194973] mb-2">
                      Cuentanos tu proyecto *
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      rows={5}
                      value={formData.mensaje}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] focus:border-transparent transition-all resize-none"
                      placeholder="Describenos brevemente que necesitas..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </Button>

                  <p className="text-sm text-[#5A6D6D] text-center">
                    Al enviar este formulario aceptas nuestra{" "}
                    <a href="/privacidad" className="text-[#71C648] hover:underline">
                      politica de privacidad
                    </a>
                  </p>
                </form>
              )}
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-3xl font-bold text-[#194973] mb-2">
                Preguntas Frecuentes
              </h2>
              <p className="text-[#5A6D6D] mb-8">
                Algunas respuestas a las dudas mas comunes.
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
                <h3 className="text-xl font-bold mb-2">Prefieres una llamada?</h3>
                <p className="text-gray-300 mb-4">
                  Reserva una videollamada gratuita de 30 minutos con nuestro equipo.
                </p>
                <Button href="/presupuesto" variant="white">
                  Reservar llamada
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
