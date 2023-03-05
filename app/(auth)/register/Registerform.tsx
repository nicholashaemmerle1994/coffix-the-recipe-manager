'use client';
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
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.refresh();
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        userName: userName.toLowerCase(),
        firstName,
        lastName,
        password,
      }),
    });
    const data: RegisterResponseBody = await response.json();
    // showing the error message
    if ('errors' in data) {
      console.log(data.errors);
      data.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }
  };

  return (
    <>
      <Toaster />
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

          <button className={styles.enter}>Enter</button>
        </div>
      </form>
    </>
  );
}
