import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error('Missing PUBLIC_SANITY_PROJECT_ID or PUBLIC_SANITY_DATASET. See web/.env');
}

// Runs at build time only. Fresh data (no CDN), published documents only (no drafts).
export const sanity = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: false,
  perspective: 'published',
});
