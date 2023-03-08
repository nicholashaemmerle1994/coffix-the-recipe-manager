import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCategoryName } from '../../database/category';
import { getAllRecipes } from '../../database/recipes';
import { getValidSessionByToken } from '../../database/sessions';
import Posts from './Posts';

export const metadata = {
  title: 'Coffix',
  description: 'Coffix - The recipe Manager',
};

export default async function PostsPage() {
  // check if there is a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // if there is, redirect to home page
  if (!session) {
    redirect('/');
  }

  const recipes = await getAllRecipes();

  // Create an array with recipes array but the date object is translated to a string but still call it createdAt
  const recipesWithDate = recipes.map((recipe) => {
    const { createdAt, ...recipeWithoutDate } = recipe;
    const dateToString = createdAt.toISOString();
    return { ...recipeWithoutDate, createdAt: dateToString };
  });
  // function that uses getCategoryName to get the name of the category and then replaces the categoryId with the categoryName in every recipe
  const recipesWithCategoryName = await Promise.all(
    recipesWithDate.map(async (recipe) => {
      const categoryName = await getCategoryName(recipe.categoryId);

      const { categoryId, ...recipeWithoutCategory } = recipe;
      return {
        ...recipeWithoutCategory,
        categoryName: categoryName[0]['name'],
      };
    }),
  );
  return (
    <>
      <div>{/* <AdvancedImage cldImg={myImage} /> */}</div>
      <Posts recipe={recipesWithCategoryName} />
    </>
  );
}
