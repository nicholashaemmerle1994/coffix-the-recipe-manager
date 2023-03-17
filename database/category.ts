import { cache } from 'react';
import { sql } from './connect';

type Category = {
  id: number;
  name: string;
  icon: string;
  siteName: string;
};
type CategoryName = {
  name: string;
};

// Get all categories
export const getCategory = cache(async () => {
  const categories = await sql<Category[]>`SELECT * FROM categories`;
  return categories;
});

// Ger category_name by id of catergoryId of the recipes
export const getCategoryNameById = cache(async (categoryId: number) => {
  const categoryName = await sql<CategoryName[]>`
  SELECT
    name
  FROM
  categories
  WHERE
  id = ${categoryId}`;
  return categoryName;
});
