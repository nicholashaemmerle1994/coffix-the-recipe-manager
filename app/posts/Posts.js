'use client';
import Image from 'next/image';
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
    <>
      <div className="card card-side bg-base-100 shadow-xl" />
      {recipesWithDate.map((recipe) => {
        return (
          <div
            key={`recipe-${recipe.id}`}
            className="card card-side shadow-xl m-2.5 bg-secondary"
          >
            <figure>
              <Image
                className="w-100 h-full border rounded-l-2xl border-t border-l border-b border-gray-500"
                src={recipe.pictureUrl}
                width={100}
                height={100}
                alt="user pic"
              />
            </figure>

            <div className="card-body bg-secondary text-yellow-900 rounded-r-2xl border-t border-r border-b border-gray-500">
              <Link href={`/posts/${recipe.id}`}>
                <h2 className="card-title text-gray-800 font-bold">
                  {recipe.categoryName}
                </h2>
                <p className="font-medium">{recipe.coffee}</p>
                <div>
                  {recipe.tastingNotes.map((note, index) => {
                    const noteId = `recipe-id-${recipe.id}-note-${index}`;
                    return <p key={`noteId-${noteId}`}>{note}</p>;
                  })}
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-xs btn-secondary border border-gray-500">
                    Open
                  </button>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
