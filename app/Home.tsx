'use client';
import { useState } from 'react';

type Recipe = {
  id: number;
  coffee: string;
  roaster: string;
  categoryName: string;
}[];
type Props = {
  recipes: Recipe[];
};

export default function Home(props: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>(props.recipes);

  return (
    <>
      <div>
        <div>
          {recipes.map((recipe) => {
            return (
              <div key={`recipe-id-${recipe.id}`}>
                <div>
                  <h3>{recipe.categoryName}</h3>
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
          const recipeCont = recipes.length;
          const respone = await fetch(
            `/api/recipes/${recipes.id}?limit=${recipeCont}`,
          );
        }}
      >
        Show more Recipes
      </button>
    </>
  );
}
