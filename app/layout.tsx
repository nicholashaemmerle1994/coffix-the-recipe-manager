import './globals.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';

export const metadata = {
  applicationName: 'Coffix',
  title: {
    default: 'Coffix - The recipe Manager',
    template: '%s - Coffix-Social',
  },
  description: 'Log your recipes and share them with the world',
  manifest: '/manifest.json',
  themeColor: '#000000',
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
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
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

  // get theme cookie

  let theme = cookies().get('darkMode');
  if (theme === undefined) {
    theme = { value: false };
  }
  console.log(user);
  const darkMode = theme!.value === 'true' ? 'dark' : 'light';
  return (
    <html lang="en-US" data-theme={darkMode}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="description" content={metadata.description} />
      </head>
      <body className="flex w-full">
        {user === undefined ? (
          <div>{children}</div>
        ) : (
          <>
            <header className="sm:flex sm:flex-col w-1/6 max-w-xs bg-secondary z-1000 border-solid border-r border-gray-400 hidden h-screen sticky top-0">
              <nav className="flex flex-col w-full h-16 mt-20">
                <Link href="/posts">
                  <div className="flex justify-between align-center text-center">
                    <Image
                      src="/home.png"
                      alt="home"
                      width={30}
                      height={30}
                      className="py-4 sm:mx-3"
                    />
                    <div className="flex flex-col align-center justify-center mr-3">
                      <p>Home</p>
                    </div>
                  </div>
                </Link>
                <Link href="/newpost">
                  <div className="flex justify-between align-center text-center">
                    <Image
                      src="/newPost.png"
                      alt="home"
                      width={30}
                      height={30}
                      className="py-4 sm:mx-3"
                    />
                    <div className="flex flex-col align-center justify-center mr-3">
                      <p className="">New Post</p>
                    </div>
                  </div>
                </Link>
                <Link href={`/profile/${user?.userName}`}>
                  <div className="flex justify-between align-center text-center">
                    <Image
                      src="/profile.png"
                      alt="home"
                      width={30}
                      height={30}
                      className="py-4 sm:mx-3"
                    />
                    <div className="flex flex-col align-center justify-center mr-3">
                      <p>Profile</p>
                    </div>
                  </div>
                </Link>
              </nav>
            </header>

            <div className="sm:flex sm:flex-col sm:w-5/6 w-full">
              {children}
            </div>
            <footer className="w-full bg-secondary fixed bottom-0 border-solid border-t border-gray-400 sm:hidden">
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
          </>
        )}
      </body>
    </html>
  );
}
