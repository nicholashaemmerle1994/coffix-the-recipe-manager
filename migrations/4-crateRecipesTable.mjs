export async function up(sql) {
  await sql`
    CREATE TABLE recipes (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id),
    category_id integer REFERENCES categories (id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    coffee varchar(100) NOT NULL,
    roaster varchar(100) NOT NULL,
    amount_in integer NOT NULL,
    amount_out integer NOT NULL,
    grind_size integer NOT NULL,
    brew_temperatur integer NOT NULL,
    brew_time integer NOT NULL,
    notes varchar(500)
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE recipes;
`;
}
