import { CustTokenDecode } from '@/helpers/interFace';
import jwtDecode from 'jwt-decode';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const UserIcon = ({color}:{color:string}) => (
    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={color}><path d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
)

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
        <li className='md:block hidden'>
            <Link href={'/customer/login'}><UserIcon color='#ffffff' /></Link>
        </li>
    )
}
