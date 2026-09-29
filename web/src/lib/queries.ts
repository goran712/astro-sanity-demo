// Full page by slug, with page-builder sections, language fallback (lang -> en) and dereferenced testimonials.
export const PAGE_BY_SLUG_QUERY = /* groq */ `*[_type == "page" && slug.current == $slug][0]{
  "title": coalesce(title[$lang], title.en),
  "slug": slug.current,
  "seoTitle": coalesce(seoTitle[$lang], seoTitle.en, title[$lang], title.en),
  "description": coalesce(seoDescription[$lang], seoDescription.en),
  sections[]{
    _key,
    _type,
    _type == "hero" => {
      "heading": coalesce(heading[$lang], heading.en),
      "text": coalesce(text[$lang], text.en),
      "ctaLabel": coalesce(ctaLabel[$lang], ctaLabel.en),
      ctaUrl
    },
    _type == "featureGrid" => {
      "heading": coalesce(heading[$lang], heading.en),
      "items": items[]{
        _key,
        "title": coalesce(title[$lang], title.en),
        "text": coalesce(text[$lang], text.en)
      }
    },
    _type == "testimonialsSection" => {
      "heading": coalesce(heading[$lang], heading.en),
      "items": items[]->{
        _id,
        name,
        "role": coalesce(role[$lang], role.en),
        "quote": coalesce(quote[$lang], quote.en)
      }
    },
    _type == "faq" => {
      "heading": coalesce(heading[$lang], heading.en),
      "items": items[]{
        _key,
        "question": coalesce(question[$lang], question.en),
        "answer": coalesce(answer[$lang], answer.en)
      }
    },
    _type == "customCode" => { html, css, js }
  }
}`;

// All page slugs, used by getStaticPaths to know which pages to generate.
export const ALL_SLUGS_QUERY = /* groq */ `*[_type == "page" && defined(slug.current)].slug.current`;
