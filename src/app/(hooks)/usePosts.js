import pb from 'src/app/(lib)/pocketbase.js';

export default function usePosts() {
  async function getPosts() {
    const data = await pb
      .collection('advertisements')
      .getFullList(200 /* batch size */, {
        expand: 'seller',
        sort: '-created',
      });
    return data;
  }
  async function getPostsByUser(userId) {
    const data = await pb
      .collection('advertisements')
      .getFullList(200 /* batch size */, {
        filter: `seller = "${userId}"`,
        expand: 'seller',
        sort: '-created',
      });
    return data;
  }
  return { getPosts, getPostsByUser };
}
