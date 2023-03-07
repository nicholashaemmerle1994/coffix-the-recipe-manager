import { cache } from 'react';
import { sql } from './connect';

type User = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
};

export type GetUser = {
  id: number;
  userName: string;
};

type CreateUser = {
  id: number;
  userName: string;
};

// function to get user by username

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<GetUser[]>`
    SELECT
      id,
      user_name
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
    return user;
  },
);

// compare function for login

export const getUserWithPassword = cache(async (username: string) => {
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

// get user with session token

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<{ id: number; userName: string }[]>`
  SELECT
    users.id,
    users.user_name
  FROM
    users
  INNER JOIN
    sessions ON (
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
    )
  `;
  return user;
});
