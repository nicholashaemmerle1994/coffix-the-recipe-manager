import { cache } from 'react';
import { sql } from './connect';

export type RecipeSQL = {
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

//  Get recipes by user id
export const getRecipeByUserId = cache(async (userId: number) => {
  const recipes = await sql<RecipeSQL[]>`
  SELECT
  *
  FROM
  recipes
  WHERE
  user_id = ${userId}`;
  return recipes;
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

// Get single recipe by id, with tasting notes from recipes_tastingnotes related to the recipe, comments and comments on comments related to the comment id

export const getRecipeWithTastingNotesAndComments = cache(
  async (recipeId: number) => {
    const recipe = await sql<RecipeSQL[]>`
    SELECT
    recipes.id as r_id,
    recipes.user_id as r_user_id,
    recipes.category_id as r_category_id,
    recipes.created_at as r_created_at,
    recipes.coffee as r_coffee,
    recipes.roaster as r_roaster,
    recipes.amount_in as r_amount_in,
    recipes.amount_out  as r_amount_out,
    recipes.grind_size as r_grind_size,
    recipes.brew_temperature as r_brew_temperature,
    recipes.brew_time_minutes as r_brew_time_minutes,
    recipes.brew_time_seconds as r_brew_time_seconds,
    recipes.notes as r_notes,
    recipes.picture_url as r_picture_url,
    recipes_tastingnotes.tasting_note_id as r_tasting_note_id,
    recipes_tastingnotes.recipe_id as r_recipe_id,
    comments.id as c_id,
    comments.user_id as c_user_id,
    comments.recipe_id as c_recipe_id,
    comments.created_at as c_created_at,
    comments.comment as c_comment,
    comments_on_comments.id as coc_id,
    comments_on_comments.user_id as coc_user_id,
    comments_on_comments.comment_id as coc_comment_id,
    comments_on_comments.comment as coc_comment
    FROM
    recipes
    LEFT JOIN recipes_tastingnotes ON recipes.id = recipes_tastingnotes.recipe_id
    LEFT JOIN comments ON recipes.id = comments.recipe_id
    LEFT JOIN comments_on_comments ON comments.id = comments_on_comments.comment_id
    WHERE
    recipes.id = ${recipeId}`;
    return recipe;
  },
);
