const notes = [
  {
    tasting_note_id: 33,
    recipe_id: 1,
  },
  {
    tasting_note_id: 10,
    recipe_id: 2,
  },
  {
    tasting_note_id: 2,
    recipe_id: 1,
  },
  {
    tasting_note_id: 28,
    recipe_id: 1,
  },
  {
    tasting_note_id: 29,
    recipe_id: 13,
  },
  {
    tasting_note_id: 12,
    recipe_id: 2,
  },
  {
    tasting_note_id: 10,
    recipe_id: 4,
  },
  {
    tasting_note_id: 19,
    recipe_id: 7,
  },
  {
    tasting_note_id: 5,
    recipe_id: 15,
  },
  {
    tasting_note_id: 9,
    recipe_id: 11,
  },
  {
    tasting_note_id: 6,
    recipe_id: 9,
  },
  {
    tasting_note_id: 15,
    recipe_id: 3,
  },
  {
    tasting_note_id: 33,
    recipe_id: 4,
  },
  {
    tasting_note_id: 12,
    recipe_id: 5,
  },
  {
    tasting_note_id: 5,
    recipe_id: 6,
  },
  {
    tasting_note_id: 1,
    recipe_id: 7,
  },
  {
    tasting_note_id: 6,
    recipe_id: 8,
  },
  {
    tasting_note_id: 18,
    recipe_id: 9,
  },
  {
    tasting_note_id: 22,
    recipe_id: 10,
  },
  {
    tasting_note_id: 29,
    recipe_id: 11,
  },
  {
    tasting_note_id: 31,
    recipe_id: 12,
  },
  {
    tasting_note_id: 10,
    recipe_id: 13,
  },
  {
    tasting_note_id: 12,
    recipe_id: 14,
  },
  {
    tasting_note_id: 5,
    recipe_id: 15,
  },
  {
    tasting_note_id: 6,
    recipe_id: 16,
  },
  {
    tasting_note_id: 18,
    recipe_id: 17,
  },
  {
    tasting_note_id: 22,
    recipe_id: 18,
  },
  {
    tasting_note_id: 29,
    recipe_id: 19,
  },
  {
    tasting_note_id: 31,
    recipe_id: 17,
  },
];

export async function up(sql) {
  await sql`
  INSERT INTO recipes_tastingnotes ${sql(notes, 'tasting_note_id', 'recipe_id')}
  `;
}

export async function down(sql) {
  await sql`DELETE FROM recipes_tastingnotes`;
}
