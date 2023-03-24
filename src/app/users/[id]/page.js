import Posts from '@/app/(components)/Posts';
import pb from '@/app/(lib)/pocketbase';
import { ProfileSection } from './ProfileSection';
import getAvgUserRating from '@/app/(lib)/getAvgUserRating';

export const revalidate = 0; // revalidate this page every 60 seconds

export default async function UserPage({ params }) {
  const user = await pb.collection('users').getOne(params.id);
  const roundedAvgUserRating = await getAvgUserRating(params.id);

  return (
    <>
      <ProfileSection user={user} avgUserRating={roundedAvgUserRating} />
      <hr
        style={{
          color: 'lightgrey',
          height: '1px',
          width: '1200px',
          margin: '10px 0px 30px 0px',
        }}
      />
      <Posts user={user.id} withSearch={false} />
    </>
  );
}
