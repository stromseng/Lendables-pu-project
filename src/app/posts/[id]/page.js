import pb from '@/app/(lib)/pocketbase';
import Image from 'next/image';
import { PostImage } from '@/app/posts/[id]/PostImage';

async function getPost(id) {
  const post = await pb.collection('advertisements').getOne(id);
}

export default async function PostPage({ params }) {
  const post = await getPost(params.id);
  return (
    <>
      <PostImage />
    </>
  );
}
