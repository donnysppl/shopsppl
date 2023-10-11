"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

interface buyBtn {
    id:string,
}
export default function OnBuyFunct({id}:buyBtn) {
    const route = useRouter();
    const onBuyClick = () => {
        route.push(`/product/checkout?product=${id}`)
    }
  return (
    <button onClick={() => onBuyClick()} className="btn-prim ms-2">Buy Now</button>
  )
}
