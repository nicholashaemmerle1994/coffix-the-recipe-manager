import {
  createFullRecipe,
  getAllRecipes,
  getRecipeWithLimit,
} from '@/database/recipes';
import { NextRequest, NextResponse } from 'next/server';

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
  const newRecipe = await createFullRecipe(body);

  return NextResponse.json({ newRecipe: newRecipe });
}
