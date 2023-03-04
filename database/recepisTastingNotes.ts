import { cache } from 'react';
import { sql } from './connect';

// function to set insert into the table
type TastingNote = {
  id: number;
  tasting_note_name: string;
  category: string;
  recipe_id: number;
}[];

export async function insertTastingNoteTable(tastingNotes: TastingNote) {
  console.log('tastingNotes', tastingNotes);
  await sql`
  INSERT INTO recipes_tastingnotes ${sql(
    tastingNotes,
    'tasting_note_name',
    'recipe_id',
  )}
`;
}

export const insertTastingNoteTable1 = cache(
  async (tastingNotes: TastingNote) => {
    await sql`
    INSERT INTO recipes_tastingnotes ${sql(
      tastingNotes,
      'tasting_note_name',
      'recipe_id',
    )}
  `;
  },
);
