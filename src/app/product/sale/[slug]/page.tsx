import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import ProductCard from "@/components/front/product/ProductCard";


async function fetchSingleCustProd(slug: string) {
    const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/cust-prod-page/front/${slug}`, {
        method: 'GET',
        cache:'no-cache',
    })
    if (fetchApi.status !== 200) return notFound();
    const data = fetchApi.json();
    return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const pagesData = await fetchSingleCustProd(params.slug);
    const dataResult = pagesData.result;
    return {
        title: dataResult.metatitle,
        description: dataResult.metadiscription,
        alternates: {
            canonical: `/product/sale/${params.slug}`
        }
    }
}

export default async function fetchProdSalePage({ params }: { params: { slug: string } }) {
    const pagesData = await fetchSingleCustProd(params.slug);
    const dataResult = pagesData.result;
    const prodResult = pagesData.product;
    console.log(pagesData)

    return (
        <div className='max-w-screen-2xl mx-auto py-10 px-4 '>
            <h1>{dataResult?.name}</h1>

            <Suspense>
                <ul className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5'>
                    {
                        prodResult && prodResult.map((item: any, index: number) => (
                            <ProductCard key={index} {...item} />
                        ))
                    }
                </ul>
            </Suspense>
        </div>
    )
}
