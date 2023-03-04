import Image from 'next/image';
import { getAllRecipes } from '../database/recipes';
import styles from './main.module.scss';

export const metadata = {
  title: 'Coffix',
  description: 'Coffix - The recipe Manager',
};

export default async function HomePage() {
  const recipes = await getAllRecipes();
  return (
    <div>
      <div>
        {recipes.map((recipe) => {
          return (
            <div key={`recipe-id-${recipe.id}`} className={styles.post}>
              {/* <div>
                {' '}
                <Image
                  src="/nice.jpeg"
                  width={40}
                  height={40}
                  alt="profilepicture"
                />{' '}
              </div> */}
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
  );
}
