export async function up(sql) {
  await sql`
    CREATE TABLE likes (
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id integer NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, recipe_id)
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE likes;
`;
}
