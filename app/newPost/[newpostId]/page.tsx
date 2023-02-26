import { category } from 'database/category';
import Form from './Form';

type Params = {
  params: {
    newpostId: string;
  };
};

export default function NewPostPage({ params }: Params) {
  // get the whole category object for the form to use
  const categoryName = category.filter((cat) => cat.name === params.newpostId);
  const name = categoryName[0]['name'];
  return (
    <div>
      {/* giving the form the props so i can give the api the category name */}
      <Form name={name} />
    </div>
  );
}
