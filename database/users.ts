import { cache } from 'react';
import { sql } from './connect';

type User = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  bio: string | null;
  pictureUrl: string | null;
};

export type GetUser = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  pictureUrl: string | null;
  bio: string | null;
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
      user_name,
      first_name,
      last_name,
      picture_url,
      bio
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
    pictureUrl: string,
  ) => {
    const [user] = await sql<{ id: number; userName: string }[]>`
    INSERT INTO users (user_name, first_name, last_name, password_hash, picture_url)
    VALUES (${userName}, ${firstName}, ${lastName}, ${passwordHash}, ${pictureUrl})
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
export const updateUser = cache(
  async (userId: number, firstName: string, lastName: string, bio: string) => {
    const [user] = await sql<{ id: number; userName: string }[]>`
    UPDATE users
    SET first_name = ${firstName}, last_name = ${lastName}, bio = ${bio}
    WHERE id = ${userId}
    RETURNING id, user_name;
  `;
    return user;
  },
);

// Update user profile picture

export const updateUserPicture = cache(
  async (userId: number, pictureUrl: string) => {
    const [user] = await sql<{ id: number; userName: string }[]>`
    UPDATE users
    SET picture_url = ${pictureUrl}
    WHERE id = ${userId}
    RETURNING id, user_name;
  `;
    return user;
  },
);
