import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import {
  getAllRecipes,
  getRecipeWithLimitAndOffset,
} from '../database/recipes';
import { getValidSessionByToken } from '../database/sessions';
import Home from './Home';

export const metadata = {
  title: 'Coffix',
  description: 'Coffix - The recipe Manager',
};

export default async function HomePage() {
  // check if there is a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // if there is, redirect to home page
  if (!session) {
    redirect('/login');
  }

  const recipes = await getRecipeWithLimitAndOffset(10, 0);

  // Create an array with recipes array but the date object is translated to a string but still call it createdAt
  const recipesWithDate = recipes.map((recipe) => {
    const { createdAt, ...recipeWithoutDate } = recipe;
    const dateToString = createdAt.toISOString();
    return { ...recipeWithoutDate, createdAt: dateToString };
  });

  return (
    <>
      <div>{/* <AdvancedImage cldImg={myImage} /> */}</div>
      <Home recipes={recipesWithDate} />
    </>
  );
}
