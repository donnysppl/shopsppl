"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';

interface bannerType {
    name: string;
    bannerimg: string;
    bannermobimg: string;
    link: string,
}

const bannerDataRe = [
    {
        name: 'banner',
        bannerimg: '/img/banner.png',
        bannermobimg: '/img/banner-mob.webp',
        link: '/',
    },
    {
        name: 'banner',
        bannerimg: '/img/banner.png',
        bannermobimg: '/img/banner-mob.webp',
        link: '/',
    }
]

export default function Banner() {

    const [bannerData, setbannerData] = useState<bannerType[]>([]);
    const [loading, setloading] = useState<boolean>(true);
    const [width, setwidth] = useState<number>(0);

    useEffect(() => {
        const bannerFetch = async () => {
            await fetch('/api/banner/list', {
                method: 'GET',
                cache: 'no-cache',
            }).then(res => res.json())
                .then(res => {
                    // console.log(res);
                    if (res.status === 200) {
                        const data = res.result
                        const newData = data.concat(data)
                        setbannerData(res.result);
                        setloading(false);
                    }
                    else if (res.status === 400) {

                    }
                    else if (res.status === 500) {

                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        bannerFetch();
        const width = window.innerWidth;
        setwidth(width)
    }, [])

    return (
        <Swiper
            slidesPerView={'auto'}
            loop={true}
            spaceBetween={0} initialSlide={1}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 2500,
            }}
            modules={[Pagination, Autoplay]}
            className="banner-slider"
        >

            {
                bannerDataRe.map((item, index) => (
                    <SwiperSlide key={index} className=' '>
                        <Link href={item.link} className='' >
                            <img src={`${(width > 990) ? item.bannerimg : item.bannermobimg}`}
                                className='object-cover object-center w-full md:h-[92dvh]'
                                alt={item.name} />
                        
                        </Link>
                    </SwiperSlide>
                ))
            }
            {/* {
                loading ?
                    <SwiperSlide className='animate-pulse'>
                        <div className='w-screen h-[500px] bg-gray-400' >
                        </div>
                    </SwiperSlide> :

                    
                    // bannerData.map((item, index) => (
                    //     <SwiperSlide key={index} className=' '>
                    //         <Link href={item.link} className='' >
                    //             <img src={`/uploads/banner/${(width > 990) ? item.bannerimg : item.bannermobimg}`}
                    //                 className='object-cover object-center w-full'
                    //                 alt={item.name} />
                    //         </Link>
                    //     </SwiperSlide>

                    // ))
            } */}
        </Swiper>
    )
}
