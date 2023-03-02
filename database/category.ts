import { cache } from 'react';
import { sql } from './connect';

// Get all categories
export const getCategory = cache(async () => {
  const categories = await sql`SELECT * FROM categories`;
  return categories;
});
