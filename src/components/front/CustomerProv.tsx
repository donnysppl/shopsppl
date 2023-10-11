"use client";

import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react'

interface decodeTokenType {
    iat: Number
    exp: Number
}

export default function CustomerProv({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();

    


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const customerToken = window.localStorage.getItem('customer-admin') as string | null;
            if (customerToken) {
                const decodeToken = jwt_decode(customerToken) as decodeTokenType;
                const startTokenTime = decodeToken?.iat;
                const endTokenTime = decodeToken?.exp;
                if (startTokenTime > endTokenTime) {
                    localStorage.clear();
                    router.push('/customer/login')
                }
            }
        }
    }, [])

    return children
}
