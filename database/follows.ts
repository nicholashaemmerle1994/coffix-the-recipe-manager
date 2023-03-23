import { cache } from 'react';
import { sql } from './connect';

type Follow = {
  id: number;
  userId: number;
  followedUserId: number;
};

type CreateFollow = {
  userId: number;
  followedUserId: number;
};

// Create a new follow with cache

export const createFollow = cache(
  async (userId: number, followedUserId: number) => {
    const follow = await sql<CreateFollow[]>`
    INSERT INTO follows (user_id, followed_user_id)
    VALUES (${userId}, ${followedUserId})
  `;
    return follow;
  },
);

// Get all follows for a user with cache

export const getFollows = cache(async (userId: number) => {
  const follows = await sql<Follow[]>`
    SELECT * FROM follows
    WHERE user_id = ${userId}
  `;
  return follows;
});

// Delete a follow

export const deleteFollow = cache(
  async (userId: number, followedUserId: number) => {
    const follow = await sql<Follow[]>`
    DELETE FROM follows
    WHERE user_id = ${userId} AND followed_user_id = ${followedUserId}
    RETURNING *
  `;
    return follow;
  },
);

// check if the logged in user is following another user

export const isFollowing = cache(
  async (userId: number, followedUserId: number) => {
    const follow = await sql<Follow[]>`
    SELECT * FROM follows
    WHERE user_id = ${userId} AND followed_user_id = ${followedUserId}
  `;
    return follow;
  },
);
