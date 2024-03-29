import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
import { getCategoryNameById } from '../database/category';
import { getFollows } from '../database/follows';
import { getUserLikes } from '../database/likes';
import { getTastingNotesFromRecipe } from '../database/recepisTastingNotes';
import { getAllRecipesWithLikes } from '../database/recipes';
import { getValidSessionByToken } from '../database/sessions';
import { tastingNotes } from '../database/tastingnotes';
import Posts from './Posts';

export const metadata = {
  title: 'Coffix',
  description: 'Coffix - The recipe Manager',
};

export default async function PostsPage() {
  const recipes = await getAllRecipesWithLikes();

  // check if there is a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if there is no valid session the user will see less info and a message to log in
  if (session) {
    const userId = session.userId;
    const likes = await getUserLikes(userId);
    // getting the likes from the database
    // Transform the date objects  to a string
    const recipesWithDate = recipes.map((recipe) => {
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
        const tastingNotesFromRecipe = await getTastingNotesFromRecipe(
          recipe.id,
        );
        const tastingNote = tastingNotesFromRecipe.map((note) => {
          return note.tastingNoteId;
        });
        return { ...recipe, tastingNotes: tastingNote };
      }),
    );

    // compare the tastingNotes array with the tastingNotes array from the database and change the id to the name of the tasting note
    const recipesWithTastingNotesAndName = recipesWithTastingNotes.map(
      (recipe) => {
        const finalTastingNotes = recipe.tastingNotes.map((note) => {
          return tastingNotes.find((tastingNote) => {
            return tastingNote.id === note;
          });
        });
        const tastingNotesName = finalTastingNotes.map((note) => {
          return note.name;
        });
        return { ...recipe, tastingNotes: tastingNotesName };
      },
    );
    const getLoggedUserFollows = await getFollows(userId);

    return (
      <Posts
        recipe={recipesWithTastingNotesAndName}
        userId={userId}
        yourFeed={getLoggedUserFollows}
        likes={likes}
      />
    );
  }

  // Transform the date objects  to a string
  const recipesWithDate = recipes.map((recipe) => {
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
  const recipesWithTastingNotesAndName = recipesWithTastingNotes.map(
    (recipe) => {
      const finalTastingNotes = recipe.tastingNotes.map((note) => {
        return tastingNotes.find((tastingNote) => {
          return tastingNote.id === note;
        });
      });
      const tastingNotesName = finalTastingNotes.map((note) => {
        return note.name;
      });
      return { ...recipe, tastingNotes: tastingNotesName };
    },
  );

  return <Posts recipe={recipesWithTastingNotesAndName} />;
}
