export async function up(sql) {
  await sql`
  CREATE TABLE posts (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    recipe_id integer REFERENCES recipes (id) ON DELETE CASCADE
);
  `;
}

export async function down(sql) {
  await sql`
  DROP TABLE posts;
`;
}
