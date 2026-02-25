import { defineField, defineType } from "sanity";

export default defineType({
  name: "casino",
  title: "קזינו",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "לוגו",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "דירוג",
      type: "number",
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: "description",
      title: "תיאור",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pros",
      title: "יתרונות",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "cons",
      title: "חסרונות",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bonusTitle",
      title: "כותרת בונוס",
      type: "string",
    }),
    defineField({
      name: "bonusAmount",
      title: "סכום בונוס",
      type: "string",
    }),
    defineField({
      name: "wageringRequirement",
      title: "דרישות הימור",
      type: "string",
    }),
    defineField({
      name: "affiliateLink",
      title: "קישור שותפים",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "קטגוריות",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "featured",
      title: "מומלץ",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "clicks",
      title: "קליקים",
      type: "number",
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: "faqs",
      title: "שאלות נפוצות",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "שאלה",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "answer",
              title: "תשובה",
              type: "text",
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
  ],
});
