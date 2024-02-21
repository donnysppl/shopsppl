"use client";

import { Product } from "@/helpers/interFace";
import { useEffect, useState } from "react";
import ProductCard from "../front/product/ProductCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

export default function FeatureProd() {

    const [loading, setloading] = useState<Boolean>(true);
    const [prodData, setprodData] = useState<Product[]>([]);
    useEffect(() => {
        setloading(true);
        const featureProdFetch = async () => {
            await fetch('/api/product/products/feature', {
                method: 'GET',
                next: { revalidate: 100 }
            }).then(res => res.json())
                .then((res) => {
                    if (res.status === 200) {
                        setprodData(res.result);
                        setloading(false);
                    }
                })
        }
        featureProdFetch();
    }, [])


    return (
        <section className="pt-1 mb-10 px-2.5">
            <div className="max-w-screen-2xl mx-auto">
                <div className="section-head text-center mb-4">
                    <h2 className="font-semibold "><span className="text-act">Feature</span> Product</h2>
                </div>



                <div className="w-full ">
                    {
                        loading ?
                            <div className="grid grid-cols-4 gap-5">
                                {[1, 2, 3, 4].map((item: any, index: number) => (
                                    <div key={index} role="status" className="p-1.5 border rounded-2xl bg-white flex flex-col justify-between relative overflow-hidden animate-pulse">
                                        <div className="w-full h-[350px] bg-gray-500 rounded-lg "></div>
                                    </div>
                                ))}
                            </div>
                            : 
                            <Swiper autoplay={{ delay: 2500, }} modules={[Autoplay]}
                                breakpoints={{
                                    320: { slidesPerView: 1,spaceBetween: 10 },
                                    360: { slidesPerView: 1,spaceBetween: 10 },
                                    480: { slidesPerView: 2,spaceBetween: 10 },
                                    576: { slidesPerView: 2,spaceBetween: 10 },
                                    768: { slidesPerView: 3,spaceBetween: 10 },
                                    991: { slidesPerView: 4, spaceBetween: 20},
                                    1024: { slidesPerView: 4,spaceBetween: 20 },
                                }}
                                slidesPerView={4} loop={true}
                                freeMode={true}
                                className="feature-prod-swiper " >
                                {
                                    prodData && prodData.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <ProductCard {...item} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                    }


                </div>
            </div>



        </section>
    )
}

