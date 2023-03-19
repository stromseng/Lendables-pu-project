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

  useEffect(() => {
    getPosts(Array.from(selectedSorting).at(0), '', '', props.user ?? '').then(
      (posts) => {
        setData(posts);
      }
    );
  }, [selectedSorting]);

  async function handleCategoryClick(cat) {
    try {
      let filter = '';
      if (cat !== 'all categories') {
        filter = `category = "${cat}"`;
      }
      const results = await pb.collection('advertisements').getFullList(200, {
        filter: filter,
        expand: 'seller',
        sort: '-created',
      });
      setData(results);
      setCategory(cat);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {props.withSearch && (
          <>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Input
                bordered
                placeholder="Search..."
                onChange={(e) =>
                  getPosts(
                    Array.from(selectedSorting).at(0),
                    '',
                    e.target.value
                  ).then((posts) => {
                    setData(posts);
                  })
                }
                css={{ width: '100%', backgroundColor: 'white' }}
                contentRight={<Search set="curved" />}
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

            <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
              <Link
                onClick={() => handleCategoryClick('all categories')}
                style={{
                  color:
                    category === 'all categories'
                      ? theme.colors.text.value
                      : theme.colors.green600.value,
                  cursor: 'pointer',
                }}
              >
                All categories
              </Link>
              <Link
                onClick={() => handleCategoryClick('Electronics')}
                style={{
                  color:
                    category === 'Electronics'
                      ? theme.colors.text.value
                      : theme.colors.green600.value,
                  cursor: 'pointer',
                }}
              >
                Electronics
              </Link>
              <Link
                onClick={() => handleCategoryClick('Tools')}
                style={{
                  color:
                    category === 'Tools'
                      ? theme.colors.text.value
                      : theme.colors.green600.value,
                  cursor: 'pointer',
                }}
              >
                Tools
              </Link>
              <Link
                onClick={() => handleCategoryClick('Cars')}
                style={{
                  color:
                    category === 'Cars'
                      ? theme.colors.text.value
                      : theme.colors.green600.value,
                  cursor: 'pointer',
                }}
              >
                Cars
              </Link>
              <Link
                onClick={() => handleCategoryClick('Power Tools')}
                style={{
                  color:
                    category === 'Power Tools'
                      ? theme.colors.text.value
                      : theme.colors.green600.value,
                  cursor: 'pointer',
                }}
              >
                Power Tools
              </Link>
              <Link
                onClick={() => handleCategoryClick('Hobby')}
                style={{
                  color:
                    category === 'Hobby'
                      ? theme.colors.text.value
                      : theme.colors.green600.value,
                  cursor: 'pointer',
                }}
              >
                Hobby
              </Link>
              <Link
                onClick={() => handleCategoryClick('Other')}
                style={{
                  color:
                    category === 'Other'
                      ? theme.colors.text.value
                      : theme.colors.green600.value,
                  cursor: 'pointer',
                }}
              >
                Other
              </Link>
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
