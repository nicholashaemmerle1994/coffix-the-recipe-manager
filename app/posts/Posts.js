'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './posts.module.scss';

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
    <div className={styles.page}>
      <div>
        {recipesWithDate.map((recipe) => {
          return (
            <div key={`recipe-${recipe.id}`} className={styles.outterPostDiv}>
              <div className={styles.photoDiv}>
                {' '}
                <img
                  src={recipe.pictureUrl}
                  width={100}
                  height={100}
                  alt="user pic"
                />
              </div>

              <div className={styles.innerPostDiv}>
                <Link href={`/posts/${recipe.id}`}>
                  <h3>{recipe.categoryName}</h3>
                  <p>{recipe.coffee}</p>
                  <div className={styles.tasteDiv}>
                    <div className={styles.outterTasteDiv}>
                      {recipe.tastingNotes.map((note, index) => {
                        const noteId = `recipe-id-${recipe.id}-note-${index}`;
                        return <p key={`noteId-${noteId}`}>{note}</p>;
                      })}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
