'use client';

import { Badge, Button, Card, Text, User } from '@nextui-org/react';
import styles from './History.module.css';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Order = ({ booking, activeTab }) => {
  const router = useRouter();
  // const [avatar, setAvatar] = useState();

  const seller =
    activeTab == 'My purchases'
      ? booking.expand.advertisement.expand.seller
      : booking.expand.bookedByUser;
  console.log('test');
  const avatar =
    seller.avatar &&
    `http://127.0.0.1:8090/api/files/users/${seller.id}/${seller.avatar}`;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          float: 'left',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div>
          <Card.Image
            width={'120px'}
            height={'120px'}
            objectFit="cover"
            src={`http://127.0.0.1:8090/api/files/advertisements/${booking.advertisement}/${booking.expand.advertisement.pictures[0]}`}
            alt="Default Image"
            quality={100}
            css={{ borderRadius: 10 }}
          />
        </div>
        <div className={styles.textDiv}>
          <Badge variant="flat" size="sm" css={{ borderWidth: 0 }}>
            {activeTab == 'My purchases' ? 'Purchase ' : 'Sale '}#{booking.id}
          </Badge>
          <Text h4>{booking.expand.advertisement.title}</Text>
          <Text size="$sm">Price: {booking.totalPrice} kr</Text>
          <Text size="$sm">
            Rented from {format(new Date(booking.startDate), 'dd.MM.yyyy')} -{' '}
            {format(new Date(booking.endDate), 'dd.MM.yyyy')} | Ordered:{' '}
            {format(new Date(booking.created), 'dd.MM.yyyy')}
          </Text>
        </div>
      </div>
      <div
        style={{
          float: 'right',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '250px',
        }}
      >
        <User
          src={avatar}
          text={(activeTab == 'My purchases'
            ? booking.expand.advertisement.expand.seller.name
            : booking.expand.bookedByUser.name
          )
            .match(/\b\w/g)
            .join('')}
          name={
            activeTab == 'My purchases'
              ? booking.expand.advertisement.expand.seller.name
              : booking.expand.bookedByUser.name
          }
          description={`+47 ${booking.expand.advertisement.expand.seller.telephone_number}`}
          css={{ p: 0 }}
        ></User>
        <Button
          bordered
          size="sm"
          color="success"
          onPress={() => {
            router.push(`/users/${booking.expand.advertisement.seller}`);
          }}
        >
          Go to {activeTab == 'My purchases' ? 'seller' : 'buyer'}
        </Button>
        <Button
          bordered
          size="sm"
          color="success"
          onPress={() => {
            router.push(`/posts/${booking.advertisement}`);
          }}
        >
          Go to product
        </Button>
      </div>
    </div>
  );
};
