import { getSingleRecipeWithTastingNotes } from '../../../database/recepisTastingNotes';
import { tastingNotes } from '../../../database/tastingnotes';

export default async function SinglePostPage(props: Props) {
  const all = await getSingleRecipeWithTastingNotes(props.postID);

  const singleRecipeArray = all.reduce((accumulator, currentValue) => {
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
      const tastingNoteName = tastingNotes.find((tastingNoteName) => {
        if (tastingNoteName.id === tastingNote.id) {
          return tastingNoteName.name;
        }
      });
      return tastingNoteName?.name;
    });
    return { ...recipe, tastingNotes: tastingNotesWithNames };
  });

  return (
    <div>
      <h1>{finalRecipe[0].coffee}</h1>
      <p>{finalRecipe[0].roaster}</p>
      <p>Used: {finalRecipe[0].amountIn} g</p>
      <p>I got {finalRecipe[0].amountOut} g out</p>
      <p>With a grind-Size of: {finalRecipe[0].grindSize}</p>
      <p>Water temperature of: {finalRecipe[0].brewTemperature}</p>
      <div>
        With a brewtime of:
        <p>{finalRecipe[0].brewTimeMinutes}</p>
        minutes
        <p>{finalRecipe[0].brewTimeSeconds}</p>
        and seconds
      </div>
      <p>{finalRecipe[0].notes}</p>
      <p>{finalRecipe[0].pictureUrl}</p>
      <p>With intense flavors of:</p>
      <ul>
        {finalRecipe[0].tastingNotes.map((tastingNote) => {
          return <li key={`tastingNote-${tastingNote}`}>{tastingNote}</li>;
        })}
      </ul>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
