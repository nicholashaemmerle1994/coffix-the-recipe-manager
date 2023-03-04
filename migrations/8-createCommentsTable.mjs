export async function up(sql) {
  await sql`
  CREATE TABLE comments (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id) ON DELETE CASCADE,
    post_id integer REFERENCES posts (id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    comment VARCHAR(500) NOT NULL
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE comments;
`;
}
