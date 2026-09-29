import {defineField, defineType} from 'sanity'

// Field-level translation: one field holds all languages.
export const localeString = defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'de', title: 'Deutsch', type: 'string'}),
  ],
})
