'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// import { deleteRecipeById } from '../../../database/recipes';

export default function SinglePostPage(props) {
  const [comment, setComment] = useState('');
  const router = useRouter();

  // mapping over the comments and translating the createdAt string back to a date object
  const commentsWithDate = props.comments.map((com) => {
    const date = new Date(com.createdAt);
    const dateString = date.toLocaleDateString('de-De', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const timeString = date.toLocaleTimeString('de-DE', { hour12: false });

    const formattedDate = `${dateString} ${timeString}`;
    return { ...com, createdAt: formattedDate };
  });
  console.log('commentsWithDate', commentsWithDate);
  // Version if the id of the user who created the post is the same as the id of the user who is logged in
  if (props.userId === props.post[0].userId) {
    // Version if the post has no tasting notes
    if (props.post[0].tastingNotes === undefined) {
      return (
        <>
          <div className="card card-side bg-base-100 shadow-xl " />
          <div className="card card-side  shadow-xl m-2.5 bg-secondary flex flex-col max-w-md container mx-auto text-gray-900-50">
            <figure className="rounded-t-xl rounded-b-none mb-6">
              <Image
                src={props.post[0].pictureUrl}
                className="w-100 h-full"
                width={100}
                height={100}
                alt="user pic"
              />
            </figure>
            <div className="card-body">
              <p className="text-4xl font-bold text-gray-900">
                {props.post[0].coffee}
                <span className="text-2xl"> {props.post[0].roaster}</span>
              </p>
            </div>
            <div className="card-body pt-0 pb-0">
              <h2 className="text-2xl font-bold text-gray-900">How to: </h2>
              <p>Method: {props.categoryName}</p>
              <p>Coffee: {props.post[0].amountIn}g</p>
              <p>Water: {props.post[0].amountOut}g out</p>
              <p>Grind-size: {props.post[0].grindSize}</p>
              <p>Water temperature: {props.post[0].brewTemperature}°C</p>
              <div>
                <p> With a brewtime of:</p>
                <p>
                  {props.post[0].brewTimeMinutes} :{' '}
                  {props.post[0].brewTimeSeconds} mins
                </p>
              </div>
              <p>{props.post[0].notes}</p>
            </div>
            <br />
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-3">Comments</h2>
              {commentsWithDate.map((userComment) => {
                if (userComment.userId === props.userId) {
                  return (
                    <div
                      key={`comment-${userComment.id}`}
                      className="bg-secondary rounded-md p-2 border border-gray-500 flex flex-row"
                    >
                      <div className="flex w-1/6 flex-col">
                        <Link href={`/profile/${userComment.userName}`}>
                          <div>
                            <Image
                              className="rounded-full w-6"
                              src={userComment.pictureUrl}
                              width={10}
                              height={10}
                              alt="user pic"
                            />
                          </div>
                        </Link>
                        <div className="" />
                      </div>
                      <div className="flex flex-col w-5/6">
                        <p>{userComment.comment}</p>
                        <div className="flex justify-between">
                          <p className="text-xs">{userComment.createdAt}</p>
                          <button
                            // className="btn btn-danger border border-red-500"
                            onClick={async () => {
                              await fetch(`/api/comment/${userComment.id}`, {
                                method: 'DELETE',
                              });
                              router.refresh();
                            }}
                          >
                            <Image
                              src="/delete.png"
                              height={20}
                              width={20}
                              alt="delete"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={`comment-${userComment.id}`}
                    className="bg-secondary rounded-md p-2 border border-gray-500 flex flex-row"
                  >
                    <div className="flex w-1/6 flex-col">
                      <Link href={`/profile/${userComment.userName}`}>
                        <div>
                          <Image
                            className="rounded-full w-6"
                            src={userComment.pictureUrl}
                            width={10}
                            height={10}
                            alt="user pic"
                          />
                        </div>
                      </Link>
                      <div className="" />
                    </div>
                    <div className="flex flex-col w-5/6">
                      <p>{userComment.comment}</p>
                      <div className="flex justify-between">
                        <p className="text-xs">{userComment.createdAt}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex flex-wrap">
                <textarea
                  rows="3"
                  className="textarea w-9/12 h-8 resize-none"
                  placeholder="Comment..."
                  aria-label="comment"
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                />
                <button
                  className="w-3/12 border bg-success text-white rounded-md"
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
                  Post
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center m-3">
              <button
                className="btn bg-error w-32 text-white justify-center"
                onClick={async () => {
                  await fetch(`/api/recipes/${props.post[0].id}`, {
                    method: 'DELETE',
                  });

                  router.push('/posts');
                  router.refresh();
                }}
              >
                Delete recipe
              </button>
            </div>
          </div>
        </>
      );
    }
    // Version if the post has tasting notes
    return (
      <>
        <div className="card card-side bg-base-100 shadow-xl" />
        <div className="card card-side  shadow-xl m-2.5 bg-secondary flex flex-col max-w-md container mx-auto text-gray-900-50">
          <figure className="rounded-t-xl rounded-b-none mb-6">
            <Image
              src={props.post[0].pictureUrl}
              className="w-100 h-full"
              width={100}
              height={100}
              alt="user pic"
            />
          </figure>
          <div className="card-body">
            <p className="text-4xl font-bold text-gray-900">
              {props.post[0].coffee}
              <span className="text-2xl"> {props.post[0].roaster}</span>
            </p>
          </div>
          <div className="card-body pt-0 pb-0">
            <h2 className="text-2xl font-bold text-gray-900">How to: </h2>
            <p>Method: {props.categoryName}</p>
            <p>Coffee: {props.post[0].amountIn}g</p>
            <p>Water: {props.post[0].amountOut}g out</p>
            <p>Grind-size: {props.post[0].grindSize}</p>
            <p>Water temperature: {props.post[0].brewTemperature}°C</p>
            <div>
              <p> With a brewtime of:</p>
              <p>
                {props.post[0].brewTimeMinutes} :{' '}
                {props.post[0].brewTimeSeconds} mins
              </p>
            </div>
            <p>{props.post[0].notes}</p>
          </div>
          <div className="card-body">
            <h2 className="text-2xl font-bold">With intense flavors: </h2>
            <ul className="flex flex-col flex-wrap w-fit list-disc ml-4">
              {props.post[0].tastingNotes.map((tastingNote) => {
                return (
                  <li
                    key={`tastingNote-${tastingNote}`}
                    className="mr-2 list-item"
                  >
                    {tastingNote}
                  </li>
                );
              })}
            </ul>
          </div>
          <br />
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-3">Comments</h2>
            {commentsWithDate.map((userComment) => {
              if (userComment.userId === props.userId) {
                return (
                  <div
                    key={`comment-${userComment.id}`}
                    className="bg-secondary rounded-md p-2 border border-gray-500 flex flex-row"
                  >
                    <div className="flex w-1/6 flex-col">
                      <Link href={`/profile/${userComment.userName}`}>
                        <div>
                          <Image
                            className="rounded-full w-6"
                            src={userComment.pictureUrl}
                            width={10}
                            height={10}
                            alt="user pic"
                          />
                        </div>
                      </Link>
                      <div className="" />
                    </div>
                    <div className="flex flex-col w-5/6">
                      <p>{userComment.comment}</p>
                      <div className="flex justify-between">
                        <p className="text-xs">{userComment.createdAt}</p>
                        <button
                          // className="btn btn-danger border border-red-500"
                          onClick={async () => {
                            await fetch(`/api/comment/${userComment.id}`, {
                              method: 'DELETE',
                            });
                            router.refresh();
                          }}
                        >
                          <Image
                            src="/delete.png"
                            height={20}
                            width={20}
                            alt="delete"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={`comment-${userComment.id}`}
                  className="bg-secondary rounded-md p-2 border border-gray-500 flex flex-row"
                >
                  <div className="flex w-1/6 flex-col">
                    <Link href={`/profile/${userComment.userName}`}>
                      <div>
                        <Image
                          className="rounded-full w-6"
                          src={userComment.pictureUrl}
                          width={10}
                          height={10}
                          alt="user pic"
                        />
                      </div>
                    </Link>
                    <div className="" />
                  </div>
                  <div className="flex flex-col w-5/6">
                    <p>{userComment.comment}</p>
                    <div className="flex justify-between">
                      <p className="text-xs">{userComment.createdAt}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex flex-wrap">
              <textarea
                rows="3"
                className="textarea w-9/12 h-8 resize-none"
                placeholder="Comment..."
                aria-label="comment"
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
              <button
                className="w-3/12 border bg-success text-white rounded-md"
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
                Post
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center m-3">
            <button
              className="btn bg-error w-20 text-white justify-center"
              onClick={async () => {
                await fetch(`/api/recipes/${props.post[0].id}`, {
                  method: 'DELETE',
                });

                router.push('/posts');
                router.refresh();
              }}
            >
              Delete recipe
            </button>
          </div>
        </div>
      </>
    );
  }
  // Version if the Post is not from the logged in user and has no tasting notes
  else if (props.post[0].tastingNotes === undefined) {
    return (
      <>
        <div className="card card-side bg-base-100 shadow-xl" />
        <div className="card card-side shadow-xl m-2.5 bg-secondary flex flex-col max-w-md container mx-auto text-gray-900-50">
          <figure className="rounded-t-xl rounded-b-none mb-6">
            <Image
              src={props.post[0].pictureUrl}
              className="w-100 h-full"
              width={100}
              height={100}
              alt="user pic"
            />
          </figure>
          <div className="card-body">
            <p className="text-4xl font-bold text-gray-900">
              {props.post[0].coffee}
              <span className="text-2xl text-gray-900">
                {' '}
                {props.post[0].roaster}
              </span>
            </p>
          </div>
          <div className="card-body pt-0 pb-0">
            <h2 className="text-2xl font-bold text-gray-900">How to: </h2>
            <p>Method: {props.categoryName}</p>
            <p>Coffee: {props.post[0].amountIn}g</p>
            <p>Water: {props.post[0].amountOut}g out</p>
            <p>Grind-size: {props.post[0].grindSize}</p>
            <p>Water temperature: {props.post[0].brewTemperature}°C</p>
            <div>
              <p> With a brewtime of:</p>
              <p>
                {props.post[0].brewTimeMinutes} :{' '}
                {props.post[0].brewTimeSeconds} mins
              </p>
            </div>
            <p>{props.post[0].notes}</p>
          </div>
          <br />
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-3">Comments</h2>
            {commentsWithDate.map((userComment) => {
              if (userComment.userId === props.userId) {
                return (
                  <div
                    key={`comment-${userComment.id}`}
                    className="bg-secondary rounded-md p-2 border border-gray-500 flex flex-row"
                  >
                    <div className="flex w-1/6 flex-col">
                      <Link href={`/profile/${userComment.userName}`}>
                        <div>
                          <Image
                            className="rounded-full w-6"
                            src={userComment.pictureUrl}
                            width={10}
                            height={10}
                            alt="user pic"
                          />
                        </div>
                      </Link>
                      <div className="" />
                    </div>
                    <div className="flex flex-col w-5/6">
                      <p>{userComment.comment}</p>
                      <div className="flex justify-between">
                        <p className="text-xs">{userComment.createdAt}</p>
                        <button
                          // className="btn btn-danger border border-red-500"
                          onClick={async () => {
                            await fetch(`/api/comment/${userComment.id}`, {
                              method: 'DELETE',
                            });
                            router.refresh();
                          }}
                        >
                          <Image
                            src="/delete.png"
                            height={20}
                            width={20}
                            alt="delete"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={`comment-${userComment.id}`}
                  className="bg-secondary rounded-md p-2 border border-gray-500 flex flex-row"
                >
                  <div className="flex w-1/6 flex-col">
                    <Link href={`/profile/${userComment.userName}`}>
                      <div>
                        <Image
                          className="rounded-full w-6"
                          src={userComment.pictureUrl}
                          width={10}
                          height={10}
                          alt="user pic"
                        />
                      </div>
                    </Link>
                    <div className="" />
                  </div>
                  <div className="flex flex-col w-5/6">
                    <p>{userComment.comment}</p>
                    <div className="flex justify-between">
                      <p className="text-xs">{userComment.createdAt}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex flex-wrap">
              <textarea
                rows="3"
                className="textarea w-9/12 h-8 resize-none"
                placeholder="Comment..."
                aria-label="comment"
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
              <button
                className="w-3/12 border bg-success text-white rounded-md"
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
                Post
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  // Version if the Post is not from the logged in user and has tasting notes
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl" />
      <div className="card card-side  shadow-xl m-2.5 bg-secondary flex flex-col max-w-md container mx-auto text-gray-900-50">
        <figure className="rounded-t-xl rounded-b-none mb-6">
          <Image
            src={props.post[0].pictureUrl}
            className="w-100 h-full"
            width={100}
            height={100}
            alt="user pic"
          />
        </figure>
        <div className="card-body ">
          <p className="text-4xl font-bold text-gray-900">
            {props.post[0].coffee}
            <span className="text-2xl text-gray-900">
              {' '}
              {props.post[0].roaster}
            </span>
          </p>
        </div>
        <div className="card-body pt-0 pb-0">
          <h2 className="text-2xl font-bold text-gray-900">How to: </h2>
          <p>Method: {props.categoryName}</p>
          <p>Coffee: {props.post[0].amountIn}g</p>
          <p>Water: {props.post[0].amountOut}g out</p>
          <p>Grind-size: {props.post[0].grindSize}</p>
          <p>Water temperature: {props.post[0].brewTemperature}°C</p>
          <div>
            <p> With a brewtime of:</p>
            <p>
              {props.post[0].brewTimeMinutes} : {props.post[0].brewTimeSeconds}{' '}
              mins
            </p>
          </div>
          <p>{props.post[0].notes}</p>
        </div>
        <div className="card-body">
          <h2 className="text-2xl font-bold">With intense flavors: </h2>
          <ul className="flex flex-col flex-wrap w-fit list-disc ml-4">
            {props.post[0].tastingNotes.map((tastingNote) => {
              return (
                <li
                  key={`tastingNote-${tastingNote}`}
                  className="mr-2 list-item"
                >
                  {tastingNote}
                </li>
              );
            })}
          </ul>
        </div>
        <br />
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-3">Comments</h2>
          {commentsWithDate.map((userComment) => {
            if (userComment.userId === props.userId) {
              return (
                <div
                  key={`comment-${userComment.id}`}
                  className="bg-secondary rounded-md p-2 border border-gray-500 flex flex-row"
                >
                  <div className="flex w-1/6 flex-col">
                    <Link href={`/profile/${userComment.userName}`}>
                      <div>
                        <Image
                          className="rounded-full w-6"
                          src={userComment.pictureUrl}
                          width={10}
                          height={10}
                          alt="user pic"
                        />
                      </div>
                    </Link>
                    <div className="" />
                  </div>
                  <div className="flex flex-col w-5/6">
                    <p>{userComment.comment}</p>
                    <div className="flex justify-between">
                      <p className="text-xs">{userComment.createdAt}</p>
                      <button
                        // className="btn btn-danger border border-red-500"
                        onClick={async () => {
                          await fetch(`/api/comment/${userComment.id}`, {
                            method: 'DELETE',
                          });
                          router.refresh();
                        }}
                      >
                        <Image
                          src="/delete.png"
                          height={20}
                          width={20}
                          alt="delete"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={`comment-${userComment.id}`}
                className="bg-secondary rounded-md p-2 border border-gray-500 flex flex-row"
              >
                <div className="flex w-1/6 flex-col">
                  <Link href={`/profile/${userComment.userName}`}>
                    <div>
                      <Image
                        className="rounded-full w-6"
                        src={userComment.pictureUrl}
                        width={10}
                        height={10}
                        alt="user pic"
                      />
                    </div>
                  </Link>
                  <div className="" />
                </div>
                <div className="flex flex-col w-5/6">
                  <p>{userComment.comment}</p>
                  <div className="flex justify-between">
                    <p className="text-xs">{userComment.createdAt}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex flex-wrap">
            <textarea
              rows="3"
              className="textarea w-9/12 h-8 resize-none"
              placeholder="Comment..."
              aria-label="comment"
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
            <button
              className="w-3/12 border bg-success text-white rounded-md"
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
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
