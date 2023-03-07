import { cache } from 'react';
import { sql } from './connect';

type RecipeSQL = {
  id: number;
  userId: number | null;
  categoryId: number | null;
  createdAt: Date;
  coffee: string;
  roaster: string;
  amountIn: number;
  amountOut: number;
  grindSize: number;
  brewTemperature: number | null;
  brewTimeMinutes: number | null;
  brewTimeSeconds: number | null;
  notes: string | null;
  pictureUrl: string | null;
  comments: string | null;
};

type Recipe = {
  id: number;
  userId: number;
  categoryId: number;
  coffee: string;
  roaster: string;
  amountIn: number;
  amountOut: number;
  grindSize: number;
  brewTemperature: number;
  brewTimeMinutes: number;
  brewTimeSeconds: number;
  notes: string;
};

// GET METHODS

// Get all recipes
export const getAllRecipes = cache(async () => {
  const recipes = await sql<RecipeSQL[]>`
  SELECT
  *
  FROM
  recipes`;
  return recipes;
});

// Get recipe by id
export const getRecipeById = cache(async (id: number) => {
  const recipe = await sql<RecipeSQL[]>`
  SELECT
  *
  FROM
  recipes
  WHERE
  id = ${id}`;
  return recipe;
});

// Get recipes by category
export const getRecipeByCategory = cache(async (category: number) => {
  const recipes = await sql<RecipeSQL[]>`
  SELECT
  *
  FROM
  recipes
  WHERE
  category_id  = ${category}`;
  return recipes;
});

// Get recipes with limit
export const getRecipeWithLimit = cache(async (limit: number) => {
  const recipes = await sql<RecipeSQL[]>`
  SELECT
  *
  FROM
  recipes
  LIMIT
  ${limit}`;
  return recipes;
});

// Get recipes with offset AND limit
export const getRecipeWithOffsetAndLimit = cache(
  async (offset: number, limit: number) => {
    const recipes = await sql<RecipeSQL[]>`
    SELECT
    *
    FROM
    recipes
    OFFSET ${offset}
    LIMIT ${limit}`;
    return recipes;
  },
);

// CREATE METHODS

// Create recipe
export const createFullRecipe = cache(async (recipe: Recipe) => {
  const newRecipe = await sql<RecipeSQL[]>`
      INSERT INTO recipes
        (category_id, coffee, roaster, amount_in,
        amount_out, grind_size, brew_temperature, brew_time_minutes,
        brew_time_seconds, notes)
      VALUES
        (${recipe.categoryId}, ${recipe.coffee}, ${recipe.roaster},
        ${recipe.amountIn}, ${recipe.amountOut}, ${recipe.grindSize},
        ${recipe.brewTemperature}, ${recipe.brewTimeMinutes}, ${recipe.brewTimeSeconds},
        ${recipe.notes})
      RETURNING
        *
    `;
  return newRecipe;
});
// DELETE METHOD

// Delete recipe by id
export const deleteRecipeById = cache(async (id: number) => {
  const deletedRecipe = await sql<RecipeSQL[]>`
  DELETE
  FROM
    recipes
  WHERE
    id = ${id}
    RETURNING *
  `;
  return deletedRecipe;
});

// UPDATE METHOD

// Update  full recipe by id
export const updateFullRecipeById = cache(
  async (id: number, recipe: Recipe) => {
    const updatedRecipe = await sql<RecipeSQL[]>`
      UPDATE recipes
        SET
      category_id = ${recipe.categoryId},
      coffee = ${recipe.coffee},
      roaster = ${recipe.roaster},
      amount_in = ${recipe.amountIn},
      amount_out = ${recipe.amountOut},
      grind_size = ${recipe.grindSize},
      brew_temperature = ${recipe.brewTemperature},
      brew_time_minutes = ${recipe.brewTimeMinutes},
      brew_time_seconds = ${recipe.brewTimeSeconds},
      notes = ${recipe.notes}
        WHERE id = ${id}
      RETURNING *
    `;
    return updatedRecipe;
  },
);
