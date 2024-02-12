
import FrontLayout from '@/components/layout/FrontLayout'
import ScrollCard from '@/components/form-compo/ScrollCard';
import Banner from '@/components/home-page/Banner';
import Category from '@/components/home-page/Category';
import CateSlid from '@/components/home-page/CateSlid';
import FeatureProd from '@/components/home-page/FeatureProd';

export const dynamic = 'force-dynamic';

export default function Home() {

  return (

    <FrontLayout innercol={'bg-gray-100'}>
      <Banner/>

      {/* <ScrollCard/> */}
      <Category/>
      <FeatureProd />
      <CateSlid />

    </FrontLayout>
  )
}
