"use client";
import { useRouter } from 'next/navigation'
import React from 'react'

export default function LimitSelect() {
    const router = useRouter();
    const prodLimitChange = (e :React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value,10)
        router.push(`?limit=${value}`);
    }
    return (
        <select className="form-select" defaultValue={'10'} onChange={(e) => prodLimitChange(e)}>
            <option  value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
    )
}
