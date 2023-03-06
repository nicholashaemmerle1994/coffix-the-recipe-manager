import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, getUserByUsername } from '../../../../database/users';

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
    // console.log(result.error.issues);
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
  // 5. return the new username
  return NextResponse.json({ user: { username: newUser.userName } });
};
