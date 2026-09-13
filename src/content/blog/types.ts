/**
 * Los articulos se escriben como bloques tipados en lugar de HTML suelto o MDX.
 * Asi se renderizan con los estilos del sitio, se evita meter una dependencia de
 * markdown solo para seis textos, y no hay forma de colar marcado arbitrario.
 *
 * En los textos se admiten dos marcas en linea: **negrita** y [enlace](url).
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title?: string; text: string }
  | { type: "quote"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type Source = { label: string; url: string };

export type Article = {
  slug: string;
  title: string;
  /** Titulo corto para la tarjeta del listado, si el largo no cabe bien. */
  cardTitle?: string;
  excerpt: string;
  category: string;
  /** ISO. Es la fecha real de publicacion, no una inventada para aparentar. */
  date: string;
  readMinutes: number;
  /** Resumen en una frase para la metadata de buscadores. */
  metaDescription: string;
  /** Lo que sostiene las afirmaciones del articulo. Se publica al final. */
  sources?: Source[];
  body: Block[];
};
