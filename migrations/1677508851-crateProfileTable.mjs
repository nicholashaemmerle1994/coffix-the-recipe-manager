export async function up(sql) {
  await sql`
CREATE TABLE profile (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id),
    bio VARCHAR(500)
);
  `;
}

export async function down(sql) {
  await sql`
  DROP TABLE profile;
`;
}
