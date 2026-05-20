// src/sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import project from './projects'
import team from './team'
import { insights } from './insights' 
import { testimonials } from './testimonials' 
import { processFaq } from "./processFaq"
import { coreValuesSchema } from "./coreValues" // <-- Import it here

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    team,
    insights,
    testimonials,
    processFaq,
    coreValuesSchema, // <-- Add it here
  ],
}