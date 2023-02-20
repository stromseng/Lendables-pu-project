import Post from './Post';
import PageLayout from '../(components)/PageLayout';
import Posts from './Posts';
import pb from '../(lib)/pocketbase';
import Title from '../(components)/Title';

export default function PostsPage() {
  return (
    <>
      <Title>Here are all the posts posted</Title>
      <Posts />
    </>
  );
}
