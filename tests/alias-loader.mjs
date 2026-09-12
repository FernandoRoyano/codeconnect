// Resuelve los imports "@/..." igual que tsconfig, para poder ejecutar los
// modulos de src/ con el runner de Node sin anadir dependencias.
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SRC = path.resolve(process.cwd(), "src");

export function resolve(specifier, context, next) {
  if (!specifier.startsWith("@/")) return next(specifier, context);

  const base = path.join(SRC, specifier.slice(2));
  const candidate = [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")].find(existsSync);
  if (!candidate) return next(specifier, context);

  return next(pathToFileURL(candidate).href, context);
}
