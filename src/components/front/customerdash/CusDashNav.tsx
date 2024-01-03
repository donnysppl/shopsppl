"use client";
import React from 'react';
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { BsCart4 } from "react-icons/bs";
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const customerDashboardNav = [
    {
        name: 'Dashboard',
        link: '/customer/dashboard',
        icon: React.createElement(LuLayoutDashboard)
    },
    {
        name: 'Order',
        link: '/customer/dashboard/order',
        icon: React.createElement(BsCart4)
    },
]

export default function CusDashNav() {
    const router = useRouter();

    const custLogout = async () => {
        await fetch('/api/customeruser/logout', {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    toast.success(res.message);
                    router.push('/customer/login')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            {
                customerDashboardNav.map((item, index) => (
                    <li key={index}>
                        <Link href={item.link} className='flex font-medium items-center gap-3 py-2 px-2 hover:bg-gray-100 active:bg-gray-100 rounded-lg'>{item.icon} {item.name}</Link>
                    </li>

                ))
            }
            <li onClick={() => custLogout()} className='flex cursor-pointer font-medium items-center gap-3 py-2 px-2 hover:bg-gray-100 active:bg-gray-100 rounded-lg' ><LuLogOut /> Logout</li>


        </>
    )
}
