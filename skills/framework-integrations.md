# Framework Integrations — Meta, Sitemap, Robots

How to wire the technical SEO pieces in the frameworks you're most likely to hit: Next.js, Astro, WordPress, and plain HTML. Pick the section that matches the project.

## Next.js (App Router)

### Per-page metadata via `generateMetadata`

```tsx
// app/articles/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://domain.com/articles/${post.slug}`,
      languages: {
        'es': `https://domain.com/es/articles/${post.slug}`,
        'en': `https://domain.com/en/articles/${post.slug}`,
        'x-default': `https://domain.com/en/articles/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://domain.com/articles/${post.slug}`,
      siteName: 'Site Name',
      images: [{ url: post.ogImage, width: 1200, height: 630 }],
      locale: 'es_ES',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.ogImage],
    },
  };
}
```

### Root metadata defaults

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://domain.com'),
  title: {
    default: 'Site Name',
    template: '%s | Site Name',
  },
  description: 'Default site description',
};
```

### JSON-LD structured data

```tsx
// Inside the page component
export default function Page({ post }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    // ... rest of schema
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* page content */}
    </>
  );
}
```

### Dynamic sitemap

```tsx
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  return [
    {
      url: 'https://domain.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...posts.map((post) => ({
      url: `https://domain.com/articles/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
```

### `robots.txt`

```tsx
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/_next/'],
    },
    sitemap: 'https://domain.com/sitemap.xml',
  };
}
```

### Image optimization

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Descriptive alt text"
  width={1200}
  height={630}
  priority  // only for above-the-fold images
/>
```

`next/image` handles WebP/AVIF, responsive srcset, and lazy loading automatically. Always set `width` and `height` to prevent CLS.

### Pages Router (legacy) quick equivalents

If the project is still on Pages Router, use `next/head` inside each page and write `public/sitemap.xml` + `public/robots.txt` as static files (or generate via `next-sitemap` package).

---

## Astro

### Per-page metadata

```astro
---
// src/pages/articles/[slug].astro
const { slug } = Astro.params;
const post = await getPost(slug);
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<html lang="es">
<head>
  <title>{post.title}</title>
  <meta name="description" content={post.description} />
  <link rel="canonical" href={canonicalURL} />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.description} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:image" content={new URL(post.ogImage, Astro.site)} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={post.title} />
  <meta name="twitter:description" content={post.description} />

  <!-- Structured data -->
  <script type="application/ld+json" set:html={JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    // ...
  })} />
</head>
<body>
  <!-- content -->
</body>
</html>
```

### Sitemap

Install the official integration:

```bash
npx astro add sitemap
```

```js
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://domain.com',
  integrations: [sitemap()],
});
```

Astro will produce `sitemap-index.xml` automatically.

### `robots.txt`

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://domain.com/sitemap-index.xml
```

### Image optimization

```astro
---
import { Image } from 'astro:assets';
import hero from '../assets/hero.jpg';
---

<Image src={hero} alt="Descriptive alt" width={1200} height={630} />
```

---

## WordPress (PHP)

For most WordPress sites, install one of:
- **Yoast SEO** — most popular, free tier covers the essentials
- **Rank Math** — free tier is more generous
- **SEOPress** — lighter alternative

These plugins handle `<title>`, meta description, Open Graph, canonical, sitemap, robots.txt, and structured data for the standard post/page types. For SEO on a standard WordPress site, the work is 80% installing the plugin and configuring it properly; code only matters for custom post types or specific overrides.

### Manual meta tags in `functions.php` (if avoiding plugins)

```php
function custom_meta_tags() {
  if (is_single()) {
    $post_id = get_the_ID();
    $description = get_the_excerpt($post_id);
    $canonical = get_permalink($post_id);
    $thumbnail = get_the_post_thumbnail_url($post_id, 'large');
    ?>
    <meta name="description" content="<?php echo esc_attr($description); ?>">
    <link rel="canonical" href="<?php echo esc_url($canonical); ?>">
    <meta property="og:title" content="<?php echo esc_attr(get_the_title()); ?>">
    <meta property="og:description" content="<?php echo esc_attr($description); ?>">
    <meta property="og:url" content="<?php echo esc_url($canonical); ?>">
    <meta property="og:image" content="<?php echo esc_url($thumbnail); ?>">
    <meta property="og:type" content="article">
    <?php
  }
}
add_action('wp_head', 'custom_meta_tags');
```

### JSON-LD for a custom post type

```php
function output_article_schema() {
  if (is_single()) {
    $post = get_post();
    $schema = [
      '@context' => 'https://schema.org',
      '@type' => 'Article',
      'headline' => get_the_title($post),
      'datePublished' => get_the_date('c', $post),
      'dateModified' => get_the_modified_date('c', $post),
      'author' => [
        '@type' => 'Person',
        'name' => get_the_author_meta('display_name', $post->post_author),
      ],
      'image' => get_the_post_thumbnail_url($post, 'full'),
      'mainEntityOfPage' => get_permalink($post),
    ];
    echo '<script type="application/ld+json">' . wp_json_encode($schema) . '</script>';
  }
}
add_action('wp_head', 'output_article_schema');
```

### Enforce canonical URLs and remove WordPress clutter

```php
// functions.php
remove_action('wp_head', 'wp_generator');           // hide WP version
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
```

### Common WordPress SEO traps

- Category and tag archives duplicating content — decide if you want them indexed; if not, noindex via Yoast/Rank Math settings
- Author archives with one author site-wide — noindex or redirect to homepage
- Attachment pages — set to noindex or redirect to the attachment file
- Replytocom parameters inflating crawl budget — disable threaded comments or block via robots
- Default permalink structure uses `?p=123` — change to `/%postname%/` in Settings → Permalinks

---

## Plain HTML (static site / hand-coded)

Every public HTML file gets the head block from the main SKILL.md, customized per page. For sitemaps and robots, write them manually once:

### `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://domain.com/</loc>
    <lastmod>2026-01-15</lastmod>
  </url>
  <url>
    <loc>https://domain.com/about</loc>
    <lastmod>2026-01-10</lastmod>
  </url>
  <!-- one <url> per page -->
</urlset>
```

### `robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://domain.com/sitemap.xml
```

### Automate the sitemap

On a static site, regenerate `sitemap.xml` from the file system in the build script. A 30-line Node or Python script walking your `pages/` directory and writing the XML is enough and keeps it in sync with reality.

---

## Cross-framework checklist

Regardless of stack, before shipping:

- [ ] Every public page has unique `<title>` and `<meta description>`
- [ ] Canonical set on every page, absolute URL
- [ ] Open Graph tags present
- [ ] `sitemap.xml` exists, lists canonical URLs, submitted to Google Search Console
- [ ] `robots.txt` exists, references the sitemap, doesn't block JS/CSS
- [ ] Images use modern formats (WebP/AVIF) with explicit width/height
- [ ] No client-side-only rendering of public content
- [ ] HTTPS everywhere, HTTP redirects 301 to HTTPS
- [ ] No broken links or redirect chains
- [ ] Lighthouse SEO score ≥ 95
- [ ] Core Web Vitals passing on key pages
