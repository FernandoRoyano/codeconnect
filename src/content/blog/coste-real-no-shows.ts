import type { Article } from "./types";

export const article: Article = {
  slug: "coste-real-no-shows-clinica",
  image: "/images/blog/coste-real-no-shows.webp",
  title: "Los no-shows te cuestan entre 15.000 y 30.000 € al año: cómo calcular tu cifra",
  excerpt:
    "Esa es la media de una clínica española. Pero la tuya no es la media: aquí está el método para medirlo con tu propia agenda antes de comprar ninguna solución.",
  category: "Tendencias",
  date: "2026-09-13",
  readMinutes: 7,
  metaDescription:
    "Una clínica española media pierde entre 15.000 y 30.000 € al año por citas no asistidas. Cómo calcular tu cifra real con tu propia agenda, y qué hacer con ella antes de contratar nada.",
  sources: [
    {
      label: "IA para clínicas y centros médicos: herramientas esenciales 2026",
      url: "https://www.upliora.es/blog/ia-para-clinicas-centros-medicos-herramientas-2026",
    },
    {
      label: "IA para gimnasios: qué automatizar, casos reales y cuánto cuesta",
      url: "https://www.javadex.es/blog/ia-para-gimnasios-automatizar-gestion-precios-2026",
    },
  ],
  body: [
    {
      type: "p",
      text: "Una clínica española media pierde entre **15.000 y 30.000 € al año** en citas a las que nadie se presenta. Es una cifra que circula mucho y que suena convincente.",
    },
    {
      type: "p",
      text: "El problema de esa cifra es que no es la tuya. Y mientras no tengas la tuya, cualquier proveedor puede venderte cualquier cosa apoyándose en la media.",
    },
    {
      type: "p",
      text: "Este artículo no vende nada. Es el método para calcularlo con lo que ya tienes en la agenda, en una tarde.",
    },
    { type: "h2", text: "Los cuatro números que necesitas" },
    {
      type: "p",
      text: "Coge tres meses cerrados, no el mes que mejor te venga. Y saca cuatro datos:",
    },
    {
      type: "ol",
      items: [
        "**Citas totales agendadas** en esos tres meses.",
        "**Citas no asistidas**: nadie vino y nadie avisó.",
        "**Cancelaciones tardías**: avisaron, pero tan encima que el hueco se quedó vacío. Define tú el umbral; en la mayoría de centros son menos de 24 horas.",
        "**Valor medio de una sesión**: lo que factura de media una cita de las tuyas, no la más cara.",
      ],
    },
    {
      type: "callout",
      title: "Por qué las cancelaciones tardías cuentan",
      text: "Mucha gente mide solo el no-show puro y se queda corta. Desde el punto de vista del hueco vacío, una cancelación a dos horas vista y una ausencia sin avisar son lo mismo: nadie ocupó ese espacio y el coste de tener la sala y al profesional ahí ya lo has pagado.",
    },
    { type: "h2", text: "El cálculo" },
    {
      type: "p",
      text: "La cuenta base es deliberadamente simple:",
    },
    {
      type: "quote",
      text: "(no-shows + cancelaciones tardías) × valor medio de sesión × 4 = pérdida anual aproximada",
    },
    {
      type: "p",
      text: "El ×4 convierte el trimestre en año. Un ejemplo con números redondos de un centro de fisioterapia pequeño:",
    },
    {
      type: "table",
      head: ["Concepto", "Trimestre"],
      rows: [
        ["Citas agendadas", "1.200"],
        ["No-shows", "84 (7%)"],
        ["Cancelaciones tardías", "48 (4%)"],
        ["Huecos perdidos", "132"],
        ["Valor medio de sesión", "45 €"],
        ["Pérdida del trimestre", "5.940 €"],
        ["**Pérdida anual estimada**", "**23.760 €**"],
      ],
    },
    {
      type: "p",
      text: "Ese centro está dentro de la horquilla que decía el titular. Pero ahora lo sabe, en lugar de creerlo.",
    },
    { type: "h2", text: "Los dos ajustes que casi todo el mundo se salta" },
    { type: "h3", text: "1. No todo hueco perdido es dinero perdido" },
    {
      type: "p",
      text: "Si tienes lista de espera y rellenas parte de esos huecos, la pérdida real es menor. Mide cuántos de esos 132 huecos se acabaron ocupando. Si rellenas el 30%, tu pérdida no son 23.760 € sino unos 16.600 €.",
    },
    {
      type: "p",
      text: "Este ajuste es importante porque además te dice dónde está tu oportunidad: si rellenas muy pocos, tu problema no es evitar la ausencia, es reaccionar rápido cuando ocurre.",
    },
    { type: "h3", text: "2. El coste no es solo la sesión" },
    {
      type: "p",
      text: "A la cifra anterior hay que sumarle lo que no aparece en ninguna factura: el tiempo de recepción llamando para confirmar, reubicando y rehaciendo el cuadrante. Si alguien dedica media hora al día a eso, son unas 120 horas al año.",
    },
    { type: "h2", text: "Qué hacer con el número, ya que lo tienes" },
    {
      type: "p",
      text: "Ahora tienes un presupuesto máximo racional. Si pierdes 16.600 € al año y una solución te cuesta 3.000 € de implantación más 80 € al mes, la pregunta deja de ser «¿es caro?» y pasa a ser «¿reduce esto al menos un 25% de mis no-shows?». Esa pregunta sí se puede contestar.",
    },
    {
      type: "p",
      text: "Y antes de contratar nada, hay tres cosas que funcionan y no cuestan una implantación:",
    },
    {
      type: "ul",
      items: [
        "**Recordatorio por el canal que la gente lee.** En España, WhatsApp supera el 90% de penetración. Un recordatorio por email que nadie abre no es un recordatorio.",
        "**Confirmación activa.** Pedir una respuesta, aunque sea un «sí», cambia el resultado respecto a un aviso que solo informa.",
        "**Lista de espera avisada.** En cuanto alguien cancela, ofrecer el hueco. Cada plaza recuperada es ingreso que ya dabas por perdido.",
      ],
    },
    {
      type: "callout",
      title: "Cuánto tarda en notarse",
      text: "Los primeros resultados sobre no-shows suelen verse en **uno a tres meses**. Si alguien te promete un cambio la semana que viene, desconfía: hasta que no pasa un ciclo completo de agenda no hay datos suficientes para saber si funciona.",
    },
    { type: "h2", text: "Resumen" },
    {
      type: "ul",
      items: [
        "La media española está entre 15.000 y 30.000 € al año. **La tuya no la sabe nadie hasta que la calculas.**",
        "Cuenta no-shows **y** cancelaciones tardías: el hueco vacío es el mismo.",
        "Ajusta por los huecos que sí rellenas y suma el tiempo de recepción.",
        "El número resultante es tu presupuesto máximo racional para resolverlo.",
        "Empieza por recordatorio en WhatsApp, confirmación activa y lista de espera.",
      ],
    },
    {
      type: "callout",
      title: "Si haces el cálculo y no te cuadra",
      text: "Mándame los cuatro números y te digo qué veo. A veces el problema no son los no-shows, es cómo está montada la agenda, y eso se arregla sin comprar nada.",
    },
  ],
};
