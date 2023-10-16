import React from 'react';
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { BsCart4 } from "react-icons/bs";
import Link from 'next/link';

const customerDashboardNav = [
    {
        name: 'Dashboard',
        link: './dashboard',
        icon: React.createElement(LuLayoutDashboard)
    },
    {
        name: 'Order',
        link: './dashboard/order',
        icon: React.createElement(BsCart4)
    },
]

export default function CusDashNav() {
    return (
        <>
            {
                customerDashboardNav.map((item, index) => (
                    <li key={index}>
                        <Link href={item.link} className='flex font-medium items-center gap-3 py-2 px-2 hover:bg-gray-100 active:bg-gray-100 rounded-lg'>{item.icon} {item.name}</Link>
                    </li>

                ))
            }

        </>
    )
}
