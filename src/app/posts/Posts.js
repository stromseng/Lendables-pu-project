'use client';

import React, { useState, useEffect } from 'react';
import Post from './Post';
import usePosts from '../(hooks)/usePosts';
import pb from '../(lib)/pocketbase';
import { Input, Text, Spacer, Button, Icon } from '@nextui-org/react';
import { Search } from 'react-iconly';

export default function Posts() {
  const { getPosts } = usePosts();

  const [data, setData] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
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
    <>
      <Spacer y={1} />
      <Input
        bordered
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        css={{ width: '100%', backgroundColor: 'white' }}
        contentRight={
          <Search
            set="curved"
            primaryColor="black"
            style={{ fontSize: '18' }}
          />
        }
      />
      <Spacer y={0.5} />
      <hr
        style={{
          color: 'lightgrey',
          height: '1px',
          width: '1200px',
        }}
      />
      <Text h2>Relevant for you</Text>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center',
        }}
      >
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
            image={item.pictures[0]}
            category={item.category}
          />
        ))}
      </div>
    </>
  );
}
