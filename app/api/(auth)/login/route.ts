import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { getUserWithPassword } from '../../../../database/users';
import { createSerializedCookie } from '../../../../utils/cookies';

const userSchema = z.object({
  userName: z.string(),
  password: z.string(),
});
export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };

// Making the login route

export const POST = async (request: NextRequest) => {
  // check if the stings are empty
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
  // 2. check if the user exist
  // 2.a compare the username with the database
  const userWitchPassword = await getUserWithPassword(result.data.userName);
  if (!userWitchPassword) {
    return NextResponse.json(
      {
        errors: [{ message: 'User or password is wrong' }],
      },
      { status: 400 },
    );
  }
  // 3. compare the password
  const passwordMatch = await bcrypt.compare(
    result.data.password,
    userWitchPassword.passwordHash,
  );
  if (!passwordMatch) {
    return NextResponse.json(
      {
        errors: [{ message: 'User or password is wrong' }],
      },
      { status: 400 },
    );
  }

  // 4. create the session
  //  4.a create a session token
  const token = crypto.randomBytes(80).toString('base64');

  //  4.b create the session
  const session = await createSession(token, userWitchPassword.id);
  //  4.c attach the new cookie to the  header of the response

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Something went wrong' }] },
      { status: 500 },
    );
  }

  const serializedCookie = createSerializedCookie(session.token);

  // 5. return the user
  return NextResponse.json(
    { user: { username: userWitchPassword.userName } },
    { status: 200, headers: { 'Set-Cookie': serializedCookie } },
  );
};
