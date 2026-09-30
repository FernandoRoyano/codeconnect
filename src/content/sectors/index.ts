import type { Sector, SectorSlug } from "./types";

export type { Sector, SectorSlug } from "./types";

// Preguntas que valen igual para cualquier sector. Salen de las FAQ de
// contacto y del articulo de software vertical o a medida.
const FAQ_VERTICAL = {
  q: "¿No me basta con un programa del sector?",
  a: "Muchas veces sí, y es lo primero que revisamos. Un software vertical suele ser la mejor primera opción; el desarrollo a medida empieza a tener sentido cuando tu forma de trabajar aporta valor y la herramienta te obliga a deformarla. Si con lo que ya tienes basta, te lo diremos.",
};

const FAQ_SIZE = {
  q: "¿Trabajáis con centros pequeños?",
  a: "Sí. Nos adaptamos al tamaño del negocio: desde profesionales que trabajan solos hasta centros con varias sedes. El sistema se diseña para crecer contigo, no para que pagues desde el primer día por lo que no usas.",
};

const FAQ_SUPPORT = {
  q: "¿Qué pasa cuando el proyecto está entregado?",
  a: "Todos los proyectos incluyen un periodo de garantía y soporte, y hay planes de mantenimiento opcionales. La propuesta deja por escrito qué código se entrega y sus derechos de uso, y aparte el hosting y las licencias de terceros si las hay.",
};

