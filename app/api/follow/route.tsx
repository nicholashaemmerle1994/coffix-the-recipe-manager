import { NextRequest, NextResponse } from 'next/server';
import {
  createFollow,
  deleteFollow,
  getFollows,
} from '../../../database/follows';

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string[]> },
) {
  const userId = Number(params.userId);
  if (!userId) {
    return NextResponse.json({ error: 'No user id' }, { status: 400 });
  }
  const comments = await getFollows(userId);
  return NextResponse.json({ comments: comments });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userId = body.userId;
  if (!userId) {
    return NextResponse.json({ error: 'No user id' }, { status: 400 });
  }

  const follow = await createFollow(userId, body.followedUserId);
  return NextResponse.json({ follow: follow });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const userId = body.userId;
  if (!userId) {
    return NextResponse.json({ error: 'No user id' }, { status: 400 });
  }

  const follow = await deleteFollow(userId, body.followedUserId);
  return NextResponse.json({ follow: follow });
}
