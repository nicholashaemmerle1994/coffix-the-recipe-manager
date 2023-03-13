import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCategory } from '../../database/category';
import { getValidSessionByToken } from '../../database/sessions';
import styles from './category.module.scss';

export default async function CategoryPage() {
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
  const category = await getCategory();
  return (
    <div className={styles.wholePage}>
      <h2 className="my-5 text-4xl text-primary">Choose your brew method</h2>
      {category.map((brew) => {
        return (
          <Link href={`/newpost/${brew.id}`} key={`brew-method-${brew.name}`}>
            <div className={styles.methoddiv}>
              <Image src={brew.icon} alt={brew.name} width={50} height={50} />
              <p>{brew.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
