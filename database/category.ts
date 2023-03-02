import { cache } from 'react';
import { sql } from './connect';

type Category = {
  id: number;
  name: string;
  icon: string;
  siteName: string;
};

// Get all categories
export const getCategory = cache(async () => {
  const categories = await sql<Category[]>`SELECT * FROM categories`;
  return categories;
});
