import {
  deleteRecipeById,
  getRecipeById,
  updateFullRecipeById,
  updateRecipeByIdWithoutMinutes,
  updateRecipeByIdWithoutNotes,
} from '@/database/recipes';
import { NextRequest, NextResponse } from 'next/server';

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
  console.log(params);
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
  console.log(params);
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
  if (!body.brew_time_minutes) {
    const recipe = await updateRecipeByIdWithoutMinutes(recipeId, body);
    return NextResponse.json({ recipe: recipe });
  } else if (!body.notes) {
    const recipe = await updateRecipeByIdWithoutNotes(recipeId, body);
    return NextResponse.json({ recipe: recipe });
  } else {
    const recipe = await updateFullRecipeById(recipeId, body);
    console.log(params);
    return NextResponse.json({ recipe: recipe });
  }
}
