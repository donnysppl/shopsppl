import { Product } from '@/helpers/interFace'
import OnBuyFunct from '@/helpers/onBuyFunct'
import OnCartFunct from '@/helpers/onCartFunct'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function priceFormat(price: number) {
    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
    return formattedPrice
}

export default function ProductCard(item: Product) {
    return (
        <li className="p-1.5 border rounded-2xl bg-white flex flex-col justify-between relative overflow-hidden">
            <Link href={`/product/${item.slug}`}>
                {
                    !item.inStock ?
                        <>
                            <div className='out-of-stock-prod absolute w-full h-full bg-gray-900 bg-opacity-25 inset-0 z-10 flex justify-center items-center'>
                                <div className='bg-act inline-block p-1.5 font-semibold uppercase'>{!item.inStock ? 'Out of Stock' : null}</div>
                            </div>
                        </> : null
                }

                <div className="relative prod-img-wrap w-full h-64 overflow-hidden flex items-center justify-center">
                    <Image src={`https://cloud.shopsppl.com/wp-content/uploads/sppl/${item.mainproductimg}`} width={300} height={275} alt={item.name} className="object-contain object-center mx-auto w-full h-full" />
                    <span className="absolute top-2 left-2 rounded-full bg-act px-1.5 py-1.5 text-center text-[0.5rem] text-black font-semibold">
                        {typeof item.productPriceDiffpercent === 'number'
                            ? `${Math.floor(item.productPriceDiffpercent)}% OFF`
                            : 'N/A'}
                    </span>
                </div>
                <div className="bg-gray-100 rounded-xl p-2.5">
                    <h5 className="text-[0.8rem] text-gray-600 line-clamp-2 mb-2.5">{item.name}</h5>
                    <div className="price">
                        <span className='flex gap-2 items-center mb-2'>
                            <span className='text-[0.9rem] font-semibold text-gray-900' >{priceFormat(item.productSalePrice)}</span>
                            <span className="line-through text-[0.7rem]">{priceFormat(item.productNormalPrice)}</span>
                        </span>
                    </div>
                    <div className="btn-part ">
                        <OnCartFunct id={item._id} />
                        <OnBuyFunct id={item?._id} />
                    </div>

                </div>
            </Link>


        </li>
    )
}
