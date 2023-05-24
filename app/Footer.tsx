'use client';
import Image from 'next/image';
import Link from 'next/link';
import { User } from './Sidebar';

export default function Footer({ user }: { user: User | undefined }) {
  return (
    <footer className="w-full bg-secondary fixed bottom-0 border-solid border-t border-gray-400 sm:hidden">
      <nav className="flex flex-row justify-around w-full h-16 ">
        <Link href="/">
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
        {user ? (
          <Link href={`/profile/${user.userName}`}>
            <div className="flex gap-3 align-center text-center">
              <Image
                src="/profile.png"
                alt="home"
                width={30}
                height={30}
                className="py-4 sm:mx-3"
              />
            </div>
          </Link>
        ) : (
          <Link href="/login">
            <div className="flex gap-3 align-center text-center">
              <Image
                src="/profile.png"
                alt="home"
                width={30}
                height={30}
                className="py-4 sm:mx-3"
              />
            </div>
          </Link>
        )}
      </nav>
    </footer>
  );
}
