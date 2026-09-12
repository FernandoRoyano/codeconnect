# SERP Analysis Checklist

Systematic way to reverse-engineer the top 5 Google results before writing. Takes 30–60 minutes. Skip it and you'll waste 10x more time writing something that was never going to rank.

## Step 1 — Search the exact keyword

Open an incognito/private window (to avoid personalized results). Search the exact phrase you want to rank for. If possible, set the region to your target country.

## Step 2 — Inventory the SERP features

Check what's above the 10 organic results:

- [ ] **Featured snippet** (answer box at position 0) — if yes, note the format (paragraph / list / table) and the winning URL
- [ ] **People Also Ask** — list 4–8 questions
- [ ] **Sitelinks** under a dominant result
- [ ] **Knowledge panel** on the right
- [ ] **Image pack** / image carousel
- [ ] **Video carousel** (YouTube results at top)
- [ ] **Local pack** (map + 3 local businesses) — indicates local intent
- [ ] **Shopping results** — indicates commercial intent, product targeting
- [ ] **News results** — indicates freshness weighting
- [ ] **"Discussions and forums"** block — indicates Google wants Reddit-style input
- [ ] **AI Overview** (Gemini-generated summary at top)

These features tell you what Google *thinks* the query wants. If there's a featured snippet, make your article snippet-eligible. If there's a video carousel and you have no video, you're missing a ranking opportunity.

## Step 3 — Analyze each of the top 5 organic results

For each result, record:

```
Position #X — [URL]
Title: [exact title]
Meta description: [what Google shows]
Domain authority (rough): [huge brand / mid-tier / niche / new]
Content format: [listicle / long guide / how-to / product / tool]
Approximate word count: [use a word counter]
Publish date / last updated: [if visible]
Main H1: [exact phrasing]
Number of H2 sections: [count]
H2 sections (list them): 
  - 
  - 
  - 
Media present: [images, videos, tables, calculators?]
Unique angle or hook: [what makes this result different?]
```

Tools to speed this up:
- **Detailed SEO extension** (Chrome) — shows meta tags, headings, word count inline
- **View page source** (Ctrl+U) — raw HTML to inspect schema, canonical, hreflang

## Step 4 — Find the commonalities

List the subtopics that appear in **all or most of the top 5 results**:

```
Subtopic — appears in [3/5] top results
Subtopic — appears in [5/5] top results
Subtopic — appears in [4/5] top results
```

Everything that appears in 4+/5 is a **must-cover** subtopic. If your article skips it, you're signaling to Google that you don't cover the topic comprehensively.

## Step 5 — Find the gaps

What does NO one in the top 5 cover, but SHOULD? Common gaps:

- Recent data / statistics (top results often outdated)
- Specific examples or case studies
- Visual aids (diagram, flowchart, comparison table)
- Personal experience (you tested it; they didn't)
- Counterexamples or edge cases
- Practical tools (calculator, template, checklist)
- Regional specifics (if top results are US-centric and you're writing for Spain)

These gaps are your wedge. Your article should cover everything the top 5 cover AND fill at least one meaningful gap.

## Step 6 — Evaluate if this is winnable

Honest check before investing writing time:

- [ ] Are the top 3 from sites with vastly more authority than mine? (If yes, target a more specific long-tail instead)
- [ ] Is the SERP dominated by one format I can't produce? (e.g., all video carousel and I don't do video)
- [ ] Is the content up-to-date? (If top results are 3 years old, freshness alone is an angle)
- [ ] Is the content actually good? (If top results are thin, I can win on depth)
- [ ] Do I have unique insight / experience / data to bring? (If not, why will mine be better?)

If 3+ of these tilt against you, pick a different keyword.

## Step 7 — Decide the format

Pick the format that dominates the top 5. Common misreadings:

- If top results are long guides, don't write a 500-word summary
- If top results are listicles, don't write a narrative essay
- If the featured snippet is a numbered list, structure your H2 as a numbered list targeting that snippet
- If there's a heavy video presence, include a video embed

## Step 8 — Build the outline

Now — and only now — draft the outline using `article-brief-template.md`:

- H2 sections = union of (must-cover subtopics from top 5) + (your gap/angle)
- Order them logically (simple → complex, or chronological, or funnel order)
- Where the current top results are weak, plan to go deeper

## Step 9 — Targeting specific SERP features

### Featured snippet

If a featured snippet exists for your query, you can target it:

- **Paragraph snippet** — answer the question in 40–60 words, right under an H2 that matches the question
- **List snippet** — use a numbered or bulleted list of 6–10 items right under the relevant H2
- **Table snippet** — use a real HTML `<table>` element with clear headers

The snippet winner isn't always position #1; Google often picks the clearest, most concise answer. Structure rewards structure.

### People Also Ask

Add an FAQ section at the bottom of the article answering 3–5 PAA questions verbatim. Target these with FAQ schema (see `seo-technical`). Getting cited in PAA drives significant clicks.

### Image pack

Use original, high-quality images with:
- Descriptive filename (`strength-training-dumbbell-squat.jpg`, not `IMG_4321.jpg`)
- Descriptive alt text
- Proper dimensions and modern format (WebP/AVIF)
- EXIF data stripped (privacy + size)

### Video carousel

If videos rank, consider producing a short (2–5 min) YouTube video covering the same topic, embedding it in the article. Extra signal, extra surface area.

---

## Example (abbreviated)

**Keyword:** "how to license music independently"

```
SERP features:
- Featured snippet: paragraph (winner: distrokid.com blog)
- PAA: 4 questions
- Video carousel: 2 YouTube videos

Top 5 analyzed:
#1 DistroKid — 2200 words, 2024 updated, 8 H2s, owns "how to license music"
#2 iMusician — 1800 words, 2023, 6 H2s, focus on European context
#3 Medium article — 1400 words, 2022, personal story angle
#4 Spotify for Artists — 1600 words, platform-specific
#5 CD Baby — 2000 words, 2024, list-heavy

Must-cover (in 4+/5):
- What music licensing means
- Difference between sync / mechanical / public performance
- PROs (ASCAP, BMI, SESAC equivalents in EU)
- How to register your music
- How to monetize a license

Gaps:
- None covers 2026-specific AI/generative music licensing angle
- None from a Spanish/European creator perspective
- No one has an actionable step-by-step checklist

My angle: Spanish independent artist perspective, 2026 AI update, downloadable checklist
Format: long guide (~2000 words), list-heavy, featured-snippet-targeting paragraph intro
```

With this analysis done, the brief and outline write themselves.
