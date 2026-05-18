import { defineField, defineType } from "sanity";
import { Layers } from "lucide-react";

export const differentiators = defineType({
  name: "differentiators",
  title: "Why TAG / Differentiators",
  type: "document",
  icon: Layers,
  fields: [
    defineField({
      name: "id",
      title: "Display Number/ID",
      type: "string",
      description: "e.g., '01', '02'. Used for background styling and ordering.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Description Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "iconName",
      title: "Icon",
      type: "string",
      description: "Select the visual icon associated with this differentiator.",
      options: {
        list: [
          { title: "Handshake (Skin In The Game)", value: "handshake" },
          { title: "Unplug (The Zero-Lock-In Pact)", value: "unplug" },
          { title: "User Check (Architects, Not Analysts)", value: "user-check" },
          { title: "Scale (Ethics as a Constraint)", value: "scale" },
          { title: "Globe (Green-State Infrastructure)", value: "globe" },
          { title: "Layers (Execution-Led Strategy)", value: "layers" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "ID Ascending",
      name: "idAsc",
      by: [{ field: "id", direction: "asc" }],
    },
  ],
});