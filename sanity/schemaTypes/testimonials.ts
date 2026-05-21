import { defineField, defineType } from "sanity";
import { MessageSquare } from "lucide-react";

export const testimonials = defineType({
  name: "testimonials",
  title: "Home Testimonials",
  type: "document",
  icon: MessageSquare,
  fields: [
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Author name is missing and required."),
    }),
    defineField({
      name: "role",
      title: "Role / Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(300).warning("Shorter text keeps the layout compact and clean."),
    }),
    defineField({
      name: "stat",
      title: "Impact Metric / Highlight Tag",
      type: "string",
      description: "Examples: '4.8x ROI', '+60% conversion', 'Saved 40+ hours'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stars",
      title: "Star Rating",
      type: "number",
      initialValue: 5,
      options: {
        list: [1, 2, 3, 4, 5],
        layout: "radio",
      },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "order",
      title: "Display Order Index",
      type: "number",
      description: "Controls the rendering order weight (lowest index appears first).",
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "company",
    },
  },
});