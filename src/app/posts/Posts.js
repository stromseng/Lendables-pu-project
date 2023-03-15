'use client'

import React, { useState, useEffect } from 'react';
import Post from './Post';
import usePosts from '../(hooks)/usePosts';
import pb from '../(lib)/pocketbase';
import { Input, Button, Icon } from '@nextui-org/react';

// async function getUser() {
//   const record = await pb.collection('users').getOne('5b2l8ikjpn8og99', {
//     expand: 'user',
//   });
//   return record;
// }

export default function Posts() {
  const { getPosts } = usePosts();

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getPosts().then(posts => {
      setData(posts);
    });
  }, []);

  async function handleSearch() {
    try {
      const filter = `title ~ "${searchValue}"`;
      const results = await pb.collection('advertisements').getFullList(200, {filter: filter, expand: 'seller'});
      setData(results);
    } catch (error) {
      console.error(error);
  }    
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ width: "600px" }}
      />
    
    <hr
        style={{
          color: 'lightgrey',
          height: '1px',
          width: '1200px',
        }}
      />

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
    </>
  );
}
