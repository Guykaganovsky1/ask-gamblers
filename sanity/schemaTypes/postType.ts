import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'reviewedBy',
      title: 'Reviewed by',
      type: 'reference',
      to: {type: 'author'},
      description: 'Optional editor or fact checker for YMYL-style trust signals',
    }),
    defineField({
      name: 'factCheckedAt',
      title: 'Fact checked date',
      type: 'date',
    }),
    defineField({
      name: 'summaryAnswer',
      title: 'Short answer for AI/search snippets',
      type: 'text',
      rows: 3,
      description: '2-3 sentence direct answer displayed near the top of long guides',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      validation: (rule) => rule.max(65),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(170),
    }),
    defineField({
      name: 'isMegaGuide',
      title: 'Mega guide',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'targetKeyword',
      title: 'Primary target keyword',
      type: 'string',
    }),
    defineField({
      name: 'keywords',
      title: 'Secondary keywords',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'relatedCasinos',
      title: 'Related casinos',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'casino'}})],
    }),
    defineField({
      name: 'estimatedReadTime',
      title: 'Estimated read time in minutes',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
