"use client";
import Image from "next/image"
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Link from "next/link";

const sliderData = [
    { title: 'Slide', img: 'https://shopsppl.in/wp-content/uploads/2023/07/TV-3.webp' },
    { title: 'Slide', img: 'https://shopsppl.in/wp-content/uploads/2023/07/TV-3.webp' },
    { title: 'Slide', img: 'https://shopsppl.in/wp-content/uploads/2023/07/TV-3.webp' },
    { title: 'Slide', img: 'https://shopsppl.in/wp-content/uploads/2023/07/TV-3.webp' },
]

export default function CateSlid() {

    const [loading, setloading] = useState<boolean>(false);

    const pagination = {
        clickable: true,
        renderBullet: function (index: any, className: any) {
            return '<span class=" cateslide-pagination  ' + className + '">' + sliderData[index].title + ' ' + (index + 1) + '</span>';
        },
    };

    return (
        <section className="pt-10 pb-12 px-2.5">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full mt-4 relative">
                    <div className="section-head text-center absolute z-10 top-2.5 left-1/2 -translate-x-1/2">
                        <h2 className="font-semibold text-white">Television</h2>
                    </div>
                    <Swiper
                        slidesPerView={'auto'}
                        speed={1000}
                        spaceBetween={0} initialSlide={1}
                        pagination={pagination}
                        autoplay={{
                            delay: 2500,
                        }}
                        modules={[Pagination, Autoplay]}
                        className="cateslide mt-2 rounded-lg overflow-hidden w-full h-[800px]"
                    >
                        {
                            loading ?
                                <SwiperSlide className='animate-pulse'>
                                    <div className='w-screen h-[800px] bg-gray-400' >
                                    </div>
                                </SwiperSlide> :
                                [1, 2, 3, 4].map((item, index) => (
                                    <SwiperSlide key={index} className='w-full'>
                                        <div className=' relative w-full h-full' >
                                            <Image src={'https://shopsppl.in/wp-content/uploads/2023/07/TV-3.webp'}
                                                width={1600} height={600} alt="name" className="w-full h-full object-center object-cover"
                                            />
                                            <Link className="btn-prim absolute bottom-3 left-1/2 -translate-x-1/2 z-20" href={'./product'}>Buy Now</Link>
                                        </div>
                                    </SwiperSlide>

                                ))
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    )
}
