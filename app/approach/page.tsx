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
      name: "contentType",
      title: "Content Segment Location",
      type: "string",
      options: {
        list: [
          { title: "Carousel Process Card", value: "process" },
          { title: "FAQ Accordion Item", value: "faq" }
        ],
        layout: "radio"
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "iconName",
      title: "Card Icon Asset",
      description: "Only used if Content Segment Location is set to 'Carousel Process Card'",
      type: "string",
      options: {
        list: [
          { title: "Terminal", value: "terminal" },
          { title: "Share/Mesh", value: "share" },
          { title: "Fingerprint", value: "fingerprint" },
          { title: "Shield", value: "shield" }
        ]
      }
    }),
    defineField({
      name: "order",
      title: "Rendering Sort Weight Order",
      type: "number"
    }),
  ]
});