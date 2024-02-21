'use client';

import type { Category } from "@/helpers/interFace";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import FeatureProd from "./FeatureProd";

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

export default function Category() {

    const [frontCate, setfrontCate] = useState<Category[]>([]);
    const [loader, setloader] = useState<boolean>(true);
    useEffect(() => {
        setloader(true)
        const fetchcateData = async () => {
            await fetch('/api/product/category/front', {
                method: 'GET',
                next: { revalidate: 10 },
            }).then(res => res.json())
                .then(res => {
                    // console.log(res);
                    if (res.status === 200) {
                        setfrontCate(res.result);
                        setloader(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        fetchcateData();
    }, [])

    return (
        <section className="pt-10 pb-10 px-2.5">
            <div className="max-w-screen-xl mx-auto mb-12">
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
                                    <Link  href={item.link}>
                                        <div >
                                            <img src={`/img/${item.img}`} alt={`${item.img}`} className="mx-auto" />
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
            <FeatureProd />
            <div className="max-w-screen-2xl mx-auto">
                <div className="section-head text-center">
                    <h2 className="font-semibold"><span className="text-act">Shop</span> By Category</h2>
                </div>

                <div className="w-full grid md:grid-cols-4 grid-cols-2 lg:gap-4 gap-2.5 mt-4 ">
                    {
                        loader ?
                            [1, 2, 3, 4].map((item: number) => (
                                <div key={item} className="w-full h-full animate-pulse bg-gray-200 flex flex-col rounded-lg overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
                                    <div className="img-part w-full h-[375px] overflow-hidden bg-gray-400"></div>
                                    <div className="card-head text-center px-1.5 py-2 flex justify-center items-center">
                                        <div className="w-[80%] h-5 bg-gray-400 rounded-lg"></div>
                                    </div>
                                </div>
                            ))
                            :
                            frontCate && frontCate.map((item: Category, index: number) => (
                                <div key={index} className="w-full h-full bg-gray-200 flex flex-col rounded-lg overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
                                    <Link href={`/product?category=${item.name}`}>
                                        <div className="img-part w-full h-auto overflow-hidden">
                                            <Image width={380} height={380} src={item.img} alt={item.name} />
                                        </div>
                                        <div className="card-head text-center px-1.5 py-2">
                                            <h3 className="md:text-lg text-base">{item.name}</h3>
                                        </div>
                                    </Link>
                                </div>
                            ))
                    }
                </div>
            </div>
        </section>
    )
}
