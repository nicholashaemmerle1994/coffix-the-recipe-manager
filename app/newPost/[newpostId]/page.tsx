import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import Form from './Form';

type Params = {
  params: {
    newpostId: number;
  };
};

export default async function NewPostPage({ params }: Params) {
  const categoryID = Number(params.newpostId);
  const sessionTokenCookie = cookies().get('sessionToken');
  const user =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  if (!user) {
    redirect('/');
  }
  if (!user.userId) {
    redirect('/');
  }

  const userId = user.userId;

  return (
    <div>
      {/* giving the form the props so i can give the api the category name */}
      <Form id={categoryID} userId={userId} />
    </div>
  );
}
