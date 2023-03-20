import pb from 'src/app/(lib)/pocketbase.js';

export default function usePosts() {
  async function getPosts(sortingBy, categoryFilter, titleFilter, userFilter) {
    const Cfilter = categoryFilter ? `&& category = "${categoryFilter}"` : '';
    const Tfilter = titleFilter ? `&& title ~ "${titleFilter}"` : '';
    const Ufilter = userFilter
      ? `seller = "${userFilter}"`
      : `seller != "${pb.authStore.model.id}"`;

    const bookingData =
      sortingBy === 'popularity'
        ? await pb.collection('booking').getFullList(200, {
            expand: 'bookedByUser',
          })
        : [];

    const data = await pb.collection('advertisements').getFullList(200, {
      filter: `${Ufilter} ${Cfilter} ${Tfilter} `,
      expand: 'seller',
      sort: `${
        sortingBy == 'newest'
          ? '-created'
          : sortingBy == 'oldest'
          ? 'created'
          : sortingBy == 'price-high'
          ? '-price'
          : sortingBy == 'price-low'
          ? 'price'
          : ''
      }`,
    });
    return data.sort(function (a, b) {
      const aBookings = bookingData.filter(
        (booking) => booking.advertisement === a.id
      ).length;
      const bBookings = bookingData.filter(
        (booking) => booking.advertisement === b.id
      ).length;
      return bBookings - aBookings;
    });
  }
  async function getPost(user) {
    const post = await pb.collection('advertisements').getOne(user, {
      expand: 'booking(advertisement),seller',
    });
    return post;
  }

  return { getPosts, getPost };
}
