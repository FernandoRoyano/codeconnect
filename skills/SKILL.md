---
name: seo-technical
description: Technical SEO implementation — sitemaps, robots.txt, meta tags, Open Graph, canonicals, hreflang, schema.org structured data, Core Web Vitals, crawlability, indexation, and page speed. Use this skill whenever you build, audit, or modify anything that affects how search engines crawl and understand a site. Trigger on mentions of sitemap, robots, meta description, Open Graph, Twitter Card, canonical, hreflang, structured data, schema.org, JSON-LD, Core Web Vitals, LCP, CLS, INP, Lighthouse, PageSpeed, indexing, noindex, crawl budget, redirects, 301, 302, page title, `<head>`, SEO tags, organic traffic, Google Search Console, or whenever a new page is added that needs to be findable. Also trigger when someone proposes something that could hurt SEO (infinite scroll without pagination, client-side-only rendering of public content, URLs with query params for canonical content). Covers every stack — specific snippets live in references/ loaded on demand.
---

# Technical SEO — Implementation Playbook

This skill covers the implementation layer: what tags, files, and structures a site needs so search engines can crawl, understand, and rank it. Strategy and keyword selection live in `seo-content`; this skill is about execution.

## The mental model

Search engines do three things in order: **crawl** (find pages), **index** (understand pages), **rank** (decide relevance). Technical SEO removes obstacles at each stage. If any stage breaks, the rest doesn't matter — a brilliantly written article on a page blocked by `robots.txt` doesn't exist to Google.

## The non-negotiable baseline (every site, every project)

Before worrying about advanced tactics, a site must have:

1. **Server-rendered HTML for public pages.** Content that matters for SEO must exist in the initial HTML response — not loaded via JavaScript after page load. If a page needs JS to render its main content, Google may still index it eventually, but it will be slower, less reliable, and worse at ranking than SSR/SSG equivalents.
2. **Clean, stable URLs.** Lowercase, hyphens not underscores, no session IDs, no tracking params in canonical URLs, no trailing slashes inconsistency (pick one and stick with it).
3. **One canonical per page.** A `<link rel="canonical">` pointing to the preferred URL for each piece of content. Duplicates without a canonical split ranking signal.
4. **`<title>` and `<meta name="description">` unique per page.** Never boilerplate, never missing, never truncated.
5. **`robots.txt`** at the root, permissive by default for public content, blocking `/admin`, `/api`, staging environments.
6. **`sitemap.xml`** listing canonical URLs, submitted to Google Search Console.
7. **HTTPS only.** HTTP must 301 to HTTPS.
8. **Mobile-friendly.** Responsive layout, readable without zoom, tap targets not cramped.

If any of those eight are missing, fix them before touching anything else. Everything further down is optimization on top of the baseline.

## `<head>` tag checklist (per-page)

Every public page needs, in `<head>`:

```html
<!-- Essentials -->
<title>Page-specific title (~50-60 chars)</title>
<meta name="description" content="Page-specific description (~150-160 chars)">
<link rel="canonical" href="https://domain.com/canonical-path">

<!-- Language / locale -->
<html lang="es">  <!-- Set on <html>, not <head>, but critical -->
<link rel="alternate" hreflang="es" href="https://domain.com/es/path">
<link rel="alternate" hreflang="en" href="https://domain.com/en/path">
<link rel="alternate" hreflang="x-default" href="https://domain.com/en/path">

<!-- Open Graph (for social shares) -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://domain.com/og-image.jpg">
<meta property="og:url" content="https://domain.com/canonical-path">
<meta property="og:type" content="article">  <!-- or "website" -->
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="es_ES">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://domain.com/og-image.jpg">

<!-- Optional: only if you want to control indexing explicitly -->
<meta name="robots" content="index, follow">
```

Rules:
- `title` and `meta description` should be unique per page. Templated defaults ("Home | Site Name" on every page) is an SEO anti-pattern.
- `og:image` ideal size: 1200×630 px, under 5 MB, JPG or PNG.
- If a page shouldn't be indexed (search results, user dashboards, thank-you pages), use `<meta name="robots" content="noindex, follow">`. Don't block it in `robots.txt` — Google needs to crawl the page to see the `noindex`.
- Canonical must be absolute URL, not relative.

