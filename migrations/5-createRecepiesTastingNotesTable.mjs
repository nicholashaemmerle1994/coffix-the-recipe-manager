export async function up(sql) {
  await sql`
    CREATE TABLE recipes_tastingnotes (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    tasting_note_name varchar(100),
    recipe_id integer NOT NULL REFERENCES recipes (id) ON DELETE CASCADE
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE recipes_tastingnotes;
`;
}
