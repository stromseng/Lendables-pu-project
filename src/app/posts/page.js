import Posts from './Posts';
import Searchbar from './Searchbar';

export default function PostsPage() {
  return (
    <>
      <Searchbar />
      <hr
        style={{
          color: 'lightgrey',
          height: '1px',
          width: '1200px',
        }}
      />
      <Posts />
    </>
  );
}

