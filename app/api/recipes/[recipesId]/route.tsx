import { NextRequest, NextResponse } from 'next/server';
import {
  deleteRecipeById,
  getRecipeById,
  updateFullRecipeById,
} from '../../../../database/recipes';

// GET SINGLE RECIPE FOR CLOSE UP VIEW

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string[]> },
) {
  const recipeId = Number(params.recipesId);
  if (!recipeId) {
    return NextResponse.json({ error: 'No recipe id' }, { status: 400 });
  }
  const recipe = await getRecipeById(recipeId);
  return NextResponse.json({ recipe: recipe });
}

// DELETE SINGLE RECIPE IF YOU ARE THE OWNER

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string[]> },
) {
  const recipeId = Number(params.recipesId);
  if (!recipeId) {
    return NextResponse.json({ error: 'No recipe id' }, { status: 400 });
  }
  const recipe = await deleteRecipeById(recipeId);
  return NextResponse.json({ recipe: recipe });
}

// UPDATE SINGLE RECIPE IF YOU ARE THE OWNER

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string[]> },
) {
  const recipeId = Number(params.recipesId);
  if (!recipeId) {
    return NextResponse.json({ error: 'No recipe id' }, { status: 400 });
  }

  const body = await request.json();

  const recipe = await updateFullRecipeById(recipeId, body);
  return NextResponse.json({ recipe: recipe });
}
