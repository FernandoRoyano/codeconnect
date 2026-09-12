# SEO Skills Pack

Paquete de **4 Anthropic Skills genéricas de SEO** diseñadas para usarse en **cualquier proyecto** (MetaMuSSic, tu web de entrenamiento personal, proyectos de clientes, blogs, e-commerce). No están atadas a un stack — los principios viven en el cuerpo de cada `SKILL.md` y los snippets concretos por framework (Next.js, Astro, WordPress, HTML plano) viven en archivos `references/` que Claude carga solo cuando los necesita.

## Los 4 skills

| Skill | Se dispara cuando… | Cubre |
|---|---|---|
| **`seo-technical`** | Tocas sitemaps, robots, meta tags, schema.org, canonicals, hreflang, Core Web Vitals, velocidad, indexación | La capa de implementación: qué etiquetas, archivos y estructuras necesita un sitio para que los motores lo entiendan |
| **`seo-content`** | Planificas, escribes o revisas contenido para tráfico orgánico: blog posts, landings, FAQs, tutoriales, comparativas | Estrategia editorial: investigación de keywords, intención de búsqueda, topic clusters, estructura de artículos, E-E-A-T, enlazado interno |
| **`seo-local`** | Trabajas con un negocio que atiende una zona geográfica: entrenador personal, restaurante, clínica, tienda local | Google Business Profile, citations, NAP consistency, reviews, local pack, páginas por zona |
| **`seo-audit`** | Te piden "auditar", "revisar", "diagnosticar" un sitio, o investigar una caída de tráfico | Framework de diagnóstico sistemático → informe priorizado accionable |

## Estructura de archivos

```
seo-skills/
├── README.md  (este archivo)
│
├── seo-technical/
│   ├── SKILL.md                              ← principios stack-agnostic
│   └── references/
│       ├── structured-data-snippets.md       ← JSON-LD listos para copiar
│       └── framework-integrations.md         ← Next.js + Astro + WP + HTML
│
├── seo-content/
│   ├── SKILL.md
│   └── references/
│       ├── article-brief-template.md         ← brief rellenable por artículo
│       └── serp-analysis-checklist.md        ← cómo leer la SERP antes de escribir
│
├── seo-local/
│   ├── SKILL.md
│   └── references/
│       └── local-seo-audit-checklist.md      ← 40 puntos para auditar un local
│
└── seo-audit/
    ├── SKILL.md
    └── references/
        └── audit-report-template.md          ← plantilla rellenable del informe
```

## Por qué "principios en el cuerpo + snippets en references/"

Los skills se cargan cuando su `description` matchea el contexto. Si metes 400 líneas de código Next.js dentro del `SKILL.md`, todo eso se come tu contexto aunque el proyecto sea WordPress. Solución:

- **`SKILL.md`** (siempre cargado cuando se dispara) → principios, reglas, checklists, mental models — válidos para cualquier stack
- **`references/*.md`** (cargado bajo demanda cuando Claude los necesita) → snippets concretos, plantillas, ejemplos por framework

Así un skill pesa ligero en contexto pero tiene munición cuando la tarea lo pide.

## Cómo instalarlos

### Claude Code

Descomprime el zip en `.claude/skills/` (o la ruta que uses para skills globales de usuario). Claude Code detecta los 4 skills automáticamente y los dispara cuando el contexto tira de sus triggers.

### Uso global (todos tus proyectos)

Ponlos en tu carpeta global de skills de usuario (en lugar de por-repo). Así estarán disponibles en cualquier sesión, cualquier proyecto.

### Claude.ai

Subir los `SKILL.md` al Project Knowledge de un proyecto específico, o mantenerlos como documentación canónica consultable.

## Cómo combinarlos con skills específicos de proyecto

Tu planteamiento (skills genéricos + skills específicos por proyecto) es el correcto. Ejemplos:

- **MetaMuSSic** → los 4 skills SEO genéricos + el pack `metamussic-skills` (data model, business rules, RBAC, etc.)
- **Web de entrenamiento personal** → los 4 skills SEO + un skill `pt-madrid-business` con tus servicios, zonas, tono de voz, tu bio profesional
- **Proyecto cliente** → los 4 skills SEO + un skill `cliente-X-context` con su negocio, competencia directa, goals

Los skills genéricos traen el conocimiento SEO universal. Los skills específicos traen el **contexto de negocio** que hace que las recomendaciones sean accionables y no genéricas.

## Orden de lectura sugerido

Si quieres entender el pack de principio a fin:

1. **`seo-technical`** — la base; sin esto, nada rankea
2. **`seo-content`** — qué escribir una vez la base técnica está sana
3. **`seo-local`** — capa extra para negocios con presencia geográfica
4. **`seo-audit`** — cómo evaluar un sitio existente y decidir dónde invertir

## Mantenimiento

- Los fundamentos de SEO cambian despacio (meses/años). No edites los skills cada vez que haya una noticia nueva.
- Google cambia algoritmos, pero los principios (satisfacer la intención, hacer el sitio crawlable, ser confiable) son estables.
- Edita un skill solo cuando:
  - Cambie una API/herramienta referenciada (ej. Google Business Profile migró a Merchant Center)
  - Se deprecate una técnica (ej. `rel=next/prev` ya no se usa)
  - Añadas un framework nuevo a tu stack (ej. meter snippets de SvelteKit en `framework-integrations.md`)

## Disclaimer honesto

- El SEO **no es una ciencia exacta**. Los skills codifican consenso profesional y las recomendaciones oficiales de Google, no garantías.
- El SEO **tarda**. Expectativas realistas: cambios técnicos P0 visibles en 2–6 semanas; cambios de contenido en 3–6 meses; efectos de link building en 6–12 meses.
- **Contenido + producto > trucos técnicos**. Un sitio malo con SEO perfecto pierde contra un sitio excelente con SEO promedio.
