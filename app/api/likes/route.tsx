import { NextRequest, NextResponse } from 'next/server';
import { createLike, deleteLike, getLikes } from '../../../database/likes';

export async function GET(request: NextRequest) {
  const body = await request.json();
  const userId = Number(body.userId);
  if (!userId) {
    return NextResponse.json({ error: 'No user id' }, { status: 400 });
  }

  const likes = await getLikes(body.recipeId);
  return NextResponse.json({ likes: likes });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userId = body.userId;
  if (!userId) {
    return NextResponse.json({ error: 'No user id' }, { status: 400 });
  }

  const newLike = await createLike(userId, body.recipeId);
  return NextResponse.json({ like: newLike });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  const userId = body.userId;
  if (!userId) {
    return NextResponse.json({ error: 'No user id' }, { status: 400 });
  }

  const deletedLike = await deleteLike(userId, body.recipeId);
  return NextResponse.json({ deletedLike: deletedLike });
}
