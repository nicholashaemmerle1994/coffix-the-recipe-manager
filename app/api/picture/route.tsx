import { NextRequest, NextResponse } from 'next/server';
import { updateUserPicture } from '../../../database/users';

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string[]> },
) {
  const body = await request.json();

  const newPic = updateUserPicture(body.userId, body.pictureUrl);

  return NextResponse.json({ user: newPic });
}
