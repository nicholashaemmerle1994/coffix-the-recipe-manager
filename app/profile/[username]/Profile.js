'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function Profile({
  user,
  loggedUser,
  posts,
  category,
  token,
  followsOrNot,
  followerCount,
}) {
  const [updateUser, setUpdateUser] = useState(false);
  const [updateBio, setUpdateBio] = useState(user.bio);
  const [updateFirstName, setUpdateFirstName] = useState(user.firstName);
  const [updateLastName, setUpdateLastName] = useState(user.lastName);
  const [updatePicture, setUpdatePicture] = useState(false);
  const router = useRouter();
  const alphanumeric = /^[0-9a-zA-Z]+$/;

  // Map over the posts array and translating the createdAt string back to a date object
  const postsWithDate = posts.map((post) => {
    const date = new Date(post.createdAt);
    const dateString = date.toLocaleDateString('de-De', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // const timeString = date.toLocaleTimeString('de-DE', { hour12: false });

    return { ...post, createdAt: dateString };
  });

  async function handleOnSubmitInfo(event) {
    event.preventDefault();

    if (updateFirstName === '') {
      setUpdateFirstName(user.firstName);
    }
    if (updateLastName === '') {
      setUpdateLastName(user.lastName);
    }
    if (updateBio === '') {
      setUpdateBio(user.bio);
    }
    await fetch(`/api/profille/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        userId: user.id,
        firstName: updateFirstName.trim(),
        lastName: updateLastName.trim(),
        bio: updateBio.trim(),
        csrfToken: token,
      }),
    });
    setUpdateUser(!updateUser);
    router.refresh();
  }
  async function handleOnSubmitPicture(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'coffix-imgs');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dtxtj5v8n/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    let pictureUrl = data.secure_url;
    if (pictureUrl === undefined) {
      pictureUrl = user.pictureUrl;
    }
    await fetch('/api/picture', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        pictureUrl: pictureUrl,
        csrfToken: token,
      }),
    });
    setUpdatePicture(!updatePicture);
    router.refresh();
  }
  // Version if the user is not the owner of the profile
  if (user.id !== loggedUser) {
    return (
      <>
        <div className="card card-side bg-base-100 shadow-xl" />
        <div className="card card-side shadow-xl m-2.5 bg-secondary h-screen flex flex-col  gap-3 md:flex-row">
          <div className="card card-side bg-secondary p-2  flex flex-row border border-gray-500 rounded-lg md:w-2/6 md:flex-col">
            <div className="flex flex-row w-2/4 md:w-full">
              <figure className="rounded-l-xl md:w-full md:rounded-xl md:border border-gray-500">
                <Image
                  className=" w-full h-full md:w-full"
                  src={user.pictureUrl}
                  width={100}
                  height={100}
                  alt="user pic"
                />
              </figure>
            </div>
            <div className="flex flex-col w-2/4 md:w-full">
              <div className="card-body p-0 m-2 flex flex-col md:flex-row md:flex-wrap md:items-center">
                <div className="md:flex md:flex-wrap md:items-center">
                  <h2 className="card-title md:h-10">{user.firstName}</h2>
                  <h2 className="card-title md:h-10"> {user.lastName}</h2>
                </div>
                <div className="md:flex md:flex-wrap md:items-start md:flex-col">
                  <p>{user.bio}</p>
                  <div className="flex">
                    <div className="mr-3 mt-2">
                      <p>Posts</p>
                      <p className="text-center">{posts.length}</p>
                    </div>
                    <div className="mt-2">
                      <p>Follower</p>
                      <p className="text-center">{followerCount.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className={followsOrNot ? 'bg-red-500' : 'bg-green-500'}
                onClick={async (event) => {
                  event.preventDefault();
                  if (followsOrNot === false) {
                    // POST request to follow user
                    await fetch('/api/follow', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        userId: loggedUser,
                        followedUserId: user.id,
                      }),
                    });
                    router.refresh();
                  } else {
                    // DELETE request to unfollow user
                    await fetch('/api/follow', {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        userId: loggedUser,
                        followedUserId: user.id,
                      }),
                    });
                    router.refresh();
                  }
                }}
              >
                {followsOrNot ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 ">
            {postsWithDate.map((post) => {
              return (
                <Link href={`/posts/${post.id}`} key={`post-id-${post.id}`}>
                  <div className="card w-28 h-40 shadow-xl py-2 m-0 border border-gray-500 rounded-lg md:w-52 md:h-56">
                    <figure className="rounded-l-xl h-full">
                      <Image
                        src={post.pictureUrl}
                        alt="coffee"
                        className="rounded-xl h-28 w-20 md:w-40 md:h-40"
                        height={200}
                        width={60}
                      />
                    </figure>
                    <div className="card-body items-center text-center p-0 m-0">
                      {/* compare the post.categoryName the all categories an return the whole category */}
                      {category.map((cat) => {
                        if (cat.name === post.categoryName) {
                          return (
                            <div
                              key={`category-${cat.id}`}
                              className="flex flex-row"
                            >
                              <p className="my-2">{cat.name}</p>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    );
  }
  // Version if the user is the owner of the profile and wants to update the profile picture
  if (updatePicture === true) {
    return (
      <>
        <div className="card card-side bg-base-100 shadow-xl" />
        <form
          className="card card-side shadow-xl m-2.5 bg-secondary  flex flex-col  gap-3 md:flex-row"
          method="post"
          onSubmit={handleOnSubmitPicture}
        >
          <figure className="rounded-l-xl md:w-full md:rounded-xl md:border border-gray-500 h-22">
            <Image
              className="h-46 md:w-full"
              src={user.pictureUrl}
              width={100}
              height={100}
              alt="user pic"
            />
          </figure>
          <div className="card-body m-0 p-0 justify-center align-center ">
            <div className="md:flex md:flex-wrap md:items-center text-">
              <h2 className="card-title md:h-10 justify-center">
                {user.firstName} {user.lastName}
              </h2>
            </div>
            <div className="justify-center align-center flex">
              <input
                type="file"
                name="file"
                className="file-input file-input-xs"
                accept="en-US"
              />
            </div>
            <button className="btn btn-sm border border-gray-500 bg-secondary text-gray-900">
              Save
            </button>
          </div>
        </form>
      </>
    );
  }
  // Version if the user is the owner of the profile and wants to update the profile info
  if (updateUser === true) {
    return (
      <>
        <div className="card card-side bg-base-100 shadow-xl" />
        <div className="card card-side shadow-xl m-2.5 bg-secondary h-screen flex flex-col  gap-3 md:flex-row">
          <div className="card card-side bg-secondary p-2  flex flex-row border border-gray-500 rounded-lg md:w-2/6 md:flex-col">
            <div className="flex flex-row w-2/4 md:w-full ">
              <figure className="rounded-l-xl md:w-full md:rounded-xl md:border border-gray-500 ">
                <Image
                  className=" w-full h-full md:w-full"
                  src={user.pictureUrl}
                  width={100}
                  height={100}
                  alt="user pic"
                />
              </figure>
            </div>
            <div className="flex flex-col w-2/4 md:w-full">
              <div className="flex flex-row justify-end align-center">
                <div className="m-2">
                  <Link href="/api/logout" prefetch={false}>
                    <Image
                      src="/logout1.png"
                      width={20}
                      height={20}
                      alt="Logout"
                    />
                  </Link>
                </div>
              </div>
              <form
                className="card-body p-0 m-2 flex flex-col md:flex-row md:flex-wrap md:items-center"
                method="POST"
                onSubmit={handleOnSubmitInfo}
              >
                <div>
                  <input
                    className="input input-bordered input-sm w-full max-w-xs"
                    placeholder="First Name"
                    value={updateFirstName}
                    required
                    onChange={(event) => {
                      setUpdateFirstName(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    placeholder="Last Name"
                    className="input input-bordered input-sm w-full max-w-xs"
                    required
                    value={updateLastName}
                    onChange={(event) => {
                      setUpdateLastName(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    className="input input-bordered input-sm w-full max-w-xs"
                    placeholder="Bio"
                    value={updateBio}
                    required
                    onChange={(event) => {
                      setUpdateBio(event.target.value);
                    }}
                  />
                </div>
                <button className="btn btn-sm border border-gray-500 bg-secondary text-gray-900">
                  Save
                </button>
                <div className="md:flex md:flex-wrap md:items-start md:flex-col">
                  <p>{user.bio}</p>
                  <div className="flex">
                    <div className="mr-3 mt-2">
                      <p>Posts</p>
                      <p className="text-center">{posts.length}</p>
                    </div>
                    <div className="mt-2">
                      <p>Follower</p>
                      <p className="text-center">{followerCount.length}</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mx-2 ">
            {postsWithDate.map((post) => {
              return (
                <Link href={`/posts/${post.id}`} key={`post-id-${post.id}`}>
                  <div className="card w-28 h-40 shadow-xl py-2 m-0 border border-gray-500 rounded-lg md:w-52 md:h-72 gap-2">
                    <figure className="rounded-l-xl h-full md:h-44">
                      <Image
                        src={post.pictureUrl}
                        alt="coffee"
                        className="rounded-xl h-28 w-20 md:w-40 md:h-44"
                        height={200}
                        width={60}
                      />
                    </figure>
                    <div className="card-body items-center text-center p-0 m-0 md:flex">
                      {/* compare the post.categoryName the all categories an return the whole category */}
                      {category.map((cat) => {
                        if (cat.name === post.categoryName) {
                          return (
                            <div
                              key={`category-${cat.id}`}
                              className="flex flex-col m-0"
                            >
                              <p className="">{cat.name}</p>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                      <div className="md:w-full hidden md:flex md:flex-col">
                        <p className="my-0">{post.coffee}</p>
                        <p>{post.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    );
  }
  // Version if the user is the owner of the profile
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl" />
      <div className="card card-side shadow-xl m-2.5 bg-secondary h-screen flex flex-col  gap-3 md:flex-row">
        <div className="card card-side bg-secondary p-2  flex flex-row border border-gray-500 rounded-lg md:w-2/6 md:flex-col">
          <div className="flex flex-row w-2/4 md:w-full ">
            <figure className="rounded-l-xl md:w-full md:rounded-xl md:border border-gray-500 ">
              <Image
                className=" w-full h-full md:w-full"
                src={user.pictureUrl}
                width={100}
                height={100}
                alt="user pic"
              />
            </figure>
          </div>
          <div className="flex flex-col w-2/4 md:w-full">
            <div className="flex flex-row justify-end align-center ">
              <button
                className="m-2 xl:hidden"
                onClick={() => {
                  setUpdateUser(!updateUser);
                }}
              >
                <Image
                  src="/editinfo.png"
                  width={20}
                  height={20}
                  alt="edit info"
                />
              </button>
              <button
                className="m-2 xl:hidden"
                onClick={() => {
                  setUpdatePicture(!updatePicture);
                }}
              >
                <Image
                  src="/editimg.png"
                  width={20}
                  height={20}
                  alt="edit info"
                />
              </button>
              <div className="dropdown dropdown-end m-2 hidden xl:flex">
                <button tabIndex={0} htmlFor="dropdown">
                  <Image
                    src="/setting.png"
                    height={20}
                    width={20}
                    alt="settings"
                  />
                </button>
                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box ">
                  <li>
                    <button
                      onClick={() => {
                        setUpdateUser(!updateUser);
                      }}
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setUpdatePicture(!updatePicture);
                      }}
                    >
                      Edit Picture
                    </button>
                  </li>
                </ul>
              </div>
              <div className="m-2">
                <Link href="/api/logout" prefetch={false}>
                  <Image
                    src="/logout1.png"
                    width={20}
                    height={20}
                    alt="Logout"
                  />
                </Link>
              </div>
            </div>
            <div className="card-body p-0 m-2 flex flex-col md:flex-row md:flex-wrap md:items-center">
              <div className="md:flex md:flex-wrap md:items-center">
                <h2 className="card-title md:h-10">{user.firstName}</h2>
                <h2 className="card-title md:h-10"> {user.lastName}</h2>
              </div>
              <div className="md:flex md:flex-wrap md:items-start md:flex-col">
                <p>{user.bio}</p>
                <div className="flex justify-center">
                  <div className="mr-3 mt-10">
                    <p>Posts</p>
                    <p className="text-center">{posts.length}</p>
                  </div>
                  <div className="mt-10">
                    <p>Follower</p>
                    <p className="text-center">{followerCount.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mx-2 ">
          {postsWithDate.map((post) => {
            return (
              <Link href={`/posts/${post.id}`} key={`post-id-${post.id}`}>
                <div className="card w-28 h-40 shadow-xl py-2 m-0 border border-gray-500 rounded-lg md:w-52 md:h-72 gap-2">
                  <figure className="rounded-l-xl h-full md:h-44">
                    <Image
                      src={post.pictureUrl}
                      alt="coffee"
                      className="rounded-xl h-28 w-20 md:w-40 md:h-44"
                      height={200}
                      width={60}
                    />
                  </figure>
                  <div className="card-body items-center text-center p-0 m-0 md:flex">
                    {/* compare the post.categoryName the all categories an return the whole category */}
                    {category.map((cat) => {
                      if (cat.name === post.categoryName) {
                        return (
                          <div
                            key={`category-${cat.id}`}
                            className="flex flex-col m-0"
                          >
                            <p className="">{cat.name}</p>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                    <div className="md:w-full hidden md:flex md:flex-col">
                      <p className="my-0">{post.coffee}</p>
                      <p>{post.createdAt}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
