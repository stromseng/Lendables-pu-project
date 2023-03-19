import ProfileCard from './ProfileCard';

async function getData(userID) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/users/records/${userID}`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page({ params }) {
  const data = await getData(params.id);

  return (
    <>
      <ProfileCard userRecord={data}> </ProfileCard>
    </>
  );
}
