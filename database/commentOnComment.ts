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
  recipe_id: number;
  created_at: Date;
  first_name: string | null;
  user_name: string | null;
  picture_url: string | null;
};

export const createCommentOnComment = cache(async (comment: Comment) => {
  const newComment = await sql<CommentOnCommentReturn[]>`
    INSERT INTO comments_on_comments (comment_id, user_id, comment, recipe_id)
    VALUES (${comment.commentId}, ${comment.userId}, ${comment.comment}, ${comment.recipeId})
  `;
  return newComment;
});

export const getCommentsOnComment = cache(async (recipeId: number) => {
  const comments = await sql<[CommentOnCommentReturn]>`
    SELECT comments_on_comments.*, users.picture_url, users.first_name, users.user_name FROM comments_on_comments
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
