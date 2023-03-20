import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { deleteComment } from '../../../../database/comments';
import { getUserBySessionToken } from '../../../../database/users';
import { validateCsrfToken } from '../../../../utils/csrf';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string[]> },
) {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }
  const body = await request.json();
  if (!validateCsrfToken(user.csrfSecret, body.csrfToken)) {
    return NextResponse.json(
      {
        error: 'CSRF token is not valid',
      },
      { status: 400 },
    );
  }
  const commentId = Number(params.commentId);
  if (!commentId) {
    return NextResponse.json({ error: 'No recipe id' }, { status: 400 });
  }
  const deletedComment = await deleteComment(commentId);
  return NextResponse.json({ deletedComment: deletedComment });
}
