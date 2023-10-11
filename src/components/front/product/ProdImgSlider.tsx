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

export default function ProdImgSlider(productData:Product) {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    return (
        <div className="rounded-lg overflow-hidden">

            <div className="center w-full bg-white ">

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
                    <SwiperSlide className=" ">
                        {
                            productData &&
                            <Image src={productData.mainproductimg} width={400} height={400}
                                alt="ecommerce"
                                className="lg:w-1/2 w-full lg:h-auto h-[400px] mx-auto object-contain object-center rounded" />
                        }
                    </SwiperSlide>
                    {
                        productData?.productimg.map((item, index) => {
                            return (
                                <SwiperSlide className="" key={index}>
                                    <Image src={`${item}`} width={400} height={400}
                                        alt="ecommerce"
                                        className="lg:w-1/2 w-full lg:h-auto h-[400px] mx-auto object-contain object-center rounded" />
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
                        <Image src={productData.mainproductimg} width={400} height={400}
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-auto h-[400px] object-contain object-center rounded" />
                    }
                </SwiperSlide>
                {
                    productData?.productimg.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Image src={`${item}`} width={100} height={100}
                                    alt="ecommerce"
                                    className="lg:w-1/2 w-full lg:h-auto h-[100px] object-contain object-center rounded" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}
