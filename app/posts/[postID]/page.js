import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getComments } from '../../../database/comments';
import { getSingleRecipeWithTastingNotes } from '../../../database/recepisTastingNotes';
import { getRecipeById } from '../../../database/recipes';
import { getValidSessionByToken } from '../../../database/sessions';
import { tastingNotes } from '../../../database/tastingnotes';
import SinglePostPage from './SinglePost';

export const dynamic = 'force-dynamic';
export default async function SinglePostPAge({ params }) {
  // get the user id from the current session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  const userId = session.userId;

  const singleRecipe = await getSingleRecipeWithTastingNotes(params.postID);
  if (singleRecipe.length === 0) {
    const recipe = await getRecipeById(params.postID);
    if (recipe.length === 0) {
      return notFound();
    } else {
      const comments = await getComments(recipe[0].id);
      const finalRecipeWithDate = recipe.map((recipe) => {
        const date = new Date(recipe.createdAt);
        const dateString = date.toDateString();
        return { ...recipe, createdAt: dateString };
      });
      return (
        <SinglePostPage
          post={finalRecipeWithDate}
          userId={userId}
          comments={comments}
        />
      );
    }
  }

  const singleRecipeArray = singleRecipe.reduce((accumulator, currentValue) => {
    // check if a recipe with the same id already exists in the accumulator array
    const recipeIndex = accumulator.findIndex(
      (recipe) => recipe.id === currentValue.id,
    );
    // if the recipe doesn't exist, create a new recipe object
    if (recipeIndex === -1) {
      accumulator.push({
        id: currentValue.id,
        userId: currentValue.userId,
        categoryId: currentValue.categoryId,
        createdAt: currentValue.createdAt,
        coffee: currentValue.coffee,
        roaster: currentValue.roaster,
        amountIn: currentValue.amountIn,
        amountOut: currentValue.amountOut,
        grindSize: currentValue.grindSize,
        brewTemperature: currentValue.brewTemperature,
        brewTimeMinutes: currentValue.brewTimeMinutes,
        brewTimeSeconds: currentValue.brewTimeSeconds,
        notes: currentValue.notes,
        pictureUrl: currentValue.pictureUrl,
        tastingNotes: [{ id: currentValue.tastingNoteId }],
      });
    } else {
      // if the recipe already exists, add the tastingNoteId to the tastingNotes array
      accumulator[recipeIndex].tastingNotes.push({
        id: currentValue.tastingNoteId,
      });
    }

    return accumulator;
  }, []);
  // Map over singleRecipeArray compare the tastingNoteId with the tastingNotes array and replace the id with the name

  const finalRecipe = singleRecipeArray.map((recipe) => {
    const tastingNotesWithNames = recipe.tastingNotes.map((tastingNote) => {
      const tastingNoteName = tastingNotes.find((tastingNotess) => {
        if (tastingNotess.id === tastingNote.id) {
          return tastingNotess.name;
        }
      });
      return tastingNoteName?.name;
    });
    return { ...recipe, tastingNotes: tastingNotesWithNames };
  });
  // map over finalRecipe and convert the Date object to a string
  const finalRecipeWithDate = finalRecipe.map((recipe) => {
    const date = new Date(recipe.createdAt);
    const dateString = date.toDateString();
    return { ...recipe, createdAt: dateString };
  });

  const comments = await getComments(finalRecipeWithDate[0].id);

  return (
    <SinglePostPage
      post={finalRecipeWithDate}
      userId={userId}
      comments={comments}
    />
  );
  // <div>hello</div>;
}
