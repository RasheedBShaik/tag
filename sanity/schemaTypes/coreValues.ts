<<<<<<< HEAD
// src/sanity/schemaTypes/coreValues.ts
export const coreValuesSchema = {
  name: 'coreValues', 
  title: 'Core Values Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Our Core Values',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'technologies',
      title: 'Heart & Mind Technologies / Values List',
      type: 'array',
      validation: (Rule: any) => Rule.min(3).max(3).error('Showcase exactly 3 items.'),
      of: [
        {
          type: 'object',
          name: 'valueItem',
          title: 'Value Item',
          fields: [
            { name: 'id', title: 'Visual ID Number (e.g., 01)', type: 'string' },
            { name: 'name', title: 'Core Value Name', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'tagline', title: 'Tagline', type: 'string' },
            { name: 'description', title: 'Core Description', type: 'text', rows: 3 },
            {
              name: 'icon',
              title: 'Icon Graphic Indicator',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
              options: {
                list: [
                  { title: 'Heart (Red)', value: 'heart' },
                  { title: 'Brain (Blue)', value: 'brain' },
                  { title: 'CPU/Technology (Amber)', value: 'cpu' },
                ],
                layout: 'dropdown',
              },
            },
            {
              name: 'features',
              title: 'Feature Points List',
              type: 'array',
              of: [{ type: 'string' }],
            }
          ],
        }
      ]
    }
  ]
}
=======
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
>>>>>>> ea8f1f09c9f1ac471e309fcfe10ce17f76579369
