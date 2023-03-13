'use client';
import Image from 'next/image';
import { useState } from 'react';
import styles from './profile.module.scss';

export default function Profile({ user }) {
  const [updateUser, setUpdateUser] = useState(false);
  const [updateBio, setUpdateBio] = useState('');
  const [updateFirstName, setUpdateFirstName] = useState('');
  const [updateLastName, setUpdateLastName] = useState('');

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();
    if (fileInput === undefined) {
      return;
    }
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

    const response = await fetch(`/api/profille/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        userId: user.id,
        firstName: updateFirstName.trim(),
        lastName: updateLastName.trim(),
        bio: updateBio.trim(),
        pictureUrl: data.secure_url,
      }),
    });
    console.log(response);
    setUpdateUser(!updateUser);
  }
  if (updateUser === true) {
    return (
      <form method="post" onSubmit={handleOnSubmit}>
        <div>
          <div className={styles.upperPart}>
            <div>
              <img
                src={user.pictureUrl}
                alt="nices foto"
                width={120}
                height={150}
              />
            </div>
            <div>
              <a href="http://localhost:3000/api/logout">
                <Image
                  src="/logout.png"
                  width={30}
                  height={30}
                  alt="Logout"
                  className={styles.img}
                />
              </a>

              <p>Posts:</p>
              <div>
                <input
                  placeholder="First Name"
                  value={updateFirstName}
                  onChange={(event) => {
                    setUpdateFirstName(event.target.value);
                  }}
                />
                <input
                  placeholder="Last Name"
                  value={updateLastName}
                  onChange={(event) => {
                    setUpdateLastName(event.target.value);
                  }}
                />
                <input
                  placeholder="Bio"
                  value={updateBio}
                  onChange={(event) => {
                    setUpdateBio(event.target.value);
                  }}
                />
                <p>Profile picture:</p>
                <input type="file" name="file" />

                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
  return (
    <div>
      <div className={styles.upperPart}>
        <div>
          <img
            src={user.pictureUrl}
            alt="nices foto"
            width={120}
            height={150}
          />
        </div>
        <div>
          <button
            onClick={() => {
              setUpdateUser(!updateUser);
            }}
          >
            Edit Profile
          </button>
          <a href="http://localhost:3000/api/logout">
            <Image
              src="/logout.png"
              width={30}
              height={30}
              alt="Logout"
              className={styles.img}
            />
          </a>

          <p>Posts:</p>
          <div>
            <h5>
              {user.firstName} {user.lastName}
            </h5>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
