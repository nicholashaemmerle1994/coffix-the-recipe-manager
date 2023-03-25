import { NextRequest, NextResponse } from 'next/server';
import { deleteCommentOnComment } from '../../../../database/commentOnComment';

// DELETE SPECIFIC COMMENT ON COMMENT

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  const deleted = await deleteCommentOnComment(body.commentId);
  return NextResponse.json({ deleted: deleted });
}
