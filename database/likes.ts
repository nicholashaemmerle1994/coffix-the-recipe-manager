import { cache } from 'react';
import { sql } from './connect';

type Like = {
  userId: number;
  recipeId: number;
};

type CreateLike = {
  userId: number;
  recipeId: number;
};

// Create a new like with cache

export const createLike = cache(async (userId: number, recipeId: number) => {
  const like = await sql<CreateLike[]>`
    INSERT INTO likes (user_id, recipe_id)
    VALUES (${userId}, ${recipeId})
  `;
  return like;
});

// Get all likes for a post with cache

export const getLikes = cache(async (recipeId: number) => {
  const likes = await sql<Like[]>`
    SELECT * FROM likes
    WHERE recipe_id = ${recipeId}
  `;
  return likes;
});

// Delete a like

export const deleteLike = cache(async (userId: number, recipeId: number) => {
  const like = await sql<Like[]>`
    DELETE FROM likes
    WHERE user_id = ${userId} AND recipe_id = ${recipeId}
    RETURNING *
  `;
  return like;
});

// check if the looged user already liked a post

export const checkLike = cache(async (userId: number, recipeId: number) => {
  const like = await sql<Like[]>`
    SELECT * FROM likes
    WHERE user_id = ${userId} AND recipe_id = ${recipeId}
  `;
  return like;
});

// Get all likes for a user

export const getUserLikes = cache(async (userId: number) => {
  const likes = await sql<Like[]>`
    SELECT * FROM likes
    WHERE user_id = ${userId}
  `;
  return likes;
});
