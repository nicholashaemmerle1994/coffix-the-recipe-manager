import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getAllRecipes } from '../database/recipes';
import { getValidSessionByToken } from '../database/sessions';
import Home from './Home';
import styles from './main.module.scss';

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

  // if not, render login form

  const recipes = await getAllRecipes();
  return <Home recipes={recipes} />;
}
