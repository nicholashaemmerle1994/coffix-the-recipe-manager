'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Posts(props) {
  const router = useRouter();
  // Now take the recipes from the props and translate the createdAt string back to a date object
  const recipesWithDate = props.recipe.map((recipe) => {
    const { createdAt, ...recipeWithoutDate } = recipe;
    const dateToDate = new Date(createdAt);
    return { ...recipeWithoutDate, createdAt: dateToDate };
  });
  // sort over recipesWithDate and filter them by date the newest should be first
  recipesWithDate.sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
  // router.refresh();

  return (
    <div>
      <div>
        {recipesWithDate.map((recipe) => {
          return (
            <div key={`recipe-id-${recipe.id}`}>
              <Link href={`/posts/${recipe.id}`}>
                <div>
                  <h3>{recipe.categoryName}</h3>
                  <p>{recipe.coffee}</p>
                  <div>
                    {recipe.tastingNotes.map((note) => {
                      return <p key={`note-id-${note}`}>{note}</p>;
                    })}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
