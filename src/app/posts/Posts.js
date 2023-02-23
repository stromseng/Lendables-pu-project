import { Card, Text, Grid } from '@nextui-org/react';
import Post from './Post';
import usePosts from '../(hooks)/usePosts';
import pb from '../(lib)/pocketbase';

async function getUser() {
  const record = await pb.collection('users').getOne('5b2l8ikjpn8og99', {
    expand: 'user',
  });
  return record;
}

export default async function Posts() {
  const { getPosts } = usePosts();
  const data = await getPosts();
  const dataObjects = [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {data?.map((item) => (
        <Post
          key={item.id}
          title={item.title}
          id={item.id}
          created={item.created}
          price={item.price}
          sellerName={item.expand.seller.name}
          telephone_number={item.expand.seller.telephone_number}
          description={item.description}
          image={item.pictures[1]}
        />
      ))}
    </div>
  );
}
