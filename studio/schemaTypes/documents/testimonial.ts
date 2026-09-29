import {defineField, defineType} from 'sanity'

// A document (not an inline object) so it can be reused across pages via references.
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', type: 'localeString'}),
    defineField({name: 'quote', type: 'localeText', validation: (r) => r.required()}),
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'name', subtitle: 'role.en'}},
})
