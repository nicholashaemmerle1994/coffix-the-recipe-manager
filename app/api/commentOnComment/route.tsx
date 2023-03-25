import { NextRequest, NextResponse } from 'next/server';
import {
  createCommentOnComment,
  getCommentsOnComment,
} from '../../../database/commentOnComment';

type CommentOnCommentBody = {
  commentId: number;
  userId: number;
  comment: string;
  recipeId: number;
};
type Body = {
  commentId: number;
  userId: number;
  comment: string;
  recipeId: number;
};

// GET ALL COMMENTS FOR A SINGLE COMMENT
export async function GET(request: NextRequest) {
  const body = await request.json();
  const recipeId = body.commentId;
  if (!recipeId) return NextResponse.json({ comments: [] });
  const comments = await getCommentsOnComment(recipeId);
  return NextResponse.json({ comments: comments });
}

// CREATE A NEW COMMENT FOR A COMMENT

export async function POST(request: NextRequest) {
  const body: Body = await request.json();

  const commentBody: CommentOnCommentBody = {
    commentId: body.commentId,
    userId: body.userId,
    comment: body.comment,
    recipeId: body.recipeId,
  };

  const newComment = await createCommentOnComment(commentBody);
  return NextResponse.json({ newComment: newComment });
}
