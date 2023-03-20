import { History } from './History';
import pb from '@/lib/pocketbase';
import useBooking from '@/app/(hooks)/useBookings';

export const revalidate = 0;

export default async function HistoryPage({ params }) {
  const { getBookings, isError } = useBooking();

  try {
    const bookings = await getBookings(
      params.type === 'sales'
        ? `advertisement.seller = "${params.id}"`
        : `bookedByUser = "${params.id}"`
    );
    return (
      <>
        <History bookings={bookings} params={params}></History>
      </>
    );
  } catch (error) {}
}
