// schemas/coreValues.ts
import { defineField, defineType } from 'sanity'

export const coreValues = defineType({
  name: 'coreValues',
  title: 'Core Values Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Core Values',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lineColor',
      title: 'Animated Line Color (Tailwind Class)',
      type: 'string',
      description: 'Example: bg-blue-600, bg-red-500, bg-emerald-600',
      initialValue: 'bg-blue-600',
    }),
  ],
})
