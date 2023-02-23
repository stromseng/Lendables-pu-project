import pb from '@/app/(lib)/pocketbase';
import Image from 'next/image';
import { PostImage } from '@/app/posts/[id]/PostImage';

export default async function PostPage({ params }) {
  const post = await pb
    .collection('advertisements')
    .getOne(params.id, { expand: 'seller' });
  console.log(post);

  return (
    <>
      <PostImage post={post} />
    </>
  );
}
