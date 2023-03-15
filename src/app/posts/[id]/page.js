import pb from '@/app/(lib)/pocketbase';
import Image from 'next/image';
import { PostImage } from '@/app/posts/[id]/PostImage';

export default async function PostPage({ params }) {
  try {
    const post = await pb
      .collection('advertisements')
      .getOne(params.id, { expand: 'seller' });
    return (
      <>
        <PostImage post={post} />
      </>
    );
  } catch (error) {}

  return <p>Page does not exist</p>;
}
