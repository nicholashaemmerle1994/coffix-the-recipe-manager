import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { insertTastingNoteTable } from '../../../database/recepisTastingNotes';
import { createFullRecipe } from '../../../database/recipes';
import { getUserBySessionToken } from '../../../database/users';
import { validateCsrfToken } from '../../../utils/csrf';

type FormBody = {
  userId: number;
  categoryId: number;
  coffee: string;
  roaster: string;
  amountIn: number;
  amountOut: number;
  grindSize: number;
  brewTemperature: number;
  brewTimeMinutes: number;
  brewTimeSeconds: number;
  notes: string;
  pictureUrl: string;
  tastingNotes: {
    tasting_note_id: number;
    category: string;
    tasting_note_name: string;
  }[];
  csrfToken: string;
};

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }
  const body: FormBody = await request.json();
  const recipeBody = {
    userId: body.userId,
    categoryId: body.categoryId,
    coffee: body.coffee,
    roaster: body.roaster,
    amountIn: body.amountIn,
    amountOut: body.amountOut,
    grindSize: body.grindSize,
    brewTemperature: body.brewTemperature,
    brewTimeMinutes: body.brewTimeMinutes,
    brewTimeSeconds: body.brewTimeSeconds,
    notes: body.notes,
    pictureUrl: body.pictureUrl,
  };

  if (!validateCsrfToken(user.csrfSecret, body.csrfToken)) {
    return NextResponse.json(
      {
        error: 'CSRF token is not valid',
      },
      { status: 400 },
    );
  }

  // validate csrf token to male sure the request is coming from my server and not a hacker

  const newRecipe = await createFullRecipe(recipeBody);

  // Create an array with all the tasting notes (id, tasting_note_name, category, recipe_id)
  const newestBody = body.tastingNotes.map((tastingNote) => {
    return {
      tasting_note_id: tastingNote.tasting_note_id,
      tasting_note_name: tastingNote.tasting_note_name,
      category: tastingNote.category,
      recipe_id: newRecipe[0]!.id,
    };
  });
  // if newest body is an empty object, return the new recipe
  if (newestBody.length === 0) {
    return NextResponse.json({ newRecipe: newRecipe });
  }
  // if newest body is not an empty object, insert the tasting notes

  await insertTastingNoteTable(newestBody);
  return NextResponse.json({ newRecipe: newRecipe });
}
