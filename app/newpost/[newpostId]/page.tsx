import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import { createCsrfToken } from '../../../utils/csrf';
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
    return (
      <main>
        <h1>
          You need to <Link href="/">Log in</Link>
        </h1>
      </main>
    );
    // redirect('/');
  }
  if (!user.userId) {
    return (
      <main>
        <h1>
          You need to <Link href="/">Log in</Link>
        </h1>
      </main>
    );
    // redirect('/');
  }
  const csrfToken = createCsrfToken(user.csrfSecret);
  const userId = user.userId;

  return (
    <div>
      {/* giving the form the props so i can give the api the category name */}
      <Form id={categoryID} userId={userId} token={csrfToken} />
    </div>
  );
}
