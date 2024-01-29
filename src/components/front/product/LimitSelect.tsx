"use client";
import { useRouter } from 'next/navigation'
import React from 'react'

interface pageType{
    page:number,
    brand:string,
    category:string,
}

export default function LimitSelect({page,brand,category}:pageType) {
    const router = useRouter();
    const prodLimitChange = (e :React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        const value = parseInt(e.target.value)
        router.push(`?page=${page ? page : null}&limit=${value}&brand=${brand ? brand : 'all'}&category=${category ? category : 'all'}`);
    }
    return (
        <select className="form-select" defaultValue={'12'} onChange={(e) => prodLimitChange(e)}>
            <option  value="12">12</option>
            <option value="24">24</option>
            <option value="30">30</option>
        </select>
    )
}
