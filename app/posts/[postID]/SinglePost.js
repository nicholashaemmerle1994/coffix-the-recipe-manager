'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// import { deleteRecipeById } from '../../../database/recipes';

export default function SinglePostPage(props) {
  const [comment, setComment] = useState('');
  const router = useRouter();
  const [wantComment, setWantComment] = useState(false);
  const [commentOnComment, setCommentOnComment] = useState('');

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

  function handleWantComment() {
    setWantComment(!wantComment);
  }
  // mapping over the comments and translating the createdAt string back to a date object
  const commentsOnCommentsWithDate = props.commentsOnComments.map((com) => {
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

  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl" />
      <div className="card card-side  shadow-xl m-2.5 bg-secondary flex flex-col max-w-md container mx-auto text-gray-900-50">
        <figure className="rounded-t-xl rounded-b-none">
          <Image
            src={props.post[0].pictureUrl}
            className="w-100 h-full"
            width={100}
            height={100}
            alt="user pic"
          />
        </figure>
        <div className="m-2">
          <Link
            className="flex flex-row justify-center items-center "
            href={`/profile/${props.post[0].userName}`}
          >
            <p className="text-xs font-light text-gray-900 text-opacity-50 mr-6">
              Created By:{' '}
            </p>
            <Image
              src={props.post[0].userPictureUrl}
              className="w-8 h-8 rounded-full mr-6"
              width={100}
              height={100}
              alt="user pic"
            />
            <p className="text-sm font-medium text-gray-900">
              {props.post[0].firstName}
            </p>
          </Link>
        </div>
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
              0{props.post[0].brewTimeMinutes} :{' '}
              {props.post[0].brewTimeSeconds >= 10
                ? props.post[0].brewTimeSeconds
                : '0' + props.post[0].brewTimeSeconds}{' '}
              min
            </p>
          </div>
          <p>{props.post[0].notes}</p>
        </div>
        {/* if the recipe has tastingnotes they will be displayed */}
        {props.post[0].tastingNotes ? (
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
        ) : (
          ''
        )}
        <br />
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-3">Comments</h2>
          {commentsWithDate.map((userComment) => {
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
                    <p className="text-xs mt-2 max-w-min mr-2">
                      {userComment.firstName}
                    </p>
                    <p className="text-xs mt-2 text-opacity-50 text-black">
                      {userComment.createdAt}
                    </p>
                    {/* check if the user is the same as the user who
                          created the post, if yes delete button is shown */}
                    {userComment.userId === props.userId ? (
                      <button
                        // className="btn btn-danger border border-red-500"
                        onClick={async () => {
                          await fetch(`/api/comment/${userComment.id}`, {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              id: userComment.id,
                              csrfToken: props.token,
                            }),
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
                    ) : (
                      ''
                    )}
                  </div>
                  {commentsOnCommentsWithDate.map((coc) => {
                    if (userComment.id === coc.commentId) {
                      return (
                        <div
                          key={`commentOnComment-${coc.id}`}
                          className="bg-secondary rounded-md p-2 border border-gray-500 flex flex-row mt-2"
                        >
                          <div className="flex w-1/6 flex-col">
                            <Link href={`/profile/${coc.userName}`}>
                              <div>
                                <div className="avatar">
                                  <div className="w-6 rounded-full">
                                    <Image
                                      src={coc.pictureUrl}
                                      width={10}
                                      height={10}
                                      alt="user pic"
                                    />
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="" />
                          </div>
                          <div className="flex flex-col w-5/6">
                            <p>{coc.comment}</p>
                            <div className="flex justify-between">
                              <p className="text-xs mt-2 max-w-min mr-2">
                                {coc.firstName}
                              </p>
                              <p className="text-xs mt-2 text-opacity-50 text-black">
                                {coc.createdAt}
                              </p>
                              {coc.userId === props.userId ? (
                                <button
                                  // className="btn btn-danger border border-red-500"
                                  onClick={async () => {
                                    await fetch(
                                      `/api/commentOnComment/${coc.id}`,
                                      {
                                        method: 'DELETE',
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                          commentId: coc.id,
                                        }),
                                      },
                                    );

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
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return '';
                    }
                  })}
                  {wantComment ? (
                    <div className="flex flex-wrap mt-3 focus:bg-secondary">
                      <input
                        className=" w-9/12 h-6 rounded-md"
                        placeholder="Comment..."
                        aria-label="comment"
                        required
                        onChange={(event) => {
                          setCommentOnComment(event.target.value);
                        }}
                      />
                      <button
                        className="w-3/12 border bg-success text-white rounded-md h-6"
                        onClick={async () => {
                          if (!commentOnComment) return;
                          const response = await fetch(
                            `/api/commentOnComment`,
                            {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                userId: props.userId,
                                commentId: userComment.id,
                                comment: commentOnComment,
                                recipeId: props.post[0].id,
                              }),
                            },
                          );
                          if (response.ok) {
                            setCommentOnComment('');
                            setWantComment(false);
                            router.refresh();
                          }
                        }}
                      >
                        Post
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className="flex justify-end">
                    <button onClick={handleWantComment}>
                      <Image
                        src="/response.png"
                        width={20}
                        height={20}
                        alt="answer the comment"
                      />
                    </button>
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
              required
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
            <button
              className="w-3/12 border bg-success text-white rounded-md"
              onClick={async () => {
                if (comment === '') {
                  return;
                }
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
        {/* if the logged in user also created the recipe there will be a delete button displayed */}
        {props.userId === props.post[0].userId ? (
          <div className="flex flex-wrap justify-center m-3">
            <button
              className="btn bg-error w-20 text-white justify-center"
              onClick={async () => {
                await fetch(`/api/recipes/${props.post[0].id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: props.post[0].id,
                    csrfToken: props.token,
                  }),
                });
                router.push('/posts');
                router.refresh();
              }}
            >
              Delete recipe
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
