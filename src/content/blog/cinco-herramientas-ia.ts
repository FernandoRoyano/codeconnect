import type { Article } from "./types";

export const article: Article = {
  slug: "cinco-herramientas-ia-no-son-operativa",
  image: "/images/blog/cinco-herramientas-ia.webp",
  title: "Cinco herramientas de IA sueltas no son una operativa",
  seoTitle: "Cinco herramientas de IA no son operativa",
  excerpt:
    "El negocio medio que usa IA maneja ya cinco herramientas distintas. Cuando ninguna se habla con las demás, acabas copiando los mismos datos a mano en cinco sitios en vez de en tres.",
  category: "Tendencias",
  date: "2026-06-25",
  readMinutes: 7,
  metaDescription:
    "La pyme que usa IA maneja ya una mediana de cinco herramientas. Por qué adoptar IA por piezas sueltas multiplica el trabajo manual en lugar de reducirlo, y cómo salir de ahí.",
  sources: [
    { label: "The State of AI Within SMBs in 2026 — Upwork", url: "https://www.upwork.com/resources/state-of-ai-in-smbs" },
    {
      label: "AI Adoption Statistics for Small Businesses: 2026",
      url: "https://stealthagents.com/research/ai-adoption-statistics-small-businesses",
    },
  ],
  body: [
    {
      type: "p",
      text: "La adopción de IA en pymes ha dejado de ser una promesa. En empresas de 10 a 100 empleados pasó del 47% al 68% en un solo año, y a mediados de 2025 la Reserva Federal detectó algo que no había ocurrido antes: las pequeñas empresas estaban adoptando IA **más rápido** que las grandes.",
    },
    {
      type: "p",
      text: "Hay otro dato de esa misma oleada que se comenta mucho menos, y que explica por qué tanta gente ha adoptado IA sin notar la mejora: el negocio típico que usa IA maneja ya una **mediana de cinco herramientas distintas**.",
    },
    { type: "h2", text: "Cómo se llega a cinco herramientas sin darse cuenta" },
    {
      type: "p",
      text: "Nadie decide un lunes montar cinco sistemas. Se llega así:",
    },
    {
      type: "ol",
      items: [
        "Empiezas usando un asistente para redactar correos y textos. Funciona.",
        "Contratas un bot para que conteste el WhatsApp fuera de horario. También funciona.",
        "Añades una herramienta de reservas online porque la agenda por teléfono te está comiendo.",
        "Pruebas algo para generar publicaciones de redes.",
        "Y un quinto sistema para facturar, porque el anterior no cumplía.",
      ],
    },
    {
      type: "p",
      text: "Cada decisión, por separado, fue razonable. El problema no es ninguna de las cinco. El problema es lo que hay entre ellas.",
    },
    { type: "h2", text: "El coste que nadie apunta: las costuras" },
    {
      type: "p",
      text: "Un ejemplo real de recorrido en un centro con este montaje:",
    },
    {
      type: "p",
      text: "Alguien escribe por WhatsApp pidiendo cita. El bot contesta y recoge los datos. Recepción lee la conversación y **copia el nombre y el teléfono** a la herramienta de reservas. Cuando la persona viene, alguien **vuelve a escribir sus datos** en el programa de facturación. Si más adelante quieres saber cuántos pacientes vinieron de WhatsApp este mes, no lo sabe nadie: esa información se quedó en un chat.",
    },
    {
      type: "p",
      text: "Has automatizado tres tareas y has creado dos transcripciones manuales nuevas. El saldo puede ser incluso negativo.",
    },
    {
      type: "callout",
      title: "La señal de alarma",
      text: "Si al implantar una herramienta nueva tu equipo tiene que **copiar datos de una pantalla a otra**, no has automatizado un proceso. Has añadido una pieza a [una cadena que sigue siendo manual en las junturas](/servicios).",
    },
    { type: "h2", text: "Los tres síntomas" },
    { type: "h3", text: "1. La misma persona existe cinco veces" },
    {
      type: "p",
      text: "Con cinco fichas distintas, ninguna completa. Cuando alguien pregunta «¿este paciente cuántas sesiones lleva?», la respuesta depende de en qué sistema mires.",
    },
    { type: "h3", text: "2. Nadie sabe contestar preguntas de negocio" },
    {
      type: "p",
      text: "¿Cuántos clientes nuevos entraron por el chat? ¿Cuánto vale de media un socio que viene por recomendación? Son preguntas que deberían contestarse en dos minutos y que en un montaje fragmentado no se contestan, porque cada mitad del dato está en un sitio distinto.",
    },
    { type: "h3", text: "3. El equipo ha desarrollado rutinas de supervivencia" },
    {
      type: "p",
      text: "El Excel paralelo. La libreta que sigue en el mostrador «por si acaso». El grupo de WhatsApp interno donde se avisan de lo que el sistema no recoge. Esas rutinas no son resistencia al cambio: son la prueba de que las herramientas no cubren el proceso real.",
    },
    { type: "h2", text: "Y el problema añadido, que es humano" },
    {
      type: "p",
      text: "Las pymes tienen bastante más dificultad que las grandes empresas en la parte humana de la adopción: resistencia del equipo y necesidad de formación. Con una herramienta, formas a la gente una vez. Con cinco, formas cinco veces, y cada una tiene su lógica, su vocabulario y sus manías.",
    },
    {
      type: "p",
      text: "Cuando alguien del equipo dice «es que era más rápido como lo hacíamos antes», muy a menudo tiene razón. Y conviene escucharlo en vez de tomárselo como un obstáculo.",
    },
    { type: "h2", text: "Cómo se sale de ahí" },
    {
      type: "p",
      text: "No tirando las cinco herramientas. Eso es caro y casi siempre innecesario. Se sale mirando el proceso antes que el catálogo:",
    },
    {
      type: "ol",
      items: [
        "**Dibuja el recorrido completo de una persona**, desde que te escribe hasta que paga. En un folio, con flechas.",
        "**Marca cada punto donde alguien copia datos a mano.** Esas son tus costuras.",
        "**Cuenta cuántas veces aparece el mismo dato** en el dibujo. Si el teléfono de un paciente aparece tres veces, tienes tres sitios donde puede estar mal.",
        "**Ataca la costura más cara, no la más fácil.** Suele ser la que está entre captación y agenda.",
      ],
    },
    {
      type: "p",
      text: "A veces la solución es integrar dos herramientas que ya tienes. A veces es eliminar una. A veces es sustituir tres por una. Y a veces, la respuesta honesta es que el proceso está bien y lo que sobra es una herramienta que se contrató por curiosidad.",
    },
    { type: "h2", text: "Resumen" },
    {
      type: "ul",
      items: [
        "La adopción de IA en pymes pasó del 47% al 68% en un año.",
        "El negocio medio que usa IA maneja ya **cinco herramientas**.",
        "El coste no está en las herramientas, está en las costuras entre ellas.",
        "Síntomas: fichas duplicadas, preguntas de negocio sin respuesta y Excels paralelos.",
        "Se arregla mirando el proceso completo, no comprando la sexta herramienta.",
      ],
    },
    {
      type: "callout",
      title: "Si te has reconocido",
      text: "Cuéntame qué herramientas usáis y por dónde pasa un cliente desde que os escribe. Te digo dónde están las costuras y cuáles compensa coser. Si la respuesta es que sobra una herramienta en vez de faltar otra, te lo diré.",
    },
  ],
};
