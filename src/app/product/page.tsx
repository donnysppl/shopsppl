import LimitSelect from '@/components/front/product/LimitSelect';
import ProductFilter from '@/components/front/product/ProductFilter';
import { Product } from '@/helpers/interFace';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

async function fetchProd(page: number, limit: number,brand:string, category:string) {
  const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/products/front?page=${page ? page : 1}&limit=${limit ? limit : 10}&brand=${brand ? brand : 'all'}&category=${category ? category : 'all'}`, {
    method: 'GET',
  })
  if (fetchApi.status !== 200) return notFound();
  const data = fetchApi.json();
  return data;
}

export default async function ProductList({ searchParams }: { searchParams: { 
  page: string, limit: string , brand:string,category:string
} }) {
  const pageParams = parseInt(searchParams.page);
  const limitParams = parseInt(searchParams.limit);
  const brandParams = searchParams.brand;
  const categoryParams = searchParams.category;
  const fetchProds = await fetchProd(pageParams, limitParams,brandParams,categoryParams);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="product-filter-main grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="product-filter-part">
        <ProductFilter brand={brandParams} category={categoryParams} page={searchParams.page} limit={searchParams.limit}/>
        </div>
        <div className="product-part lg:col-span-3">
          <div className="mx-auto max-w-screen-xl px-4 py-3">
            <div className='flex justify-between p-4'>
              <h2>product List</h2>
              <div>
                <LimitSelect brand={brandParams} category={categoryParams} page={pageParams}/>
              </div>
            </div>
            <ul className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5">
              {
                fetchProds && fetchProds.result.result.map((item: Product, index: number) => (
                  <li className="p-2.5 border rounded-2xl bg-white flex flex-col justify-between" key={index}>
                    <Link href={`/product/${item.slug}`}>

                      <div className="relative">
                        <Image src={item.mainproductimg} width={300} height={275} alt={item.name} className="object-contain object-center mx-auto" />
                        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                          {typeof item.productPriceDiffpercent === 'number'
                            ? `${Math.floor(item.productPriceDiffpercent)}% OFF`
                            : 'N/A'}
                        </span>
                      </div>
                    </Link>
                    <div className="bg-gray-100 rounded-lg p-2">
                      <Link href={`/product/${item.slug}`}>
                        <p className="mb-1 text-sm text-primary-500">{item.brand}</p>
                        <h5 className="text-sm font-semibold text-gray-800 line-clamp-2">{item.name}</h5>
                        <div className="price">
                          <p className="text-sm font-semibold text-gray-800">₹{item.productSalePrice} <span className="line-through">₹{item.productNormalPrice}</span></p>
                        </div>
                        <div className="btn-part ">
                          {/* <button onClick={() => addCartProduct(item._id)} className="border rounded-xl bg-red-700 text-gray-200 p-1.5">Add To Cart</button>
                          <button className="border rounded-xl bg-red-700 text-gray-200 p-1.5">View</button> */}
                        </div>
                      </Link>
                    </div>


                  </li>
                ))
              }
            </ul>

            {
              fetchProds.result.next ?
                <div className="next">
                  <Link href={`?${new URLSearchParams({
                    page: fetchProds.result.next.page, limit: searchParams.limit
                  })}`}>Next</Link>
                </div> : null
            }

            {
              fetchProds.result.prev ?
                <div className="next">
                  <Link href={`?${new URLSearchParams({
                    page: fetchProds.result.prev.page, limit: searchParams.limit
                  })}`}>Prev</Link>
                </div> : null
            }
          </div>

        </div>
      </div>
    </div>
  )
}



