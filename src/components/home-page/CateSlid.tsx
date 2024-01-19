"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Link from "next/link";

const sliderDataTV = [
    {
        title: 'HD', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/tv-3.webp',
        mob_img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/mob/tv-3.webp'
    },
    {
        title: 'FHD', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/tv-2.webp',
        mob_img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/mob/tv-2.webp'
    },
    {
        title: '4K', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/tv-1.webp',
        mob_img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/mob/tv-1.webp'
    },
    {
        title: 'QLED', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/tv-4.webp',
        mob_img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/mob/tv-4.webp'
    },
]
const sliderDataAC = [
    {
        title: 'AC 1', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/ac-2.webp',
        mob_img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/mob/ac-2.webp'
    }
]
const sliderDataWC = [
    {
        title: 'Front Load', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/wc-1.webp',
        mob_img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/mob/wc-1.webp'
    },
    {
        title: 'Semi', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/wc-2.webp',
        mob_img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/mob/wc-2.webp'
    },
    {
        title: 'Top Load', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/wc-4.webp',
        mob_img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/mob/wc-4.webp'
    },
]
const sliderDataCol = [
    {
        title: 'DESERT', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/col-1.webp',
        mob_img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/mob/col-1.webp'
    },
    {
        title: 'PERSONAL', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/col-2.webp',
        mob_img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/mob/col-2.webp'
    },
    {
        title: 'WINDOW', img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/col-3.webp',
        mob_img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/shop/cat-banner-slider/mob/col-3.webp'
    },
]



export default function CateSlid() {
    const [width, setwidth] = useState<number>(0);
    useEffect(() => {
        const width = window.innerWidth;
        setwidth(width)
    }, [])


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
                        <div className="section-head text-center w-full absolute z-10 top-2.5 left-1/2 -translate-x-1/2">
                            <h2 className="font-semibold text-white text-lg md:text-xl">Television</h2>
                        </div>
                        <Swiper slidesPerView={'auto'} speed={1000}
                            spaceBetween={0} initialSlide={1} pagination={paginationtv}
                            autoplay={{ delay: 2500, }} modules={[Pagination, Autoplay]}
                            className="cateslide mt-2 rounded-lg overflow-hidden w-full md:h-[800px] h-[550px]" >
                            {sliderDataTV.map((item, index) => (
                                <SwiperSlide key={index} className='w-full'>
                                    <div className=' relative w-full h-full' >
                                        <div className="home-cate-slider" style={{ backgroundImage: `url(${(width > 990) ? item.img : item.mob_img})` }}>
                                        </div>
                                        <Link className="btn-prim absolute bottom-3 left-1/2 -translate-x-1/2 z-20" href={'/product'}>Buy Now</Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="w-full mt-4 relative">
                        <div className="section-head text-center w-full absolute z-10 top-2.5 left-1/2 -translate-x-1/2">
                            <h2 className="font-semibold text-white">Air Conditioner</h2>
                        </div>
                        <Swiper slidesPerView={'auto'} speed={1000}
                            spaceBetween={0} initialSlide={1} pagination={paginationac}
                            autoplay={{ delay: 2500, }} modules={[Pagination, Autoplay]}
                            className="cateslide mt-2 rounded-lg overflow-hidden w-full md:h-[800px] h-[550px]" >
                            {sliderDataAC.map((item, index) => (
                                <SwiperSlide key={index} className='w-full'>
                                    <div className=' relative w-full h-full' >
                                        <div className="home-cate-slider" style={{ backgroundImage: `url(${(width > 990) ? item.img : item.mob_img})` }}>
                                        </div>
                                        <Link className="btn-prim absolute bottom-3 left-1/2 -translate-x-1/2 z-20" href={'/product'}>Buy Now</Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="w-full mt-4 relative">
                        <div className="section-head text-center w-full absolute z-10 top-2.5 left-1/2 -translate-x-1/2">
                            <h2 className="font-semibold text-white">Washing Machine</h2>
                        </div>
                        <Swiper slidesPerView={'auto'} speed={1000}
                            spaceBetween={0} initialSlide={1} pagination={paginationwc}
                            autoplay={{ delay: 2500, }} modules={[Pagination, Autoplay]}
                            className="cateslide mt-2 rounded-lg overflow-hidden w-full md:h-[800px] h-[550px]" >
                            {sliderDataWC.map((item, index) => (
                                <SwiperSlide key={index} className='w-full'>
                                    <div className=' relative w-full h-full' >
                                        <div className="home-cate-slider" style={{ backgroundImage: `url(${(width > 990) ? item.img : item.mob_img})` }}>
                                        </div>
                                        <Link className="btn-prim absolute bottom-3 left-1/2 -translate-x-1/2 z-20" href={'/product'}>Buy Now</Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="w-full mt-4 relative">
                        <div className="section-head text-center w-full absolute z-10 top-2.5 left-1/2 -translate-x-1/2">
                            <h2 className="font-semibold text-white">Cooler</h2>
                        </div>
                        <Swiper slidesPerView={'auto'} speed={1000}
                            spaceBetween={0} initialSlide={1} pagination={paginationcol}
                            autoplay={{ delay: 2500, }} modules={[Pagination, Autoplay]}
                            className="cateslide mt-2 rounded-lg overflow-hidden w-full md:h-[800px] h-[550px]" >
                            {sliderDataCol.map((item, index) => (
                                <SwiperSlide key={index} className='w-full'>
                                    <div className=' relative w-full h-full' >
                                        <div className="home-cate-slider" style={{ backgroundImage: `url(${(width > 990) ? item.img : item.mob_img})` }}>
                                        </div>
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
