"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartCompo from './CartCompo'
import ResponMeny from './ResponMeny';
import Search from './Search';
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineLogin } from "react-icons/md";
import LoginSign from './LoginSign';

export default function Header() {
    const [menuOpen, setmenuOpen] = useState<boolean>(false);


    return (
        <header className='w-full p-1.5 bg-prim text-white'>
            <div className="max-w-screen-2xl mx-auto py-2 px-4 row flex gap-2 justify-between">
                <div className="w-[200px]">
                    <Link href={'/'}>
                        <img src="/img/logo.png" alt="Logo" className='w-36' /></Link>
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

                            {/* <li>
                                <div className=''>
                                    <span>Category</span>

                                    <div className="absolute w-3/4  bg-white top-16 left-1/2 -translate-x-1/2 z-10 shadow-xl p-4">

                                        <div className="grid grid-cols-4 gap-4 text-gray-900 text-center">
                                            <div className="menu-card">
                                                <div className="card-img">
                                                    <img src="https://cloud.shopsppl.com/wp-content/uploads/sppl/blaupunkt/product/55QD7020/55QD7020%20(1).webp" alt="" />
                                                </div>
                                                <div className="title text-base font-semibold" >Television</div>
                                            </div>
                                            <div className="menu-card">
                                                <div className="card-img">
                                                    <img src="https://cloud.shopsppl.com/wp-content/uploads/sppl/blaupunkt/product/55QD7020/55QD7020%20(1).webp" alt="" />
                                                </div>
                                                <div className="title text-base font-semibold" >Washing Machine</div>
                                            </div>
                                            <div className="menu-card">
                                                <div className="card-img">
                                                    <img src="https://cloud.shopsppl.com/wp-content/uploads/sppl/blaupunkt/product/55QD7020/55QD7020%20(1).webp" alt="" />
                                                </div>
                                                <div className="title text-base font-semibold" >Air Conditioner</div>
                                            </div>
                                            <div className="menu-card">
                                                <div className="card-img">
                                                    <img src="https://cloud.shopsppl.com/wp-content/uploads/sppl/blaupunkt/product/55QD7020/55QD7020%20(1).webp" alt="" />
                                                </div>
                                                <div className="title text-base font-semibold" >Coolers</div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </li> */}

                            <li><Link href={'/product?category=Televisions'}>TV</Link></li>
                            <li><Link href={'/product?category=Washing+Machines'}>Washing Machine</Link></li>
                            {/* <li><Link href={'/'}>Home</Link></li> */}
                            <li><Link href={'/about'}>About Us</Link></li>
                            {/* <li><Link href={'/product'}>Product</Link></li> */}
                            <li><Link href={'/contact'}>Contact</Link></li>



                            <li><LoginSign /></li>
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
