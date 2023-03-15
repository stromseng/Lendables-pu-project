'use client';
import { maxWidth } from '@mui/system';
import { Card, Grid, Text, Row, Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import pb from '../(lib)/pocketbase';

export default function Post({
  title,
  created,
  id,
  price,
  sellerName,
  telephone_number,
  description,
  image,
}) {
  return (
    <Grid xs={12} alignItems="center">
      <Card
        style={{ display: 'flex', flexDirection: 'row' }}
        variant="bordered"
        borderWeight="normal"
      >
        <img
          width={420}
          height={370}
          src={
            image
              ? `http://127.0.0.1:8090/api/files/advertisements/${id}/${image}`
              : '/tool.jpeg'
          }
          alt="Default Image"
          quality={100}
        />

        <Card variant="shadow" css={{ h: '$30', w: '$10', width: '100%' }}>
          <Card.Header
            css={{ display: 'flex', flexDirection: 'row', gap: '250px' }}
          >
            <Text h1 b>
              {title}
            </Text>
            <Text>{price} kr</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ maxWidth: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Text h4 size={20} css={{ m: 0 }}>
                Seller:
              </Text>
              <Text size={20} css={{ m: 0 }}>
                {sellerName}
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Text h4 size={20} css={{ m: 0 }}>
                Telephone number:
              </Text>
              <Text size={20} css={{ m: 0 }}>
                {telephone_number}
              </Text>
            </div>
            <Text size={15} css={{ m: 0, overflowWrap: 'break-word' }}>
              {description}
            </Text>
          </Card.Body>

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
