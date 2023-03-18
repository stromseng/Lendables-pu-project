'use client'

import React, { useState, useEffect } from 'react';
import Post from './Post';
import usePosts from '../(hooks)/usePosts';
import pb from '../(lib)/pocketbase';
import { Grid, Input, Spacer, Icon } from '@nextui-org/react';

export default function Posts() {
  const { getPosts } = usePosts();

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getPosts().then(posts => {
      setData(posts);
    });
  }, []);

  async function handleSearch() {
    try {
      const filter = `title ~ "${searchValue}"`;
      const results = await pb.collection('advertisements').getFullList(200, { filter: filter, expand: 'seller' });
      setData(results);
    } catch (error) {
      console.error(error);
    }    
  }

  async function handleCategoryClick(cat) {
    try {
      let filter = '';
      if (cat !== 'all categories') {
        filter = `category = "${cat}"`;
      }
      const results = await pb.collection('advertisements').getFullList(200, { filter: filter, expand: 'seller' });
      setData(results);
      setCategory(cat);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      <Spacer y={1} />
      <Grid.Container justify="center">
        <Input
          clearable
          bordered
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => {setSearchValue(e.target.value); handleSearch();}}
          css={{ width: '60%', backgroundColor: 'white' }}
        />
      </Grid.Container>
      
      <Spacer y={1} />

      <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', marginRight: '200px' }}></span>
        <span onClick={() => handleCategoryClick('all categories')} style={{ color: category === 'all categories' ? 'black' : 'green', cursor: 'pointer' }}>All categories</span>
        <span onClick={() => handleCategoryClick('Electronics')} style={{ color: category === 'Electronics' ? 'black' : 'green', cursor: 'pointer' }}>Electronics</span>
        <span onClick={() => handleCategoryClick('Tool kit')} style={{ color: category === 'Tool kit' ? 'black' : 'green', cursor: 'pointer' }}>Tool kit</span>
        <span onClick={() => handleCategoryClick('Car')} style={{ color: category === 'Car' ? 'black' : 'green', cursor: 'pointer' }}>Car</span>
        <span onClick={() => handleCategoryClick('Power tools')} style={{ color: category === 'Power tools' ? 'black' : 'green', cursor: 'pointer' }}>Power tools</span>
        <span onClick={() => handleCategoryClick('Hobby')} style={{ color: category === 'Hobby' ? 'black' : 'green', cursor: 'pointer' }}>Hobby</span>
        <span onClick={() => handleCategoryClick('Other')} style={{ color: category === 'Other' ? 'black' : 'green', cursor: 'pointer' }}>Other</span>
      </div>
      
      <Spacer y={1} />
      
      <hr
        style={{
          color: 'lightgrey',
          width: '1200px',
        }}
      />

      <Spacer y={1} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {data?.map((item) => (
          <Post
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
