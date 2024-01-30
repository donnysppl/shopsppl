"use client";

import { Product } from "@/helpers/interFace";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductRecommed({ id }: { id: string }) {
    const [loading, setloading] = useState<Boolean>(true);
    const [recomProdData, setrecomProdData] = useState<Product[]>([]);
    useEffect(() => {
        setloading(true);
        const recomProd = async () => {
            await fetch(`/api/product/products/front/related?r=${id}`, {
                cache: 'no-store',
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        setrecomProdData(res.result);
                    }
                    setloading(false);
                })
                .catch(err => {
                    console.log(err);
                })

        }
        recomProd();
    }, [])

    return (
        <>
            <section className="prod-recomd pt-10 pb-8">
                <div className="space-y-6 max-w-screen-xl mx-auto" >
                    <div className="section-head text-center mb-4">
                        <h2 className="font-semibold ">
                            <span className="text-act">Recommended</span> Products for You
                        </h2>
                    </div>
                    <div className="recmd-prod-list">

                        <ul className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5">
                            {
                                loading ?
                                    [1, 2, 3, 4].map((item: any, index: number) => (
                                        <div key={index} role="status" className="p-1.5 border rounded-2xl bg-white flex flex-col justify-between relative overflow-hidden animate-pulse">
                                            <div className="w-full h-[350px] bg-gray-500 rounded-lg "></div>
                                        </div>
                                    ))
                                    :
                                    recomProdData && recomProdData?.map((item: Product, index: number) => (
                                        <ProductCard key={index} {...item} />
                                    ))
                            }
                        </ul>
                    </div>
                </div>
            </section>

        </>
    )
}