## Structured data (schema.org)

Structured data is how you tell search engines what a page *is*. It enables rich results (star ratings, recipe cards, FAQ accordions in SERPs).

The right schema depends on content type:

| Content type | Schema |
|---|---|
| Article / blog post | `Article` or `BlogPosting` |
| Product | `Product` with `AggregateRating`, `Offer` |
| Event | `Event` |
| Local business | `LocalBusiness` (see `seo-local` skill) |
| FAQ page | `FAQPage` |
| How-to guide | `HowTo` |
| Recipe | `Recipe` |
| Video | `VideoObject` |
| Course | `Course` |
| Person / creator profile | `Person` |
| Organization (homepage) | `Organization` with `logo`, `sameAs` for social profiles |
| Breadcrumb navigation | `BreadcrumbList` |
| Search functionality | `WebSite` with `SearchAction` |

Always use **JSON-LD** format (not Microdata or RDFa). Place inside `<head>` or at end of `<body>`.

Minimum viable Article schema:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Exact article title",
  "description": "Same as meta description or richer version",
  "image": "https://domain.com/featured-image.jpg",
  "datePublished": "2026-01-15T08:00:00+01:00",
  "dateModified": "2026-02-03T10:30:00+01:00",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://domain.com/author/author-slug"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Site Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://domain.com/logo.png"
    }
  }
}
</script>
```

After adding structured data, validate with: https://validator.schema.org/ and https://search.google.com/test/rich-results

For framework-specific examples (Next.js, Astro, WordPress), see `references/structured-data-snippets.md`.

## `sitemap.xml`

Rules:
- List only canonical URLs, only indexable pages, only 200-status pages.
- Keep under 50,000 URLs and 50 MB per file; split with a sitemap index if larger.
- Include `<lastmod>` — it helps Google prioritize re-crawl.
- `<changefreq>` and `<priority>` are mostly ignored by Google now; don't agonize over them.
- For multilingual sites, use `<xhtml:link rel="alternate" hreflang="...">` inside each `<url>` entry.
- Submit the sitemap URL in Google Search Console and Bing Webmaster Tools.
- Reference the sitemap from `robots.txt`: `Sitemap: https://domain.com/sitemap.xml`.

## `robots.txt`

