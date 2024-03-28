
import ProductCard from '@/components/front/product/ProductCard';
import { Product } from '@/helpers/interFace';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { title } from 'process';
import React from 'react'

async function fetchallCollect(slug: string) {
    const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/collection/front/${slug}`, {
        method: 'GET',
        cache: 'no-cache',
    })
    // if (fetchApi.status !== 200) return notFound();
    const data = fetchApi.json();
    return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const pagesData = await fetchallCollect(params.slug);
    const pageRes = pagesData.result;

    return {
        title: pageRes.metatitle,
        description: pageRes.metadis,
        alternates: {
            canonical: `/collections/${params.slug}`
        }
    }
}



export default async function CollectionsSlug({ params }: { params: { slug: string } }) {
    const pagesData = await fetchallCollect(params.slug);
    if (pagesData.status !== 200) return notFound();

    const pageData = pagesData.result;
    const pageRes = pagesData && pagesData.productdata;

    return (
        <div className='max-w-screen-2xl mx-auto md:px-2.5'>

            <ul className='flex mb-5'>
                <li className='text-xs text-gray-600'>
                    <Link href={'/'}>Home</Link>
                    <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                </li>

                <li className='text-xs text-gray-600'>
                    <Link href={'/collections'}>Collection</Link>
                    <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                </li>

                <li className='text-xs text-gray-600'>
                    <Link href={`/collections/${pageData && pageData.slug}`}>{pageData && pageData.name}</Link>
                </li>


            </ul>

            <div className="grid md:grid-cols-3 grid-cols-2 md:gap-5 gap-1.5">
                {pageRes && pageRes.map((item: Product, index: number) => (
                    <ProductCard key={index} {...item} />
                ))
                }
            </div>
        </div>
    )
}
