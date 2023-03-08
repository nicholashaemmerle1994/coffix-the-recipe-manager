import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllRecipes } from '../database/recipes';
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

  const recipes = await getAllRecipes();

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
