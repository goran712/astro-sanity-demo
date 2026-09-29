# CLAUDE.md — gd-marketing-demo

## Purpose
A small, framework-light marketing site built to demonstrate fast onboarding into
Astro + Sanity + GROQ. Fictional product: an online-course sales platform.
Languages: English (default) and German.

The developer (Goran) is learning Astro and Sanity through this project.
After every step, briefly explain what you did and why, and point out any
Astro/Sanity/GROQ concept worth understanding. Keep explanations short.

## Stack (do not change)
- `studio/` — Sanity Studio (TypeScript), page-builder schemas, Vision tool for GROQ
- `web/` — Astro, fully static output
- Styling: vanilla CSS only (custom properties, Grid/Flexbox, container queries, `clamp()`)
- Behaviour: vanilla JavaScript only, as progressive enhancement
- Data: `@sanity/client` + GROQ

## Hard rules
- No UI libraries, CSS frameworks, React/Vue/Svelte islands, Tailwind, Bootstrap or jQuery.
- Do not add any npm dependency without asking first and explaining why it is needed.
- Extend existing patterns; do not create a competing pattern for something that already exists.
- Never hardcode secrets. Project ID and dataset come from environment variables
  (`SANITY_STUDIO_PROJECT_ID`, `PUBLIC_SANITY_PROJECT_ID`, `..._DATASET`).
- Do not run `sanity deploy`, publish, or push to git without explicit confirmation.
- Do not create, edit or delete content in the Sanity dataset via MCP without explicit confirmation.
- Work in small steps. Stop after each step and wait for review.

## Content model
- Field-level translation via `localeString` / `localeText` objects with `en` (required) and `de`.
- `page` document: `title`, `slug`, `seoDescription`, `sections[]` (page builder).
- Sections: `hero`, `featureGrid`, `testimonialsSection`, `faq`, `customCode`.
- `testimonial` is a document (reused across pages via references); FAQ items are inline objects.
- Reference implementation of the schemas and queries lives in `_reference/`.
- Convention: the homepage is the `page` whose slug is `home`.

## GROQ conventions
- Always pass values as parameters (`$slug`, `$lang`); never interpolate strings into queries.
- Resolve languages in the query: `coalesce(field[$lang], field.en)`.
- Project only the fields a component needs; use conditional projections per section `_type`.
- Keep all queries in `web/src/lib/queries.ts`, one exported constant per query, with a one-line comment.

## CSS / HTML conventions
- Class prefix `gd-`, BEM-style: `gd-hero`, `gd-hero__title`, `gd-hero--dark`.
- Design tokens in `web/src/styles/tokens.css` (colours, spacing scale, type scale, radii).
  Components use tokens only — no magic numbers.
- One Astro component per section in `web/src/components/sections/`, styles scoped to the component.
- Semantic HTML first: landmarks, one `<h1>` per page, correct heading order,
  buttons for actions, links for navigation.
- Mobile-first. Content must work without JavaScript.

## Custom Code sections
- Treated as an escape hatch for one-off blocks.
- Classes must use the `gd-cc-` prefix; no global selectors (`body`, `h2`, `*` …).
- JS must initialise per instance (query within its own root element) and work
  if the block appears twice on one page.

## Definition of done (check before saying a step is finished)
- Builds without errors or warnings (`npm run build`).
- Checked at 360, 768, 1024 and 1440 px widths.
- Keyboard navigation and visible focus work; colour contrast meets WCAG AA.
- Works in both `en` and `de`; missing German falls back to English.
- No new dependencies unless approved.
