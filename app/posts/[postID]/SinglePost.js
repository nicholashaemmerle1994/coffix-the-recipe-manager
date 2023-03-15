'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './singlepost.module.scss';

// import { deleteRecipeById } from '../../../database/recipes';

export default function SinglePostPage(props) {
  const [comment, setComment] = useState('');
  const router = useRouter();
  console.log('props', props.post);

  // Converting the date string to a date object and inserting it back to the props object

  const date = new Date(props.post[0].created_at);
  props.post[0].created_at = date;
  // Version if the id of the user who created the post is the same as the id of the user who is logged in
  if (props.userId === props.post[0].userId) {
    // Version if the post has no tasting notes
    if (props.post[0].tastingNotes === undefined) {
      return (
        <div className={styles.page}>
          <h1>{props.post[0].coffee}</h1>
          <p>{props.post[0].roaster}</p>
          <p>Used: {props.post[0].amountIn} g</p>
          <p>I got {props.post[0].amountOut} g out</p>
          <p>With a grind-Size of: {props.post[0].grindSize}</p>
          <p>Water temperature of: {props.post[0].brewTemperature}</p>
          <div>
            With a brewtime of:
            <p>{props.post[0].brewTimeMinutes}</p>
            minutes
            <p>{props.post[0].brewTimeSeconds}</p>
            and seconds
          </div>
          <p>{props.post[0].notes}</p>
          <p>{props.post[0].pictureUrl}</p>
          <button
            onClick={async () => {
              await fetch(`/api/recipes/${props.post[0].id}`, {
                method: 'DELETE',
              });

              router.push('/posts');
              router.refresh();
            }}
          >
            Delete
          </button>
          <br />
          <h3>Comments</h3>

          {props.comments.map((userComment) => {
            if (userComment.userId === props.userId) {
              return (
                <div key={`comment-${userComment.id}`}>
                  <p>{userComment.comment}</p>
                  <button
                    onClick={async () => {
                      await fetch(`/api/comment/${userComment.id}`, {
                        method: 'DELETE',
                      });
                      router.refresh();
                    }}
                  >
                    Delete Comment
                  </button>
                </div>
              );
            }
            return (
              <div key={`comment-${userComment.id}`}>
                <p>{userComment.comment}</p>
              </div>
            );
          })}
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
                  recipeId: props.post[0]['id'],
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
      );
    }
    // Version if the post has tasting notes
    return (
      <div className={styles.page}>
        <h1>{props.post[0].coffee}</h1>
        <p>{props.post[0].roaster}</p>
        <p>Used: {props.post[0].amountIn} g</p>
        <p>I got {props.post[0].amountOut} g out</p>
        <p>With a grind-Size of: {props.post[0].grindSize}</p>
        <p>Water temperature of: {props.post[0].brewTemperature}</p>
        <div>
          With a brewtime of:
          <p>{props.post[0].brewTimeMinutes}</p>
          minutes
          <p>{props.post[0].brewTimeSeconds}</p>
          and seconds
        </div>
        <p>{props.post[0].notes}</p>
        <p>{props.post[0].pictureUrl}</p>
        <p>With intense flavors of:</p>
        <ul>
          {props.post[0].tastingNotes.map((tastingNote) => {
            return <li key={`tastingNote-${tastingNote}`}>{tastingNote}</li>;
          })}
        </ul>

        <button
          onClick={async () => {
            await fetch(`/api/recipes/${props.post[0].id}`, {
              method: 'DELETE',
            });

            router.push('/posts');
            router.refresh();
          }}
        >
          Delete
        </button>
        <br />
        <h3>Comments</h3>

        {props.comments.map((userComment) => {
          if (userComment.userId === props.userId) {
            return (
              <div key={`comment-${userComment.id}`}>
                <p>{userComment.comment}</p>
                <button
                  onClick={async () => {
                    await fetch(`/api/comment/${userComment.id}`, {
                      method: 'DELETE',
                    });
                    router.refresh();
                  }}
                >
                  Delete Comment
                </button>
              </div>
            );
          }
          return (
            <div key={`comment-${userComment.id}`}>
              <p>{userComment.comment}</p>
            </div>
          );
        })}
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
                recipeId: props.post[0]['id'],
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
    );
  }
  // Version if the Post is not from the logged in user and has no tasting notes
  else if (props.post[0].tastingNotes === undefined) {
    return (
      <div className={styles.page}>
        <h1>{props.post[0].coffee}</h1>
        <p>{props.post[0].roaster}</p>
        <p>Used: {props.post[0].amountIn} g</p>
        <p>I got {props.post[0].amountOut} g out</p>
        <p>With a grind-Size of: {props.post[0].grindSize}</p>
        <p>Water temperature of: {props.post[0].brewTemperature}</p>
        <div>
          With a brewtime of:
          <p>{props.post[0].brewTimeMinutes}</p>
          minutes
          <p>{props.post[0].brewTimeSeconds}</p>
          and seconds
        </div>
        <p>{props.post[0].notes}</p>
        <p>{props.post[0].pictureUrl}</p>
        <button
          onClick={async () => {
            await fetch(`/api/recipes/${props.post[0].id}`, {
              method: 'DELETE',
            });

            router.push('/posts');
            router.refresh();
          }}
        >
          Delete
        </button>
        <br />
        <h3>Comments</h3>

        {props.comments.map((userComment) => {
          if (userComment.userId === props.userId) {
            return (
              <div key={`comment-${userComment.id}`}>
                <p>{userComment.comment}</p>
                <button
                  onClick={async () => {
                    await fetch(`/api/comment/${userComment.id}`, {
                      method: 'DELETE',
                    });
                    router.refresh();
                  }}
                >
                  Delete Comment
                </button>
              </div>
            );
          }
          return (
            <div key={`comment-${userComment.id}`}>
              <p>{userComment.comment}</p>
            </div>
          );
        })}
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
                recipeId: props.post[0]['id'],
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
    );
  }
  // Version if the Post is from the logged in user and has tasting notes
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl" />
      <div className="card card-side bg-base-100 shadow-xl m-2.5 bg-primary flex flex-col max-w-md container mx-auto">
        <figure className="rounded-t-xl rounded-b-none mb-6">
          <Image
            src={props.post[0].pictureUrl}
            className="w-100 h-full "
            width={100}
            height={100}
            alt="user pic"
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-4xl">{props.post[0].coffee}</h1>
          <p className="text-2xl">{props.post[0].roaster}</p>
          <p>Used: {props.post[0].amountIn} g</p>
          <p>I got {props.post[0].amountOut} g out</p>
          <p>With a grind-Size of: {props.post[0].grindSize}</p>
          <p>Water temperature of: {props.post[0].brewTemperature}</p>
          <div>
            <p> With a brewtime of:</p>
            <p>
              {props.post[0].brewTimeMinutes} : {props.post[0].brewTimeSeconds}
            </p>
          </div>
          <p>{props.post[0].notes}</p>
        </div>
        <div className="card-body">
          <p>With intense flavors of:</p>
          <ul>
            {props.post[0].tastingNotes.map((tastingNote) => {
              return <li key={`tastingNote-${tastingNote}`}>{tastingNote}</li>;
            })}
          </ul>
        </div>
        <br />
        <h3>Comments</h3>
        {props.comments.map((userComment) => {
          if (userComment.userId === props.userId) {
            return (
              <div key={`comment-${userComment.id}`}>
                <p>{userComment.comment}</p>
                <button
                  onClick={async () => {
                    await fetch(`/api/comment/${userComment.id}`, {
                      method: 'DELETE',
                    });
                    router.refresh();
                  }}
                >
                  Delete Comment
                </button>
              </div>
            );
          }
          return (
            <div key={`comment-${userComment.id}`}>
              <p>{userComment.comment}</p>
            </div>
          );
        })}

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
                recipeId: props.post[0]['id'],
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
    </>
  );
}
