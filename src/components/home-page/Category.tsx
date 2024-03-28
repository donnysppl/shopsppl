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

export const dynamic = 'force-dynamic';

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
        <section className="md:pt-10 pt-4 px-2.5">

            <div className="md:w-[1200px] mx-auto">

                <div className="w-full flex cate-card-upper lg:gap-4 gap-2.5 my-2.5 ">
                    {
                        loader ?
                            [1, 2, 3, 4].map((item: number) => (
                                <div key={item} className="w-full h-full animate-pulse flex items-center flex-col overflow-hidden  transition-all hover:shadow-lg">
                                    <div className="img-part  md:w-[250px] w-[90px] md:h-[250px] h-[90px] rounded-full overflow-hidden bg-gray-400"></div>
                                    <div className="card-head text-center px-1.5 py-2 flex justify-center items-center">
                                        <div className="w-[80%] h-5 bg-gray-400 rounded-lg"></div>
                                    </div>
                                </div>
                            ))
                            :
                            frontCate && frontCate.map((item: Category, index: number) => (
                                <div key={index} className=" cate-card-inner w-full h-full flex items-center flex-col ">
                                    <Link href={`/product?category=${item.name}`}>
                                        <div className="img-part md:w-[250px] w-full md:h-[250px] overflow-hidden rounded-full">
                                            <Image sizes="(min-width: 808px) 90%, 80%" width={250} height={250} src={item.img} alt={item.name} />
                                            {/* <img src={item.img} alt={item.name} className="w-full h-full rounded-full" /> */}
                                        </div>
                                        <div className="card-head text-center px-1.5 pt-5">
                                            <h3 className="md:text-lg text-xs font-medium">{item.name}</h3>
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
