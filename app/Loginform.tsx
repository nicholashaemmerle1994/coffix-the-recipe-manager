'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { RegisterResponseBody } from './api/(auth)/register/route';
import styles from './login.module.scss';

export default function LoginForm() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.refresh();
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        userName: userName.trim().toLowerCase(),
        password: password.trim(),
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
    router.push('/');
    router.refresh();
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
          <a className={styles.singup}>Log in</a>
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
              type="password"
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <span>Password</span>
          </div>
          <div>
            <button
              className={styles.enter}
              onClick={(event) => {
                event.preventDefault();
                router.push('/register');
              }}
            >
              Register
            </button>
            <button className={styles.enter}>Log in</button>
          </div>
        </div>
      </form>
    </>
  );
}
