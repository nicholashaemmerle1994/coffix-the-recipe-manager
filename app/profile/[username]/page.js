import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getCategory, getCategoryNameById } from '../../../database/category';
import { getTastingNotesFromRecipe } from '../../../database/recepisTastingNotes';
import { getRecipeByUserId } from '../../../database/recipes';
import { getValidSessionByToken } from '../../../database/sessions';
import { tastingNotes } from '../../../database/tastingnotes';
import { getUserByUsername } from '../../../database/users';
import { createCsrfToken } from '../../../utils/csrf';
import Profile from './Profile';

export default async function ProfilePage(props) {
  // check if there is a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // if there is, redirect to home page
  if (!session) {
    redirect('/');
  }
  // if not, render login form

  const user = await getUserByUsername(props.params.username);
  if (!user) {
    return notFound();
  }

  const rawUserPosts = await getRecipeByUserId(user.id);

  // Transform the date objects  to a string
  const recipesWithDate = rawUserPosts.map((recipe) => {
    const { createdAt, ...recipeWithoutDate } = recipe;
    const dateToString = createdAt.toISOString();
    return { ...recipeWithoutDate, createdAt: dateToString };
  });
  // function that uses getCategoryName to get the name of the category and then replaces the categoryId with the categoryName in every recipe
  const recipesWithCategoryName = await Promise.all(
    recipesWithDate.map(async (recipe) => {
      const categoryName = await getCategoryNameById(recipe.categoryId);

      const { categoryId, ...recipeWithoutCategory } = recipe;
      return {
        ...recipeWithoutCategory,
        categoryName: categoryName[0]['name'],
      };
    }),
  );
  // inserting back the tastingNotes array into the recipe object
  const recipesWithTastingNotes = await Promise.all(
    recipesWithCategoryName.map(async (recipe) => {
      const tastingNotesFromRecipe = await getTastingNotesFromRecipe(recipe.id);
      const tastingNote = tastingNotesFromRecipe.map((note) => {
        return note.tastingNoteId;
      });
      return { ...recipe, tastingNotes: tastingNote };
    }),
  );

  // compare the tastingNotes array with the tastingNotes array from the database and change the id to the name of the tasting note
  const finalPosts = recipesWithTastingNotes.map((recipe) => {
    const finalTastingNotes = recipe.tastingNotes.map((note) => {
      return tastingNotes.find((tastingNote) => {
        return tastingNote.id === note;
      });
    });
    const tastingNotesName = finalTastingNotes.map((note) => {
      return note.name;
    });
    return { ...recipe, tastingNotes: tastingNotesName };
  });
  const category = await getCategory();

  const csrfToken = createCsrfToken(session.csrfSecret);
  return (
    <div>
      <Profile
        user={user}
        loggedUser={session.userId}
        posts={finalPosts}
        category={category}
        token={csrfToken}
      />
    </div>
  );
}
