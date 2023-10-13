import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartCompo from './CartCompo'
import ResponMeny from './ResponMeny';

export default function Header() {
    return (
        <header className='w-full p-1.5 bg-prim text-white'>
            <div className="max-w-screen-2xl py-2 px-4 row flex gap-2 justify-between">
                     <div className="w-[200px]">
                         <Image src="/img/logo.png" className='w-[150px]'
                             width={200}
                             height={50}
                             objectFit='contain'
                             alt="Logo" />
                     </div>
                     <div className="header-menu flex items-center">
                         <div className='md:block hidden'>
                         <ul className='flex gap-4 h-full text-sm items-center'>
                             <li><Link href={'/'}>Home</Link></li>
                             <li><Link href={'/product'}>Product</Link></li>
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
