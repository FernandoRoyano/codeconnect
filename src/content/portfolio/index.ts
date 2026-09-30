import type { Project, ProjectCategory } from "./types";

export type { Project, ProjectCategory, ProjectKind } from "./types";

const CAPTURES = "/images/portfolio/captures";

/**
 * Fuente unica de los proyectos. El orden es el del listado; los tres primeros
 * son los que se destacan en la home.
 */
export const projects: Project[] = [
  {
    slug: "trainhub",
    title: "TrainHub",
    seoTitle: "TrainHub: software para entrenadores y centros",
    metaDescription:
      "Caso TrainHub: plataforma para entrenadores y centros que reúne gestión de clientes, rutinas y cobros en un mismo sitio.",
    sector: "Entrenamiento y gimnasios",
    sectorSlug: "gimnasios",
    category: "software",
    kind: "own",
    badge: "Producto propio · Vendible",
    summary:
      "Producto para entrenadores y centros que reúne gestión de clientes, creación de rutinas y cobros en una misma plataforma.",
    image: "/images/portfolio/trainhub-product.webp",
    captures: { desktop: `${CAPTURES}/trainhub-desktop.webp`, mobile: `${CAPTURES}/trainhub-mobile.webp` },
    technologies: ["Next.js", "React", "TypeScript", "Stripe"],
    url: "https://train-hub-five.vercel.app/",
    context:
      "Un entrenador o un centro pequeño suele repartir su trabajo entre una hoja de cálculo de clientes, rutinas enviadas por mensaje y cobros que se revisan a mano. TrainHub nace para juntar esas tres piezas en un solo producto.",
    scope: [
      "Ficha de cada cliente con su historial en un único sitio.",
      "Creación de rutinas y entrega al cliente desde la propia plataforma.",
      "Cobros con Stripe integrados en el mismo flujo, sin conciliar a mano.",
    ],
  },
  {
    slug: "antea-salud",
    title: "Antea Salud",
    seoTitle: "Antea Salud: web de ejercicio para mayores",
    metaDescription:
      "Caso Antea Salud: web de ejercicio adaptado a domicilio para personas mayores, con información para familias y solicitud de valoración.",
    sector: "Salud y personas mayores",
    sectorSlug: "bienestar",
    category: "web",
    kind: "own",
    badge: "Proyecto propio · Caso real",
    summary:
      "Proyecto de ejercicio adaptado a domicilio para personas mayores, con información para familias, contenidos y solicitud de valoración.",
    image: "/images/portfolio/antea-salud-project.webp",
    captures: { desktop: `${CAPTURES}/antea-salud-desktop.webp`, mobile: `${CAPTURES}/antea-salud-mobile.webp` },
    technologies: ["Next.js", "React", "TypeScript", "CSS Modules"],
    url: "https://anteasalud.com/",
    context:
      "Quien decide contratar ejercicio adaptado para una persona mayor casi nunca es la propia persona, sino su familia. La web tenía que explicar el servicio a ese público y convertir la duda en una primera valoración.",
    scope: [
      "Explicación del servicio pensada para familias, no para especialistas.",
      "Contenidos sobre ejercicio y envejecimiento activo.",
      "Formulario de solicitud de valoración como paso principal.",
    ],
  },
  {
    slug: "diego-royano-nutricionista",
    title: "Diego Royano Nutricionista",
    seoTitle: "Web para nutricionista especializado en digestivo",
    metaDescription:
      "Caso Diego Royano: web profesional para un nutricionista especializado en salud digestiva, con presentación del servicio y reserva de consulta.",
    sector: "Nutrición y consulta privada",
    sectorSlug: "clinicas",
    category: "web",
    kind: "client",
    badge: "Cliente real",
    summary:
      "Web profesional para el nutricionista Diego Royano, centrada en salud digestiva, presentación del servicio y reserva de consulta.",
    image: "/images/portfolio/diego-royano-client.webp",
    captures: { desktop: `${CAPTURES}/diego-royano-desktop.webp`, mobile: `${CAPTURES}/diego-royano-mobile.webp` },
    technologies: ["Next.js", "React", "TypeScript", "CSS"],
    url: "https://patologia-digestiva.vercel.app/",
    context:
      "Un profesional sanitario especializado necesita que el paciente entienda en segundos en qué le puede ayudar y que reservar sea sencillo. La especialización en salud digestiva es el eje de toda la web.",
    scope: [
      "Mensaje centrado en la especialidad: salud digestiva.",
      "Presentación clara del servicio y de cómo es la consulta.",
      "Reserva de consulta accesible desde cualquier punto de la web.",
    ],
  },
  {
    slug: "wellnessreal",
    title: "WellnessReal",
    seoTitle: "WellnessReal: web de entrenamiento online",
    metaDescription:
      "Caso WellnessReal: proyecto de entrenamiento personal online con presentación de servicios, contenidos y recorrido de captación.",
    sector: "Entrenamiento personal online",
    sectorSlug: "gimnasios",
    category: "web",
    kind: "own",
    badge: "Proyecto propio",
    summary:
      "Proyecto base de entrenamiento personal online con presentación de servicios, contenidos y recorrido de captación.",
    image: "/images/portfolio/wellnessreal-project.webp",
    captures: { desktop: `${CAPTURES}/wellnessreal-desktop.webp`, mobile: `${CAPTURES}/wellnessreal-mobile.webp` },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    url: "https://wellnessreal.es/",
    context:
      "El entrenamiento online compite por atención: la web tiene que explicar la propuesta, generar confianza con contenido y llevar al visitante hasta el contacto sin rodeos.",
    scope: [
      "Presentación de los servicios de entrenamiento.",
      "Sección de contenidos para atraer y educar.",
      "Recorrido de captación pensado de principio a fin.",
    ],
  },
  {
    slug: "escapa-cantabria",
    title: "Escapa Cantabria",
    seoTitle: "Escapa Cantabria: web de alquiler de autocaravanas",
    metaDescription:
      "Caso Escapa Cantabria: web de alquiler de autocaravanas con flota, tarifas, contenido informativo y consulta de disponibilidad.",
    sector: "Turismo y alquiler",
    category: "web",
    kind: "client",
    badge: "Cliente real",
    summary:
      "Web de alquiler de autocaravanas en Cantabria con presentación de la flota, tarifas, contenido informativo y consulta de disponibilidad.",
    image: "/images/portfolio/escapa-cantabria-client.webp",
    captures: {
      desktop: `${CAPTURES}/escapa-cantabria-desktop.webp`,
      mobile: `${CAPTURES}/escapa-cantabria-mobile.webp`,
    },
    technologies: ["Next.js", "React", "TypeScript"],
    url: "https://autocaravanasescapacantabria.com/",
    context:
      "En un alquiler, el cliente quiere ver el vehículo, saber cuánto cuesta y comprobar si está libre en sus fechas. La web ordena esa información para que la consulta llegue ya cualificada.",
    scope: [
      "Presentación de la flota de autocaravanas.",
      "Tarifas visibles y contenido informativo sobre el alquiler.",
      "Consulta de disponibilidad como acción principal.",
    ],
  },
  {
    slug: "caniches-con-amor",
    title: "Caniches con Amor",
    seoTitle: "Caniches con Amor: web de asesoría especializada",
    metaDescription:
      "Caso Caniches con Amor: web comercial para una asesoría especializada en caniches, con servicios, comunidad y contacto.",
    sector: "Servicios especializados",
    category: "web",
    kind: "client",
    badge: "Cliente real",
    summary:
      "Web comercial para un servicio de asesoría especializado en caniches, con presentación de servicios, comunidad y contacto.",
    image: "/images/portfolio/caniches-con-amor-client.webp",
    captures: {
      desktop: `${CAPTURES}/caniches-con-amor-desktop.webp`,
      mobile: `${CAPTURES}/caniches-con-amor-mobile.webp`,
    },
    technologies: ["Next.js", "React", "TypeScript"],
    url: "https://canichesconamor.com/",
    context:
      "Un servicio muy de nicho vive de la confianza y de su comunidad. La web presenta la asesoría con cercanía y da peso a la comunidad que la respalda.",
    scope: [
      "Presentación de los servicios de asesoría.",
      "Espacio para la comunidad alrededor del proyecto.",
      "Contacto directo como cierre de cada sección.",
    ],
  },
];

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  web: "Desarrollo Web",
  software: "Software a Medida",
};

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Proyectos que se destacan en la home. */
export const featuredProjects = projects.slice(0, 3);
