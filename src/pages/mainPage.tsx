import Layout from '../components/layout/Layout';
import Advantages from '../components/advantages/Advatages';
import Promo from '../components/promo/Promo';
export default function MainPage() {
  return (
    <>
      <Layout>
        <Promo />
        <Advantages />
      </Layout>
    </>
  );
}
