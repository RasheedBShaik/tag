import { defineField, defineType } from "sanity";
import { Eye } from "lucide-react";

export const aestheticApproach = defineType({
  name: "aestheticApproach",
  title: "Aesthetic Approach Section",
  type: "document",
  icon: Eye,
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Main Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitleItalic",
      title: "Hero Title (Italic Accent)",
      type: "string",
      description: "e.g., 'and Measurable Results'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Sub-description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    
    // --- FOUNDATION METRICS BLOCK ---
    defineField({
      name: "foundationDescription",
      title: "Foundation Section Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metrics",
      title: "Foundation Metrics (Exactly 4 items)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value Metric (e.g., '4', '2wk')", type: "string" },
            { name: "label", title: "Label Description", type: "text", rows: 2 }
          ]
        }
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // --- VISION & MISSION BLOCK ---
    defineField({
      name: "visionText",
      title: "Vision Statement Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "missionText",
      title: "Mission Statement Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
});