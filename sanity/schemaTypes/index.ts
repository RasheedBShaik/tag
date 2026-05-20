// src/sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import project from './projects'
import team from './team'
import { insights } from './insights' 
<<<<<<< HEAD
import { testimonials } from './testimonials' 
import { processFaq } from "./processFaq"
import { coreValuesSchema } from "./coreValues" // <-- Import it here
=======
import { coreValues } from './coreValues'
import { testimonials} from './testimonials'
import { differentiators} from './differentiators'
import { aestheticApproach} from './aestheticApproach'

>>>>>>> ea8f1f09c9f1ac471e309fcfe10ce17f76579369

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    team,
    insights,
<<<<<<< HEAD
    testimonials,
    processFaq,
    coreValuesSchema, // <-- Add it here
=======
    coreValues,
    testimonials,
    differentiators,
    aestheticApproach,
>>>>>>> ea8f1f09c9f1ac471e309fcfe10ce17f76579369
  ],
}