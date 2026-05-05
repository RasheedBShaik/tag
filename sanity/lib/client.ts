import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

/**
 * Core Sanity Client
 * ------------------
 * Configured for Next.js App Router. 
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  /**
   * useCdn: false 
   * Essential for 'published' perspective and on-demand revalidation.
   * It ensures you fetch directly from the Content Lake for the latest data.
   */
  useCdn: false, 
  
  /**
   * perspective: 'published'
   * Ensures the client only fetches documents that have been officially published.
   */
  perspective: 'published',

  /**
   * Visual Editing (Stega)
   * Enables 'Content Source Maps', allowing editors to click elements on the 
   * live site to jump directly to that field in the Sanity Studio.
   */
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development',
    studioUrl: '/studio', // Points to where your Sanity Studio is hosted
  },
})

/**
 * Data Fetching Wrapper
 * ---------------------
 * A helper to fetch data with Next.js 'revalidate' tags.
 * Usage: const data = await fetchSanity(QUERY, { category: 'visionary' });
 */
export async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags?: string[]
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      // Revalidates every 60 seconds, or you can use on-demand revalidation tags
      revalidate: 60,
      tags: tags,
    },
  });
}