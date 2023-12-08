import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartCompo from './CartCompo'
import ResponMeny from './ResponMeny';
import Search from './Search';

export default function Header() {
    return (
        <header className='w-full p-1.5 bg-prim text-white'>
            <div className="max-w-screen-2xl mx-auto py-2 px-4 row flex gap-2 justify-between">
                     <div className="w-[200px]">

                             <img src="/img/logo.png" alt="Logo" className='w-36' />
                     </div>
                     <div className="header-menu flex items-center">
                         <div className='md:block hidden'>
                         <ul className='flex gap-4 h-full text-sm items-center'>
                             <li><Link href={'/'}>Home</Link></li>
                             {/* <li><Link href={'/about'}>About Us</Link></li> */}
                             <li><Link href={'/product'}>Product</Link></li>
                             <li><Link href={'/contact'}>Contact</Link></li>
                             <Search/>
                             <CartCompo />
                         </ul>
                         </div>
                         <ul className='md:hidden block'>
                            <li><ResponMeny /></li>
                         </ul>
                     </div>
                 </div>
        </header>
    )
}
