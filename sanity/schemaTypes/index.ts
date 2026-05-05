import { type SchemaTypeDefinition } from 'sanity'
import project from './projects'
import team from './team'
import insights from './insights'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    team,
    insights
  ],
}