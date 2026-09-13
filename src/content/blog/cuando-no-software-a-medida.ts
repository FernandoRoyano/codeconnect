import type { Article } from "./types";

export const article: Article = {
  slug: "cuando-no-merece-la-pena-software-a-medida",
  image: "/images/blog/cuando-no-software-a-medida.webp",
  title: "Cuándo NO merece la pena desarrollar software a medida",
  excerpt:
    "Simplificar el proceso, automatizar, integrar lo que ya tienes, desarrollar, o no hacer nada. Cinco conclusiones posibles y cómo distinguir cuál es la tuya.",
  category: "Guías",
  date: "2026-09-13",
  readMinutes: 8,
  metaDescription:
    "Desarrollar a medida es la respuesta correcta menos veces de lo que parece. Las cinco conclusiones posibles ante un proceso que no funciona y cómo saber cuál te toca antes de gastar dinero.",
  body: [
    {
      type: "p",
      text: "Vivo de desarrollar software a medida, así que este artículo juega en mi contra. Lo escribo igualmente, porque los peores proyectos en los que he estado tenían todos el mismo origen: alguien decidió que necesitaba software antes de entender qué le estaba pasando.",
    },
    {
      type: "p",
      text: "Cuando alguien me cuenta un problema, hay cinco conclusiones posibles. Solo una de las cinco es «hay que desarrollar algo».",
    },
    { type: "h2", text: "1. Basta con simplificar el proceso" },
    {
      type: "p",
      text: "Es la conclusión más frecuente y la que menos gusta escuchar, porque implica que el problema no era técnico.",
    },
    {
      type: "p",
      text: "Señales de que estás aquí:",
    },
    {
      type: "ul",
      items: [
        "El proceso tiene pasos que nadie sabe explicar por qué existen. «Siempre se ha hecho así.»",
        "Hay validaciones dobles: alguien comprueba lo que otra persona ya comprobó.",
        "Se pide información que luego no se usa para nada.",
        "El cuello de botella es una única persona que tiene que aprobar algo.",
      ],
    },
    {
      type: "p",
      text: "Automatizar un proceso con pasos inútiles te da lo mismo que tenías, más rápido y por 8.000 €. Los pasos inútiles siguen ahí, ahora en código y más difíciles de quitar.",
    },
    {
      type: "callout",
      title: "La prueba del folio",
      text: "Escribe el proceso paso a paso. Tacha cada paso y pregúntate qué se rompería exactamente si desapareciera. Si no sabes contestar, ese paso es candidato a desaparecer. He visto procesos de once pasos quedarse en cuatro sin tocar una línea de código.",
    },
    { type: "h2", text: "2. Se resuelve automatizando lo que ya existe" },
    {
      type: "p",
      text: "El proceso está bien, pero alguien lo ejecuta a mano cada día. Recordatorios que se mandan uno a uno, informes que se montan copiando celdas, correos de seguimiento escritos de cero cada vez.",
    },
    {
      type: "p",
      text: "Estás aquí si la tarea es **repetitiva, con reglas claras y sin excepciones constantes**. Ese último punto es el filtro de verdad: si cada caso tiene su matiz, no es automatizable todavía, es que el proceso no está definido. Vuelve al punto 1.",
    },
    { type: "h2", text: "3. Hay que integrar lo que ya tienes" },
    {
      type: "p",
      text: "Tienes las herramientas correctas pero no se hablan entre ellas. Alguien copia datos de una pantalla a otra varias veces al día.",
    },
    {
      type: "p",
      text: "Este es el caso donde el retorno suele ser más claro y el coste más bajo de los tres primeros. Conectar dos sistemas que ya funcionan es bastante menos trabajo que construir uno nuevo, y el equipo no tiene que aprender nada: siguen usando lo de siempre.",
    },
    {
      type: "p",
      text: "El riesgo aquí es distinto: dependes de que ambas herramientas permitan integrarse. Antes de prometer nada hay que comprobar que existe una API razonable en las dos puntas. Si una de ellas es un programa cerrado de hace quince años, la integración puede salir más cara que empezar de nuevo.",
    },
    { type: "h2", text: "4. Sí, toca desarrollar" },
    {
      type: "p",
      text: "Llegas aquí cuando se cumplen **todas** estas condiciones, no algunas:",
    },
    {
      type: "ol",
      items: [
        "El proceso ya está simplificado y sigue doliendo.",
        "No existe una herramienta de mercado que lo cubra, y lo has comprobado de verdad, no de oídas.",
        "Lo que te diferencia de la competencia está precisamente en ese proceso.",
        "El volumen justifica la inversión: haces esto muchas veces, no tres al mes.",
        "Vas a poder mantenerlo. Un desarrollo a medida no se acaba el día que se entrega.",
      ],
    },
    {
      type: "p",
      text: "La condición 3 es la que más gente se salta. Si tu proceso de facturación es idéntico al de cualquier otro centro, desarrollar tu propio programa de facturación es pagar por reinventar algo que ya existe y que además tiene que cumplir Verifactu. En cambio, si tu forma de organizar los bonos de sesiones es tuya y es parte de por qué la gente repite, ahí sí hay algo que ninguna herramienta estándar te va a dar.",
    },
    { type: "h2", text: "5. No merece la pena hacer nada" },
    {
      type: "p",
      text: "Existe, y es una conclusión legítima.",
    },
    {
      type: "p",
      text: "Si el proceso te cuesta dos horas al mes, resolverlo cuesta 6.000 € y el ahorro anual son 900 €, la respuesta es no hacer nada. No porque no se pueda, sino porque tu dinero rinde más en otro sitio.",
    },
    {
      type: "p",
      text: "La forma rápida de verlo: divide el coste de la solución entre el ahorro anual. Si el resultado pasa de tres años, casi siempre hay una prioridad mejor. Y si el proceso que te molesta lo ejecutas cuatro veces al año, por muy irritante que sea, no es ahí donde está tu problema.",
    },
    { type: "h2", text: "Cómo saber en cuál estás" },
    {
      type: "p",
      text: "Cuatro preguntas, por este orden. El orden importa: cada una filtra a la siguiente.",
    },
    {
      type: "table",
      head: ["Pregunta", "Si la respuesta es sí"],
      rows: [
        ["¿Hay pasos que no sabes justificar?", "Simplifica primero (1)"],
        ["¿Es repetitivo y sin excepciones?", "Automatiza (2)"],
        ["¿Copiáis datos entre programas?", "Integra (3)"],
        ["¿Es un proceso que te diferencia?", "Desarrolla (4)"],
      ],
    },
    {
      type: "p",
      text: "Si has llegado al final sin ningún sí, estás en el 5. Y eso también es una respuesta útil: te ahorra el dinero y la decepción.",
    },
    { type: "h2", text: "Por qué te cuento esto" },
    {
      type: "p",
      text: "Porque un proyecto que no debería haberse hecho acaba mal para las dos partes. El cliente paga algo que no usa y yo me quedo con un desarrollo que nadie mantiene y una recomendación que nunca llega.",
    },
    {
      type: "p",
      text: "Prefiero decir «esto no lo desarrolles» tres veces y que la cuarta me llames con algo que sí tiene sentido.",
    },
    { type: "h2", text: "Resumen" },
    {
      type: "ul",
      items: [
        "Cinco conclusiones posibles: simplificar, automatizar, integrar, desarrollar o no hacer nada.",
        "Solo una implica escribir código.",
        "Automatizar un proceso mal diseñado te da el mismo lío, más rápido.",
        "Desarrolla solo si el proceso te diferencia **y** se cumplen las otras cuatro condiciones.",
        "Si el retorno pasa de tres años, hay una prioridad mejor.",
      ],
    },
    {
      type: "callout",
      title: "Si no sabes en cuál estás",
      text: "Para eso está el diagnóstico: me cuentas cómo funciona hoy tu proceso y qué te está costando, y te digo cuál de las cinco es la tuya y por qué. Si es la quinta, te lo digo igual.",
    },
  ],
};
