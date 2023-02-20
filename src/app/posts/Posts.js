import { Card, Text, Grid } from '@nextui-org/react';
import Post from './Post';
import usePosts from '../(hooks)/usePosts';

export default async function Posts() {
  const { getPosts } = usePosts();
  const data = await getPosts();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {data?.map((item) => (
        <Post
          key={item.id}
          title={item.title}
          id={item.id}
          created={item.created}
          bool={true}
        />
      ))}
    </div>
  );
}
