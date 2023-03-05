import { cache } from 'react';
import { sql } from './connect';

export async function insertTastingNoteTable(tastingNotes) {
  await sql`
  INSERT INTO recipes_tastingnotes ${sql(
    tastingNotes,
    'tasting_note_name',
    'recipe_id',
  )}
`;
}

export const insertTastingNoteTable1 = cache(async (tastingNotes) => {
  await sql`
    INSERT INTO recipes_tastingnotes ${sql(
      tastingNotes,
      'tasting_note_name',
      'recipe_id',
    )}
  `;
});
