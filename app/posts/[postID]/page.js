import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getCategoryNameById } from '../../../database/category';
import { getCommentsOnComment } from '../../../database/commentOnComment';
import { getCommentsWithUsers } from '../../../database/comments';
import { getSingleRecipeWithTastingNotes } from '../../../database/recepisTastingNotes';
import { getRecipeById } from '../../../database/recipes';
import { getValidSessionByToken } from '../../../database/sessions';
import { tastingNotes } from '../../../database/tastingnotes';
import { createCsrfToken } from '../../../utils/csrf';
import SinglePostPage from './SinglePost';

export const dynamic = 'force-dynamic';
export default async function SinglePostPAge({ params }) {
  // get the user id from the current session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  const userId = session.userId;
  const csrfToken = createCsrfToken(session.csrfSecret);
  const singleRecipe = await getSingleRecipeWithTastingNotes(params.postID);
  if (singleRecipe.length === 0) {
    const recipe = await getRecipeById(params.postID);
    if (recipe.length === 0) {
      return notFound();
    } else {
      const finalRecipeWithDate = recipe.map((recipe) => {
        const date = new Date(recipe.createdAt);
        const dateString = date.toDateString();
        return { ...recipe, createdAt: dateString };
      });
      const comments = await getCommentsWithUsers(finalRecipeWithDate[0].id);
      // convert the Date object form the comments to a string
      const commentsWithDate = comments.map((comment) => {
        const date = new Date(comment.createdAt);
        const dateString = date.toString();
        return { ...comment, createdAt: dateString };
      });
      const allComments = async () => {
        const firstCommentsV = await getCommentsOnComment(params.postID);
        const commentsOnCommentsWithDate = firstCommentsV.map((comment) => {
          const date = new Date(comment.createdAt);
          const dateString = date.toString();
          return { ...comment, createdAt: dateString };
        });
        return commentsOnCommentsWithDate;
      };
      const finalComments = await allComments();
      const category = await getCategoryNameById(
        finalRecipeWithDate[0].categoryId,
      );
      const categoryName = category[0].name;

      return (
        <SinglePostPage
          post={finalRecipeWithDate}
          userId={userId}
          comments={commentsWithDate}
          token={csrfToken}
          commentsOnComments={finalComments}
          categoryName={categoryName}
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
        firstName: currentValue.firstName,
        userPictureUrl: currentValue.userPictureUrl,
        userName: currentValue.userName,
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

  const comments = await getCommentsWithUsers(finalRecipeWithDate[0].id);
  // convert the Date object form the comments to a string
  const commentsWithDate = comments.map((comment) => {
    const date = new Date(comment.createdAt);
    const dateString = date.toString();
    return { ...comment, createdAt: dateString };
  });

  const category = await getCategoryNameById(finalRecipeWithDate[0].categoryId);
  const categoryName = category[0].name;

  const allComments = async () => {
    const firstCommentsV = await getCommentsOnComment(params.postID);
    const commentsOnCommentsWithDate = firstCommentsV.map((comment) => {
      const date = new Date(comment.createdAt);
      const dateString = date.toString();
      return { ...comment, createdAt: dateString };
    });
    return commentsOnCommentsWithDate;
  };
  const finalComments = await allComments();

  return (
    <SinglePostPage
      post={finalRecipeWithDate}
      userId={userId}
      comments={commentsWithDate}
      categoryName={categoryName}
      commentsOnComments={finalComments}
      token={csrfToken}
    />
  );
}
