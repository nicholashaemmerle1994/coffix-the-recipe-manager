export async function up(sql) {
  await sql`
    CREATE TABLE comments_on_comments (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    comment_id integer NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment text NOT NULL,
    recipe_id integer NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    created_at timestamp NOT NULL DEFAULT NOW()
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE comments_on_comments;
`;
}
