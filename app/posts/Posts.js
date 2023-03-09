'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './posts.module.scss';

export default function Posts(props) {
  const [comment, setComment] = useState('');
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
            <div key={`recipe-${recipe.id}`} className={styles.outterPostDiv}>
              <div className={styles.photoDiv}> PHOTO</div>

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
                <input
                  placeholder="comment"
                  aria-label="comment"
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                />
                <button
                  onClick={async () => {
                    const response = await fetch(`/api/comment`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        userId: props.userId,
                        recipeId: recipe.id,
                        content: comment,
                      }),
                    });
                    if (response.ok) {
                      setComment('');
                      router.refresh();
                    }
                  }}
                >
                  Post Comment
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
