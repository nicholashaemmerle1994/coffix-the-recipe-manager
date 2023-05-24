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

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = sessionToken?.value
    ? await getUserBySessionToken(sessionToken.value)
    : undefined;
  const theme = cookies().get('darkMode') || {
    name: 'darkMode',
    value: 'false',
  };
  const darkMode = theme.value === 'true' ? 'dark' : 'light';

  const bodyClassName = `flex w-screen ${
    darkMode === 'dark'
      ? 'bg-gradient-to-br from-gray-800 to-gray-600'
      : 'bg-gradient-to-br from-gray-100 to-gray-300'
  } min-h-screen`;

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
      <body className={bodyClassName}>
        <Sidebar user={user} />
        <div className="flex sm:w-5/6 w-full justify-center align-center">
          <main className="flex flex-col w-screen justify-start">
            {children}
          </main>
        </div>
        <Footer user={user} />
      </body>
    </html>
  );
}
