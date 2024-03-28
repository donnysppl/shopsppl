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

const SizebyCategory = [
  {
    name: 'Televisions', slug: 'televisions',
    sizes: [
      { name: 'all', slug: 'all' },
      { name: '24inch to 32inch', slug: '23-32' },
      { name: '32inch to 40inch', slug: '32-40' },
      { name: '40inch to 43inch', slug: '40-43' },
      { name: '43inch to 55inch', slug: '43-55' },
      { name: '55inch to 75inch', slug: '55-75' },
    ]
  },
  {
    name: 'Washing Machines', slug: 'washing-machines',
    sizes: [
      { name: 'all', slug: 'all' },
      { name: '6kg to 8kg', slug: '6-8' },
      { name: '8kg to 10kg', slug: '8-10' },
      { name: '10kg to 12kg', slug: '10-12' },
    ]
  },
  {
    name: 'Cooler', slug: 'cooler',
    sizes: [
      { name: 'all', slug: 'all' },
      { name: '0leter to 50leter', slug: '0-50' },
      { name: '50leter to 100leter', slug: '50-100' },
      { name: '100leter to 150leter', slug: '100-150' },
    ]
  },
]

const Brand = [
  { name: 'all', slug: 'all' },
  { slug: 'kodaktv', name: 'Kodak TV' },
  { slug: 'blaupunkt', name: 'Blaupunkt' },
  { slug: 'thomson', name: 'Thomson' },
  { slug: 'westinghouse', name: 'Westinghouse' },
  { slug: 'white-westinghouse', name: 'White Westinghouse' },
  { slug: 'svl', name: 'SVL' },
]

const Price = [
  { name: 'all', slug: 'all' },
  { slug: '0-20000', name: '0 - 20000' },
  { slug: '20000-40000', name: '20000 - 40000' },
  { slug: '40000-60000', name: '40000 - 60000' },
  { slug: '60000-80000', name: '60000 - 80000' },
  { slug: '80000-100000', name: '80000 - 100000' }
]

interface pageType {
  page: string,
  brand: string,
  limit: string,
  category: string,
  price: string,
  size: string,
}

export default function ProductFilter({ page, brand, limit, category, price,size }: pageType) {

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
  const priceParam = price ? price : 'all';
  const sizeParam = size ? size : 'all';

  return (
    <>
      <div className="filter-head flex justify-between items-center p-3 md:mt-2 w-full">
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


        <div className="flex flex-col pt-2 border-b border-gray-200 pb-2">
          <h4 className="font-bold py-1.5 px-1">Price</h4>

          {loading ?
            [1, 2, 3, 4].map((item: any, index: number) => (
              <div key={index} className='filter-item relative overflow-hidden animate-pulse'>
                <div className="dash-nav-head-link w-full bg-gray-500 h-[24px] mb-0.5 rounded-lg"></div>
              </div>)) :
            Price.map((item: any, index: number) => (
              <Link className={`${(price === item.slug) ? 'active' : null} filter-item`} key={index}
                href={`?${new URLSearchParams({
                  page: pageParams, limit: limitParam, brand: brandParam, category: categoryParam,
                  price: item.slug,size: sizeParam
                })}`}>{item.name}</Link>
            ))}

        </div>


        {(categoryParam === 'Televisions' || categoryParam === 'Washing Machines' || categoryParam === 'Cooler' ) ?
          <div className="flex flex-col pt-2 border-b border-gray-200 pb-2">
            <h4 className="font-bold py-1.5 px-1">Filter by Size</h4>

            {loading ?
              [1, 2, 3, 4].map((item: any, index: number) => (
                <div key={index} className='filter-item relative overflow-hidden animate-pulse'>
                  <div className="dash-nav-head-link w-full bg-gray-500 h-[24px] mb-0.5 rounded-lg"></div>
                </div>)) :
              SizebyCategory.map((item: any, index: number) => {
                if (item.name === categoryParam) {
                  return item.sizes.map((item: any, index: number) => (
                    <Link className={`${(size === item.slug) ? 'active' : null} filter-item`} key={index}
                      href={`?${new URLSearchParams({
                        page: pageParams, limit: limitParam, brand: brandParam, category: categoryParam,
                        price: priceParam, size: item.slug
                      })}`}>{item.name}</Link>
                  ))
                }

              })}

          </div> : null}


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
                brand: item.name, category: categoryParam, price: priceParam,size: sizeParam
              })}`}>{item.name}</Link>
            ))}
        </div>

        <div className="flex flex-col pt-2 border-b border-gray-200 ">
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
                  brand: brandParam, category: 'all', price: priceParam,size: sizeParam
                })}`}>All</Link>
                {/* <Disclosure> */}
                {
                  categoryData && categoryData.map((item: any, index: number) => (
                    <Disclosure as="div" key={index} className='flex flex-col'>
                      {({ open }) => (
                        <>
                          <Link className={`${(category === item.parentCateName) ? 'active' : null} filter-item flex justify-between`} href={`?${new URLSearchParams({
                            page: pageParams, limit: limitParam,
                            brand: brandParam, category: item.parentCateName,size: sizeParam
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
                                      brand: brandParam, category: item.childCateName, price: priceParam,size: sizeParam
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
