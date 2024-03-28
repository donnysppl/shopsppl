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
import { Product } from '@/helpers/interFace';
import RazorpayOffer from '@/components/front/product/RazorpayOffer';

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
  const prodDetailData: Product = pageRes.product;
  const checkSizeAvai = pageRes.sizeAvai as Boolean;

  let loading = false;

  return (
    <>

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="w-full mx-auto">
          <div className="mx-auto flex flex-wrap relative">

            <div className="lg:w-2/4 w-full h-screen sticky top-[60px]">
              {
                loading ?
                  <div className="w-full h-full bg-gray-300 rounded-lg border border-gray-200 animate-pulse">
                    <div className="w-full h-full"></div>
                  </div>
                  :
                  <ProdImgSlider {...prodDetailData} />
              }
              {
                prodDetailData.threeDView ? <Product360 {...prodDetailData.threeDViewData} /> : null
              }

            </div>



            <div className={`lg:w-1/2 w-full  bg-[#F6F6FB] border-l border-[#98A2B3] `}>

              <div className='border-b border-[#98A2B3] px-10 py-5'>
                <h1 className={`text-gray-900 lg:text-xl text-lg title-font font-medium mb-4 leading-normal
                    ${loading ? "animate-pulse bg-gray-300 rounded-md h-28 w-full" : null}`}>
                  {prodDetailData?.name}</h1>

                <div>
                  <span className="text-gray-900 text-2xl font-semibold leading-normal">{priceFormat(prodDetailData?.productSalePrice)} </span>
                  <span className="text-base font-normal text-[#767676] line-through ps-2">{priceFormat(prodDetailData?.productNormalPrice)}</span>
                  <span className="text-[#499B4C] text-base ms-2">{
                    prodDetailData &&
                      typeof prodDetailData.productPriceDiffpercent === 'number'
                      ? `${Math.floor(prodDetailData.productPriceDiffpercent)}%`
                      : 'N/A'}</span>
                </div>
              </div>

              {
                checkSizeAvai ?
                  <div className='border-b border-[#98A2B3] px-10 py-5'>
                    <div className="flex items-center gap-5">
                      <span className="text-lg font-normal text-black ">Select Size : </span>
                      <div className="flex items-center gap-5 ">
                        {
                          pageRes?.sizes.map((item: any, index: any) => (
                            <Link key={index} href={`/product/${item.slug}`} className={`${(prodDetailData?.size === item.size) ? 'bg-prim text-white border-prim' : 'bg-white border-[#98A2B3] text-black'} border p-1.5 text-sm rounded-md w-10 h-10  flex items-center justify-center`}>
                              {item.size}
                            </Link>
                          ))
                        }
                      </div>
                    </div>
                  </div> : null
              }

              <div className='border-b border-[#98A2B3] px-10 py-5'>
                <div className="flex justify-between items-center">
                  {
                    (prodDetailData?.inStock === false) ?
                      <div className='bg-act inline-block p-1.5 font-semibold uppercase text-gray-900 '>Out of Stock</div> :
                      <>
                        <div className="flex items-center gap-4">
                          <span className='text-lg font-normal text-black'>Quantity</span>
                          <QuantyPart id={prodDetailData?._id} />
                        </div>

                        <div className="flex items-center w-[300px] gap-2">
                          <OnCartFunct id={prodDetailData?._id} />
                          <OnBuyFunct id={prodDetailData?._id} />
                        </div>
                      </>
                  }
                </div>
              </div>

              <div className='border-b border-[#98A2B3] px-10 py-5'>
                <div className="flex justify-between items-center">
                  <div>
                    <p className='text-lg font-normal text-black'>Get it by</p>
                    <p className='text-[0.65rem]  font-normal text-[#98A2B3]' >Enter Pincode to check estimated delivery date</p>
                  </div>
                  <div>

                  </div>
                </div>
              </div>


              <div className='border-b border-[#98A2B3] px-10 py-5'>
                <div className="razorpay-offer">
                  <RazorpayOffer razorkey={process.env.RAZORPAY_SECRET_ID} amountData={prodDetailData?.productSalePrice} />
                </div>
              </div>


              {
                prodDetailData.shortdiscrip ?
                  <div className='border-b border-[#98A2B3] px-10 py-5'>
                    <div className="product-highlight flex gap-2.5">
                      <div className='text-lg font-normal text-black'>Highlights : </div>
                      <div className='text-sm font-normal' dangerouslySetInnerHTML={{ __html: prodDetailData?.shortdiscrip }} />
                    </div>
                  </div> : null
              }



            </div>

          </div>
        </div>
      </section>
      <ProdTabs discription={prodDetailData?.productrpd} specification={prodDetailData.discription} />
      <ProductRecommed id={prodDetailData?._id} />
    </>
  )
}