export async function up(sql) {
  await sql`
CREATE TABLE profiles (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id),
    bio VARCHAR(500)
);
  `;
}

export async function down(sql) {
  await sql`
  DROP TABLE profiles;
`;
}
