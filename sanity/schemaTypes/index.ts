// src/sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import project from './projects'
import team from './team'
import { insights } from './insights' 

import { coreValues } from './coreValues'
import { testimonials} from './testimonials'
import ourApproach from './ourApproach'
import service  from './service'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    team,
    insights,
    coreValues,
    testimonials,    
    ourApproach,
    service
  ],
}