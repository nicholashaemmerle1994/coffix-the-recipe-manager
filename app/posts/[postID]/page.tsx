import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SinglePostPAge({ params }) {
  return <div>Single Post Page</div>;
}
