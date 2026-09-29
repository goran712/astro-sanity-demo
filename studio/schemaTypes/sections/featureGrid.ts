import {defineArrayMember, defineField, defineType} from 'sanity'

export const featureGrid = defineType({
  name: 'featureGrid',
  title: 'Feature grid',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'localeString'}),
    defineField({
      name: 'items',
      type: 'array',
      validation: (r) => r.min(2).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({name: 'title', type: 'localeString', validation: (r) => r.required()}),
            defineField({name: 'text', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.en'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading.en', items: 'items'},
    prepare: ({title, items}) => ({title, subtitle: `Feature grid · ${items?.length ?? 0} items`}),
  },
})
