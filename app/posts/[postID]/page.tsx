import { notFound } from 'next/navigation';
import { getSingleRecipeWithTastingNotes } from '../../../database/recepisTastingNotes';
import SinglePostPage from './SinglePost';

export const dynamic = 'force-dynamic';
type Props = {
  params: {
    postID: string;
  };
};
export default async function SinglePostPAge({ params }: Props) {
  const singleRecipeArray = await getSingleRecipeWithTastingNotes(
    params.postID,
  );
  if (singleRecipeArray.length === 0) return notFound();

  return <SinglePostPage postID={params.postID} />;
}
