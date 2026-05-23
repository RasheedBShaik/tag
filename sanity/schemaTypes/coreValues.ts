// schemas/coreValues.ts
import { defineField, defineType } from 'sanity'

export const coreValues = defineType({
  name: 'coreValues',
  title: 'Core Values Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lineColor',
      title: 'Animated Line Color (Tailwind Class)',
      type: 'string',
      description: 'Example: bg-blue-600, bg-rose-500, bg-amber-500',
    }),
    defineField({
      name: 'technologies',
      title: 'Value Items',
      description: 'Add and order your core values manually',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'valueItem',
          title: 'Value Item',
          fields: [
            defineField({
              name: 'id',
              title: 'Sorting ID / Number',
              type: 'string',
              description: 'e.g., 1, 2, 3 or 01, 02, 03. Dictates strict masonry layout order.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'tagline',
              title: 'Tagline',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              description: 'Select icon styling to match frontend configurations.',
              options: {
                list: [
                  { title: 'Heart (Empathy)', value: 'heart' },
                  { title: 'Brain (Mind/Strategy)', value: 'brain' },
                  { title: 'CPU (Technology)', value: 'cpu' },
                ],
              },
            }),
            defineField({
              name: 'features',
              title: 'Bullet Features / Checklist',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'tagline',
            },
          },
        },
      ],
    }),
  ],
})