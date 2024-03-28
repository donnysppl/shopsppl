'use client';
import Link from "next/link";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const brand = [
    {
        img: 'thomson.png',
        link: '/product?brand=Thomson',
    },
    {
        img: 'kodak.png',
        link: '/product?brand=Kodak TV',
    },
    {
        img: 'blau.png',
        link: '/product?brand=Blaupunkt',
    },
    {
        img: 'west.png',
        link: '/product?brand=Westinghouse',
    },
    {
        img: 'wwh.png',
        link: '/product?brand=White Westinghouse',
    },
    {
        img: 'svl.png',
        link: '/product?brand=svl',
    },
    {
        img: 'thomson.png',
        link: '/product?brand=Thomson',
    },
    {
        img: 'kodak.png',
        link: '/product?brand=Kodak TV',
    },
    {
        img: 'blau.png',
        link: '/product?brand=Blaupunkt',
    },
    {
        img: 'west.png',
        link: '/product?brand=Westinghouse',
    },
    {
        img: 'wwh.png',
        link: '/product?brand=White Westinghouse',
    },
    {
        img: 'svl.png',
        link: '/product?brand=svl',
    }
]

export default function Brand() {
    return (
        <section className="px-2.5 pb-5">
            <div className="w-full mx-auto">
                <div className="section-head mb-4">
                <h2 className="font-medium uppercase">SHOP BY BRAND</h2>
                </div>

                <div className="w-full ">
                    <Swiper autoplay={{ delay: 2500 }} 
                        breakpoints={{
                            320: { slidesPerView: 3, },
                            360: { slidesPerView: 3, },
                            480: { slidesPerView: 3, },
                            576: { slidesPerView: 3, },
                            768: { slidesPerView: 3, },
                            991: { slidesPerView: 4, },
                            1024: { slidesPerView: 6, },
                        }}
                        slidesPerView={5} loop={true}
                        spaceBetween={30}
                        freeMode={true}
                        modules={[FreeMode, Autoplay]}
                        className="brand-swiper" >
                        {
                            brand.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <Link href={item.link}>
                                        <div >
                                            <img src={`/img/brand-logo/${item.img}`} alt="category images" className="mx-auto" />
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>

        </section>
    )
}
