import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "קטגוריה",
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
      name: "description",
      title: "תיאור",
      type: "text",
    }),
    defineField({
      name: "icon",
      title: "אייקון",
      type: "string",
      description: "שם האייקון (slots, poker, live, sports)",
    }),
  ],
});
