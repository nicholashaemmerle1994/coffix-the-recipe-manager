import { NextRequest, NextResponse } from 'next/server';
import { insertTastingNoteTable } from '../../../database/recepisTastingNotes';
import {
  createFullRecipe,
  getAllRecipes,
  getRecipeWithLimit,
} from '../../../database/recipes';

type FormBody = {
  id: number;
  userId: number;
  categoryName: string;
  coffee: string;
  roaster: string;
  amountIn: number;
  amountOut: number;
  grindSize: string;
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

  const recipes = limit
    ? await getRecipeWithLimit(Number(limit))
    : await getAllRecipes();
  return NextResponse.json({ recipes: recipes });
}

export async function POST(request: NextRequest) {
  const body: FormBody = await request.json();
  const recipeBody = {
    id: body.id,
    user_id: body.userId,
    categoryName: body.categoryName,
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

  const newestbody = body.tastingNotes.map((tastingNote) => {
    return {
      id: tastingNote.id,
      tasting_note_name: tastingNote.tasting_note_name,
      category: tastingNote.category,
      recipe_id: newRecipe[0]!.id,
    };
  });

  await insertTastingNoteTable(newestbody);

  return NextResponse.json({ newRecipe: newRecipe });
}
