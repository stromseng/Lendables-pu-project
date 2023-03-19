'use client';

import { Card, Button, Loading, Text, Spacer } from '@nextui-org/react';
import { DateRange } from 'react-date-range';
import { addDays, intervalToDuration, eachDayOfInterval } from 'date-fns';
import { useState, useEffect } from 'react';
import pb from '@/app/(lib)/pocketbase';
import { useRouter } from 'next/navigation';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '@/app/calendar.css';

export const BookingCalendar = ({ post }) => {
  const router = useRouter();
  const [unavailableDays, setUnavauableDays] = useState([]);
  const [days, setDays] = useState(0);
  const [bookDisabeled, setBookDisabeled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      color: '#17C964',
    },
  ]);

  useEffect(() => {
    try {
      setUnavauableDays(
        post.expand['booking(advertisement)'].flatMap((booking) => {
          const daysInInterval = eachDayOfInterval({
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
          });
          return daysInInterval;
        })
      );
    } catch (error) {}
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const data = {
        startDate: state[0].startDate,
        endDate: state[0].endDate,
        advertisement: post.id,
        bookedByUser: pb.authStore.model.id,
        totalPrice: 100 + post.price * days,
      };

      pb.collection('booking')
        .create(data)
        .then((data) => {
          setIsLoading(false);
          router.push(`posts/${post.id}/bookingConfirmation/${data.id}`);
        });

      console.log(record);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  console.log(unavailableDays);

  return (
    <Card>
      <Card.Header>
        <Text
          h3
          css={{
            marginTop: 10,
            marginBottom: 5,
            marginLeft: 15,
          }}
        >
          Book equipment
        </Text>
      </Card.Header>
      <Card.Body css={{ p: 20, paddingTop: 0 }}>
        <Card.Divider />
        <DateRange
          disabledDates={unavailableDays}
          minDate={new Date()}
          maxDate={addDays(new Date(), 90)}
          editableDateInputs={true}
          onChange={(item) => {
            setState([item.selection]);
            setDays(
              intervalToDuration({
                start: item.selection.startDate,
                end: item.selection.endDate,
              }).days + 1
            );
            setBookDisabeled(false);
          }}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
        <Spacer y={0.4} />
        <Button color="success" disabled={bookDisabeled} onPress={onSubmit}>
          {isLoading ? (
            <Loading type="points" color="currentColor" size="sm" />
          ) : (
            'Book'
          )}
        </Button>
        <div style={{ padding: '15px' }}>
          <Text size="$sm" style={{ textDecorationLine: 'underline' }}>
            {days} days * {post.price}kr/day
            <span style={{ float: 'right' }}>{post.price * days} kr</span>
          </Text>
          <Text size="$sm" style={{ textDecorationLine: 'underline' }}>
            Base price 100 kr
            <span style={{ float: 'right' }}>100 kr</span>
          </Text>
          <Card.Divider />
          <Text size="$sm" weight="bold">
            Total price
            <span style={{ float: 'right' }}>{100 + post.price * days} kr</span>
          </Text>
        </div>
      </Card.Body>
    </Card>
  );
};
