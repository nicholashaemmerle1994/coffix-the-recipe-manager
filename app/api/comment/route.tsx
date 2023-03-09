import { NextRequest, NextResponse } from 'next/server';
import { createComment, getComments } from '../../../database/comments';

type CommentBody = {
  userId: number;
  recipeId: number;
  content: string;
};

// GET ALL COMMENTS FOR A SINGLE RECIPE

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string[]> },
) {
  const recipeId = Number(params.recipesId);
  if (!recipeId) {
    return NextResponse.json({ error: 'No recipe id' }, { status: 400 });
  }
  const comments = await getComments(recipeId);
  return NextResponse.json({ comments: comments });
}

// CREATE A NEW COMMENT FOR A RECIPE

export async function POST(request: NextRequest) {
  const body = await request.json();

  const coemmentBody: CommentBody = {
    userId: body.userId,
    recipeId: body.recipeId,
    content: body.content,
  };

  const newComment = await createComment(coemmentBody);
  return NextResponse.json({ newComment: newComment });
}
