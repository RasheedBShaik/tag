import { defineField, defineType } from "sanity";
import { HelpCircle } from "lucide-react";

export const processFaq = defineType({
  name: "processFaq",
  title: "Process & FAQ Data Items",
  type: "document",
  icon: HelpCircle,
  fields: [
    defineField({
      name: "title",
      title: "Item Title / Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description / Answer Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Rendering Sort Weight Order",
      type: "number",
    }),
  ]
});

export default processFaq;