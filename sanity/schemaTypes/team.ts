import { defineField, defineType } from "sanity";
import { Users } from "lucide-react"; // Optional: if using lucide icons for desk structure

export default defineType({
  name: "team",
  title: "Team Members",
  type: "document",
  icon: Users,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Position",
      type: "string",
      placeholder: "e.g., Chief Visionary Officer or Lead Engineer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Team Category",
      type: "string",
      options: {
        list: [
          { title: "Visionary", value: "visionary" },
          { title: "Technical Team", value: "technical" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn Profile",
      type: "url",
    }),
    defineField({
        name: "order",
        title: "Display Order",
        type: "number",
        description: "Higher numbers appear first",
    }),
  ],
});