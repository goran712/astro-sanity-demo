import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'localeString', validation: (r) => r.required()}),
    defineField({name: 'text', type: 'localeText'}),
    defineField({name: 'ctaLabel', title: 'CTA label', type: 'localeString'}),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
      validation: (r) => r.uri({allowRelative: true, scheme: ['http', 'https', 'mailto']}),
    }),
  ],
  preview: {
    select: {title: 'heading.en'},
    prepare: ({title}) => ({title, subtitle: 'Hero'}),
  },
})
