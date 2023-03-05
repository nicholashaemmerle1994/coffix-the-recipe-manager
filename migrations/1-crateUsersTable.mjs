export async function up(sql) {
  await sql`
CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password_hash VARCHAR(100) NOT NULL UNIQUE
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE users;
`;
}
