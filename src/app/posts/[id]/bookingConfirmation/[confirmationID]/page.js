import pb from '@/app/(lib)/pocketbase';
import { BookingConfirmation } from '@/app/posts/[id]/bookingConfirmation/[confirmationID]/BookingConfirmation';

export default async function PostPage({ params }) {
  try {
    const booking = await pb
      .collection('booking')
      .getOne(params.confirmationID, {
        expand: 'advertisement',
      });

    console.log(booking);

    return (
      <>
        <BookingConfirmation confirmation={booking} />
      </>
    );
  } catch (error) {
    console.log(error);
  }

  return <p>Page does not exist</p>;
}
