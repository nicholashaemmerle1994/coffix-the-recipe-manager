import { NextRequest, NextResponse } from 'next/server';
import { insertTastingNotes } from '../../../database/recepisTastingNotes';
import {
  createFullRecipe,
  getAllRecipes,
  getRecipeWithLimit,
} from '../../../database/recipes';

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
  const body = await request.json();
  const recipeBody = {
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

  return NextResponse.json({ newRecipe: newRecipe });
}
