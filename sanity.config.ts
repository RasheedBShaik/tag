// sanity.config.ts
import { defineConfig } from 'sanity' // <--- This was the missing line!
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from '@/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'th3tag-official',
  projectId: 'y2ursieu',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool(), 
    visionTool()
  ],
  schema: schema,
})