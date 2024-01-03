"use client";
import Image from "next/image"
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Link from "next/link";

const sliderDataTV = [
    { title: 'TV 1', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/tv-banner.webp' },
    { title: 'TV 2', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/tv-banner.webp' },
    { title: 'TV 3', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/tv-banner.webp' },
    { title: 'TV 4', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/tv-banner.webp' },
]
const sliderDataAC = [
    { title: 'AC 1', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/ac-banner.webp' },
    { title: 'AC 2', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/ac-banner.webp' },
]
const sliderDataWC = [
    { title: 'WC 1', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/wash-banner.webp' },
    { title: 'WC 2', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/wash-banner.webp' },
]
const sliderDataCol = [
    { title: 'Cooler 1', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/cooler-banner.webp' },
    { title: 'Cooler 2', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/cooler-banner.webp' },
]



export default function CateSlid() {

    const [loading, setloading] = useState<boolean>(false);

    const paginationtv = {
        clickable: true,
        renderBullet: function (index: any, className: any) {
            return '<span class=" cateslide-pagination  ' + className + '">' + sliderDataTV[index].title + '</span>';
        },
    };
    const paginationac = {
        clickable: true,
        renderBullet: function (index: any, className: any) {
            return '<span class=" cateslide-pagination  ' + className + '">' + sliderDataAC[index].title + '</span>';
        },
    };
    const paginationwc = {
        clickable: true,
        renderBullet: function (index: any, className: any) {
            return '<span class=" cateslide-pagination  ' + className + '">' + sliderDataWC[index].title + '</span>';
        },
    };
    const paginationcol = {
        clickable: true,
        renderBullet: function (index: any, className: any) {
            return '<span class=" cateslide-pagination  ' + className + '">' + sliderDataCol[index].title + '</span>';
        },
    };

    return (
        <>
            <section className="pt-10 pb-8 px-2.5">
                <div className="max-w-screen-2xl mx-auto">

                    <div className="w-full mt-4 relative">
                        <div className="section-head text-center absolute z-10 top-2.5 left-1/2 -translate-x-1/2">
                            <h2 className="font-semibold text-white">Television</h2>
                        </div>
                        <Swiper slidesPerView={'auto'} speed={1000}
                            spaceBetween={0} initialSlide={1} pagination={paginationtv}
                            autoplay={{ delay: 2500, }} modules={[Pagination, Autoplay]}
                            className="cateslide mt-2 rounded-lg overflow-hidden w-full md:h-[800px] h-[500px]" >
                            {sliderDataTV.map((item, index) => (
                                <SwiperSlide key={index} className='w-full'>
                                    <div className=' relative w-full h-full' >
                                        <Image src={item.img}
                                            width={1600} height={600} alt="name" className="w-full h-full object-center object-cover"
                                        />
                                        <Link className="btn-prim absolute bottom-3 left-1/2 -translate-x-1/2 z-20" href={'/product'}>Buy Now</Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="w-full mt-4 relative">
                        <div className="section-head text-center absolute z-10 top-2.5 left-1/2 -translate-x-1/2">
                            <h2 className="font-semibold text-white">Air Conditioner</h2>
                        </div>
                        <Swiper slidesPerView={'auto'} speed={1000}
                            spaceBetween={0} initialSlide={1} pagination={paginationac}
                            autoplay={{ delay: 2500, }} modules={[Pagination, Autoplay]}
                            className="cateslide mt-2 rounded-lg overflow-hidden w-full md:h-[800px] h-[500px]" >
                            {sliderDataAC.map((item, index) => (
                                <SwiperSlide key={index} className='w-full'>
                                    <div className=' relative w-full h-full' >
                                        <Image src={item.img}
                                            width={1600} height={600} alt="name" className="w-full h-full object-center object-cover"
                                        />
                                        <Link className="btn-prim absolute bottom-3 left-1/2 -translate-x-1/2 z-20" href={'/product'}>Buy Now</Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="w-full mt-4 relative">
                        <div className="section-head text-center absolute z-10 top-2.5 left-1/2 -translate-x-1/2">
                            <h2 className="font-semibold text-white">Washing Machine</h2>
                        </div>
                        <Swiper slidesPerView={'auto'} speed={1000}
                            spaceBetween={0} initialSlide={1} pagination={paginationwc}
                            autoplay={{ delay: 2500, }} modules={[Pagination, Autoplay]}
                            className="cateslide mt-2 rounded-lg overflow-hidden w-full md:h-[800px] h-[500px]" >
                            {sliderDataWC.map((item, index) => (
                                <SwiperSlide key={index} className='w-full'>
                                    <div className=' relative w-full h-full' >
                                        <Image src={item.img}
                                            width={1600} height={600} alt="name" className="w-full h-full object-center object-cover"
                                        />
                                        <Link className="btn-prim absolute bottom-3 left-1/2 -translate-x-1/2 z-20" href={'/product'}>Buy Now</Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="w-full mt-4 relative">
                        <div className="section-head text-center absolute z-10 top-2.5 left-1/2 -translate-x-1/2">
                            <h2 className="font-semibold text-white">Cooler</h2>
                        </div>
                        <Swiper slidesPerView={'auto'} speed={1000}
                            spaceBetween={0} initialSlide={1} pagination={paginationcol}
                            autoplay={{ delay: 2500, }} modules={[Pagination, Autoplay]}
                            className="cateslide mt-2 rounded-lg overflow-hidden w-full md:h-[800px] h-[500px]" >
                            {sliderDataCol.map((item, index) => (
                                <SwiperSlide key={index} className='w-full'>
                                    <div className=' relative w-full h-full' >
                                        <Image src={item.img}
                                            width={1600} height={600} alt="name" className="w-full h-full object-center object-cover"
                                        />
                                        <Link className="btn-prim absolute bottom-3 left-1/2 -translate-x-1/2 z-20" href={'/product'}>Buy Now</Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>
            </section>

        </>
    )
}
