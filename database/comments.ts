import { cache } from 'react';
import { sql } from './connect';

type Comment = {
  userId: number;
  recipeId: number;
  content: string;
};
type SQLComment = {
  id: number;
  user_id: number;
  recipe_id: number;
  comment: string;
}[];

// Create a new comment
export const createComment = cache(async (comment: Comment) => {
  const newComment = await sql<SQLComment[]>`
    INSERT INTO comments (user_id, recipe_id, comment)
    VALUES (${comment.userId}, ${comment.recipeId}, ${comment.content})
    RETURNING *
  `;
  return newComment;
});

// Get all comments for a recipe ordered by date
export const getComments = cache(async (recipeId: number) => {
  const comments = await sql`
    SELECT * FROM comments
    WHERE recipe_id = ${recipeId}
    ORDER BY created_at DESC
  `;
  return comments;
});

// Delete a comment
export const deleteComment = cache(async (commentId: number) => {
  const comment = await sql`
    DELETE FROM comments
    WHERE id = ${commentId}
    RETURNING *
  `;
  return comment[0];
});

// Update a comment
export const updateComment = cache(
  async (commentId: number, content: string) => {
    const comment = await sql`
    UPDATE comments
    SET comment = ${content}
    WHERE id = ${commentId}
    RETURNING *
  `;
    return comment[0];
  },
);

// Get
