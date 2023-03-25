import { cache } from 'react';
import { sql } from './connect';

// Comment on comment with cache
type Comment = {
  commentId: number;
  userId: number;
  comment: string;
  recipeId: number;
};

type CommentOnCommentReturn = {
  id: number;
  comment_id: number;
  user_id: number;
  comment: string;
  created_at: string;
};

export const createCommentOnComment = cache(async (comment: Comment) => {
  const newComment = await sql<[CommentOnCommentReturn]>`
    INSERT INTO comments_on_comments (comment_id, user_id, comment, recipe_id)
    VALUES (${comment.commentId}, ${comment.userId}, ${comment.comment}, ${comment.recipeId})
  `;
  return newComment;
});

export const getCommentsOnComment = cache(async (recipeId: number) => {
  const comments = await sql<[CommentOnCommentReturn]>`
    SELECT comments_on_comments.*, users.picture_url, users.first_name FROM comments_on_comments
    LEFT JOIN users ON comments_on_comments.user_id = users.id
    WHERE recipe_id = ${recipeId}
    ORDER BY created_at ASC
  `;
  return comments;
});

export const deleteCommentOnComment = cache(
  async (commentsOnCommentId: number) => {
    const deletedComment = await sql<[CommentOnCommentReturn]>`
    DELETE FROM comments_on_comments
    WHERE id = ${commentsOnCommentId}
  `;
    return deletedComment;
  },
);

// export const testQuery = cache(async () => {
//   const test = await sql<[CommentOnCommentReturn]>`
// SELECT
//   recipes.user_id as r_user_id,
//   users.first_name as u_first_name,
//   users.picture_url as u_picture_url,
//   recipes.picture_url as r_picture_url,
//   categories.name as c_name,
//   recipes.created_at as r_created_at,
//   recipes.coffee as r_coffee,
//   recipes.roaster as r_roaster,
//   recipes.amount_in as r_amount_in,
//   recipes.amount_out as r_amount_out,
//   recipes.grind_size as r_grind_size,
//   recipes.brew_temperature as r_brew_temperature,
//   recipes.brew_time_minutes as r_brew_time_minutes,
//   recipes.brew_time_seconds as r_brew_time_seconds,
//   recipes.notes as r_notes,
//   recipes_tastingnotes.tasting_note_id as r_tasting_note_id,
//   comments.id as c_id,
//   comments.user_id as c_user_id,
//   comments.comment as c_comment,
//   comments.created_at as c_created_at,
//   comments_on_comments.id as coc_id,
//   users.first_name as coc_first_name,
//   users.picture_url as coc_picture_url,
//   comments_on_comments.comment as coc_comment
// FROM
//   recipes
//   LEFT JOIN users ON recipes.user_id = users.id
//   LEFT JOIN recipes_tastingnotes ON recipes.id = recipes_tastingnotes.recipe_id
//   LEFT JOIN comments ON recipes.id = comments.recipe_id
//   LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id
//   LEFT JOIN comments_on_comments ON comments.id = comments_on_comments.comment_id
//   LEFT JOIN users AS comment_on_comment_users ON comments_on_comments.user_id = comment_on_comment_users.id
//   LEFT JOIN categories ON recipes.category_id = categories.id
// WHERE
//   recipes.id = 1
//   `;
//   return test;
// });
