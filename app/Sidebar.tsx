'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setStringifiedCookie } from '../utils/cookies';

export type User = {
  csrfSecret: string;
  id: number;
  userName: string;
};

export default function Sidebar({ user }: { user: User }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="sm:flex sm:flex-col w-1/6 max-w-xs bg-secondary z-1000 border-solid border-r border-gray-400 hidden h-screen sticky top-0">
      <nav className="flex flex-col w-full h-16 mt-20 text-sm">
        <Link href="/posts">
          <div className="flex gap-3 align-center text-center">
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
          <div className="flex gap-3 align-center text-center">
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
        <Link href={`/profile/${user.userName}`}>
          <div className="flex gap-3 align-center text-center">
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
        <Link href="/api/logout" prefetch={false}>
          <div className="flex gap-3 align-center text-center">
            <Image
              src="/logout1.png"
              width={30}
              height={30}
              alt="Logout"
              className="py-4 sm:mx-3"
            />
            <div className="flex flex-col align-center justify-center mr-3">
              <p>Log out</p>
            </div>
          </div>
        </Link>

        <button
          onClick={() => {
            setStringifiedCookie('darkMode', !darkMode);
            setDarkMode(!darkMode);
            router.refresh();
          }}
        >
          <div className="flex gap-3 align-center text-center">
            <Image
              className="py-4 sm:mx-3"
              src={darkMode ? '/sun.png' : '/moon.png'}
              width={30}
              height={30}
              alt="edit info"
            />

            <div className="flex flex-col align-center justify-center mr-3">
              <p className="">{darkMode ? 'Light mode' : 'Dark mode'}</p>
            </div>
          </div>
        </button>
      </nav>
    </header>
  );
}
