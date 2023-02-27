export async function up(sql) {
  await sql`
  CREATE TABLE category (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    icon varchar(100) NOT NULL,
    site_name varchar(100) NOT NULL
);
  `;
}

export async function down(sql) {
  await sql`
  DROP TABLE category;
`;
}
