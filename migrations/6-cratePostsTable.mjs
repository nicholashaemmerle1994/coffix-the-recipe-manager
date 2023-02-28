export async function up(sql) {
  await sql`
  CREATE TABLE posts (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id integer REFERENCES categories (id),
    user_id integer REFERENCES users (id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    tasting_note_id integer REFERENCES recepiestastingnotes (id)
);
  `;
}

export async function down(sql) {
  await sql`
  DROP TABLE posts;
`;
}
