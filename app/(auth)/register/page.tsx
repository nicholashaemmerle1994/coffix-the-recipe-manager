import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import Registerform from './Registerform';

export default async function RegisterPage() {
  // check if there is a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // if there is, redirect to home page
  if (session) {
    redirect('/');
  }
  // if not, render login form

  return (
    <div>
      <Registerform />
    </div>
  );
}
