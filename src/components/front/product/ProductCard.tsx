import { Product } from '@/helpers/interFace'
import OnBuyFunct from '@/helpers/onBuyFunct'
import OnCartFunct from '@/helpers/onCartFunct'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar } from "react-icons/fa";

function priceFormat(price: number) {
    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
    return formattedPrice
}

function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export default function ProductCard(item: Product) {

    return (
        <li className="p-1.5 border border-[#0000001a] bg-[#F1F1F1] flex flex-col justify-between relative overflow-hidden prod-card">
            <Link href={`/product/${item.slug}`}>
                {
                    !item.inStock ?
                        <>
                            <div className='out-of-stock-prod absolute w-full h-full bg-gray-900 bg-opacity-25 inset-0 z-10 flex justify-center items-center'>
                                <div className='bg-act inline-block p-1.5 font-semibold uppercase'>{!item.inStock ? 'Out of Stock' : null}</div>
                            </div>
                        </> : null
                }

                <div className="relative prod-img-wrap w-full md:h-80 h-60 overflow-hidden flex items-center justify-center">
                    <Image src={`https://cloud.shopsppl.com/wp-content/uploads/sppl/${item.mainproductimg}`} width={300} height={300} alt={item.name} className="object-contain object-center mx-auto w-full h-full" quality={100}  />
                    {
                        item.productPriceDiffpercent !== 0 ?
                            <span className="absolute top-1 left-1 flex items-center justify-center rounded-md bg-black text-center text-[0.7rem] text-white font-normal w-[85px] h-5">
                                PRICE DROP
                            </span> : null
                    }

                    <span className="absolute top-1 right-1 flex items-center justify-center gap-1.5 rounded-md text-center text-[0.75rem] text-black font-normal h-5"> 
                        <FaStar className='text-[#EFC151] w-4 h-4' /> {Math.floor(getRandomArbitrary(3,5))} ({Math.floor(getRandomArbitrary(20,30))})
                    </span>

                </div>
                <div className="bg-white rounded-md p-2.5">
                    <h5 className="text-base font-normal text-black line-clamp-1 mb-2.5">{item.name}</h5>
                    <div className="price">
                        <span className='flex gap-2 items-center mb-2'>
                            <span className='text-lg font-semibold text-gray-900' >{priceFormat(item.productSalePrice)}</span>
                            <span className="line-through text-[0.7rem] text-[#9D9D9D]">{priceFormat(item.productNormalPrice)}</span>
                            <span className="text-[0.7rem] text-[#45B858] font-medium">
                                {typeof item.productPriceDiffpercent === 'number'
                                    ? `${Math.floor(item.productPriceDiffpercent)}% OFF`
                                    : 'N/A'}
                            </span>
                        </span>
                    </div>
                    <div className="btn-part flex gap-2">
                        <OnCartFunct id={item._id} />
                        <OnBuyFunct id={item?._id} />
                    </div>

                </div>
            </Link>


        </li>
    )
}
