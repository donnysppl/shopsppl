"use client";

import { Product } from "@/helpers/interFace";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../front/product/ProductCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { RightArrowCircleIcon } from "@/helpers/icon/Icons";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function FeatureProd({ headtitle, viewlink, feature }: {
    headtitle: string,
    viewlink: string,
    feature: string,
}) {

    const [loading, setloading] = useState<Boolean>(true);
    const [prodData, setprodData] = useState<Product[]>([]);

    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)


    useEffect(() => {
        setloading(true);
        const featureProdFetch = async () => {
            await fetch(`/api/product/products/${feature}`, {
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
        <section className="pt-1 pb-2.5">
            <div className="w-full mx-auto ">
                <div className="section-head text-center mb-4 flex items-center justify-between px-2.5 ">
                    <h2 className="font-medium ">{headtitle}</h2>

                    <Link href={`/${viewlink}`} className="view-all flex items-center text-base font-normal gap-2 cursor-pointer">
                        View All
                        <RightArrowCircleIcon color="#000" />
                    </Link>
                </div>



                <div className="w-full md:block hidden px-2.5">
                    {
                        loading ?
                            <div className="grid grid-cols-4">
                                {[1, 2, 3, 4].map((item: any, index: number) => (
                                    <div key={index} role="status" className="p-1.5 border rounded-sm bg-white flex flex-col justify-between relative overflow-hidden animate-pulse">
                                        <div className="w-full h-[350px] bg-gray-500 rounded-lg "></div>
                                    </div>
                                ))}
                            </div>
                            :
                            <Swiper autoplay={{ delay: 2500, }} modules={[Autoplay, Navigation, FreeMode]} loop={true}
                                direction='horizontal'
                                navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current,
                                }}

                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    360: { slidesPerView: 1 },
                                    480: { slidesPerView: 2 },
                                    576: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    991: { slidesPerView: 4 },
                                    1024: { slidesPerView: 4 },
                                }}
                                slidesPerView={4}
                                freeMode={true}
                                className="feature-prod-swiper " >
                                {
                                    prodData && prodData.map((item, index) => (
                                        <SwiperSlide key={index} className="product-slider">
                                            <ProductCard {...item} />
                                        </SwiperSlide>
                                    ))
                                }

                                <div className="md:flex hidden items-center justify-center gap-4  mt-6" >
                                    <div className="rotate-180 cursor-pointer" ref={navigationPrevRef} ><RightArrowCircleIcon width="30px" height="30px" color="#000" /></div>
                                    <div className="cursor-pointer" ref={navigationNextRef} ><RightArrowCircleIcon width="30px" height="30px" color="#000" /></div>
                                </div>
                            </Swiper>
                    }


                </div>

                <div className="w-full md:hidden block ">
                    {
                        loading ?
                            <div className="grid grid-cols-2">
                                {[1, 2].map((item: any, index: number) => (
                                    <div key={index} role="status" className="p-1.5 border rounded-sm bg-white flex flex-col justify-between relative overflow-hidden animate-pulse">
                                        <div className="w-full h-[350px] bg-gray-500 rounded-lg "></div>
                                    </div>
                                ))}
                            </div> : null
                    }
                    <div className="product-slider ps-2.5 snap-x snap-mandatory">
                        {
                            prodData && prodData.map((item, index) => (
                                <ProductCard key={index}  {...item} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

