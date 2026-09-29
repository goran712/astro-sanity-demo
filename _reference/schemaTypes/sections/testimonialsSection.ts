import {defineArrayMember, defineField, defineType} from 'sanity'

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'localeString'}),
    defineField({
      name: 'items',
      type: 'array',
      validation: (r) => r.min(1).max(3).unique(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'testimonial'}]})],
    }),
  ],
  preview: {
    select: {title: 'heading.en'},
    prepare: ({title}) => ({title, subtitle: 'Testimonials'}),
  },
})
