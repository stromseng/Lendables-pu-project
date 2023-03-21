import pb from 'src/app/(lib)/pocketbase.js';

export default function useBooking() {
  async function getBookings(filter) {
    const data = await pb
      .collection('booking')
      .getFullList(200 /* batch size */, {
        sort: '-created',
        filter: filter,
        expand: 'advertisement.seller,bookedByUser',
      });
    return data;
  }

  return { getBookings };
}
