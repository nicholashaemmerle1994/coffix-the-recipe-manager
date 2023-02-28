export async function up(sql) {
  await sql`
CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE users;
`;
}
