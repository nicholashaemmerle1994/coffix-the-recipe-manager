import './global.scss';
import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.scss';

export const metadata = {
  title: 'Coffix - The recipe Manager',
  description: 'Log your recipes and share them with the world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <Link href="/profile">
              <Image src="/profile1.png" alt="home" width={30} height={30} />
            </Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
