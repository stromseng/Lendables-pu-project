'use client';
import { Card, Grid, Text, Row, Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Post({ title, created, id }) {
  return (
    <Grid xs={12} alignItems="center">
      <Card
        style={{ display: 'flex', flexDirection: 'row' }}
        variant="bordered"
        borderWeight="normal"
      >
        <Image
          width={360}
          height={280}
          src="/tool.jpeg"
          alt="Default Image"
          quality={100}
          // add image pagnation here
        />

        <Card variant="shadow" css={{ h: '$30', w: '$30', width: '100%' }}>
          <Card.Header
            css={{ display: 'flex', flexDirection: 'row', gap: '450px' }}
          >
            <Text b>{title}</Text>
            <Text>{created}</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Text h6 size={20} css={{ m: 0 }}>
              Seller
            </Text>
            <Text h6 size={15} css={{ m: 0 }}>
              Description
            </Text>
            <Text h6 size={15} css={{ m: 0 }}>
              Price
            </Text>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify="flex-end">
              <Link href={`posts/${id}`}>
                <Button size="sm" color="success">
                  Check asdf
                </Button>
              </Link>
            </Row>
          </Card.Footer>
        </Card>
      </Card>
    </Grid>
  );
}
