import { getAllRecipes } from '../database/recipes';

export const metadata = {
  title: 'Coffix',
  description: 'Coffix - The recipe Manager',
};

export default async function HomePage() {
  const recipes = await getAllRecipes();
  return (
    <div>
      <h1>Home page</h1>
      <div>
        {recipes.map((recipe) => {
          return (
            <div key={`recipe-id-${recipe.id}`}>
              <h1>{recipe.coffee}</h1>
              <p>{recipe.roaster}</p>
              <p>{recipe.brewTimeMinutes}</p>
              <p>{recipe.notes}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
