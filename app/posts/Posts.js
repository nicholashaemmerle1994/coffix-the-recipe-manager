'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Posts(props) {
  const [showAllPosts, setShowAllPosts] = useState(true);
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
  const handleShowAllPosts = () => {
    setShowAllPosts(true);
  };

  const handleShowUserFeed = () => {
    setShowAllPosts(false);
  };

  // Filter recipesWithDate by the people the user follows
  const yourFeed = recipesWithDate.filter((recipe) => {
    return props.yourFeed.some((follow) => {
      return follow.followedUserId === recipe.userId;
    });
  });

  if (yourFeed.length === 0 && !showAllPosts) {
    return (
      <>
        <div className="flex sticky top-0 z-10 bg-secondary border-solid border-b border-gray-400 w-screen justify-center">
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
        </div>

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

  // These are the Posts of the people the user follows
  return (
    <>
      <header className="flex sticky top-0 z-10 bg-secondary border-solid border-b border-gray-400 w-screen justify-center">
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
          ? recipesWithDate.map((recipe) => {
              return (
                <div
                  key={`recipe-${recipe.id}`}
                  className="card card-side shadow-xl m-2.5 bg-secondary sm:w-5/12"
                >
                  <figure>
                    <Image
                      className="w-100 h-full border rounded-l-2xl"
                      src={recipe.pictureUrl}
                      width={100}
                      height={100}
                      alt="user pic"
                    />
                  </figure>

                  <div className="card-body bg-secondary text-warning rounded-r-2xl justify-between">
                    <Link href={`/posts/${recipe.id}`}>
                      <h2 className="card-title font-extrabold">
                        {recipe.categoryName}
                      </h2>
                      <p className="font-medium">{recipe.coffee}</p>
                      <div>
                        {recipe.tastingNotes.map((note, index) => {
                          const noteId = `recipe-id-${recipe.id}-note-${index}`;
                          return <p key={`noteId-${noteId}`}>{note}</p>;
                        })}
                      </div>
                    </Link>
                    {props.likes.some((like) => {
                      return like.recipeId === recipe.id;
                    }) ? (
                      <div className="flex justify-between align-center">
                        <button
                          onClick={async () => {
                            await fetch(`/api/likes`, {
                              method: 'DELETE',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                userId: props.userId,
                                recipeId: recipe.id,
                              }),
                            });
                            router.refresh();
                          }}
                        >
                          <Image
                            src="/liked.png"
                            alt="liked"
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
                    ) : (
                      <div className="flex justify-between align-center">
                        <button
                          onClick={async () => {
                            await fetch(`/api/likes`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                userId: props.userId,
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
            })
          : yourFeed.map((recipe) => {
              return (
                <div
                  key={`recipe-${recipe.id}`}
                  className="card card-side shadow-xl m-2.5 bg-secondary sm:w-5/12"
                >
                  <figure>
                    <Image
                      className="w-100 h-full border rounded-l-2xl"
                      src={recipe.pictureUrl}
                      width={100}
                      height={100}
                      alt="user pic"
                    />
                  </figure>

                  <div className="card-body bg-secondary rounded-r-2xl justify-between">
                    <Link href={`/posts/${recipe.id}`}>
                      <h2 className="card-title font-extrabold">
                        {recipe.categoryName}
                      </h2>
                      <p className="font-medium">{recipe.coffee}</p>
                      <div>
                        {recipe.tastingNotes.map((note, index) => {
                          const noteId = `recipe-id-${recipe.id}-note-${index}`;
                          return <p key={`noteId-${noteId}`}>{note}</p>;
                        })}
                      </div>
                    </Link>
                    {props.likes.some((like) => {
                      return like.recipeId === recipe.id;
                    }) ? (
                      <div className="flex justify-between align-center">
                        <button
                          onClick={async () => {
                            await fetch(`/api/likes`, {
                              method: 'DELETE',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                userId: props.userId,
                                recipeId: recipe.id,
                              }),
                            });
                            router.refresh();
                          }}
                        >
                          <Image
                            src="/liked.png"
                            alt="liked"
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
                    ) : (
                      <div className="flex justify-between align-center">
                        <button
                          onClick={async () => {
                            await fetch(`/api/likes`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                userId: props.userId,
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
            })}
      </div>
    </>
  );
}
