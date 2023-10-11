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
      {/* <Swiper
        slidesPerView={'auto'}
        centeredSlides={true} loop={true} speed={2000}
        spaceBetween={0} initialSlide={1}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
        }}
        modules={[Pagination, Autoplay]}
        className="banner-slider mt-2"
      >
        {
          bannerData && bannerData.map((item, index) => (
            <SwiperSlide key={index} className='bg-purple-900'>
              <div className='' >
                <Image src={item.bannerimg} width={1400} height={500} alt={item.name} />
              </div>
            </SwiperSlide>

          ))
        }
      </Swiper> */}
      <div>Home</div>

      <ScrollCard/>

    </FrontLayout>
  )
}
