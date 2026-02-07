import Button from "@/components/Button";

const services = [
  {
    id: "web",
    title: "Paginas Web",
    subtitle: "Tu escaparate online",
    description:
      "Una web profesional que representa tu negocio. Nada de plantillas: diseño a medida que transmite confianza y ayuda a que tus clientes te encuentren.",
    features: [
      {
        title: "Diseño a medida",
        description: "No usamos plantillas. Tu web se diseña desde cero para reflejar tu marca.",
      },
      {
        title: "Responsive",
        description: "Se ve bien en movil, tablet y ordenador. Hoy en dia la mayoria de visitas vienen del movil.",
      },
      {
        title: "SEO basico incluido",
        description: "Configuramos lo basico para que Google te encuentre: titulos, descripciones, velocidad...",
      },
      {
        title: "Facil de actualizar",
        description: "Te ensenamos a cambiar textos e imagenes tu mismo. Sin depender de nadie.",
      },
    ],
    icon: (
      <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    id: "crm",
    title: "CRM / Gestion de Clientes",
    subtitle: "Todo en un solo sitio",
    description:
      "Olvida las hojas de Excel y las agendas de papel. Un sistema sencillo para gestionar tus clientes, citas y seguimientos. Adaptado a como tu trabajas, no al reves.",
    features: [
      {
        title: "Fichas de clientes",
        description: "Toda la informacion de cada cliente en un solo lugar: datos, historial, notas...",
      },
      {
        title: "Agenda de citas",
        description: "Calendario visual para gestionar tus citas. Sin líos ni dobles reservas.",
      },
      {
        title: "Recordatorios",
        description: "Avisos automaticos por email o SMS para que no te dejen plantado.",
      },
      {
        title: "Historial y notas",
        description: "Guarda notas de cada visita y ten todo el historial a mano.",
      },
    ],
    icon: (
      <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: "facturacion",
    title: "Facturacion",
    subtitle: "Cuentas claras",
    description:
      "Genera facturas en segundos, controla quien te ha pagado y quien no, y ten tus numeros claros. Sin complicaciones ni funciones que no vas a usar.",
    features: [
      {
        title: "Facturas rapidas",
        description: "Crea una factura en 30 segundos. Los datos del cliente ya estan cargados.",
      },
      {
        title: "Control de cobros",
        description: "Ve de un vistazo quien te debe y quien ya ha pagado. Sin sorpresas a fin de mes.",
      },
      {
        title: "Informes sencillos",
        description: "Cuanto has facturado este mes? Y este trimestre? Respuestas rapidas.",
      },
      {
        title: "Exportar para el gestor",
        description: "Saca los datos que tu gestor necesita sin volverte loco.",
      },
    ],
    icon: (
      <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
];

export default function ServiciosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-[#194973] to-[#0f3150]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block bg-[#71C648]/20 text-[#71C648] px-4 py-2 rounded-full text-sm font-medium mb-4 sm:mb-6">
              Lo que hacemos
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Servicios
            </h1>
            <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Webs, gestion de clientes y facturacion. Todo a medida, sin funciones
              que no necesitas y sin complicaciones.
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
                  Pedir presupuesto
                </Button>
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="bg-gradient-to-br from-[#194973] to-[#71C648] rounded-2xl sm:rounded-3xl p-6 sm:p-8 aspect-[3/2] sm:aspect-[4/3] lg:aspect-square flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full h-full flex items-center justify-center text-white/80">
                    {service.icon}
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
              Tambien te ayudamos con...
            </h2>
            <p className="text-[#5A6D6D] max-w-2xl mx-auto">
              Cosas que suelen hacer falta y que podemos montar para ti
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                title: "Reserva de citas online",
                description: "Que tus clientes puedan reservar cita desde la web, sin tener que llamar",
              },
              {
                title: "Email profesional",
                description: "Tu correo con tu dominio: info@tuclinica.com queda mejor que gmail",
              },
              {
                title: "Formularios de contacto",
                description: "Que te lleguen los mensajes de la web directamente al email",
              },
              {
                title: "Integracion con WhatsApp",
                description: "Boton de WhatsApp en la web para que te escriban directamente",
              },
              {
                title: "Google Maps y resenas",
                description: "Tu ubicacion en el mapa y las resenas de Google visibles en la web",
              },
              {
                title: "Redes sociales",
                description: "Enlaces a tus redes y widgets de Instagram si los usas",
              },
            ].map((extra, index) => (
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
            No sabes por donde empezar?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Cuentanos tu situacion y te decimos que tiene sentido para tu negocio.
            Sin compromiso.
          </p>
          <Button href="/contacto" variant="primary" size="lg">
            Hablemos
          </Button>
        </div>
      </section>
    </>
  );
}
