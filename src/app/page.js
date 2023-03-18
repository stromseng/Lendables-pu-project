import Posts from './(components)/Posts';
import Title from './(components)/Title';

export default function Home() {
  return (
    <>
      <Title>Welcome to Lendables_light</Title>
      <Posts withSearch={true} />
    </>
  );
}
