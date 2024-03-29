"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import { useState } from "react";
import { Product } from "@/helpers/interFace";

export default function ProdImgSlider(productData: Product) {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    return (
        <div className="rounded-lg overflow-hidden w-full h-full bg-white flex items-center justify-center flex-col">

            <div className="w-full">
                <div className="">

                    <Swiper autoHeight={true}
                        autoplay={{
                            delay: 25000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                        className="product-detail-slider"
                    >
                        <SwiperSlide className="product-detail-slider-slide">
                            {
                                productData &&

                                <Image src={`https://cloud.shopsppl.com/wp-content/uploads/sppl/${productData.mainproductimg}`} width={500} height={500}
                                    alt="ecommerce"
                                    className="product-detail-slider-img " />
                            }
                        </SwiperSlide>
                        {
                            productData?.productimg.map((item, index) => {
                                return (
                                    <SwiperSlide className="" key={index}>
                                        <Image src={`https://cloud.shopsppl.com/wp-content/uploads/sppl/${item}`} width={500} height={500}
                                    alt="ecommerce"
                                    className="product-detail-slider-img " />
                                    </SwiperSlide>
                                )
                            })
                        }

                    </Swiper>
                </div>

                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper subslider product-detail-wrap-slider"
                >
                    <SwiperSlide>
                        {
                            productData &&
                            <Image src={`https://cloud.shopsppl.com/wp-content/uploads/sppl/${productData.mainproductimg}`} width={400} height={400}
                                alt="ecommerce"
                                className="lg:w-1/2 w-full lg:h-auto h-[400px] object-contain object-center rounded" />
                        }
                    </SwiperSlide>
                    {
                        productData?.productimg.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Image src={`https://cloud.shopsppl.com/wp-content/uploads/sppl/${item}`} width={100} height={100}
                                        alt="ecommerce"
                                        className="lg:w-1/2 w-full lg:h-auto h-[100px] object-contain object-center rounded" />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}
