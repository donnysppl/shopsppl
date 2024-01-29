"use client";

import { Product } from "@/helpers/interFace";
import { useEffect, useState } from "react";
import ProductCard from "../front/product/ProductCard";
import Link from "next/link";
import { GrNext } from "react-icons/gr";
import { useSearchParams } from "next/navigation";

interface searchPropType {
    pageSearch: number,
    limitSearch: number,
    brandSearch: string,
    categorySearch: string,
}
interface fetchProd {
    result: Product[] | undefined | null;
    next?: {
        page: number;
        limit: number;
    };
    prev?: {
        page: number;
        limit: number;
    };
    totalPosts: number;
    totalPages: number;
}

export default function ProductListLayout() {

    const searchParam = useSearchParams();
    const page = searchParam.get('page');
    const limit = searchParam.get('limit');
    const brand = searchParam.get('brand');
    const category = searchParam.get('category');

    const [prodList, setprodList] = useState<fetchProd>();

    const [loading, setloading] = useState<boolean>(true);
    const limitStr = limit ? limit.toString() : '10';

    useEffect(() => {
        productFetch();
    }, [page,limit,brand,category])

    const productFetch = async () => {
        setloading(true);
        await fetch(`/api/product/products/front?page=${page ? page : 1}&limit=${limit ? limit : 12}&brand=${brand ? brand : 'all'}&category=${category ? category : 'all'}`, {
            method: 'GET',
            next: { revalidate: 10 }
        }).then(res => res.json())
            .then(res => {
                // console.log(res);
                if (res.status === 200) {
                    setprodList(res.result)
                    setloading(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <ul className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5">
                {
                    loading ?
                        [1, 2, 3, 4, 5, 6, 7, 8].map((item: any, index: number) => (
                            <div key={index} role="status" className="p-1.5 border rounded-2xl bg-white flex flex-col justify-between relative overflow-hidden animate-pulse">
                                <div className="w-full h-[350px] bg-gray-500 rounded-lg "></div>
                            </div>
                        ))
                        :
                        prodList && prodList?.result?.map((item: Product, index: number) => (
                            <ProductCard key={index} {...item} />
                        ))
                }
            </ul>
            <div className='flex gap-4 justify-between items-center py-4' >
                <div>
                    <div>Page {page ? page : 1} to {prodList?.totalPages}</div>
                </div>

                <div className='flex gap-3'>
                {
                  prodList?.prev ?
                    <div className="next ">
                      <Link className='btn-prim gap-2' href={`?${new URLSearchParams({
                        page: prodList.prev.page.toString(), limit: limitStr,
                        brand: (brand ? brand : 'all'), category: (category ? category : 'all')
                      })}`}><GrNext className='rotate-180' /> Prev</Link>
                    </div> : null
                }
                {
                  prodList?.next ?
                    <div className="next">
                      <Link className='btn-prim gap-2' href={`?${new URLSearchParams({
                        page: prodList.next.page.toString(), limit: limitStr,
                        brand: (brand ? brand : 'all'), category: (category ? category : 'all')
                      })}`}>Next <GrNext /></Link>
                    </div> : null
                }


              </div>
            </div>

        </>
    )
}
