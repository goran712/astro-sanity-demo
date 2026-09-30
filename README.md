# Courseline: Astro + Sanity + GROQ demo

A small marketing site for a fictional online-course platform, built in one evening to learn Astro, Sanity and GROQ. Languages: English and German.
Live: https://gorandjordjevic.com/sanity-demo/ · Repo: https://github.com/goran712/astro-sanity-demo

## Stack and constraints
- `web/`: Astro, fully static output, deployed as plain files on Apache.
- `studio/`: Sanity Studio (TypeScript) with page-builder schemas and the Vision tool.
- Vanilla CSS (custom properties, Grid, container queries, `clamp()`) and vanilla JS. No UI libraries or frameworks.
- One library dependency in `web/` besides Astro itself: `@sanity/client`.

## Key decisions
- **i18n:** field-level translation (`localeString` / `localeText`); missing German falls back to English with `coalesce`.
- **Testimonials:** a document referenced from pages, so one testimonial can be reused.
- **Page builder:** each section type (`hero`, `featureGrid`, `testimonialsSection`, `faq`, `customCode`) maps to one Astro component.
- **Custom Code:** an escape hatch. Studio shows a warning when CSS isn't scoped with `gd-cc-`.
- **Data:** GROQ runs at build time with `useCdn: false`, published documents only.

## GROQ highlights
Queries live in `web/src/lib/queries.ts`.
- `PAGE_BY_SLUG_QUERY`: parameters (`$slug`, `$lang`), `coalesce` language fallback, conditional projections per section `_type`, and reference dereferencing (`items[]->`).
- `ALL_SLUGS_QUERY`: lists page slugs for Astro's `getStaticPaths`.
- `studio/vision-queries.groq`: extra queries to try in Vision: featured testimonials, a reverse reference lookup, and a content QA query that finds pages and sections missing German translations.

## Quality
- Lighthouse 100 in all four categories.
- Checked at 360, 768, 1024 and 1440 px.
- Keyboard navigation, visible focus and WCAG AA contrast checked. Content works without JavaScript.

## How AI was used
Claude Code, guided by `CLAUDE.md` (stack, hard rules, conventions, definition of done). Work went in small steps and I approved every change. The rules stopped it from adding dependencies or frameworks, hardcoding project IDs, publishing or pushing without asking, and writing to the dataset on its own.

## Known limits and next steps
- No `siteSettings` singleton yet; the site name is hardcoded in `web/src/lib/i18n.ts`.
- Content changes need a manual rebuild. Next: Sanity webhook + GitHub Actions.
- The Custom Code CSS check is a heuristic, not a parser. It ignores `@keyframes`, `:is()`/`:where()`/`:not()`, nested CSS and strings, and any `gd-cc-` class in a selector satisfies it. It only warns; it doesn't block publishing.
- Custom Code `js` is stored but not rendered yet.

## Run locally
Requires Node 22.12+. Each `.env.example` lists the variables you need (Sanity project ID and dataset); copy it to `.env` and fill in your values. All commands start from the repo root.

Studio:
```sh
cd studio
cp .env.example .env
npm install
npm run dev
```

Site:
```sh
cd web
cp .env.example .env
npm install
npm run dev
```

Build (static output in `web/dist/`):
```sh
cd web
npm run build
```
