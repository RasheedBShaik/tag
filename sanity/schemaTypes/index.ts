import { type SchemaTypeDefinition } from 'sanity'
import project from './projects'
// Import other schemas here as you create them
// import post from './post'
// import author from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project, 
  ],
}