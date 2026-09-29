import {defineField, defineType} from 'sanity'

// Escape hatch for one-off blocks. Code must be self-contained:
// prefixed classes (gd-cc-*), no global selectors, JS initialised per instance.
export const customCode = defineType({
  name: 'customCode',
  title: 'Custom Code',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Internal label',
      type: 'string',
      description: 'Only visible in the Studio.',
      validation: (r) => r.required(),
    }),
    defineField({name: 'html', title: 'HTML', type: 'text', rows: 8}),
    defineField({name: 'css', title: 'CSS', type: 'text', rows: 6}),
    defineField({name: 'js', title: 'JavaScript', type: 'text', rows: 6}),
  ],
  preview: {
    select: {title: 'label'},
    prepare: ({title}) => ({title, subtitle: 'Custom Code'}),
  },
})