Minimum useful version:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /*?*utm_source=   # block URLs with tracking params being indexed

Sitemap: https://domain.com/sitemap.xml
```

Common mistakes:
- Blocking `/` during staging and forgetting to unblock at launch (catastrophic)
- Blocking JS/CSS files — Google needs them to render the page
- Using `robots.txt` to hide a page that has `noindex`: the two conflict. If you want something not indexed, use `noindex` meta tag and leave crawling open so Google can see it.

## URL structure

- Human-readable: `/articles/how-to-release-music-independently` not `/p?id=4821`
- Hyphens, not underscores or spaces
- Lowercase
- Short when possible, but descriptive over cryptic
- Include the primary keyword naturally, don't stuff
- Consistent depth — avoid 6-level hierarchies
- `/category/subcategory/post-slug` is fine; `/blog/2026/01/15/post-slug` bakes dates into URLs that hurt when you update content

## Redirects

- Permanent moves: **301** (passes ranking signal)
- Temporary: **302** (does not pass signal — use only when truly temporary)
- Never chain redirects (A → B → C). One hop only.
- After a site migration, redirect every old URL to its closest new equivalent, not all to homepage.
- Maintain redirects forever. Removing a working 301 three years later breaks links pointing to old URLs.

## Core Web Vitals (the performance metrics Google ranks on)

Three metrics matter:

| Metric | What it measures | Good threshold |
|---|---|---|
| **LCP** (Largest Contentful Paint) | When the main content visually loads | < 2.5s |
| **CLS** (Cumulative Layout Shift) | How much the page jumps around while loading | < 0.1 |
| **INP** (Interaction to Next Paint) | How fast the page responds to clicks/taps | < 200ms |

Common fixes, in order of impact:
1. Optimize images — modern formats (WebP, AVIF), correct dimensions, lazy-load below the fold, use `srcset` for responsive
2. Preload critical assets (hero image, main font) with `<link rel="preload">`
3. Defer non-critical JS with `async`/`defer`
4. Reserve space for dynamic elements (images, ads, embeds) with explicit `width`/`height` or `aspect-ratio` to prevent CLS
5. Self-host fonts or use `font-display: swap`
6. Minify and compress assets (Brotli > gzip)
7. Use a CDN
8. Cache aggressively for static assets (`Cache-Control: max-age=31536000, immutable`)

Measure with Lighthouse (Chrome DevTools), PageSpeed Insights, or the Web Vitals browser extension. Real-world data from Google Search Console > lab data from Lighthouse.

## Internationalization & SEO

If a site serves multiple languages:

- Use path-based locale routing: `/es/`, `/en/`, `/fr/`. Never query params.
- Every page has `hreflang` links pointing to all its translations AND to itself.
- Include `x-default` for the generic fallback version.
- Each language version has its own `<title>`, `<meta description>`, and content — machine-translated UI chrome is fine, but landing copy and articles must be properly localized.

For the full i18n + SEO rule set applied to the MetaMuSSic project, see the `metamussic-i18n` skill.

## Crawlability for SPAs and heavy-JS sites

If a site uses a framework that defaults to client-side rendering (classic React SPA, old Vue, etc.):

1. **Enable SSR or SSG** for public pages. This is the single biggest SEO lever on JS-heavy sites.
2. If SSR isn't feasible, enable **dynamic rendering** (serve a pre-rendered version to bots via Rendertron or Prerender.io). It's a workaround, not a long-term solution.
3. Make sure router-driven URL changes produce real URLs, not `#hash` routes.
4. Make sure internal links are real `<a href>` tags, not JS click handlers only — Google follows `<a href>`.

## Per-page indexability decision tree

For any new page, ask:

```
Is this page unique public content I want ranked?
  YES → Make sure: indexable (no noindex), canonical set, in sitemap, SSR/SSG, <title>/<description>/schema set.

Is this page private or user-specific (dashboard, admin, cart)?
  YES → <meta name="robots" content="noindex, nofollow">. Not in sitemap.

Is this a near-duplicate of another page (filtered listing, paginated view, printable version)?
  YES → Set canonical to the primary version. Consider noindex on paginated pages beyond page 1 if they don't add value.

Is this a thin page (auto-generated, tag archive with 1 post, empty search result)?
  YES → noindex or redirect away. Don't let it dilute site quality.
```

## Red flags in code review

Block these at PR time:

- A new public route without `<title>` and `<meta description>`
- Content rendered only client-side on a page meant to rank
- Hardcoded absolute URLs mixing `http` and `https`, or mixing `www` and non-`www`
- Images without `width`/`height` attributes (CLS risk)
- `<h1>` missing, duplicated, or deep inside a component (every public page needs exactly one meaningful `<h1>`)
- Infinite scroll on indexable content with no paginated fallback URLs
- Links as `<div onclick>` instead of `<a href>`
- New URL structure without 301s from old paths
- Images over 500 KB when WebP/AVIF is available
- Blocking JS/CSS in `robots.txt`

## Tooling shortlist

Free tier or self-hostable:
- **Google Search Console** — indexation status, queries, Core Web Vitals real data, manual actions. Install this before anything else.
- **Bing Webmaster Tools** — smaller audience but free, and gives diagnostics Google doesn't.
- **Lighthouse** (Chrome DevTools) — performance + SEO audit
- **Screaming Frog SEO Spider** — free up to 500 URLs, crawls your site and surfaces every issue above
- **Schema Markup Validator** — validator.schema.org
- **Rich Results Test** — search.google.com/test/rich-results
- **Web Vitals extension** — real-user measurement in your browser

Paid (not needed until a site has meaningful traffic):
- Ahrefs, Semrush, Sitebulb, ContentKing

## Reference files

When implementing on a specific stack, read:
- `references/structured-data-snippets.md` — JSON-LD examples for Article, Product, LocalBusiness, FAQ, BreadcrumbList
- `references/framework-integrations.md` — how to wire meta/sitemap/robots in Next.js, Astro, WordPress, and plain HTML

Load these only when the task is stack-specific enough to need them.
