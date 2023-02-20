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
} from '@nextui-org/react';

export const PostImage = () => (
  <>
    <Grid.Container gap={1}>
      <Grid
        sm={70}
        style={{ width: '999950px', cursor: 'pointer', maxWidth: '50%' }}
      >
        <Card css={{ w: '100%', h: '100%' }}>
          <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
            <Col>
              <Text h3 color="black">
                This is a tool
              </Text>
            </Col>
          </Card.Header>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src="/tool.jpeg"
              objectFit="cover"
              width="100%"
              height="100%"
              alt="Relaxing app background"
            />
          </Card.Body>
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
            <Pagination loop color="success" total={10} initialPage={6} />
          </Card.Footer>
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
            <Text h1>Card Title</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: '$10' }}>
            <Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.Some quick example text to build on the
              card title and make up the bulk of the card's content. Some quick
              example text to build on the card title and make up the bulk of
              the card's content.Some quick example text to build on the card
              title and make up the bulk of the card's content.
            </Text>
          </Card.Body>
          <Card.Divider />
        </Card>
      </Grid>
    </Grid.Container>
    <Spacer y={0.4} />
    <Grid
      sm={7}
      style={{
        maxWidth: '100%',
      }}
    >
      <Card css={{ mw: '100%', backgroundColor: '#17c964' }}>
        <Card.Header css={{ height: '70px' }}>
          <Text h1>Description</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: '$10' }}>
          <Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.Some quick example text to build on the
            card title and make up the bulk of the card's content. Some quick
            example text to build on the card title and make up the bulk of the
            card's content.Some quick example text to build on the card title
            and make up the bulk of the card's content.
          </Text>
        </Card.Body>
        <Card.Divider />
      </Card>
    </Grid>
  </>
);
