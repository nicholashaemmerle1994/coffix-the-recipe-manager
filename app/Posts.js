'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Posts({ recipe, userId, yourFeed, likes }) {
  const [showAllPosts, setShowAllPosts] = useState(true);
  const router = useRouter();

  const recipesWithDate = recipe.map((recipe) => {
    const { createdAt, ...recipeWithoutDate } = recipe;
    const dateToDate = new Date(createdAt);
    return { ...recipeWithoutDate, createdAt: dateToDate };
  });

  recipesWithDate.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleShowAllPosts = () => {
    setShowAllPosts(true);
  };

  const handleShowUserFeed = () => {
    setShowAllPosts(false);
  };

  // Render a single post
  const renderPost = (recipe) => {
    return (
      <div
        key={`recipe-${recipe.id}`}
        className="card card-side shadow-xl m-2.5 bg-secondary sm:w-5/12 min-h-fit"
      >
        <figure>
          <Image
            className="w-100 h-full border rounded-l-2xl"
            src={recipe.pictureUrl}
            width={300}
            height={300}
            alt="user pic"
          />
        </figure>

        <div className="card-body bg-secondary text-warning rounded-r-2xl justify-between min-h-fit">
          <Link href={`/posts/${recipe.id}`} className="min-h-fit">
            <h2 className="card-title font-extrabold">{recipe.categoryName}</h2>
            <p className="font-medium">{recipe.coffee}</p>
            <p>{recipe.roaster}</p>
            <div>
              {recipe.tastingNotes.map((note, index) => {
                const noteId = `recipe-id-${recipe.id}-note-${index}`;
                return <p key={`noteId-${noteId}`}>{note}</p>;
              })}
            </div>
          </Link>
          {userId &&
          likes &&
          likes.some((like) => like.recipeId === recipe.id) ? (
            // Render if the user has liked the recipe
            <div className="flex justify-between align-center">
              <button
                onClick={async () => {
                  await fetch(`/api/likes`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userId,
                      recipeId: recipe.id,
                    }),
                  });
                  router.refresh();
                }}
              >
                <Image src="/liked.png" alt="liked" width={20} height={20} />
              </button>
              <Link
                href={`/posts/${recipe.id}`}
                className="btn btn-xs btn-secondary border border-primary text-primary"
              >
                Open
              </Link>
            </div>
          ) : (
            // Render if the user has not liked the recipe
            <div className="flex justify-between align-center">
              <button
                onClick={async () => {
                  await fetch(`/api/likes`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userId,
                      recipeId: recipe.id,
                    }),
                  });
                  router.refresh();
                }}
              >
                <Image
                  src="/unliked.png"
                  alt="unliked"
                  width={20}
                  height={20}
                />
              </button>
              <Link
                href={`/posts/${recipe.id}`}
                className="btn btn-xs btn-secondary border border-primary text-primary"
              >
                Open
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!userId) {
    // Render when the user is not logged in
    return (
      <>
        <div className="card card-side bg-base-100 shadow-xl" />
        <div className="sm:flex sm:flex-wrap justify-center  mb-16 sm:mb-0 max-w-4xl">
          {recipesWithDate.map(renderPost)}
        </div>
      </>
    );
  }

  if (yourFeed.length === 0 && !showAllPosts) {
    // Render when the user is logged in but doesn't follow anyone
    return (
      <>
        <header className="flex sticky top-0 z-10 bg-secondary border-solid border-b border-gray-400 w-full justify-center">
          <nav>
            <ul className="flex">
              <li className="mr-20">
                <button onClick={handleShowAllPosts}>
                  <p className="text-warning">Newest</p>
                </button>
              </li>
              <li>
                <button onClick={handleShowUserFeed}>
                  <p className="text-warning">Your Feed</p>
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <div className="card card-side bg-base-100 drop-shadow-lg mt-36 bg-secondary mx-2">
          <div className="card-body text-center">
            <h2 className="text-xl font-extrabold text-center">
              You don't follow anyone
            </h2>
            <p>Check out the newest Recipes and follow the creators</p>
          </div>
        </div>
      </>
    );
  }

  // Render when the user is logged in and has a feed to display
  return (
    <>
      <header className="flex sticky top-0 z-10 bg-secondary border-solid border-b border-gray-400 w-full justify-center">
        <nav>
          <ul className="flex">
            <li className="mr-20">
              <button onClick={handleShowAllPosts}>
                <p className="text-warning">Newest</p>
              </button>
            </li>
            <li>
              <button onClick={handleShowUserFeed}>
                <p className="text-warning">Your Feed</p>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="card card-side bg-base-100 shadow-xl" />
      <div className="sm:flex sm:flex-wrap justify-center mb-16 sm:mb-0">
        {showAllPosts
          ? recipesWithDate.map(renderPost) // Render all posts if showAllPosts is true
          : yourFeed.map(renderPost)}
      </div>
    </>
  );
}
