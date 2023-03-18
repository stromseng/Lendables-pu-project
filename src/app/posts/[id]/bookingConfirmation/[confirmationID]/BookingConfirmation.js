'use client';

import { Button, Card, Text, Link } from '@nextui-org/react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export const BookingConfirmation = ({ confirmation }) => {
  const router = useRouter();
  return (
    <Card css={{ width: 500, m: 'auto', p: 20 }}>
      <Card.Body>
        <Text h3 css={{ marginTop: 0 }}>
          Booking Confirmation #{confirmation.id}
        </Text>
        <div>
          <Text weight="light" style={{ display: 'inline' }}>
            You have successfully booked{' '}
          </Text>
          <Link
            weight="light"
            style={{ display: 'inline' }}
            color="success"
            href={`/posts/${confirmation.advertisement}`}
          >
            {confirmation.expand.advertisement.title}
          </Link>
          <Text weight="light" style={{ display: 'inline' }}>
            {' '}
            from {format(
              new Date(confirmation.startDate),
              'dd-MM-yyyy'
            )} to {format(new Date(confirmation.endDate), 'dd-MM-yyyy')}.
          </Text>
          <Text size="$sm" weight="bold">
            Total price
            <span style={{ float: 'right' }}>{confirmation.totalPrice} kr</span>
          </Text>
        </div>
      </Card.Body>
      <Card.Footer css={{ justifyContent: 'center' }}>
        <Button
          color="success"
          onPress={() => {
            router.push('/posts');
          }}
        >
          Return to homepage
        </Button>
      </Card.Footer>
    </Card>
  );
};
