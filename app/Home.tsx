'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Recipe = {
  id: number;
  userId: number;
  categoryId: number;
  coffee: string;
  roaster: string;
  amountIn: number;
  amountOut: number;
  grindSize: number;
  brewTimeMinutes: number;
  brewTimeSeconds: number;
  notes: string;
  pictureUrl: string;
  comments: string;
  createdAt: Date | undefined;
}[];
type Props = {
  recipes: Recipe[];
};

export default function Home(props: Props) {
  const router = useRouter();
  // Now take the recipes from the props and translate the createdAt string back to a date object
  const recipesWithDate = props.recipes.map((recipe) => {
    const { createdAt, ...recipeWithoutDate } = recipe;
    const dateToDate = new Date(createdAt);
    return { ...recipeWithoutDate, createdAt: dateToDate };
  });
  // sort over recipesWithDate and filter them by date the newest should be first
  recipesWithDate.sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
  console.log(recipesWithDate);

  const [recipes, setRecipes] = useState(recipesWithDate);
  // router.refresh();

  return (
    <>
      <div>
        <div>
          {recipes.map((recipe) => {
            return (
              <div key={`recipe-id-${recipe.id}`}>
                <div>
                  <h3>{recipe.categoryid}</h3>
                  <p>{recipe.coffee}</p>
                  <p>{recipe.roaster}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={async () => {
          // Check how many recipes are on the page
          // get 10 with the button

          const recipeCont = recipes.length;
          const response = await fetch(
            `/api/recipes/?limit=5&offset=${recipeCont}`,
          );
          const data = await response.json();

          setRecipes([...recipes, ...data.recipes]);

          router.refresh();
        }}
      >
        Show more Recipes
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
