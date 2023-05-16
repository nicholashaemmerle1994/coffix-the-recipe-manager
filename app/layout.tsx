import './globals.scss';
import { cookies } from 'next/headers';
import { getUserBySessionToken } from '../database/users';
import Footer from './Footer';
import Sidebar from './Sidebar';

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
    theme = { name: 'darkMode', value: 'false' };
  }
  const darkMode = theme.value === 'true' ? 'dark' : 'light';

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
            <Sidebar user={user} />
            <div className="sm:flex sm:flex-col sm:w-5/6 w-full">
              {children}
            </div>
            <Footer user={user} />
          </>
        )}
      </body>
    </html>
  );
}
