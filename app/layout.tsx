import './global.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import styles from './layout.module.scss';

export const metadata = {
  title: 'Coffix - The recipe Manager',
  description: 'Log your recipes and share them with the world',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  // const user = await getUserBySessionToken(sessionToken?.value);

  // if user is not undefined, the person is logged in
  // if user is undefined, the person is logged out
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <footer className={styles.footer}>
          <nav>
            <Link href="/">
              <Image src="/home1.png" alt="home" width={30} height={30} />
            </Link>
            <Link href="/newpost">
              <Image src="/newPost1.png" alt="home" width={30} height={30} />
            </Link>
            <Link href={`profile/${user?.userName}`}>
              <Image src="/profile1.png" alt="home" width={30} height={30} />
            </Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
