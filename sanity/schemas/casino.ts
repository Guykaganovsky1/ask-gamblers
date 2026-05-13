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
      name: "reviewedBy",
      title: "נבדק על ידי",
      type: "reference",
      to: [{ type: "author" }],
      description: "עורך/בודק תוכן שיוצג כאות אמון בעמוד הביקורת",
    }),
    defineField({
      name: "lastCheckedAt",
      title: "תאריך בדיקה אחרון",
      type: "date",
      description: "מומלץ לעדכן בכל בדיקת בונוס, תשלומים או תנאי שימוש",
    }),
    defineField({
      name: "operatorName",
      title: "שם מפעיל",
      type: "string",
    }),
    defineField({
      name: "licenseInfo",
      title: "מידע רישוי",
      type: "string",
    }),
    defineField({
      name: "withdrawalTime",
      title: "זמן משיכה משוער",
      type: "string",
    }),
    defineField({
      name: "paymentMethods",
      title: "שיטות תשלום",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "supportChannels",
      title: "ערוצי תמיכה",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "mobileExperience",
      title: "חוויית מובייל",
      type: "string",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title (Meta Title)",
      type: "string",
      description: "Optimized title for search engines (50-60 characters)",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description (Meta Description)",
      type: "string",
      description: "Optimized description for search engines (150-160 characters)",
      validation: (rule) => rule.max(160),
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
      title: "שאלות נפוצות (FAQ)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "שאלה" },
            { name: "answer", type: "text", title: "תשובה" },
          ],
        },
      ],
      description: "הוסף שאלות ותשובות נפוצות כדי לשפר את ה-SEO",
    }),
  ],
});
