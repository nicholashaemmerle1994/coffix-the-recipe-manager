import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../database/sessions';
import { createCsrfToken } from '../utils/csrf';
import LoginForm from './Loginform';

export default async function LoginPage() {
  // check if there is a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // if there is, redirect to home page
  if (session) {
    redirect('/posts');
  }
  // if not, render login form

  return (
    <div>
      <LoginForm />
    </div>
  );
}
