'use client';
;
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
        img: 'thomson.webp',
        link: '/product?brand=Thomson',
    },
    {
        img: 'Kodak Logo.webp',
        link: '/product?brand=Kodak TV',
    },
    {
        img: 'blaupunkt.webp',
        link: '/product?brand=Blaupunkt',
    },
    {
        img: 'Westinghouse.webp',
        link: '/product?brand=Westinghouse',
    },
    {
        img: 'White westinghouse.webp',
        link: '/product?brand=White Westinghouse',
    }
]

export default function Brand() {
    return (
        <section className="pt-10 pb-5 px-2.5">
            <div className="max-w-screen-xl mx-auto">
                <div className="section-head text-center mb-4">
                    <h2 className="font-semibold "><span className="text-act">Shop</span> By Brand</h2>
                </div>

                <div className="w-full ">
                    <Swiper autoplay={{ delay: 2500 }}
                        breakpoints={{
                            320: { slidesPerView: 2, },
                            360: { slidesPerView: 2, },
                            480: { slidesPerView: 2, },
                            576: { slidesPerView: 2, },
                            768: { slidesPerView: 3, },
                            991: { slidesPerView: 4, },
                            1024: { slidesPerView: 5, },
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
                                            <img src={`/img/${item.img}`} alt="category images" className="mx-auto" />
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
