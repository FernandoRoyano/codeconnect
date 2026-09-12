# Structured Data Snippets (JSON-LD)

Ready-to-adapt JSON-LD blocks for the most common content types. Replace the placeholder values, validate at https://validator.schema.org/ and https://search.google.com/test/rich-results.

## Article / Blog Post

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Exact article title, ≤110 chars",
  "description": "Same as meta description or richer",
  "image": [
    "https://domain.com/image-16x9.jpg",
    "https://domain.com/image-4x3.jpg",
    "https://domain.com/image-1x1.jpg"
  ],
  "datePublished": "2026-01-15T08:00:00+01:00",
  "dateModified": "2026-02-03T10:30:00+01:00",
  "author": [{
    "@type": "Person",
    "name": "Author Name",
    "url": "https://domain.com/author/slug"
  }],
  "publisher": {
    "@type": "Organization",
    "name": "Site Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://domain.com/logo.png",
      "width": 600,
      "height": 60
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://domain.com/article-slug"
  }
}
```

## Product (e-commerce)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "image": ["https://domain.com/product.jpg"],
  "description": "Product description",
  "sku": "SKU-12345",
  "brand": {
    "@type": "Brand",
    "name": "Brand Name"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://domain.com/product/slug",
    "priceCurrency": "EUR",
    "price": "29.99",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "142"
  }
}
```

## LocalBusiness

For full local SEO treatment including hours, service area, and reviews, see the `seo-local` skill. Minimal version:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "image": "https://domain.com/storefront.jpg",
  "telephone": "+34 600 000 000",
  "email": "hello@domain.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Example 123",
    "addressLocality": "Madrid",
    "postalCode": "28001",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.4168,
    "longitude": -3.7038
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "20:00"
  }],
  "url": "https://domain.com"
}
```

## FAQ Page

Shows accordion rich result in Google SERP. Use only when the page *is* an FAQ — don't shoehorn it elsewhere.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Question 1?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Answer 1 in plain text or minimal HTML."
    }
  }, {
    "@type": "Question",
    "name": "Question 2?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Answer 2."
    }
  }]
}
```

## HowTo

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to [do the thing]",
  "description": "Overview of the how-to",
  "totalTime": "PT30M",
  "supply": [
    {"@type": "HowToSupply", "name": "Item 1"}
  ],
  "tool": [
    {"@type": "HowToTool", "name": "Tool 1"}
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Step 1 title",
      "text": "Do this first.",
      "url": "https://domain.com/guide#step1",
      "image": "https://domain.com/step1.jpg"
    }
  ]
}
```

## Recipe

```json
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Recipe Name",
  "image": "https://domain.com/recipe.jpg",
  "description": "Short description",
  "author": {"@type": "Person", "name": "Author"},
  "datePublished": "2026-01-15",
  "prepTime": "PT15M",
  "cookTime": "PT30M",
  "totalTime": "PT45M",
  "recipeYield": "4 servings",
  "recipeCategory": "Main course",
  "recipeCuisine": "Spanish",
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "350 kcal"
  },
  "recipeIngredient": [
    "200g ingredient one",
    "1 tbsp ingredient two"
  ],
  "recipeInstructions": [
    {"@type": "HowToStep", "text": "Step 1."},
    {"@type": "HowToStep", "text": "Step 2."}
  ]
}
```

## VideoObject

Essential for any embedded video you want Google to surface:

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Video Title",
  "description": "Video description",
  "thumbnailUrl": ["https://domain.com/thumbnail.jpg"],
  "uploadDate": "2026-01-15T08:00:00+01:00",
  "duration": "PT5M30S",
  "contentUrl": "https://domain.com/video.mp4",
  "embedUrl": "https://domain.com/embed/video-id"
}
```

## Course

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Course Name",
  "description": "Course description",
  "provider": {
    "@type": "Organization",
    "name": "Provider Name",
    "sameAs": "https://domain.com"
  }
}
```

## Person (creator profile)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Creator Name",
  "url": "https://domain.com/creator/slug",
  "image": "https://domain.com/avatar.jpg",
  "sameAs": [
    "https://instagram.com/handle",
    "https://twitter.com/handle"
  ],
  "jobTitle": "Music Producer"
}
```

## Organization (homepage only)

Place on the homepage, not on every page. Tells Google about the entity behind the site.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Org Name",
  "url": "https://domain.com",
  "logo": "https://domain.com/logo.png",
  "sameAs": [
    "https://twitter.com/handle",
    "https://linkedin.com/company/slug",
    "https://instagram.com/handle"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+34-900-000-000",
    "contactType": "customer service",
    "availableLanguage": ["Spanish", "English"]
  }
}
```

## BreadcrumbList

Improves the SERP breadcrumb display and is cheap to add:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://domain.com/"},
    {"@type": "ListItem", "position": 2, "name": "Articles", "item": "https://domain.com/articles/"},
    {"@type": "ListItem", "position": 3, "name": "Article Title"}
  ]
}
```

Note the last item has no `item` field — it represents the current page.

## WebSite with SearchAction (homepage only)

Enables the Sitelinks Searchbox in Google:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://domain.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://domain.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

## Review

Attach to the reviewed item, not standalone:

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Product",
    "name": "Thing being reviewed"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {"@type": "Person", "name": "Reviewer Name"},
  "datePublished": "2026-01-15",
  "reviewBody": "Review text."
}
```

## Validation workflow

1. Paste the JSON-LD into https://validator.schema.org/ — fixes syntax/schema errors
2. Then test in https://search.google.com/test/rich-results — shows which rich result types Google will actually surface
3. Deploy, then monitor Google Search Console → Enhancements for each schema type
