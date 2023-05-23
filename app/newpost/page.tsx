import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCategory } from '../../database/category';
import { getValidSessionByToken } from '../../database/sessions';

export default async function CategoryPage() {
  // // check if there is a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // if there is, redirect to home page
  if (!session) {
    redirect('/login');
  }
  // if not, render login form
  const category = await getCategory();
  return (
    <div className="w-auto h-full max-w-lg mx-auto lg:mt-12 sm:mb-20 sm:mt-12 md:mb-20 bg-default rounded-lg  justify-center align-center flex-col flex text-center ">
      <h2 className="text-4xl my-12 font-black">Choose your brew method</h2>
      <div className="flex flex-wrap justify-center align-center text-warning">
        {category.map((brew) => {
          return (
            <Link
              href={`/newpost/${brew.id}`}
              key={`brew-method-${brew.name}`}
              className="w-40 bg-secondary rounded-lg p-2 m-2 justify-center align-center flex-row flex text-center border-gray-500 border"
            >
              <div
                className="align-center justify-center m-0 content-center"
                // key={`brew-method-${brew.name}`}
              >
                <Image
                  src={brew.icon}
                  alt={brew.name}
                  width={50}
                  height={50}
                  className="w-14 h-14 mx-auto my-2 rounded-lg"
                />
                <p className="text-warning font-bold">{brew.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
