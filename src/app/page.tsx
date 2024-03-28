
import FrontLayout from '@/components/layout/FrontLayout'
import ScrollCard from '@/components/form-compo/ScrollCard';
import Banner from '@/components/home-page/Banner';
import Category from '@/components/home-page/Category';
import CateSlid from '@/components/home-page/CateSlid';
import NewLauch from '@/components/home-page/NewLauch';
import Brand from '@/components/home-page/Brand';
import FeatureProd from '@/components/home-page/FeatureProd';
import CategorySec from '@/components/home-page/CategorySec';
import { cateAcArr, cateCoolArr, cateTVArr, cateWashArr } from '@/helpers/CategoryData';
import HomeProductComp from '@/components/home-page/HomeProductComp';

export const dynamic = 'force-dynamic';

export default async function Home() {

  return (

    <FrontLayout innercol={'bg-white'}>


      <Banner />
      <Category />

      {/* <HomeProductComp headtitle={'HOT DEALS'} viewlink={'/'} /> */}
      
      <FeatureProd headtitle={'HOT DEALS'} viewlink={'/'} feature={'feature'} />

      <FeatureProd headtitle={'New Launches'} viewlink={'/'} feature={'new'} />

      <Brand />

      <CategorySec fullbanner={'/img/category/tv/tv-full-banner.webp'}
        fullMobbanner={'/img/category/tv/tv-full-banner-mob.webp'} sidebanner={'/img/category/tv/tv-size-banner.webp'} cateArr={cateTVArr} priceheading={'Starting at'} />

      <CategorySec
        fullbanner={'/img/category/wash/wash-full-banner.webp'} fullMobbanner={'/img/category/wash/wash-full-mob-banner.webp'}
        sidebanner={'/img/category/wash/wash-size-banner.webp'} cateArr={cateWashArr}
        cardImgHeight={'md:h-[250px] h-[180px]'} spacingbet={'md:space-y-3 space-y-5'} oppositecard={true} priceheading={'Starting at'}
      />

      <CategorySec
        fullbanner={'/img/category/cooler/cooler-full-banner.webp'} fullMobbanner={'/img/category/cooler/cooler-full-mob-banner.webp.webp'}
        sidebanner={'/img/category/cooler/cooler-side-banner.webp'} cateArr={cateCoolArr}
        cardImgHeight={'md:h-[240px] h-[180px]'} spacingbet={'md:space-y-1 space-y-4 justify-between gap-1.5'}  priceheading={'Price'}
      />

      <CategorySec
        fullbanner={'/img/category/ac/ac-full-banner.webp'} fullMobbanner={'/img/category/ac/ac-full-mob-banner.webp'}
        sidebanner={'/img/category/ac/ac-side-banner.webp'} cateArr={cateAcArr} priceheading={'Price'} oppositecard={true}
        spacingbet={'space-y-20'} />



      {/* <NewLauch /> */}
      {/* 
      <FeatureProd /> */}

      {/* <CateSlid /> */}

    </FrontLayout>
  )
}
