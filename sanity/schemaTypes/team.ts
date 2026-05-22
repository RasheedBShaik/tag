import { defineField, defineType } from "sanity";
import { Users } from "lucide-react";

export default defineType({
  name: "team",
  title: "Who We Are CMS",
  type: "document",
  icon: Users,
  fields: [
    defineField({
      name: "documentType",
      title: "Document Entry Type",
      type: "string",
      options: {
        list: [
          { title: "Team Member Profile", value: "member" },
          { title: "Company Info / Philosophy Section", value: "contentBlock" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "member",
    }),

    // --- TEAM MEMBER FIELDS (Conditional) ---
    defineField({
      name: "name",
      title: "Name / Section Title",
      type: "string",
      description: "Name of the person OR the Title of the text section (e.g., 'The Origin')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Subtitle",
      type: "string",
      placeholder: "e.g., Chief Executive Officer OR 'Small, principal-led, by design'",
      hidden: ({ parent }) => !parent || parent.documentType === "contentBlock" && false, 
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
      hidden: ({ parent }) => parent?.documentType !== "member",
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.documentType !== "member",
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
      title: "Short Bio / Content Block Text",
      type: "text",
      description: "Write either the founder bio or the entire paragraph text for the philosophy blocks here.",
      rows: 5,
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn Profile",
      type: "url",
      hidden: ({ parent }) => parent?.documentType !== "member",
    }),

    // --- BLOCK STRUCTURAL SEGMENTS (Conditional for content blocks) ---
    defineField({
      name: "contentIdentifier",
      title: "Content Placement Identifier",
      type: "string",
      description: "Use exactly: 'origin', 'conviction', 'structure', 'proof', or 'standard'",
      options: {
        list: [
          { title: "The Origin Section", value: "origin" },
          { title: "The Conviction Block", value: "conviction" },
          { title: "The Structure Block", value: "structure" },
          { title: "The Proof Block", value: "proof" },
          { title: "The Standard Block", value: "standard" },
        ],
      },
      hidden: ({ parent }) => parent?.documentType !== "contentBlock",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Higher numbers appear first",
    }),
  ],
});