import ProdImgSlider from '@/components/front/product/ProdImgSlider';
import { Product } from '@/helpers/interFace';
import { notFound } from 'next/navigation';
import React from 'react'
import OnBuyFunct from "@/helpers/onBuyFunct";
import OnCartFunct from '@/helpers/onCartFunct';
import ProdTabs from '@/components/front/product/ProdTabs';
import QuantyPart from '@/components/front/product/QuantyPart';

async function fetchSingleProd(slug:string) {
  const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/products/front/${slug}`, {
      method: 'GET',
  })
  if (fetchApi.status !== 200) return notFound();
  const data = fetchApi.json();
  return data;
}

export async function generateMetadata({ params }: { params: { slug: string }}) {
  const pagesData = await fetchSingleProd(params.slug);
  const dataResult = pagesData.result;
  return {
    title: dataResult.metatitle,
    description: dataResult.metadiscription,
    alternates:{
      canonical:`/product/${params.slug}`
    }
  }
}

export default async function ProductSingle({ params }: { params: { slug: string }}) {
  const pagesData = await fetchSingleProd(params.slug);
 const prodDetailData = pagesData.result;
 let loading = false;

  return (
    <>
    <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">

            <div className="w-2/4">
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
              <h2 className={`text-sm title-font text-gray-500 tracking-widest 
                    ${loading ? "animate-pulse bg-gray-300 rounded-md h-3 w-1/5" : null}`}>
                {prodDetailData?.brand}</h2>
              <h1 className={`text-gray-900 text-2xl title-font font-medium mb-1 leading-normal
                    ${loading ? "animate-pulse bg-gray-300 rounded-md h-28 w-full" : null}`}>
                {prodDetailData?.name}</h1>
              <div className={`price mt-2 ${loading ?
                "animate-pulse bg-gray-300 rounded-md h-3 w-full" : null}`}>
                {
                  !loading ?
                    <>
                      <span className="text-gray-900 text-xl title-font font-medium leading-normal">₹{prodDetailData?.productSalePrice} </span>
                      <span className="line-through ps-2">₹{prodDetailData?.productNormalPrice}</span>
                      <span className="border border-gray-500 p-1.5 rounded-lg text-sm ms-2">{
                        prodDetailData &&
                          typeof prodDetailData.productPriceDiffpercent === 'number'
                          ? `${Math.floor(prodDetailData.productPriceDiffpercent)}%`
                          : 'N/A'}</span>
                    </>
                    : null
                }
              </div>
              <div className="product-btn-part mt-3">
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

              </div>
            </div>
          </div>
        </div>
      </section>
      <ProdTabs discription={prodDetailData?.productrpd} specification={prodDetailData.discription} />
    </>
  )
}