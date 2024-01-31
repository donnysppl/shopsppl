"use client";
import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsFilter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter, useSearchParams } from 'next/navigation';
import { FaCaretDown } from "react-icons/fa";
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

  const [categoryData, setcategoryData] = useState([]);
  const [loading, setloading] = useState<boolean>(true)

  useEffect(() => {
    setloading(true)
    const allCate = async () => {
      await fetch(`/api/product/products/front/category`, {
        method: 'GET',
        cache: 'no-cache',
      }).then(res => res.json())
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            setcategoryData(res.result)
            setloading(false);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    allCate();
  }, [])


  const [filterOpen, setfilterOpen] = useState<boolean>(false)
  const pageParams = page ? page : '1';
  const limitParam = limit ? limit : '12';
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
          {loading ?
            [1, 2, 3, 4].map((item: any, index: number) => (
              <div key={index} className='filter-item relative overflow-hidden animate-pulse'>
                <div className="dash-nav-head-link w-full bg-gray-500 h-[24px] mb-0.5 rounded-lg"></div>
              </div>)) :
            Brand.map((item: any, index: number) => (
              <Link className={`${(brand === item.name) ? 'active' : null} filter-item`} key={index} href={`?${new URLSearchParams({
                page: pageParams, limit: limitParam,
                brand: item.name, category: categoryParam
              })}`}>{item.name}</Link>
            ))}
        </div>

        <div className="flex flex-col pt-2 ">
          <h4 className="font-bold py-1.5 px-1">Categories</h4>
          {
            loading ?
              [1, 2, 3, 4].map((item: any, index: number) => (
                <div key={index} className='filter-item relative overflow-hidden animate-pulse'>
                  <div className="dash-nav-head-link w-full bg-gray-500 h-[24px] mb-0.5 rounded-lg"></div>
                </div>)) :

              <>
                <Link className={`${(category === 'all') ? 'active' : null} filter-item`} href={`?${new URLSearchParams({
                  page: pageParams, limit: limitParam,
                  brand: brandParam, category: 'all'
                })}`}>All</Link>
                {/* <Disclosure> */}
                {
                  categoryData && categoryData.map((item: any, index: number) => (
                    <Disclosure as="div" key={index} className='flex flex-col'>
                      {({ open }) => (
                        <>
                          <Link className={`${(category === item.parentCateName) ? 'active' : null} filter-item flex justify-between`} href={`?${new URLSearchParams({
                            page: pageParams, limit: limitParam,
                            brand: brandParam, category: item.parentCateName
                          })}`}>
                            <div className="">
                              {item.parentCateName}
                            </div>
                            <Disclosure.Button className="">
                              <FaCaretDown />
                            </Disclosure.Button>
                          </Link>
                          <Disclosure.Panel className="text-gray-500">
                            <ul>
                              {
                                item.childCate?.map((item: any, index: number) => (
                                  <li key={index} className='filter-item'>
                                    <Link className={`${(category === item.childCateName) ? 'active' : null} filter-item`} href={`?${new URLSearchParams({
                                      page: pageParams, limit: limitParam,
                                      brand: brandParam, category: item.childCateName
                                    })}`}>{item.childCateName}</Link></li>
                                ))
                              }
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>

                  ))
                }


              </>
          }

        </div>

      </div>
    </>
  )
}
