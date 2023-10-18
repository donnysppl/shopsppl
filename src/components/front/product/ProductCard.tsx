import { Product } from '@/helpers/interFace'
import OnCartFunct from '@/helpers/onCartFunct'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProductCard(item:Product) {
    return (
        <li className="p-1.5 border rounded-2xl bg-white flex flex-col justify-between">
            <Link href={`/product/${item.slug}`}>

                <div className="relative">
                    <Image src={item.mainproductimg} width={300} height={275} alt={item.name} className="object-contain object-center mx-auto" />
                    <span className="absolute top-2 left-2 rounded-full bg-black px-1.5 py-1.5 text-center text-[0.5rem] font-medium text-white">
                        {typeof item.productPriceDiffpercent === 'number'
                            ? `${Math.floor(item.productPriceDiffpercent)}% OFF`
                            : 'N/A'}
                    </span>
                </div>
            </Link>
            <div className="bg-gray-100 rounded-xl p-2.5">
                <Link href={`/product/${item.slug}`}>
                    <h5 className="text-[0.8rem] text-gray-600 line-clamp-2 mb-2.5">{item.name}</h5>
                    <div className="price">
                        <span className='flex gap-2 items-center mb-2'>
                            <span className='text-[0.9rem] font-semibold text-gray-900' >₹{item.productSalePrice}</span>
                            <span className="line-through text-[0.7rem]">₹{item.productNormalPrice}</span>
                        </span>
                    </div>
                    </Link>
                    <div className="btn-part ">
                        <OnCartFunct id={item._id} />
                    </div>
                
            </div>


        </li>
    )
}
