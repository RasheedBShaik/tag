import { defineField, defineType } from "sanity";
import { Lightbulb } from "lucide-react";

export const SECTOR_OPTIONS = [
  { title: "Technology Advisory", value: "technology-advisory" },
  { title: "Strategic Ventures", value: "strategic-ventures" },
  { title: "Design Studio", value: "design-studio" },
  { title: "Culinary Arts", value: "culinary-arts" },
  { title: "Health and Wellness", value: "health-wellness" },
  { title: "Research & Development", value: "research-development" },
  { title: "Other / General", value: "other" },
];

export const insights = defineType({
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
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sector",
      title: "Primary Sector Filter",
      type: "string",
      options: {
        list: SECTOR_OPTIONS,
        layout: "dropdown",
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
      name: "tags",
      title: "Secondary Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "summary",
      title: "Executive Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "body",
      title: "Content Body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});