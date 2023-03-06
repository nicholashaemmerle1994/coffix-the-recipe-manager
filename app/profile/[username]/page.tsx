import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';
import Profile from './Profile';

type Props = { params: { username: string } };

export default async function ProfilePage(props: Props) {
  const user: { id: number; userName: string } | undefined =
    await getUserByUsername(props.params.username);

  if (!user) {
    return notFound();
  }
  // console.log(props.params.username);
  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
