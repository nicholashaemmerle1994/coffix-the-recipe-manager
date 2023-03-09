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

// select all tasting notes for the single recipe_id and give them back in an single object

export const getSingleRecipeWithTastingNotes = cache(async (recipeId) => {
  return await sql`
  SELECT
    recipes.user_id,
    recipes.category_id,
    recipes.created_at,
    recipes.coffee,
    recipes.roaster,
    recipes.amount_in,
    recipes.amount_out,
    recipes.grind_size,
    recipes.brew_temperature,
    recipes.brew_time_minutes,
    recipes.brew_time_seconds,
    recipes.notes,
    recipes.picture_url,
    recipes.id,
    recipes_tastingnotes.tasting_note_id
  FROM
    recipes
  INNER JOIN recipes_tastingnotes ON recipes.id = recipes_tastingnotes.recipe_id
  WHERE
    recipes.id = ${recipeId}
`;
});
