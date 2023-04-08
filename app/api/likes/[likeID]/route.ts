import { NextRequest, NextResponse } from 'next/server';
import { checkLike } from '../../../../database/likes';

type LikesRespondBody = {
  likes: number;
};

export async function GET(
  request: NextRequest,
): Promise<NextResponse<LikesRespondBody>> {
  const body = await request.json();
  const userId = Number(body.userId);
  if (!userId) {
    return NextResponse.json({ error: 'No user id' }, { status: 400 });
  }

  const likes = await checkLike(body.userId, body.recipeId);
  return NextResponse.json({ likes: likes });
}
