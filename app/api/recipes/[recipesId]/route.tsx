import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  deleteRecipeById,
  getRecipeById,
  updateFullRecipeById,
} from '../../../../database/recipes';
import { getUserBySessionToken } from '../../../../database/users';
import { validateCsrfToken } from '../../../../utils/csrf';

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
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));
  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const body = await request.json();
  console.log(body);
  if (!body) {
    return NextResponse.json(
      { error: 'Request body is empty and you are dumb' },
      { status: 400 },
    );
  }

  if (!validateCsrfToken(user.csrfSecret, body.csrfToken)) {
    return NextResponse.json(
      {
        error: 'CSRF token is not valid',
      },
      { status: 400 },
    );
  }
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
