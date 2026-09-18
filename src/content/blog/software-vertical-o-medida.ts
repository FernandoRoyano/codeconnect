import type { Article } from "./types";

export const article: Article = {
  slug: "software-vertical-o-medida-como-elegir",
  image: "/images/blog/software-vertical-o-medida.webp",
  title: "Software vertical o a medida: cómo elegir sin pagar dos veces",
  excerpt:
    "El programa especializado suele ser la mejor primera opción. El desarrollo a medida empieza a tener sentido cuando tu proceso aporta valor y la herramienta te obliga a deformarlo.",
  category: "Guías",
  date: "2026-09-15",
  readMinutes: 8,
  metaDescription:
    "Comparativa práctica entre software vertical y desarrollo a medida: costes ocultos, señales para elegir y una prueba sencilla antes de invertir.",
  sources: [],
  body: [
    {
      type: "p",
      text: "La pregunta suele llegar formulada así: «¿Compro un programa del mercado o encargo uno para mi empresa?». Parece una elección tecnológica, pero en realidad es una decisión sobre qué parte de tu negocio quieres adaptar y cuál quieres proteger.",
    },
    {
      type: "p",
      text: "Mi punto de partida es poco espectacular: si una herramienta existente resuelve bien el problema, úsala. El software a medida no es una medalla; es una inversión que tiene que justificar su mantenimiento.",
    },
    { type: "h2", text: "Qué estás comprando en cada caso" },
    {
      type: "table",
      head: ["Software vertical", "Software a medida"],
      rows: [
        ["Proceso probado para un sector", "Proceso diseñado alrededor de tu operativa"],
        ["Puesta en marcha más rápida", "Descubrimiento y desarrollo previos"],
        ["Coste repartido entre muchos clientes", "Inversión asumida por tu empresa"],
        ["Evolución decidida por el proveedor", "Prioridades decididas contigo"],
        ["Integraciones disponibles de catálogo", "Integraciones construidas según necesidad"],
      ],
    },
    { type: "h2", text: "Cuándo elegir un software vertical" },
    {
      type: "ul",
      items: [
        "Tu necesidad es común en el sector: agenda, facturación, expedientes o inventario.",
        "Puedes adaptar una parte razonable del proceso sin perder una ventaja real.",
        "Necesitas empezar pronto y no quieres asumir un proyecto de desarrollo.",
        "El proveedor permite exportar tus datos y ofrece las integraciones importantes.",
        "La cuota es previsible y el producto tiene soporte suficiente.",
      ],
    },
    {
      type: "p",
      text: "No descartes un producto porque no reproduzca cada pestaña de tu Excel. A veces esa diferencia obliga a simplificar una costumbre que ya no aportaba nada.",
    },
    { type: "h2", text: "Cuándo empieza a encajar el desarrollo a medida" },
    {
      type: "ul",
      items: [
        "Tu proceso es distinto porque sostiene una ventaja del negocio, no por una preferencia personal.",
        "El equipo mantiene varias herramientas unidas a mano y el coste se repite cada semana.",
        "Necesitas reglas, permisos o integraciones que los productos disponibles no ofrecen.",
        "El volumen convierte pequeños errores o minutos perdidos en un coste importante.",
        "Puedes asignar a alguien que tome decisiones y valide el producto durante el proyecto.",
      ],
    },
    {
      type: "callout",
      title: "Una señal bastante fiable",
      text: "Si necesitas desarrollar para evitar cambiar una costumbre, probablemente no compense. Si necesitas desarrollar para dejar de copiar, comprobar y corregir el mismo dato entre varios sistemas, merece estudiarlo.",
    },
    { type: "h2", text: "Los costes que no aparecen en la primera oferta" },
    {
      type: "p",
      text: "En un producto estándar, mira migración, formación, usuarios adicionales, soporte, permanencia y salida de datos. En un desarrollo, añade mantenimiento, alojamiento, copias de seguridad, cambios normativos y evolución.",
    },
    {
      type: "p",
      text: "También existe un coste interno en ambos casos: limpiar información, decidir reglas, probar recorridos y acompañar al equipo. Comprar una licencia no elimina ese trabajo. Encargar software tampoco permite delegar todas las decisiones al proveedor.",
    },
    { type: "h2", text: "La prueba de dos semanas" },
    {
      type: "ol",
      items: [
        "Elige el proceso que quieres mejorar y escribe dónde empieza y termina.",
        "Mide durante dos semanas volumen, tiempo manual, errores y excepciones.",
        "Prueba dos soluciones existentes con casos reales, no con una demo perfecta.",
        "Anota las diferencias entre «no me gusta» y «impide trabajar o crecer».",
        "Calcula cuánto cuesta mantener el proceso actual durante un año.",
      ],
    },
    {
      type: "p",
      text: "Con esos datos puedes comparar alternativas sin enamorarte de una interfaz ni aceptar un presupuesto basado en intuiciones. Y quizá descubras que no necesitas software nuevo, sino conectar mejor lo que ya tienes.",
    },
    {
      type: "p",
      text: "Si todavía dudas, revisa también cuándo no merece la pena desarrollar software a medida. La respuesta correcta puede ser comprar, construir, integrar o no tocar nada todavía.",
    },
    {
      type: "callout",
      title: "Antes de pedir presupuestos",
      text: "Puedo ayudarte a convertir el problema en un mapa de proceso y unos criterios de decisión. Así sabrás qué pedir, qué comparar y qué parte no deberías pagar dos veces.",
    },
  ],
};
