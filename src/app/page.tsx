// import React, { useEffect, useRef, useState } from 'react';

// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// import required modules
// import { Pagination, Autoplay } from 'swiper/modules';

import FrontLayout from '@/components/layout/FrontLayout'
import Image from 'next/image';
import ScrollCard from '@/components/form-compo/ScrollCard';
import Banner from '@/components/home-page/Banner';

export const dynamic = 'force-dynamic';

export default function Home() {

  // const [bannerData, setbannerData] = useState([]);

  // useEffect(() => {
  //   const bannerFetch = async () => {
  //     await fetch('/api/banner/list', {
  //       method: 'GET',
  //     }).then(res => res.json())
  //       .then(res => {
  //         console.log(res);
  //         if (res.status === 200) {
  //           const data = res.result
  //           const newData = data.concat(data)
  //           setbannerData(res.result);
  //         }
  //         else if (res.status === 400) {

  //         }
  //         else if (res.status === 500) {

  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   }
  //   bannerFetch();
  // }, [])

  return (

    <FrontLayout innercol={'bg-gray-100'}>
      <Banner/>
      <div>Home</div>

      <ScrollCard/>

    </FrontLayout>
  )
}
