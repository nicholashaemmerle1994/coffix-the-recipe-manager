'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { RegisterResponseBody } from '../../api/(auth)/register/route';
import styles from './register.module.scss';

export default function Registerform() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const minlength = 6;
  const alphanumeric = /^[0-9a-zA-Z]+$/;
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userName.length < minlength || !userName.match(alphanumeric)) {
      toast.error(
        'Username must be at least 4 characters long and alphanumeric',
      );
      return;
    }
    if (password.length < minlength || !password.match(alphanumeric)) {
      toast.error(
        'Password must be at least 4 characters long and alphanumeric',
      );
      return;
    }

    router.refresh();
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        userName: userName.trim().toLowerCase(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        password: password.trim(),
        pictureUrl: '/user.png',
      }),
    });
    const data: RegisterResponseBody = await response.json();
    // showing the error message
    if ('errors' in data) {
      data.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    toast.success('Registration successful');
    setTimeout(() => {
      router.refresh();
      router.push('/posts');
    }, 1000);
  };

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            duration: 3000,
          },
        }}
      />
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <a className={styles.singup}>Sign Up</a>
          <div className={styles.inputBox1}>
            <input
              required
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <span>Username</span>
          </div>

          <div className={styles.inputBox}>
            <input
              required
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            <span>First Name</span>
          </div>
          <div className={styles.inputBox}>
            <input
              required
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
            <span>Last Name</span>
          </div>

          <div className={styles.inputBox}>
            <input
              type="password"
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <span>Password</span>
          </div>
          <div className="flex gap-2">
            <button className={styles.enter}>Register</button>
            <button
              className={styles.enter}
              onClick={(event) => {
                event.preventDefault();
                router.push('/');
              }}
            >
              Return
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
