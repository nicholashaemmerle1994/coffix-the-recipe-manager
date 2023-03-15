'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Profile({ user, loggedUser }) {
  const [updateUser, setUpdateUser] = useState(false);
  const [updateBio, setUpdateBio] = useState('');
  const [updateFirstName, setUpdateFirstName] = useState('');
  const [updateLastName, setUpdateLastName] = useState('');
  const [updatePicture, setUpdatePicture] = useState(false);
  const router = useRouter();

  async function handleOnSubmitInfo(event) {
    event.preventDefault();

    await fetch(`/api/profille/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        userId: user.id,
        firstName: updateFirstName.trim(),
        lastName: updateLastName.trim(),
        bio: updateBio.trim(),
      }),
    });
    router.refresh();
    setUpdateUser(!updateUser);
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

    await fetch('/api/picture', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        pictureUrl: data.secure_url,
      }),
    });
    router.refresh();
    setUpdatePicture(!updatePicture);
  }

  if (user.id !== loggedUser) {
    return (
      <>
        <div className="card card-side bg-base-100 shadow-xl" />
        <div className="card card-side bg-base-100 shadow-xl m-2.5 bg-primary flex flex-row justify-between">
          <div className="flex flex-row w-2/4">
            <figure className="rounded-l-xl">
              <Image
                className=" w-36 h-full"
                src={user.pictureUrl}
                width={100}
                height={100}
                alt="user pic"
              />
            </figure>
          </div>
          <div className="flex flex-col w-2/4">
            <div className="card-body p-0 m-2">
              <h2 className="card-title ">{user.firstName}</h2>
              <h2 className="card-title "> {user.lastName}</h2>
              <p>{user.bio}</p>
              <p>Posts: </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (updatePicture === true) {
    return (
      <>
        <div className="card card-side bg-base-100 shadow-xl" />
        <form
          className="card card-side bg-base-100 shadow-xl m-2.5 bg-primary flex flex-col "
          method="post"
          onSubmit={handleOnSubmitPicture}
        >
          <figure className="rounded-l-xl">
            <Image
              className="w-32 h-32 mt-2"
              src={user.pictureUrl}
              width={100}
              height={100}
              alt="user pic"
            />
          </figure>
          <div className="card-body m-0 p-0 justify-center align-center">
            <div className="card-body p-0 m-2">
              <h2 className="card-title ">{user.firstName}</h2>
              <h2 className="card-title "> {user.lastName}</h2>
              <p>{user.bio}</p>
            </div>
            <div className="justify-center align-center flex">
              <input
                type="file"
                name="file"
                className="file-input file-input-xs"
              />
            </div>
            <button>Save</button>
          </div>
        </form>
      </>
    );
  }
  if (updateUser === true) {
    return (
      <>
        <div className="card card-side bg-base-100 shadow-xl" />
        <form
          className="card card-side bg-base-100 shadow-xl m-2.5 bg-primary "
          method="post"
          onSubmit={handleOnSubmitInfo}
        >
          <figure className="rounded-l-xl">
            <Image
              className="w-100"
              src={user.pictureUrl}
              width={100}
              height={100}
              alt="user pic"
            />
          </figure>
          <div className="card-body m-0">
            <div>
              <input
                className="input input-bordered input-sm w-full max-w-xs"
                placeholder="First Name"
                value={updateFirstName}
                onChange={(event) => {
                  setUpdateFirstName(event.target.value);
                }}
              />
            </div>
            <div>
              <input
                placeholder="Last Name"
                className="input input-bordered input-sm w-full max-w-xs"
                value={updateLastName}
                onChange={(event) => {
                  setUpdateLastName(event.target.value);
                }}
              />
            </div>
            <p>
              <input
                className="input input-bordered input-sm w-full max-w-xs"
                placeholder="Bio"
                value={updateBio}
                onChange={(event) => {
                  setUpdateBio(event.target.value);
                }}
              />
            </p>
            <button>Save</button>
          </div>
          <div className="m-2">
            <a href="http://localhost:3000/api/logout">
              <Image src="/logout.png" width={20} height={20} alt="Logout" />
            </a>
          </div>
        </form>
      </>
    );
  }
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl" />
      <div className="card card-side bg-base-100 shadow-xl m-2.5 bg-primary flex flex-row justify-between">
        <div className="flex flex-row w-2/4">
          <figure className="rounded-l-xl">
            <Image
              className=" w-36 h-full"
              src={user.pictureUrl}
              width={100}
              height={100}
              alt="user pic"
            />
          </figure>
        </div>
        <div className="flex flex-col w-2/4">
          <div className="flex flex-row justify-end">
            <div className="dropdown dropdown-end m-2">
              <label tabIndex={0} className="btn-circle" htmlFor="dropdown">
                <Image
                  src="/setting.png"
                  height={20}
                  width={20}
                  alt="settings"
                />
              </label>
              <ul
                // tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box "
              >
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
                      console.log(updatePicture);
                    }}
                  >
                    Edit Picture
                  </button>
                </li>
              </ul>
            </div>
            <div className="m-2">
              <a href="http://localhost:3000/api/logout">
                <Image src="/logout.png" width={20} height={20} alt="Logout" />
              </a>
            </div>
          </div>
          <div className="card-body p-0 m-2">
            <h2 className="card-title ">{user.firstName}</h2>
            <h2 className="card-title "> {user.lastName}</h2>
            <p>{user.bio}</p>
            <p>Posts: </p>
          </div>
        </div>
      </div>
    </>
  );
}
