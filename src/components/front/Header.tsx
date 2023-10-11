import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartCompo from './CartCompo'

export default function Header() {
    return (
        <header className='bg-black w-screen text-white p-2'>
            <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8 border border-gray-500 rounded-full">
                <div className="row flex gap-2 justify-between">
                    <div className="w-[200px]">
                        <Image src="/img/logo.png" className='w-[150px]'
                            width={200}
                            height={50}
                            objectFit='contain'
                            alt="Logo" />
                    </div>
                    <div className="header-menu">
                        <ul className='flex gap-4 h-full items-center'>
                            <li><Link href={'/'}>Home</Link></li>
                            <li><Link href={'/product'}>Product</Link></li>
                            <CartCompo/>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
