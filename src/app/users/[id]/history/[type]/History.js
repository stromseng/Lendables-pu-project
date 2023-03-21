'use client';

import useBooking from '@/app/(hooks)/useBookings';
import { Button, Card, Text, Spacer } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Order } from './Order';

export const History = ({ bookings, params }) => {
  const { getBookings } = useBooking();
  const [activeTab, setActiveTab] = useState();
  const [bookingList, setBookingList] = useState();

  useEffect(() => {
    setBookingList(bookings);
    setActiveTab(params.type === 'sales' ? 'My sales' : 'My purchases');
  }, []);

  console.log(bookingList);

  return (
    <>
      <Text h2>History</Text>
      <Card>
        <Card.Body css={{ p: 40, alignItems: 'center' }}>
          <Button.Group color="success">
            <Button
              bordered={activeTab != 'My purchases'}
              onPress={() => {
                getBookings(`bookedByUser = "${params.id}"`).then((data) =>
                  setBookingList(data)
                );
                setActiveTab('My purchases');
              }}
            >
              My purchases
            </Button>
            <Button
              bordered={activeTab != 'My sales'}
              onPress={() => {
                getBookings(`advertisement.seller = "${params.id}"`).then(
                  (data) => setBookingList(data)
                );
                setActiveTab('My sales');
              }}
            >
              My sales
            </Button>
          </Button.Group>
          <Spacer y={1} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              width: '100%',
            }}
          >
            {bookingList &&
              bookingList.map((booking) => (
                <>
                  <Order booking={booking} activeTab={activeTab} />
                  <Card.Divider />
                </>
              ))}
          </div>
          {bookingList && bookingList.length === 0 && (
            <Text>
              There are no{' '}
              {activeTab === 'My purchases' ? 'purchases' : 'sales'}.
            </Text>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
