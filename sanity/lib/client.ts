import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Change to false for development to avoid cached "Network Errors"
  // and to ensure you see your latest Sanity changes immediately.
  useCdn: false, 
  // Helps Next.js 15/16 understand which version of the data to fetch
  perspective: 'published',
})