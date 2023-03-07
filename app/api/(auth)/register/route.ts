import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { createUser, getUserByUsername } from '../../../../database/users';
import { createSerializedCookie } from '../../../../utils/cookies';

const userSchema = z.object({
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
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
  );
  if (!newUser) {
    return NextResponse.json(
      {
        errors: [{ message: 'Internal Server Error - User Creation failed!' }],
      },
      { status: 500 },
    );
  }
  // 4. create the session
  //  4.a create a session token
  const token = crypto.randomBytes(80).toString('base64');

  //  4.b create the session
  const session = await createSession(token, newUser.id);
  //  4.c attach the new cookie to the  header of the response

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Something went wrong' }] },
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
