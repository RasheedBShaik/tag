import { defineField, defineType } from "sanity";

import { MessageSquare } from "lucide-react";

export const testimonials = defineType({
  name: "testimonials",
  title: "Partner Testimonials",
  type: "document",
  icon: MessageSquare,

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

      title: "Testimonial Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "stat",
      title: "Impact Metric / Stat",
      type: "string",
      description: "e.g., '25% Bottom Line' or '340% ROI'",
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
      title: "Display Order",
      type: "number",
      description: "Used to control the sequence of testimonials (ascending).",
    }),
  ],

});