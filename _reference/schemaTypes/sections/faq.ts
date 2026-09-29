import {defineArrayMember, defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'localeString'}),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({name: 'question', type: 'localeString', validation: (r) => r.required()}),
            defineField({name: 'answer', type: 'localeText', validation: (r) => r.required()}),
          ],
          preview: {select: {title: 'question.en'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading.en'},
    prepare: ({title}) => ({title, subtitle: 'FAQ'}),
  },
})
