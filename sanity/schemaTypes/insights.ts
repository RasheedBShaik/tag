import { defineField, defineType } from "sanity";
import { Lightbulb } from "lucide-react";

export default defineType({
  name: "insights",
  title: "Insights",
  type: "document",
  icon: Lightbulb,
  fields: [
    defineField({
      name: "title",
      title: "Insight Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "team" }], // Links the insight to a team member
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Short excerpt for the listing page",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      title: "Content Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } }
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});