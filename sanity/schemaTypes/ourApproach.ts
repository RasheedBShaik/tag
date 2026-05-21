import { Rule } from '@sanity/types';

export default {
  name: 'ourApproach',
  title: 'Our Approach Page',
  type: 'document',
  fields: [
    // --- HERO SECTION ---
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'heroTitleItalic',
      title: 'Hero Title Italic Highlight',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'heroDescription',
      title: 'Hero Description Narrative',
      type: 'text',
      rows: 3,
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'digitalSovereigntyBody',
      title: 'Digital Sovereignty Block Paragraph',
      type: 'text',
      rows: 3,
    },

    // --- METRICS / FOUNDATION LAYOUT ---
    {
      name: 'foundationDescription',
      title: 'Foundation Paragraph Summary',
      type: 'text',
      rows: 3,
    },
    {
      name: 'metrics',
      title: 'Framework Highlight Metrics (4 items)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Big Display Value (e.g., 100%, 0)', type: 'string' },
            { name: 'label', title: 'Card Title / Metric Name', type: 'string' },
            { name: 'description', title: 'Detailed Content Text Label', type: 'string' },
          ],
        },
      ],
    },

    // --- VISION & MISSION STRATIFIED DATA ---
    {
      name: 'visionTitleBlock',
      title: 'Vision Headline Quote',
      type: 'string',
    },
    {
      name: 'visionText',
      title: 'Vision Extended Paragraph Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'missionTitleBlock',
      title: 'Mission Headline Quote',
      type: 'string',
    },
    {
      name: 'missionText',
      title: 'Mission Extended Paragraph Description',
      type: 'text',
      rows: 4,
    },

    // --- THE 5 STEPS CORE PILLARS MATRIX ---
    {
      name: 'pillars',
      title: 'Strategic Core Pillars (North Star, Why We Exist, etc)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Pillar Headline (e.g., Vision)', type: 'string' },
            { name: 'subtitle', title: 'Pillar Identity Label', type: 'string' },
            { name: 'description', title: 'Core Dynamic Content Plain-Text', type: 'string' },
          ],
        },
      ],
    },

    // --- GUIDING PRINCIPLES SLIDER CARDS ---
    {
      name: 'principles',
      title: 'Guiding Principles Carousel Deck (6 Cards)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Display Numerical String (e.g., 01)', type: 'string' },
            { name: 'title', title: 'Main Core Title Header', type: 'string' },
            { name: 'subtitle', title: 'Aesthetic Accent Subtitle Text', type: 'string' },
            { name: 'description', title: 'Main Body Paragraph Text Context', type: 'text', rows: 3 },
          ],
        },
      ],
    },
  ],
};