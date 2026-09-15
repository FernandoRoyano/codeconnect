import type { Article } from "./types";
import { article as tareasAdministrativas } from "./automatizar-tareas-administrativas";
import { article as softwareVertical } from "./software-vertical-o-medida";
import { article as whatsappAgenda } from "./whatsapp-agenda-clinica";
import { article as aiAct } from "./ai-act-bot-whatsapp";
import { article as verifactu } from "./verifactu-calendario-real";
import { article as kitDigital } from "./kit-digital-ia";
import { article as noShows } from "./coste-real-no-shows";
import { article as cincoHerramientas } from "./cinco-herramientas-ia";
import { article as cuandoNo } from "./cuando-no-software-a-medida";

/**
 * Fuente unica de los articulos. El listado y las paginas de detalle salen de
 * aqui, para que una tarjeta no pueda desincronizarse del texto que abre.
 * El primero es el destacado.
 */
export const articles: Article[] = [
  tareasAdministrativas,
  softwareVertical,
  whatsappAgenda,
  aiAct,
  verifactu,
  kitDigital,
  noShows,
  cincoHerramientas,
  cuandoNo,
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function categoryCounts(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const a of articles) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export type { Article, Block, Source } from "./types";
