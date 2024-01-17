"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartCompo from './CartCompo'
import ResponMeny from './ResponMeny';
import Search from './Search';
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineLogin } from "react-icons/md";

export default function Header() {
    const [menuOpen, setmenuOpen] = useState<boolean>(false);

    return (
        <header className='w-full p-1.5 bg-prim text-white'>
            <div className="max-w-screen-2xl mx-auto py-2 px-4 row flex gap-2 justify-between">
                <div className="w-[200px]">

                    <img src="/img/logo.png" alt="Logo" className='w-36' />
                </div>
                <div className="header-menu flex items-center">
                    <div className={` responsive-menu  ${menuOpen ? 'open' : 'close'} `}>
                        <ul className='flex gap-4 h-full text-sm items-center'>
                            {
                                menuOpen ?
                                    <>
                                        <li className='flex items-center justify-between'>
                                            <div className="w-[200px]">
                                                <img src="/img/logo.png" alt="Logo" className='w-36' />
                                            </div>
                                            <div onClick={() => setmenuOpen(!menuOpen)}>
                                                <AiOutlineClose />
                                            </div>
                                        </li>

                                    </> : null
                            }
                            <li><Link href={'/'}>Home</Link></li>
                            <li><Link href={'/about'}>About Us</Link></li>
                            <li><Link href={'/product'}>Product</Link></li>
                            <li><Link href={'/contact'}>Contact</Link></li>
                            <li><Link href={'/customer/login'}>Login/Signup</Link></li>
                            {/* <Search />
                            <CartCompo /> */}
                        </ul>
                    </div>
                    <div className='ms-2'>
                    {/* <div className='md:hidden block res-menu'> */}

                        <ul className='flex gap-2.5'>
                            <Search />
                            <CartCompo />
                            

                            <li className='md:hidden block res-menu' onClick={() => setmenuOpen(!menuOpen)}><ResponMeny /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
