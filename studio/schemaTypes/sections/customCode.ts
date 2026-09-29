import {defineField, defineType} from 'sanity'

// Escape hatch for one-off blocks. Code must be self-contained:
// prefixed classes (gd-cc-*), no global selectors, JS initialised per instance.

// Simple heuristic, not a CSS parser. Flags a selector when it uses a class without the
// gd-cc- prefix, or contains no gd-cc- class at all (bare elements, *, html, body, #id, :root).
// Limits: ignores selectors inside @keyframes, and does not look inside :is()/:where()/:not(),
// nested CSS or strings/url(); a class prefixed gd-cc- somewhere is enough to pass the second check.
const unscopedSelectors = (css: string): string[] => {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const bad: string[] = []
  for (const match of clean.matchAll(/([^{}]+)\{/g)) {
    const prelude = match[1].trim()
    if (prelude.startsWith('@')) continue
    for (const selector of prelude.split(',').map((s) => s.trim())) {
      if (!selector || /^(from|to|\d+(\.\d+)?%)$/.test(selector)) continue
      const classes = [...selector.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1])
      if (classes.some((c) => !c.startsWith('gd-cc-')) || !classes.length) bad.push(selector)
    }
  }
  return bad
}
export const customCode = defineType({
  name: 'customCode',
  title: 'Custom Code',
  type: 'object',
  description:
    'Escape hatch for one-off blocks that no existing section fits. Prefix every class with gd-cc-, avoid global selectors (body, html, *, h2 ...), and query JS within its own root so the block works twice on one page.',
  fields: [
    defineField({
      name: 'label',
      title: 'Internal label',
      type: 'string',
      description: 'Only visible in the Studio.',
      validation: (r) => r.required(),
    }),
    defineField({name: 'html', title: 'HTML', type: 'text', rows: 8}),
    defineField({
      name: 'css',
      title: 'CSS',
      type: 'text',
      rows: 6,
      validation: (r) =>
        r
          .custom((value?: string) => {
            const bad = value ? unscopedSelectors(value) : []
            return bad.length
              ? `Selectors should use gd-cc- classes only. Check: ${bad.slice(0, 3).join(' | ')}${bad.length > 3 ? ' ...' : ''}`
              : true
          })
          .warning(),
    }),
    defineField({name: 'js', title: 'JavaScript', type: 'text', rows: 6}),
  ],
  preview: {
    select: {title: 'label'},
    prepare: ({title}) => ({title, subtitle: 'Custom Code'}),
  },
})
