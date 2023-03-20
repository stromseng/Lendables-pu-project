import pb from '@/app/(lib)/pocketbase';
import Image from 'next/image';
import { PostImage } from '@/app/posts/[id]/PostImage';
import usePosts from '@/app/(hooks)/usePosts';

export default async function PostPage({ params }) {
  const { getPosts, getPost } = usePosts();
  try {
    const post = await getPost(params.id);

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
