import { cache } from 'react';
import { sql } from './connect';

// Function to insert tasting notes into the database
export const insertTastingNoteTable = cache(async (tastingNotes) => {
  return await sql`
  INSERT INTO recipes_tastingnotes ${sql(
    tastingNotes,
    'tasting_note_id',
    'recipe_id',
  )}
`;
});

// Function to get all tasting notes from specific recipe from the database
export const getTastingNotesFromRecipe = cache(async (recipeId) => {
  return await sql`
  SELECT
    *
  FROM
    recipes_tastingnotes
  WHERE
    recipe_id = ${recipeId}
`;
});
