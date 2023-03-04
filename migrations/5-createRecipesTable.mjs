export async function up(sql) {
  await sql`
    CREATE TABLE recipes (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id) ON DELETE CASCADE,
    category_name varchar(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    coffee varchar(100) NOT NULL,
    roaster varchar(100) NOT NULL,
    amount_in integer NOT NULL,
    amount_out integer NOT NULL,
    grind_size integer NOT NULL,
    brew_temperature integer NOT NULL,
    brew_time_minutes integer,
    brew_time_seconds integer,
    notes varchar(500)
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE recipes;
`;
}
