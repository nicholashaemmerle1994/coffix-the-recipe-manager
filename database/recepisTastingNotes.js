import { cache } from 'react';
import { sql } from './connect';

export async function insertTastingNoteTable(tastingNotes) {
  return await sql`
  INSERT INTO recipes_tastingnotes ${sql(
    tastingNotes,
    'tasting_note_id',
    'recipe_id',
  )}
`;
}
