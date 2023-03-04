export async function up(sql) {
  await sql`
  CREATE TABLE posts (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    recipe_id integer REFERENCES recipes (id) ON DELETE CASCADE,
    recipes_tastingnotes_id integer REFERENCES recipes_tastingnotes (id) ON DELETE CASCADE

);
  `;
}

export async function down(sql) {
  await sql`
  DROP TABLE posts;
`;
}
