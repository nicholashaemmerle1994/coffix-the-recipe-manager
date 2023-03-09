'use client';

import { useRouter } from 'next/navigation';

// import { deleteRecipeById } from '../../../database/recipes';

export default function SinglePostPage(props) {
  const router = useRouter();
  // Converting the date string to a date object and inserting it back to the props object

  const date = new Date(props.post[0].created_at);
  props.post[0].created_at = date;

  if (props.userId === props.post[0].userId) {
    return (
      <div>
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button
          onClick={async () => {
            console.log(props.post);
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  } else {
    return (
      <div>
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
}
