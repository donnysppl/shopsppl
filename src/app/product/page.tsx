import LimitSelect from '@/components/front/product/LimitSelect';
import ProductFilter from '@/components/front/product/ProductFilter';
import { Product } from '@/helpers/interFace';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import OnBuyFunct from "@/helpers/onBuyFunct";
import OnCartFunct from '@/helpers/onCartFunct';
import { GrNext } from "react-icons/gr";
import ProductCard from '@/components/front/product/ProductCard';

interface fetchProd {
  result: {
    result: any[];
    next: {
      page: number;
      limit: number;
    };
    prev: {
      page: number;
      limit: number;
    };
    totalPosts: number;
    totalPages: number;
  }
}

export async function generateMetadata() {
  return {
    title: 'Product | Shop',
    description: 'Product',
    alternates: {
      canonical: `/product`
    }
  }
}

async function fetchProd(page: number, limit: number, brand: string, category: string) {
  const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/products/front?page=${page ? page : 1}&limit=${limit ? limit : 10}&brand=${brand ? brand : 'all'}&category=${category ? category : 'all'}`, {
    method: 'GET',
    next: { revalidate: 10 }
  })
  if (fetchApi.status !== 200) return notFound();
  const data = fetchApi.json();
  return data;
}

export default async function ProductList({ searchParams }: {
  searchParams: {
    page: string, limit: string, brand: string, category: string
  }
}) {
  const pageParams = parseInt(searchParams.page);
  const limitParams = parseInt(searchParams.limit);
  const brandParams = searchParams.brand;
  const categoryParams = searchParams.category;
  const fetchProds: fetchProd = await fetchProd(pageParams, limitParams, brandParams, categoryParams);
  const totalPost = fetchProds.result.totalPosts;
  const totalPages = fetchProds.result.totalPages;



  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="product-filter-main grid grid-cols-1 gap-x-8 md:gap-y-10 gap-y-2 lg:grid-cols-4">
        <div className="product-filter-part">
          <ProductFilter brand={brandParams} category={categoryParams} page={searchParams.page} limit={searchParams.limit} />
        </div>
        <div className="product-part lg:col-span-3">
          <div className="mx-auto max-w-screen-xl">
            <div className='flex justify-between p-4'>
              <h2>product List</h2>
              <div>
                <LimitSelect brand={brandParams} category={categoryParams} page={pageParams} />
              </div>
            </div>
            <ul className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5">
              {
                fetchProds && fetchProds.result.result.map((item: Product, index: number) => (
                  <ProductCard key={index} {...item}/>
                ))
              }
            </ul>

            <div className='flex gap-4 justify-between items-center py-4' >
              <div>
                <div>Page {pageParams ? pageParams : 1} to {totalPages}</div>

              </div>

              <div className='flex gap-3'>
                {
                  fetchProds.result.prev ?
                    <div className="next ">
                      <Link className='btn-prim gap-2' href={`?${new URLSearchParams({
                        page: fetchProds.result.prev.page.toString(), limit: searchParams.limit
                      })}`}><GrNext className='rotate-180' /> Prev</Link>
                    </div> : null
                }
                {
                  fetchProds.result.next ?
                    <div className="next">
                      <Link className='btn-prim gap-2' href={`?${new URLSearchParams({
                        page: fetchProds.result.next.page.toString(), limit: searchParams.limit
                      })}`}>Next <GrNext /></Link>
                    </div> : null
                }


              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
