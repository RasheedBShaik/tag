import { defineField, defineType } from "sanity";
<<<<<<< HEAD

export const testimonials = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
=======
import { MessageSquare } from "lucide-react";

export const testimonials = defineType({
  name: "testimonials",
  title: "Partner Testimonials",
  type: "document",
  icon: MessageSquare,
>>>>>>> ea8f1f09c9f1ac471e309fcfe10ce17f76579369
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
<<<<<<< HEAD
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
=======
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
>>>>>>> ea8f1f09c9f1ac471e309fcfe10ce17f76579369
    }),
    defineField({
      name: "stars",
      title: "Star Rating",
      type: "number",
      initialValue: 5,
<<<<<<< HEAD
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "company",
    },
  },
=======
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
>>>>>>> ea8f1f09c9f1ac471e309fcfe10ce17f76579369
});