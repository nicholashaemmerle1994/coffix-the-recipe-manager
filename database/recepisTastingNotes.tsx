// import { cache } from 'react';
// import { sql } from './connect';

// // function to set insert into the table
// type TastingNote = {
//   id: number;
//   category: string;
//   name: string;
// }[];
// type RecipeTastingNotes = {
//   id: number;
//   tastingNoteName: string;
//   recipeId: number;
// };

// export const insertTastingNotes = cache(
//   async (tastingNotes: TastingNote, recipeId: number) => {

//     //   const recipeTastingNotes = await sql<RecipeTastingNotes[]>`

//     //   INSERT INTO recipes_tastingnotes (tasting_note_name, recipe_id)
//     //   VALUES (${singleTastingNote}, ${recipeId})
//     //   RETURNING *
//     // `;
//     return tastingNotes;
//   },
// );
