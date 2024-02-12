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
    link:string,
}

export default function Banner() {

    const [bannerData, setbannerData] = useState<bannerType[]>([]);
    const [loading, setloading] = useState<boolean>(true);
    const [width, setwidth] = useState<number>(0);

    useEffect(() => {
        const bannerFetch = async () => {
            await fetch('/api/banner/list', {
                method: 'GET',
                next:{revalidate: 10,}
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
            loop={true} speed={2000}
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
                loading ?
                    <SwiperSlide className='animate-pulse'>
                        <div className='w-screen h-[500px] bg-gray-400' >
                        </div>
                    </SwiperSlide> :
                    bannerData.map((item, index) => (
                        <SwiperSlide key={index} className=' '>
                            <Link href={item.link} className='' >
                                <Image src={(width > 990) ? item.bannerimg : item.bannermobimg} width={1920} height={600}
                                    className='object-cover object-center'
                                    alt={item.name} />
                            </Link>
                        </SwiperSlide>

                    ))
            }
        </Swiper>
    )
}
