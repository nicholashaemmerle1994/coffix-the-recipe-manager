import { cookies } from 'next/headers';
import { notFound, redirect, useRouter } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserByUsername } from '../../../database/users';
import Profile from './Profile';

type Props = { params: { username: string } };

export default async function ProfilePage(props: Props) {
  // check if there is a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // if there is, redirect to home page
  if (!session) {
    redirect('/');
  }
  // if not, render login form

  const user: { id: number; userName: string } | undefined =
    await getUserByUsername(props.params.username);

  if (!user) {
    return notFound();
  }
  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
