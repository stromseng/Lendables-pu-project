import pb from '@/app/(lib)/pocketbase';
import Image from 'next/image';
import { PostImage } from '@/app/posts/[id]/PostImage';

export default async function PostPage({ params }) {
  try {
    const post = await pb.collection('advertisements').getOne(params.id, {
      expand: 'booking(advertisement),seller',
    });

    console.log(post);

    return (
      <>
        <PostImage post={post} />
      </>
    );
  } catch (error) {
    console.log(error);
  }

  return <p>Page does not exist</p>;
}

export const revalidate = 0;
