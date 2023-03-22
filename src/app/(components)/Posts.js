'use client';

import React, { useState, useEffect } from 'react';
import Post from './Post';
import usePosts from '../(hooks)/usePosts';
import pb from '../(lib)/pocketbase';
import {
  Input,
  Text,
  Spacer,
  useTheme,
  Link,
  Dropdown,
} from '@nextui-org/react';
import { Search } from 'react-iconly';
import styles from '@/app/(components)/Post.module.css';

export default function Posts(props) {
  const { getPosts } = usePosts();
  const { theme } = useTheme();

  const [data, setData] = useState([]);
  const [category, setCategory] = useState('');
  const [selectedSorting, setSelectedSorting] = React.useState(
    new Set(['newest'])
  );
  const categories = [
    '',
    'Electronics',
    'Tools',
    'Cars',
    'Power Tools',
    'Hobby',
    'Other',
  ];

  useEffect(() => {
    getPosts(
      Array.from(selectedSorting).at(0),
      category,
      '',
      props.user ?? ''
    ).then((posts) => {
      setData(posts);
    });
  }, [selectedSorting]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {props.withSearch && (
          <>
            <Spacer y={1.0} />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Input
                bordered
                placeholder="Search..."
                onChange={(e) =>
                  getPosts(
                    Array.from(selectedSorting).at(0),
                    category,
                    e.target.value
                  ).then((posts) => {
                    setData(posts);
                  })
                }
                css={{ width: '100%', backgroundColor: '$backgroundContrast' }}
                contentRight={
                  <Search
                    set="curved"
                    primaryColor={theme.colors.gray700.value}
                  />
                }
              />
              <Dropdown>
                <Dropdown.Button
                  flat
                  color="success"
                  css={{ tt: 'capitalize' }}
                >
                  {Array.from(selectedSorting).join(', ').replaceAll('-', ' ')}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="success"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedSorting}
                  onSelectionChange={setSelectedSorting}
                >
                  <Dropdown.Item key="newest">Newest</Dropdown.Item>
                  <Dropdown.Item key="oldest">Oldest</Dropdown.Item>
                  <Dropdown.Item key="popularity">Most popular</Dropdown.Item>
                  <Dropdown.Item key="price-low">
                    Price: low to high
                  </Dropdown.Item>
                  <Dropdown.Item key="price-high">
                    Price: high to low
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Spacer y={0.5} />

            <div style={{ display: 'flex', gap: '50px', alignSelf: 'center' }}>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  onClick={() =>
                    getPosts(Array.from(selectedSorting).at(0), cat, '').then(
                      (posts) => {
                        setData(posts);
                        setCategory(cat);
                      }
                    )
                  }
                  style={{
                    color:
                      category === cat
                        ? theme.colors.text.value
                        : theme.colors.green600.value,
                    cursor: 'pointer',
                  }}
                >
                  {cat === '' ? 'All categories' : cat}
                </Link>
              ))}
            </div>
          </>
        )}

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
      </div>
    </>
  );
}
