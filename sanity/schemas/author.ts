import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "כותב",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "תמונה",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "ביוגרפיה",
      type: "text",
    }),
  ],
});
