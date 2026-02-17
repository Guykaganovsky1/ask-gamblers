import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "פוסט",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "כותרת",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "כותב",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "featuredImage",
      title: "תמונה ראשית",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "categories",
      title: "קטגוריות",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "תאריך פרסום",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "תוכן",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "טקסט חלופי",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "כותרת SEO",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "תיאור SEO",
      type: "text",
      validation: (rule) => rule.max(160),
    }),
  ],
});
