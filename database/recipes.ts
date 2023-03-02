import { cache } from 'react';
import { sql } from './connect';

type Recipe = {
  user_id: number;
  category_name: string;
  coffee: string;
  roaster: string;
  amount_in: number;
  amount_out: number;
  grind_size: number;
  brew_temperature: number;
  brew_time_minutes: number;
  brew_time_seconds: number;
  notes: string;
};

// GET METHODS

// Get all recipes
export const getAllRecipes = cache(async () => {
  const recipes = await sql`SELECT * FROM recipes`;
  return recipes;
});

// Get recipe by id
export const getRecipeById = cache(async (id: number) => {
  const recipe = await sql`SELECT * FROM recipes WHERE id = ${id}`;
  return recipe;
});

// Get recipes by category
export const getRecipeByCategory = cache(async (category: string) => {
  const recipes =
    await sql`SELECT * FROM recipes WHERE category_name = ${category}`;
  return recipes;
});

// Get recipes with limit
export const getRecipeWithLimit = cache(async (limit: number) => {
  const recipes = await sql`SELECT * FROM recipes LIMIT ${limit}`;
  return recipes;
});

// Get recipes with offset AND limit
export const getRecipeWithOffsetAndLimit = cache(
  async (offset: number, limit: number) => {
    const recipes =
      await sql`SELECT * FROM recipes OFFSET ${offset} LIMIT ${limit}`;
    return recipes;
  },
);

// CREATE METHODS

// Create recipe
export const createFullRecipe = async (recipe: Recipe) => {
  const newRecipe = await sql`
      INSERT INTO recipes (user_id, category_name, coffee, roaster, amount_in, amount_out, grind_size, brew_temperature, brew_time_minutes, brew_time_seconds, notes)
      VALUES (${recipe.user_id}, ${recipe.category_name}, ${recipe.coffee}, ${recipe.roaster}, ${recipe.amount_in}, ${recipe.amount_out}, ${recipe.grind_size}, ${recipe.brew_temperature}, ${recipe.brew_time_minutes}, ${recipe.brew_time_seconds}, ${recipe.notes})

    `;
  return newRecipe;
};

// DELETE METHOD

// Delete recipe by id
export const deleteRecipeById = async (id: number) => {
  const deletedRecipe =
    await sql`DELETE FROM recipes WHERE id = ${id} RETURNING *`;
  return deletedRecipe;
};

// UPDATE METHOD

// Update  full recipe by id
export const updateFullRecipeById = async (id: number, recipe: Recipe) => {
  const updatedRecipe = await sql`
      UPDATE recipes
      SET user_id = ${recipe.user_id},
          category_name = ${recipe.category_name},
          coffee = ${recipe.coffee},
          roaster = ${recipe.roaster},
          amount_in = ${recipe.amount_in},
          amount_out = ${recipe.amount_out},
          grind_size = ${recipe.grind_size},
          brew_temperature = ${recipe.brew_temperature},
          brew_time_minutes = ${recipe.brew_time_minutes},
          brew_time_seconds = ${recipe.brew_time_seconds},
          notes = ${recipe.notes}
      WHERE id = ${id}
      RETURNING *
    `;
  return updatedRecipe;
};

// Update partial recipe by id without minutes
export const updateRecipeByIdWithoutMinutes = async (
  id: number,
  recipe: Recipe,
) => {
  const updatedRecipe = await sql`
      UPDATE recipes
      SET user_id = ${recipe.user_id},
          category_name = ${recipe.category_name},
          coffee = ${recipe.coffee},
          roaster = ${recipe.roaster},
          amount_in = ${recipe.amount_in},
          amount_out = ${recipe.amount_out},
          grind_size = ${recipe.grind_size},
          brew_temperature = ${recipe.brew_temperature},
          brew_time_seconds = ${recipe.brew_time_seconds},
          notes = ${recipe.notes}
      WHERE id = ${id}
      RETURNING *
    `;
  return updatedRecipe;
};

// Update partial recipe by id without notes

export const updateRecipeByIdWithoutNotes = async (
  id: number,
  recipe: Recipe,
) => {
  const updatedRecipe = await sql`
      UPDATE recipes
      SET user_id = ${recipe.user_id},
          category_name = ${recipe.category_name},
          coffee = ${recipe.coffee},
          roaster = ${recipe.roaster},
          amount_in = ${recipe.amount_in},
          amount_out = ${recipe.amount_out},
          grind_size = ${recipe.grind_size},
          brew_temperature = ${recipe.brew_temperature},
          brew_time_minutes = ${recipe.brew_time_minutes},
          brew_time_seconds = ${recipe.brew_time_seconds}
      WHERE id = ${id}
      RETURNING *
    `;
  return updatedRecipe;
};
