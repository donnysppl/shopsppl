import { priceFormat } from '@/helpers/common';
import { Product } from '@/helpers/interFace';
import OnBuyFunct from '@/helpers/onBuyFunct';
import { fetchNewLaunchProd } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


export default async function NewLauch() {

    const findNewLaunch = await fetchNewLaunchProd('newlaunch');
    const findDealDeay = await fetchNewLaunchProd('dealDay');
    // console.log(findNewLaunch)

    return (
        <>
            <section className="pt-10 pb-5 px-2.5">
                <div className="max-w-screen-xl mx-auto ">
                    <div className="section-head text-center mb-4">
                        <h2 className="font-semibold "><span className="text-act">New</span> Launch</h2>
                    </div>
                    <div className="w-full ">
                        <ul className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                            {
                                findNewLaunch && findNewLaunch.map((item: Product, index) => {
                                    const id = item._id.toString();
                                    return (
                                        <li key={index} className={`${(!(index % 2 == 0) ? 'wc-newlaunch-bg' : 'tv-newlaunch-bg')} text-center rounded-2xl p-4 text-gray-200 overflow-hidden`}>
                                            <div className="prod-img flex items-center justify-center">
                                                {/* <Image src={`https://cloud.shopsppl.com/wp-content/uploads/sppl/${item.mainproductimg}`} alt={item.name} width={400} height={400} /> */}

                                                <img src={`https://cloud.shopsppl.com/wp-content/uploads/sppl/${item.mainproductimg}`} alt={item.name}
                                                    className='md:w-[400px] w-full md:h-[300px] h-auto object-contain object-center'
                                                />
                                            </div>
                                            <div className="prod-name md:text-2xl text-lg my-2 line-clamp-2	">
                                                <span>{item.brand}</span> <span>{item.model}</span>
                                            </div>
                                            <div className="price ">
                                                <span className=' flex items-center gap-2 justify-center mt-2 my-2.5'>
                                                    <span className="line-through md:text-sm text-xs">{priceFormat(item.productNormalPrice)}</span>
                                                    <span className='md:text-2xl text-lg font-semibold text-gray-200' >{priceFormat(item.productSalePrice)}</span>
                                                </span>
                                            </div>
                                            <div className="btn-part flex items-center justify-between">
                                                <Link className='btn-prim-sec' href={`/product/${item.slug}`}>Learn More</Link>
                                                <OnBuyFunct id={id} />
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </section>

            <section className="pt-10 pb-5 px-2.5">
                <div className="max-w-screen-xl mx-auto ">
                    <div className="section-head text-center mb-4">
                        <h2 className="font-semibold "><span className="text-act">Deal</span> of the Day</h2>
                    </div>
                    <div className="w-full ">
                    <ul className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                            {
                                findDealDeay && findDealDeay.map((item: Product, index) => {
                                    const id = item._id.toString();
                                    return (
                                        <li key={index} className={`${((index % 2 == 0) ? 'wc2-newlaunch-bg' : 'tv-newlaunch-bg')} text-center rounded-2xl p-4 text-gray-200 overflow-hidden`}>
                                            <div className="prod-img flex items-center justify-center">
                                                {/* <Image src={`https://cloud.shopsppl.com/wp-content/uploads/sppl/${item.mainproductimg}`} alt={item.name} width={400} height={400} /> */}

                                                <img src={`https://cloud.shopsppl.com/wp-content/uploads/sppl/${item.mainproductimg}`} alt={item.name}
                                                     className='md:w-[400px] w-full md:h-[300px] h-auto object-contain object-center'
                                                />
                                            </div>
                                            <div className="prod-name md:text-2xl text-lg my-2 line-clamp-2	">
                                                <span>{item.brand}</span> <span>{item.model}</span>
                                            </div>
                                            <div className="price ">
                                                <span className=' flex items-center gap-2 justify-center mt-2 my-2.5'>
                                                    <span className="line-through md:text-sm text-xs">{priceFormat(item.productNormalPrice)}</span>
                                                    <span className='md:text-2xl text-lg font-semibold text-gray-200' >{priceFormat(item.productSalePrice)}</span>
                                                </span>
                                            </div>
                                            <div className="btn-part flex items-center justify-between">
                                                <Link className='btn-prim-sec' href={`/product/${item.slug}`}>Learn More</Link>
                                                <OnBuyFunct id={id} />
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
