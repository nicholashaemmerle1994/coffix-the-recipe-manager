import { getCategory } from '../../../database/category';
import Form from './Form';

type Params = {
  params: {
    newpostId: string;
  };
};

export default async function NewPostPage({ params }: Params) {
  // get the category name from the url¥‚
  const category = await getCategory();
  // get the whole category object for the form to use
  const categoryName = category.filter(
    (cat) => cat.siteName === params.newpostId,
  );
  if (categoryName.length === 0) {
    return <div>404</div>;
  }
  const name = categoryName[0]!.name;
  return (
    <div>
      {/* giving the form the props so i can give the api the category name */}
      <Form name={name} />
    </div>
  );
}