export const sectors: Sector[] = [
  {
    slug: "clinicas",
    name: "Clínicas y consultas",
    seoTitle: "Software a medida para clínicas y consultas",
    metaDescription:
      "Web, agenda, recordatorios y facturación conectados para clínicas, fisioterapia, nutrición y consultas privadas. Menos no-shows y menos trabajo a mano.",
    eyebrow: "Para clínicas y consultas",
    title: "Tu clínica, de la primera cita al cobro, sin copiar datos a mano.",
    intro:
      "Agenda en una herramienta, mensajes por WhatsApp, fichas en otra y facturas en una hoja de cálculo. Conectamos esas piezas para que la recepción deje de hacer de puente entre programas.",
    audience: ["Clínicas", "Fisioterapia", "Nutrición", "Psicología", "Consultas privadas"],
    problems: [
      {
        title: "Huecos que nadie cubre",
        text: "Cada cita que no se presenta es tiempo de consulta perdido. Antes de comprar una solución conviene medir cuánto te cuesta a ti, con tu propia agenda, no con la media del sector.",
      },
      {
        title: "La agenda vive en WhatsApp",
        text: "Responder más rápido no arregla una operativa rota. El ahorro aparece cuando las citas, los recordatorios y los cambios dejan de depender de copiar datos a mano.",
      },
      {
        title: "Normativa que cambia",
        text: "Verifactu, la factura electrónica o el aviso obligatorio en los bots con IA. Lo difícil es separar la urgencia real de la comercial y adaptarse sin rehacerlo todo.",
      },
    ],
    solutions: [
      {
        title: "Web que convierte en cita",
        text: "Especialidad clara, servicio explicado y reserva a un clic desde cualquier página.",
        href: "/servicios#web",
      },
      {
        title: "Fichas y agenda en un solo sitio",
        text: "Historial, notas y citas de cada paciente juntos, con el cuidado que exigen los datos de salud.",
        href: "/servicios#crm",
      },
      {
        title: "Recordatorios automáticos",
        text: "Avisos por email o SMS antes de la cita, con opción de cambiarla sin llamar.",
        href: "/servicios#crm",
      },
      {
        title: "Facturación y cobros",
        text: "Facturas con los datos del paciente ya cargados, control de quién ha pagado y exportación para el gestor.",
        href: "/servicios#facturacion",
      },
    ],
    projectSlugs: ["diego-royano-nutricionista", "antea-salud"],
    articleSlugs: [
      "coste-real-no-shows-clinica",
      "whatsapp-agenda-clinica-automatizacion",
      "verifactu-calendario-real-2027",
      "ai-act-bot-whatsapp-aviso-ia",
    ],
    faqs: [
      {
        q: "¿Cómo tratáis los datos de salud de los pacientes?",
        a: "Como datos de categoría especial del RGPD: el sistema se diseña desde el principio pensando en quién puede ver qué y dónde se guarda cada dato, en lugar de añadirlo al final.",
      },
      {
        q: "Ya uso un programa de gestión. ¿Tengo que cambiarlo?",
        a: "No necesariamente. A menudo lo que falla no es el programa central, sino las costuras: lo que se copia a mano entre la agenda, WhatsApp y la facturación. Integrar lo que ya tienes suele ser el primer paso.",
      },
      FAQ_VERTICAL,
      FAQ_SUPPORT,
    ],
  },
  {
    slug: "gimnasios",
    name: "Gimnasios y entrenadores",
    seoTitle: "Software para gimnasios y entrenadores",
    metaDescription:
      "Gestión de clientes, rutinas, reservas y cobros en una sola plataforma para gimnasios, estudios y entrenadores personales. Menos herramientas sueltas.",
    eyebrow: "Para gimnasios y entrenadores",
    title: "Clientes, rutinas y cobros en una sola plataforma.",
    intro:
      "Una hoja de cálculo para los clientes, rutinas enviadas por mensaje y cobros que se revisan a mano. Es justo lo que nos llevó a construir TrainHub, nuestro propio producto para entrenadores y centros.",
    audience: ["Gimnasios", "Estudios boutique", "Entrenadores personales", "Entrenamiento online"],
    problems: [
      {
        title: "Cinco herramientas que no se hablan",
        text: "Una app para reservas, otra para rutinas, otra para cobrar y otra para escribir a los clientes. Cada costura entre ellas es un dato que alguien copia a mano.",
      },
      {
        title: "Cobros que se persiguen",
        text: "Cuotas pendientes que se descubren a fin de mes. Avisar de los cobros pendientes es de las primeras tareas que merece la pena automatizar.",
      },
      {
        title: "Captar sin un recorrido claro",
        text: "Contenido en redes pero sin un camino que lleve al visitante de la curiosidad a la primera sesión.",
      },
    ],
    solutions: [
      {
        title: "Plataforma de clientes y rutinas",
        text: "Ficha de cada cliente con su historial y rutinas entregadas desde el mismo sitio.",
        href: "/servicios#crm",
      },
      {
        title: "Cobros integrados",
        text: "Pagos con tarjeta dentro del mismo flujo y control de quién está al día, sin conciliar a mano.",
        href: "/servicios#facturacion",
      },
      {
        title: "Web con recorrido de captación",
        text: "Servicios, contenidos y un camino directo hasta la reserva o el contacto.",
        href: "/servicios#web",
      },
      {
        title: "Reservas y recordatorios",
        text: "Reserva online desde la web y avisos automáticos para reducir ausencias.",
        href: "/servicios#crm",
      },
    ],
    projectSlugs: ["trainhub", "wellnessreal"],
    articleSlugs: [
      "automatizar-tareas-administrativas-pyme",
      "cinco-herramientas-ia-no-son-operativa",
      "software-vertical-o-medida-como-elegir",
      "kit-digital-ia-6000-euros",
    ],
    faqs: [
      {
        q: "¿TrainHub es un producto o un desarrollo a medida?",
        a: "Es un producto propio que ya funciona, y además es nuestra mejor demostración: sabemos lo que cuesta construir y mantener una plataforma para entrenadores porque lo hacemos para nosotros.",
      },
      FAQ_VERTICAL,
      FAQ_SIZE,
      FAQ_SUPPORT,
    ],
  },
  {
    slug: "bienestar",
    name: "Bienestar y mayores",
    seoTitle: "Software y webs para centros de bienestar",
    metaDescription:
      "Webs y software para centros de bienestar, ejercicio adaptado y servicios para personas mayores: explicar bien el servicio a las familias y convertir en valoración.",
    eyebrow: "Para bienestar y personas mayores",
    title: "Servicios que se entienden a la primera, también para las familias.",
    intro:
      "En bienestar y en servicios para personas mayores, quien decide muchas veces no es quien recibe el servicio. Lo sabemos de primera mano: Antea Salud, nuestro proyecto de ejercicio adaptado a domicilio, funciona así.",
    audience: ["Centros de bienestar", "Ejercicio adaptado", "Servicios para mayores", "Residencias"],
    problems: [
      {
        title: "Quien decide no es el usuario",
        text: "Hijos y familiares comparan opciones sin conocer el servicio. Si la web habla para especialistas, la duda no se convierte en llamada.",
      },
      {
        title: "Mucho trabajo administrativo repetido",
        text: "Clasificar solicitudes, preparar documentos, recordar citas y enviar informes periódicos. Son tareas con reglas claras, fáciles de automatizar sin cambiar de programa.",
      },
      {
        title: "Tecnología que no siempre hace falta",
        text: "A veces basta con simplificar el proceso o con integrar lo que ya existe. Desarrollar es solo una de las cinco respuestas posibles.",
      },
    ],
    solutions: [
      {
        title: "Web pensada para familias",
        text: "El servicio explicado sin tecnicismos, con contenidos que generan confianza y una solicitud de valoración como paso principal.",
        href: "/servicios#web",
      },
      {
        title: "Gestión de usuarios y seguimiento",
        text: "Fichas, historial y notas de cada persona, accesibles para el equipo que las atiende.",
        href: "/servicios#crm",
      },
      {
        title: "Automatizaciones administrativas",
        text: "Recordatorios, documentos a partir de datos aprobados e informes periódicos sin rehacerlos a mano.",
        href: "/servicios#crm",
      },
      {
        title: "Cobros y facturas claros",
        text: "Facturación rápida y control de pagos pendientes, con los datos listos para el gestor.",
        href: "/servicios#facturacion",
      },
    ],
    projectSlugs: ["antea-salud", "wellnessreal"],
    articleSlugs: [
      "cuando-no-merece-la-pena-software-a-medida",
      "automatizar-tareas-administrativas-pyme",
      "software-vertical-o-medida-como-elegir",
    ],
    faqs: [
      {
        q: "¿Cómo se explica un servicio así a las familias?",
        a: "Con el lenguaje de quien decide, no el de los especialistas: qué recibe la persona, cómo es una sesión y cuál es el siguiente paso. En Antea Salud todo el recorrido termina en una solicitud de valoración.",
      },
      {
        q: "¿Y si no necesito software nuevo?",
        a: "Es una respuesta posible y te la daremos si es la tuya. Simplificar el proceso, automatizar lo que ya existe o integrar tus herramientas pueden resolverlo sin desarrollar nada.",
      },
      FAQ_SIZE,
      FAQ_SUPPORT,
    ],
  },
];

export function getSector(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}

/** Sector al que se enlaza desde un articulo: el primero que lo cita. */
export function sectorForArticle(articleSlug: string): Sector | undefined {
  return sectors.find((s) => s.articleSlugs.includes(articleSlug));
}

export function sectorBySlug(slug: SectorSlug): Sector {
  const sector = getSector(slug);
  if (!sector) throw new Error(`[sectors:sectorBySlug] sector desconocido: ${slug}`);
  return sector;
}
