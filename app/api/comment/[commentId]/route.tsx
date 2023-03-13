import { NextRequest, NextResponse } from 'next/server';
import { deleteComment } from '../../../../database/comments';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string[]> },
) {
  const commentId = Number(params.commentId);
  if (!commentId) {
    return NextResponse.json({ error: 'No recipe id' }, { status: 400 });
  }
  const deletedComment = await deleteComment(commentId);
  return NextResponse.json({ deletedComment: deletedComment });
}
