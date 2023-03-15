'use client';

import React, { useState, useEffect } from 'react';
import Post from './Post';
import usePosts from '../(hooks)/usePosts';
import pb from '../(lib)/pocketbase';
import { Input, Button, Icon } from '@nextui-org/react';

export default function Posts(props) {
  const { getPosts, getPostsByUser } = usePosts();

  const [data, setData] = useState([]);

  useEffect(() => {
    props.user
      ? getPostsByUser(props.user).then((posts) => {
          setData(posts);
        })
      : getPosts().then((posts) => {
          setData(posts);
        });
  }, []);

  async function handleSearch(string) {
    try {
      const filter = `title ~ "${string}"`;
      const results = await pb
        .collection('advertisements')
        .getFullList(200, { filter: filter, expand: 'seller' });
      setData(results);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {props.withSearch && (
        <Input
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '800px' }}
        />
      )}

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
    </div>
  );
}
