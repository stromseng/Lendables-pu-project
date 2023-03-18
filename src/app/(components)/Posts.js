'use client';

import React, { useState, useEffect } from 'react';
import Post from './Post';
import usePosts from '../(hooks)/usePosts';
import pb from '../(lib)/pocketbase';
import { Input, Text, Spacer } from '@nextui-org/react';
import { Search } from 'react-iconly';
import styles from '@/app/(components)/Post.module.css';

export default function Posts(props) {
  const { getPosts, getPostsByUser } = usePosts();

  const [data, setData] = useState([]);
  const [title, setTitle] = useState('Most recent');

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
      const results = await pb.collection('advertisements').getFullList(200, {
        filter: filter,
        expand: 'seller',
        sort: '-created',
      });
      setData(results);
    } catch (error) {
      console.error(error);
    }
    if (string) {
      setTitle('Search results:');
    } else {
      setTitle('Most recent');
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {props.withSearch && (
          <>
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
            <hr
              style={{
                color: 'lightgrey',
                height: '1px',
                width: '1200px',
              }}
            />
            <Text h2>{title}</Text>
            <div className={styles.postContainer}>
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
        )}
      </div>
    </>
  );
}
