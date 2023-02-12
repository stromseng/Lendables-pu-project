import pb from 'src/app/(lib)/pocketbase.js';
import LoginField from './LoginField';

async function getAds() {
  const resultList = await (
    await pb.collection('advertisements').getList(1, 50)
  ).items;
  console.log(resultList);
  return resultList;
}

export default function LoginPage() {
  return (
    <>
      <LoginField />
    </>
  );
}
