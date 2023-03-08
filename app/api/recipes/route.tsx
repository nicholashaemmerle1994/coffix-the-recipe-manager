import { NextRequest, NextResponse } from 'next/server';
import { insertTastingNoteTable } from '../../../database/recepisTastingNotes';
import {
  createFullRecipe,
  getAllRecipes,
  getRecipeWithLimit,
  getRecipeWithLimitAndOffset,
  getRecipeWithOffsetAndLimit,
} from '../../../database/recipes';

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
  tastingNotes: {
    id: number;
    category: string;
    tasting_note_name: string;
  }[];
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  if (!limit || !offset) {
    return NextResponse.json({ error: 'No limit and offset' }, { status: 400 });
  }

  const recipes = await getRecipeWithLimitAndOffset(limit, offset);
  return NextResponse.json({ recipes: recipes });
}

export async function POST(request: NextRequest) {
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
  };
  const newRecipe = await createFullRecipe(recipeBody);

  // Create an array with all the tasting notes (id, tasting_note_name, category, recipe_id)
  const newestBody = body.tastingNotes.map((tastingNote) => {
    return {
      id: tastingNote.id,
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
