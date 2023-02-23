'use client';
import {
  Card,
  Col,
  Row,
  Button,
  Text,
  Grid,
  Pagination,
  Spacer,
  Divider,
} from '@nextui-org/react';
import { useState } from 'react';

export const PostImage = ({ post }) => {
  const picturesList = post.pictures;
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <>
      <Grid.Container gap={1}>
        <Grid
          sm={70}
          style={{
            width: '100%',
            cursor: 'pointer',
            maxWidth: '50%',
            height: '500px',
          }}
        >
          <Card css={{ w: '100%', h: '100%' }}>
            <Card.Header
              css={{ position: 'absolute', zIndex: 1, top: 5 }}
            ></Card.Header>
            <Card.Body css={{ p: 0, maxW: '100%' }}>
              <Card.Image
                src={
                  post.pictures.length != 0
                    ? `http://127.0.0.1:8090/api/files/${post.collectionName}/${post.id}/${post.pictures[imageIndex]}`
                    : '/tool.jpeg'
                }
                objectFit="cover"
                width="100%"
                height="100%"
                alt="Relaxing app background"
              />
            </Card.Body>
            {post.pictures.lenght != 0 && (
              <Card.Footer
                isBlurred
                css={{
                  position: 'absolute',
                  bgBlur: '#0f111466',
                  borderTop: '$borderWeights$light solid $gray800',
                  bottom: 0,
                  zIndex: 1,
                  height: 70,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
              >
                <Pagination
                  loop
                  color="success"
                  total={post.pictures.length}
                  initialPage={6}
                  onChange={(page) => setImageIndex(page - 1)}
                />
              </Card.Footer>
            )}
          </Card>
        </Grid>
        <Grid
          sm={7}
          style={{
            maxWidth: '50%',
          }}
        >
          <Card css={{ mw: '100%' }} variant="bordered">
            <Card.Header css={{ height: '70px' }}>
              <Text h1>{post.title}</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ maxWidth: '100%' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Text
                  h4
                  size={20}
                  css={{ m: 0 }}
                  onClick={() => console.log(post)}
                >
                  Seller:
                </Text>
                <Text size={20} css={{ m: 0 }}>
                  {post.expand.seller.name}
                </Text>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Text h4 size={20} css={{ m: 0 }}>
                  Telephone number:
                </Text>
                <Text size={20} css={{ m: 0 }}>
                  {post.expand.seller.telephone_number}
                </Text>
              </div>

              <Divider />
              <Spacer y={1} />
              <Text h4 size={20} css={{ m: 0 }}>
                Description:
              </Text>

              <Text size={25} css={{ m: 0, overflowWrap: 'break-word' }}>
                {post.description}
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={0.4} />
    </>
  );
};
