export async function up(sql) {
  await sql`
    CREATE TABLE follows (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    followed_user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE follows;
`;
}
