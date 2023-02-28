export async function up(sql) {
  await sql`
    CREATE TABLE recepiestastingnotes (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    tasting_note_id integer NOT NULL,
    recipe_id integer NOT NULL REFERENCES recipes (id)
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE recepiestastingnotes;
`;
}
