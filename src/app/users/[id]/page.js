import Posts from '@/app/(components)/Posts';
import pb from '@/app/(lib)/pocketbase';
import { User } from '@nextui-org/react';
import { ProfileSection } from './ProfileSection';

export default async function UserPage({ params }) {
  const user = await pb.collection('users').getOne(params.id);

  return (
    <>
      <ProfileSection user={user} />
      <hr
        style={{
          color: 'lightgrey',
          height: '1px',
          width: '1200px',
        }}
      />
      <Posts user={user.id} withSearch={false} />
    </>
  );
}
