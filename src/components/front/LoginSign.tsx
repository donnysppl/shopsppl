import { CustTokenDecode } from '@/helpers/interFace';
import jwtDecode from 'jwt-decode';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function LoginSign() {
    const [userName, setuserName] = useState<string>('')
    useEffect(() => {
        const customerToken = window.localStorage.getItem('customer-admin');

        if (customerToken === null || customerToken === '') {
            setuserName('')
        }
        else {
            const custData: CustTokenDecode = jwtDecode(customerToken);
            setuserName(custData.username as string)
        }

    }, [])

    return (
        <Link href={'/customer/login'}>{
            (userName === '') ? 'Login/Signup' : userName
        }</Link>
    )
}
