import { cache } from 'react';
import { sql } from './connect';

export type RecipeSQL = {
  id: number;
  userId: number;
  categoryId: number;
  createdAt: Date;
  coffee: string;
  roaster: string;
  amountIn: number;
  amountOut: number;
  grindSize: number;
  brewTemperature: number;
  brewTimeMinutes: number;
  brewTimeSeconds: number;
  notes: string;
  pictureUrl: string;
};

type UserRecipe = {
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
  pictureUrl: string;
};

// GET METHODS

// Get all recipes
export const getAllRecipes = cache(async () => {
  const recipes = await sql<RecipeSQL[]>`
    SELECT *
    FROM recipes
    ORDER BY created_at DESC
  `;
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
export const getRecipeWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const recipes = await sql<RecipeSQL[]>`
    SELECT
    *
    FROM
    recipes
    LIMIT ${limit}
    OFFSET ${offset}
    `;
    return recipes;
  },
);

// CREATE METHODS

// Create recipe
export const createFullRecipe = cache(async (recipe: UserRecipe) => {
  const newRecipe = await sql<RecipeSQL[]>`
      INSERT INTO recipes
        (user_id, category_id, coffee, roaster, amount_in,
        amount_out, grind_size, brew_temperature, brew_time_minutes,
        brew_time_seconds, notes, picture_url)
      VALUES
        (${recipe.userId}, ${recipe.categoryId}, ${recipe.coffee}, ${recipe.roaster},
        ${recipe.amountIn}, ${recipe.amountOut}, ${recipe.grindSize},
        ${recipe.brewTemperature}, ${recipe.brewTimeMinutes}, ${recipe.brewTimeSeconds},
        ${recipe.notes}, ${recipe.pictureUrl})
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
  async (id: number, recipe: UserRecipe) => {
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
