import ProdImgSlider from '@/components/front/product/ProdImgSlider';
import { notFound } from 'next/navigation';
import React from 'react'
import OnBuyFunct from "@/helpers/onBuyFunct";
import OnCartFunct from '@/helpers/onCartFunct';
import ProdTabs from '@/components/front/product/ProdTabs';
import QuantyPart from '@/components/front/product/QuantyPart';
import ProductRecommed from '@/components/front/product/ProductRecommed';
import Link from 'next/link';
import { priceFormat } from '@/helpers/common';
import Product360 from '@/components/front/product/Product360';

async function fetchSingleProd(slug: string) {
  const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/products/front/${slug}`, {
    method: 'GET',
    cache: 'no-cache',
  })
  if (fetchApi.status !== 200) return notFound();
  const data = fetchApi.json();
  return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const pagesData = await fetchSingleProd(params.slug);
  const pageRes = pagesData.result;
  const dataResult = pageRes.product;

  return {
    title: dataResult.metatitle,
    description: dataResult.metadiscription,
    alternates: {
      canonical: `/product/${params.slug}`
    }
  }
}

export default async function ProductSingle({ params }: { params: { slug: string } }) {
  const pagesData = await fetchSingleProd(params.slug);
  const pageRes = pagesData.result;
  const prodDetailData = pageRes.product;
  const checkSizeAvai = pageRes.sizeAvai as Boolean;

  let loading = false;

  return (
    <>
    {/* <Product360 /> */}
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 md:py-24 py-5 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">

            <div className="lg:w-2/4 w-full">
              {
                loading ?
                  <div className="w-full h-[500px] bg-gray-300 rounded-lg border border-gray-200 animate-pulse">
                    <div className="w-full h-full"></div>
                  </div>
                  :
                  <ProdImgSlider {...prodDetailData} />
              }
            </div>
            <div className={`lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 
                  ${loading ? "space-y-3.5" : null}`}>
              <h2 className={`text-sm title-font text-gray-500 tracking-widest mb-1.5
                    ${loading ? "animate-pulse bg-gray-300 rounded-md h-3 w-1/5" : null}`}>
                {prodDetailData?.brand}</h2>
              <h1 className={`text-gray-900 lg:text-2xl text-lg title-font font-semibold mb-1 leading-normal
                    ${loading ? "animate-pulse bg-gray-300 rounded-md h-28 w-full" : null}`}>
                {prodDetailData?.name}</h1>
              <div className={`text-gray-800 text-base title-font font-semibold mb-1 leading-normal
                    ${loading ? "animate-pulse bg-gray-300 rounded-md h-28 w-full" : null}`}>Model/SKU : {prodDetailData?.model}</div>

              <div className={`price mt-2 ${loading ?
                "animate-pulse bg-gray-300 rounded-md h-3 w-full" : null}`}>
                {
                  !loading ?
                    <>
                      <span className="text-gray-900 text-xl title-font font-medium leading-normal">{priceFormat(prodDetailData?.productSalePrice)} </span>
                      <span className="line-through ps-2">{priceFormat(prodDetailData?.productNormalPrice)}</span>
                      <span className="border border-gray-500 p-1.5 rounded-lg text-sm ms-2">{
                        prodDetailData &&
                          typeof prodDetailData.productPriceDiffpercent === 'number'
                          ? `${Math.floor(prodDetailData.productPriceDiffpercent)}%`
                          : 'N/A'}</span>
                    </>
                    : null
                }
              </div>

              {
                checkSizeAvai ?
                  <div className="mb-4 mt-2.5 flex items-center gap-2">
                    <span className="font-bold text-gray-700 pt-1">Select Size : </span>
                    <div className="flex items-center gap-2 mt-2">
                      {
                        pageRes?.sizes.map((item: any, index: any) => (
                          <Link key={index} href={`/product/${item.slug}`} className={`${(prodDetailData?.size === item.size) ? 'bg-act' : 'bg-gray-300'} p-1.5 text-sm rounded-full w-10 h-10 text-black flex items-center justify-center`}>
                            {item.size}
                          </Link>
                        ))
                      }
                    </div>
                  </div> : null
              }


              <div className="product-btn-part mt-3">
                {
                  (prodDetailData?.inStock === false) ?
                    <div className='bg-act inline-block p-1.5 font-semibold uppercase text-gray-900 '>Out of Stock</div> :
                    <>
                      <QuantyPart id={prodDetailData?._id} />
                      {
                        loading ? <div className="flex gap-2">
                          <div className="animate-pulse bg-gray-300 rounded-md h-9 w-28"></div>
                          <div className="animate-pulse bg-gray-300 rounded-md h-9 w-28"></div>
                        </div> : <>
                          <OnCartFunct id={prodDetailData?._id} />
                          <OnBuyFunct id={prodDetailData?._id} />
                        </>
                      }
                    </>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProdTabs discription={prodDetailData?.productrpd} specification={prodDetailData.discription} />
      <ProductRecommed id={prodDetailData?._id} />
    </>
  )
}