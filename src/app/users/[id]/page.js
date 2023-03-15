import Posts from '@/app/(components)/Posts';
import pb from '@/app/(lib)/pocketbase';
import { User } from '@nextui-org/react';
import { ProfileSection } from './ProfileSection';

export default async function UserPage({ params }) {
  const user = await pb.collection('users').getOne(params.id);

  return (
    <>
      <ProfileSection user={user} />
      <Posts user={user.id} withSearch={false} />
    </>
  );
}
