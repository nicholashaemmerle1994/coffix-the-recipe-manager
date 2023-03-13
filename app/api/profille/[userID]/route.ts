import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getUserBySessionToken, updateUser } from '../../../../database/users';

export async function GET() {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'user not found' });
  }
  // 4. return the user profile

  return NextResponse.json({ user: user });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string[]> },
) {
  const userId = Number(params.userID);
  if (!userId) {
    return NextResponse.json({ error: 'No user id' }, { status: 400 });
  }

  const body = await request.json();

  const freshUser = await updateUser(
    body.userId,
    body.firstName,
    body.lastName,
    body.bio,
    body.pictureUrl,
  );

  return NextResponse.json({ user: freshUser });
}
