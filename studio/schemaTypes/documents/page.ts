import {defineArrayMember, defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'localeString', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      description: "Use 'home' for the homepage",
      options: {source: 'title.en', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'localeText',
      description: 'Recommended: 160 characters or fewer per language.',
      validation: (r) =>
        r
          .custom((value?: {en?: string; de?: string}) => {
            const tooLong = (['en', 'de'] as const).filter((l) => (value?.[l]?.length ?? 0) > 160)
            return tooLong.length
              ? `Longer than 160 characters (${tooLong.join(', ')}); search engines may truncate it.`
              : true
          })
          .warning(),
    }),
    defineField({
      name: 'sections',
      title: 'Page sections',
      description:
        'Build the page from existing sections. Use Custom Code only when no section fits.',
      type: 'array',
      of: [
        defineArrayMember({type: 'hero'}),
        defineArrayMember({type: 'featureGrid'}),
        defineArrayMember({type: 'testimonialsSection'}),
        defineArrayMember({type: 'faq'}),
        defineArrayMember({type: 'customCode'}),
      ],
    }),
  ],
  preview: {select: {title: 'title.en', subtitle: 'slug.current'}},
})
