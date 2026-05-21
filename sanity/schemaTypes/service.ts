import { defineField, defineType } from "sanity";

const RANDOM_THEMES = [
  { primary: "blue-500", secondary: "cyan-400", accent: "text-blue-500", glow: "#3b82f6", glass: "rgba(59, 130, 246, 0.03)" },
  { primary: "violet-500", secondary: "fuchsia-400", accent: "text-violet-500", glow: "#8b5cf6", glass: "rgba(139, 92, 246, 0.03)" },
  { primary: "rose-500", secondary: "orange-400", accent: "text-rose-500", glow: "#f43f5e", glass: "rgba(244, 63, 94, 0.03)" },
  { primary: "amber-500", secondary: "orange-500", accent: "text-amber-500", glow: "#f59e0b", glass: "rgba(245, 158, 11, 0.03)" },
  { primary: "emerald-500", secondary: "teal-400", accent: "text-emerald-500", glow: "#10b981", glass: "rgba(16, 185, 129, 0.03)" },
];

export default defineType({
  name: "service",
  title: "Services Studio",
  type: "document",
  groups: [
    { name: "main", title: "Core Content" },
    { name: "portfolio", title: "Investment Portfolio Tiers" },
    { name: "pillars", title: "What Sets Us Apart" },
    { name: "process", title: "The Process Timeline" },
    { name: "cases", title: "Illustrative Cases" },
    { name: "faqs", title: "Common Questions" },
    { name: "advanced", title: "Design & Engine Settings" },
  ],
  initialValue: () => {
    const randomSelection = RANDOM_THEMES[Math.floor(Math.random() * RANDOM_THEMES.length)];
    return {
      id: "01",
      title: "Digital Transformation Strategy",
      description: "Clear, prioritized roadmaps with defined outcomes, investment levels, and decision criteria. Strategy that survives contact with the real organization, not the org chart.",
      iconName: "cpu",
      theme: randomSelection,
    };
  },
  fields: [
    /* =========================================================
       CORE CONTENT
       ========================================================= */
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug ID",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "id",
      title: "Service Order Badge (e.g. 01, 02)",
      type: "string",
      group: "main",
    }),
    defineField({
      name: "description",
      title: "Main Introductory Block",
      type: "text",
      rows: 3,
      group: "main",
    }),

    /* =========================================================
       INVESTMENT PORTFOLIO TIERS
       ========================================================= */
    defineField({
      name: "portfolioTiers",
      title: "Investment Portfolio Matrix",
      type: "array",
      group: "portfolio",
      of: [
        {
          type: "object",
          name: "tier",
          title: "Portfolio Tier Layer",
          fields: [
            { name: "label", type: "string", title: "Tier Label (e.g., Tier One)" },
            { name: "name", type: "string", title: "Tier Name (e.g., Run, Grow, Transform)" },
            { name: "subtitle", type: "string", title: "Strategic Intent Headline" },
            { name: "summary", type: "text", title: "Governance Focus Narrative", rows: 3 },
            { name: "benchmarks", type: "array", title: "Operational Target Outcomes", of: [{ type: "string" }] }
          ]
        }
      ]
    }),

    /* =========================================================
       WHAT SETS US APART (VALUE PILLARS)
       ========================================================= */
    defineField({
      name: "valuePillars",
      title: "Value Conviction Pillars",
      type: "array",
      group: "pillars",
      of: [
        {
          type: "object",
          name: "pillar",
          title: "Conviction Node",
          fields: [
            { name: "index", type: "string", title: "Pillar Numerical Key (e.g., 01)" },
            { name: "headline", type: "string", title: "Operational Rule Title" },
            { name: "subline", type: "string", title: "Underlying Sub-statement" },
            { name: "body", type: "text", title: "Detailed Principle Content", rows: 3 }
          ]
        }
      ]
    }),

    /* =========================================================
       THE PROCESS TIMELINE
       ========================================================= */
    defineField({
      name: "processTimeline",
      title: "Process Matrix Arc",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          name: "phase",
          title: "Timeline Phase Block",
          fields: [
            { name: "stepNumber", type: "string", title: "Step Sequence Index (e.g., 01)" },
            { name: "frameworkNode", type: "string", title: "Methodology Focus Anchor (e.g., Heart, Mind)" },
            { name: "durationWindow", type: "string", title: "Operational Time Horizon (e.g., Wks 1–2)" },
            { name: "title", type: "string", title: "Phase Identifier Heading" },
            { name: "narrative", type: "text", title: "Core Execution Description", rows: 2 }
          ]
        }
      ]
    }),

    /* =========================================================
       ILLUSTRATIVE CASES
       ========================================================= */
    defineField({
      name: "caseStudies",
      title: "Illustrative Proof Assertions",
      type: "array",
      group: "cases",
      of: [
        {
          type: "object",
          name: "caseStudy",
          title: "Anonymized Performance Case",
          fields: [
            { name: "vertical", type: "string", title: "Industry Sector / Segment Identity" },
            { name: "transformType", type: "string", title: "Modernization Vector Mapping" },
            { name: "headline", type: "string", title: "Core Architectural Friction Statement" },
            { name: "problemDescription", type: "text", title: "Inherent Operational Constraints", rows: 3 },
            { name: "resolutionDescription", type: "text", title: "Applied Strategic Interventions", rows: 3 },
            { name: "impactMetrics", type: "text", title: "Quantified Performance Gains", rows: 2 },
            { name: "activeNodes", type: "array", title: "Active Architecture Framework Tags", of: [{ type: "string" }] }
          ]
        }
      ]
    }),

    /* =========================================================
       COMMON QUESTIONS
       ========================================================= */
    defineField({
      name: "faqCollection",
      title: "Diagnostic Resolution FAQ Block",
      type: "array",
      group: "faqs",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "Friction Query Matrix",
          fields: [
            { name: "question", type: "string", title: "Direct Strategic Question Statement" },
            { name: "answer", type: "text", title: "Definitive Strategic Resolution Text", rows: 4 }
          ]
        }
      ]
    }),

    /* =========================================================
       ADVANCED DESIGN & ENGINES
       ========================================================= */
    defineField({
      name: "iconName",
      title: "Lucide Vector Icon Name",
      type: "string",
      description: "Available keys: heart, brain, cpu, shield, zap, globe, utensils, activity, palette, rocket",
      group: "advanced",
    }),
    defineField({
      name: "theme",
      title: "Engine Visual Shader Parameters",
      type: "object",
      group: "advanced",
      fields: [
        defineField({ name: "primary", type: "string", title: "Tailwind Primary Accent" }),
        defineField({ name: "secondary", type: "string", title: "Tailwind Secondary Fluid Accent" }),
        defineField({ name: "accent", type: "string", title: "CSS Utility Text Class Link" }),
        defineField({ name: "glow", type: "string", title: "3D Fragment Shader Core Glow Engine Hex" }),
        defineField({ name: "glass", type: "string", title: "Interlocking Low Alpha RGBA Backdrop Mask Layer" }),
      ],
    }),
  ],
});