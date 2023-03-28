import './globals.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';

export const metadata = {
  applicationName: 'Coffix',
  title: {
    default: 'Coffix - The recipe Manager',
    template: '%s - PWA App',
  },
  description: 'Log your recipes and share them with the world',
  manifest: '/manifest.json',
  themeColor: '#F6F2E8',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Coffix - The recipe Manager',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
};

// export const metadata = {
//   title: 'Coffix - The recipe Manager',
//   description: 'Log your recipes and share them with the world',
// };

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
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content={metadata.description} />
        {/* <link rel="apple-touch-icon" href="/logo-96x96.png" /> */}
        <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="mb-24">
        {children}
        <footer className="w-full bg-secondary fixed bottom-0 border-solid border-t border-gray-400">
          <nav className="flex flex-row justify-around w-full h-16 ">
            <Link href="/posts">
              <Image
                src="/home.png"
                alt="home"
                width={30}
                height={30}
                className="py-4"
              />
            </Link>
            <Link href="/newpost">
              <Image
                src="/newPost.png"
                alt="home"
                width={30}
                height={30}
                className="py-4"
              />
            </Link>
            <Link href={`/profile/${user?.userName}`}>
              <Image
                src="/profile.png"
                alt="home"
                width={30}
                height={30}
                className="py-4"
              />
            </Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
