import { defineField, defineType } from "sanity";

export const testimonials = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stat",
      title: "Impact Stat / Badge Text",
      type: "string",
      description: "e.g., '340% ROI' or '25% Growth'",
      validation: (Rule) => Rule.required().max(25),
    }),
    defineField({
      name: "stars",
      title: "Star Rating",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "company",
    },
  },
});