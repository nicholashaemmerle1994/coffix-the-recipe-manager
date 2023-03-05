import { cache } from 'react';
import { sql } from './connect';

type User = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
};

type CreateUser = {
  id: number;
  userName: string;
};

// function to get user by username

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      user_name = ${username}
    ;
  `;

  return user;
});
// create a new user

export const createUser = cache(
  async (
    userName: string,
    firstName: string,
    lastName: string,
    passwordHash: string,
  ) => {
    const [user] = await sql<{ id: number; userName: string }[]>`
    INSERT INTO users (user_name, first_name, last_name, password_hash)
    VALUES (${userName}, ${firstName}, ${lastName}, ${passwordHash})
    RETURNING id, user_name;
  `;
    console.log('createUser function', user);
    return user;
  },
);

export async function createUser1(
  userName: string,
  firstName: string,
  lastName: string,
  passwordHash: string,
) {
  const user = await sql<{ id: number; userName: string }[]>`
    INSERT INTO users (user_name, first_name, last_name, password_hash)
    VALUES (${userName}, ${firstName}, ${lastName}, ${passwordHash})
    RETURNING id, user_name;
  `;
  console.log('createUser function', user);
  return user;
}

// INSERT INTO users (user_name, first_name, last_name, password_hash)
// VALUES ('test', 'test', 'test', 'test')
// RETURNING id, user_name;
