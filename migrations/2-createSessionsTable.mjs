export async function up(sql) {
  await sql`
CREATE TABLE sessions (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    token VARCHAR(110) NOT NULL,
    user_id integer NOT NULL REFERENCES users(id)
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE sessions;
`;
}
