import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { createUser, getUserByUsername } from '../../../../database/users';
import { createSerializedCookie } from '../../../../utils/cookies';
import { createCsrfSecret } from '../../../../utils/csrf';

const userSchema = z.object({
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  pictureUrl: z.string(),
});
export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };
export const POST = async (request: NextRequest) => {
  // 1. validate the data
  const body = await request.json();
  const result = userSchema.safeParse(body);
  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages

    return NextResponse.json(
      {
        errors: result.error.issues,
      },
      { status: 400 },
    );
  }
  // check if the string is empty
  if (!result.data.userName || !result.data.password) {
    return NextResponse.json(
      {
        errors: [
          {
            message:
              'Username or Password is empty - please fill out the forms!',
          },
        ],
      },
      { status: 400 },
    );
  }
  // 2. check if the user already exist
  // 2.a compare the username with the database
  const user = await getUserByUsername(result.data.userName);
  if (user) {
    return NextResponse.json(
      {
        errors: [
          { message: 'Username is already taken - please choose another one!' },
        ],
      },
      { status: 400 },
    );
  }
  // 3. hash the password
  const passwordHash = await bcrypt.hash(result.data.password, 12);
  // 4. create the user
  const newUser = await createUser(
    result.data.userName,
    result.data.firstName,
    result.data.lastName,
    passwordHash,
    result.data.pictureUrl,
  );
  if (!newUser) {
    return NextResponse.json(
      {
        errors: [{ message: 'Internal Server Error - User Creation failed!' }],
      },
      { status: 500 },
    );
  }
  const token = crypto.randomBytes(80).toString('base64');

  const csrfSecret = createCsrfSecret();

  // - create the session
  const session = await createSession(token, newUser.id, csrfSecret);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'session creation failed' }] },
      { status: 500 },
    );
  }

  const serializedCookie = createSerializedCookie(session.token);

  // 5. return the new username
  return NextResponse.json(
    { user: { username: newUser.userName } },
    { status: 200, headers: { 'Set-Cookie': serializedCookie } },
  );
};
