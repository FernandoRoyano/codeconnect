import type { Article } from "./types";

export const article: Article = {
  slug: "verifactu-calendario-real-2027",
  image: "/images/blog/verifactu-calendario-real.webp",
  title: "Verifactu no entra en 2026: el calendario real y por qué te lo venden con prisa",
  excerpt:
    "Sociedades el 1 de enero de 2027, autónomos el 1 de julio. La factura electrónica B2B, en octubre de 2027. Lo que llevas oyendo desde hace un año no cuadra con el BOE.",
  category: "Legal",
  date: "2026-08-27",
  readMinutes: 8,
  metaDescription:
    "El calendario real de Verifactu tras el RDL 15/2025: 1 de enero de 2027 para sociedades y 1 de julio para autónomos. Qué exige de verdad al software de facturación y cómo distinguir una urgencia real de una comercial.",
  sources: [
    { label: "Plazos de Verifactu: calendario y fechas límite", url: "https://www.verifactu.com/plazos-verifactu/" },
    { label: "VeriFactu 2027: guía para autónomos y pymes", url: "https://billivo.com/verifactu-2027-guia-autonomos-pymes/" },
    {
      label: "Software homologado para VeriFactu: qué es y cómo elegirlo",
      url: "https://www.verifactu.com/software-homologado-verifactu/",
    },
  ],
  body: [
    {
      type: "p",
      text: "Llevo un año viendo llegar el mismo correo a clientes distintos: «Tu software no cumple Verifactu, tienes que migrar ya, la multa es de 50.000 €». Suele venir con una fecha inminente y un enlace para contratar.",
    },
    {
      type: "p",
      text: "La multa existe. La obligación existe. La prisa, en la mayoría de los casos, no.",
    },
    { type: "h2", text: "Las fechas que están hoy en vigor" },
    {
      type: "table",
      head: ["Quién", "Desde cuándo"],
      rows: [
        ["Sociedades (Impuesto de Sociedades)", "1 de enero de 2027"],
        ["Autónomos y demás obligados", "1 de julio de 2027"],
        ["Factura electrónica B2B obligatoria", "1 de octubre de 2027 (según desarrollo reglamentario)"],
      ],
    },
    {
      type: "p",
      text: "El aplazamiento lo trajo el Real Decreto-ley 15/2025, publicado a finales de 2025. El motivo que se dio es razonable: hacer que Verifactu y la factura electrónica obligatoria no cayeran con meses de diferencia, para que un autónomo no tuviera que cambiar de sistema dos veces en el mismo año.",
    },
    {
      type: "callout",
      title: "Cuidado con el detalle",
      text: "Que la obligación empiece en 2027 no significa que puedas comprar el software en diciembre de 2026. Significa que **tu facturación tiene que salir conforme desde el primer día del periodo**. Si tu ejercicio arranca el 1 de enero, la migración tiene que estar hecha y probada antes, no ese mismo día.",
    },
    { type: "h2", text: "Qué exige Verifactu de verdad" },
    {
      type: "p",
      text: "Verifactu no es un portal al que te das de alta ni una aplicación que instalas aparte. Es un conjunto de requisitos técnicos, fijados en el Real Decreto 1007/2023, que tiene que cumplir el programa con el que facturas. Son cuatro cosas:",
    },
    {
      type: "ol",
      items: [
        "**Registro de facturación por cada factura.** Cada vez que emites una, el sistema genera un registro electrónico con los datos de la operación.",
        "**Encadenamiento por huella.** Cada registro incorpora una huella digital derivada del registro anterior. Si alguien altera una factura del pasado, la cadena deja de cuadrar y se nota.",
        "**Código QR en la factura.** Permite a quien la recibe verificar su autenticidad en la sede electrónica de la Agencia Tributaria.",
        "**Remisión a la AEAT.** En la modalidad Verifactu propiamente dicha, el software envía una copia de cada registro a Hacienda en el momento de emitir.",
      ],
    },
    {
      type: "p",
      text: "Ese último punto tiene una alternativa que casi nadie menciona: el reglamento contempla también los **sistemas no verificables**, que no remiten en tiempo real pero a cambio deben conservar los registros con requisitos más estrictos de integridad y trazabilidad. La mayoría de las pymes acabará en la modalidad Verifactu porque es la más sencilla de operar, pero no es la única vía legal.",
    },
    { type: "h2", text: "Las sanciones, con su letra pequeña" },
    {
      type: "p",
      text: "Las cifras que circulan son reales, pero conviene saber a quién se aplican:",
    },
    {
      type: "ul",
      items: [
        "Hasta **50.000 € por ejercicio** para quien use un sistema que no cumple.",
        "Hasta **150.000 € por ejercicio y por modalidad de software** para el fabricante que comercialice un sistema no conforme.",
      ],
    },
    {
      type: "p",
      text: "Fíjate en que la sanción más alta no es para ti, es para quien te vende el programa. Eso tiene una consecuencia práctica muy concreta: la responsabilidad de que el software cumpla es del fabricante, y tú deberías exigirle por escrito la declaración responsable de conformidad. Si un proveedor te mete prisa pero no te da ese documento, algo no encaja.",
    },
    { type: "h2", text: "Cómo distinguir una urgencia real de una comercial" },
    {
      type: "p",
      text: "Cuatro preguntas que puedes hacerle a cualquiera que te esté presionando:",
    },
    {
      type: "ol",
      items: [
        "**¿En qué fecha exacta me obliga a mí, según mi forma jurídica?** Si no distingue entre sociedad y autónomo, no conoce la norma.",
        "**¿Me entregas la declaración responsable de conformidad?** Es un requisito del fabricante, no un extra.",
        "**¿Qué pasa con mi histórico?** Migrar facturación sin plan para los datos anteriores es la parte que de verdad duele.",
        "**¿Verifactu o sistema no verificable?** Si no sabe que existen las dos modalidades, está vendiendo, no asesorando.",
      ],
    },
    { type: "h2", text: "Qué haría yo entre ahora y 2027" },
    {
      type: "p",
      text: "No migrar corriendo. Tienes más de un año, y ese año es exactamente lo que necesitas para hacerlo bien:",
    },
    {
      type: "ul",
      items: [
        "**Ahora:** averigua con qué facturas realmente. En muchos centros conviven el programa oficial, un Excel para los bonos y facturas sueltas hechas a mano. Verifactu afecta a todo eso.",
        "**Antes de fin de año:** pídele a tu proveedor actual su hoja de ruta por escrito. La mayoría de los programas serios ya la tienen. Si el tuyo no contesta, esa es tu respuesta.",
        "**Primer semestre de 2026:** si hay que cambiar, cambia con calma y con el histórico migrado y verificado.",
        "**Segundo semestre:** funciona en paralelo un par de meses antes de la fecha que te aplique.",
      ],
    },
    {
      type: "p",
      text: "Y una observación que quizá no esperas de alguien que desarrolla software de facturación: si tu programa actual va a cumplir, **no cambies**. Migrar facturación es de las operaciones más molestas que existen en una pyme y no se hace por gusto.",
    },
    { type: "h2", text: "Resumen" },
    {
      type: "ul",
      items: [
        "Sociedades desde el **1 de enero de 2027**, autónomos desde el **1 de julio de 2027**.",
        "La factura electrónica B2B va por separado, hacia octubre de 2027.",
        "Verifactu es un requisito de tu software, no un trámite que hagas tú.",
        "La sanción mayor recae en el fabricante: exígele la declaración de conformidad.",
        "Tienes tiempo. Úsalo para migrar bien, no para migrar rápido.",
      ],
    },
    {
      type: "callout",
      title: "Si no sabes si tu programa va a cumplir",
      text: "Cuéntame con qué facturas hoy y en qué estado tienes el histórico. Te digo si tienes un problema real o te están metiendo prisa. Si tu sistema actual sirve, te diré que no cambies.",
    },
  ],
};
