"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import { BsFilter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter, useSearchParams } from 'next/navigation';

const Categories = [
  { name: 'all', slug: 'all', href: '#' },
  { name: 'Air Conditioners', slug: 'air-conditioners', href: '#' },
  { name: 'Cooler', slug: 'cooler', href: '#' },
  { name: 'Televisions', slug: 'televisions', href: '#' },
  { name: 'Washing Machines', slug: 'washing-machines', href: '#' },
]

const Brand = [
  { name: 'all', slug: 'all' },
  { slug: 'kodaktv', name: 'Kodak TV' },
  { slug: 'blaupunkt', name: 'Blaupunkt' },
  { slug: 'thomson', name: 'Thomson' },
  { slug: 'westinghouse', name: 'Westinghouse' },
  { slug: 'white-westinghouse', name: 'White Westinghouse' },
]

interface pageType {
  page: string,
  brand: string,
  limit: string,
  category: string,
}

export default function ProductFilter({ page, brand, limit, category }: pageType) {

  const router = useRouter();
  const searchparams = useSearchParams()

  const [filterOpen, setfilterOpen] = useState<boolean>(false)
  const limitParam = limit ? limit : '10';
  const brandParam = brand ? brand : 'all';
  const categoryParam = category ? category : 'all';
  return (
    <>
      <div className="filter-head flex justify-between items-center p-3 mt-2">
        <h2 className='text-base'>Filter</h2>
        <div className="md:hidden block">
          <div className="filter-menu">
            <BsFilter onClick={() => setfilterOpen(!filterOpen)} className='w-6 h-6' />
          </div>
        </div>
      </div>
      <div className={`py-3 bg-white rounded-lg p-4 shadow-sm mob-filter ${filterOpen ? 'open' : 'close'}`}>
        <div className="md:hidden block">
          <div onClick={() => setfilterOpen(!filterOpen)} className=" close-button w-7 h-7 border border-gray-600 flex items-center justify-center rounded-full p-1 ms-auto mr-4 cursor-pointer">
            <AiOutlineClose className='w-6 h-6' />
          </div>
        </div>
        <div className="flex flex-col border-b border-gray-200 pb-2">
          <h4 className="font-bold py-1.5 px-1">Brand</h4>
          {Brand.map((item: any, index: number) => (
            <Link className={`${(brand === item.name) ? 'active' : null} filter-item`} key={index} href={`?${new URLSearchParams({
              page: page, limit: limitParam,
              brand: item.name, category: categoryParam
            })}`}>{item.name}</Link>
          ))}
        </div>

        <div className="flex flex-col pt-2 ">
          <h4 className="font-bold py-1.5 px-1">Categories</h4>
          {Categories.map((item: any, index: number) => (
            <Link className={`${(brand === item.name) ? 'active' : null} filter-item`} key={index} href={`?${new URLSearchParams({
              page: page, limit: limitParam,
              brand: brandParam, category: item.name
            })}`}>{item.name}</Link>
          ))}
        </div>
      </div>
    </>
  )
}
