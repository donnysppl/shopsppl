"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartCompo from './CartCompo'
import ResponMeny from './ResponMeny';
import Search from './Search';
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineLogin } from "react-icons/md";
import LoginSign from './LoginSign';
import { Transition } from '@headlessui/react'
import Megamenu from './Megamenu';
import { cateAcArr, cateCoolArr, cateTVArr, cateWashArr } from '@/helpers/CategoryData';
import { Disclosure } from '@headlessui/react'

const MenuIcon = ({ color }: { color: string }) => (
    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={color}><path d="M3 5H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 12H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 19H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
)

const menulist = [
    {
        id: 1,
        title: 'Products',
        link: '/product',
        megamenu: true,
        megamenud: [
            {
                id: 101,
                title: 'TELEVISIONS',
                img: '/img/category/tv/prod-3.png',
                viewalllink: '/product?category=Televisions',
                innerData: cateTVArr
            },
            {
                id: 102,
                title: 'WASHING MACHINE',
                img: '/img/category/wash/wash1.png',
                viewalllink: '/product?category=Washing+Machines',
                innerData: cateWashArr
            },
            {
                id: 103,
                title: 'COOLERS',
                img: '/img/category/cooler/cool-1.png',
                viewalllink: '/product?category=Cooler',
                innerData: cateCoolArr
            },
            {
                id: 104,
                title: 'AIR CONDITIONER',
                img: '/img/category/ac/ac-1.png',
                viewalllink: '/product?category=Air+Conditioners',
                innerData: cateAcArr
            }
        ]
    },
    {
        id: 2,
        title: 'Support',
        link: '/',
    },
    {
        id: 3,
        title: 'Blog',
        link: '/',
    },
    {
        id: 4,
        title: 'Contact',
        link: '/',
    },
]



export default function Header() {
    const [menuOpen, setmenuOpen] = useState<boolean>(true);
    const [megamenuOpen, setmegamenuOpen] = useState<boolean>(false);

    const openDialogHandle = () => {
        setmenuOpen(!menuOpen);
        if (menuOpen) {
            window.document.body.classList.remove('overflow-hidden');
        }
        else {
            window.document.body.classList.add('overflow-hidden');
        }
    }

    return (
        <>
            <header className='w-full md:h-[65px] h-[50px] bg-black text-white lg:px-[50px] px-[10px] sticky top-0 left-0 z-10'>

                <div className="max-w-screen-2xl mx-auto h-full flex justify-between">

                    <div className="w-[200px] flex items-center">
                        <Link href={'/'}>
                            <img src="/img/logo.png" alt="Logo" className='w-36' /></Link>
                    </div>

                    <ul
                        onPointerLeave={() => setmegamenuOpen(false)}
                        className='md:flex hidden items-center gap-6'>
                        {
                            menulist.map((item, index) => {
                                return (
                                    <li key={item.id} className='font-medium text-lg' >
                                        <Link onPointerEnter={() => {
                                            console.log('enter')
                                            if (item.megamenu) {
                                                setmegamenuOpen(true);
                                            }
                                        }} href={item.link}>{item.title}</Link>
                                        {item.megamenu && megamenuOpen && <Megamenu />}
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <ul className='flex items-center md:gap-6 gap-4'>
                        <Search />
                        <CartCompo />
                        <LoginSign />
                        <li className='md:hidden block res-menu' onClick={() => openDialogHandle()}><MenuIcon color='#fff' /></li>
                    </ul>

                    <div className={`responsive-menu  ${menuOpen ? 'open' : 'close'} `}>
                        <ul className='flex gap-0.5 text-sm items-center'>
                            {
                                menuOpen ?

                                    <>
                                        <li className='flex items-center justify-between'>
                                            <div className="w-[200px]">
                                                <img src="/img/logo.png" alt="Logo" className='w-36' />
                                            </div>
                                            <div onClick={() => openDialogHandle()}>
                                                <AiOutlineClose />
                                            </div>
                                        </li>

                                        {
                                            menulist.map((item, index) => (
                                                <li key={item.id} className='font-medium text-lg' >
                                                    <Link href={item.link}>{item.title}</Link>

                                                    {
                                                        item && item.megamenu &&
                                                        <div className='flex flex-col gap-2 w-full p-2 ps-4'>
                                                            {
                                                                item.megamenud.map((itemb, idx) => (
                                                                    <span key={item.id} className='font-medium text-xs text-[#fff] flex flex-col gap-1.5' >
                                                                        <Link href={itemb.viewalllink}>{itemb.title}</Link>

                                                                        {
                                                                            itemb.innerData.map((itemc, idxb) => (
                                                                                <span key={idxb} className='font-medium text-xs text-[#AFAFAF] ps-2.5' >
                                                                                    <Link href={itemc.link}>{itemc.title}</Link>
                                                                                </span>
                                                                            ))
                                                                        }
                                                                    </span>
                                                                ))
                                                            }
                                                        </div>

                                                    }
                                                </li>
                                            ))
                                        }
                                    </>

                                    : null
                            }
                        </ul>





                    </div>


                </div>

            </header>
        </>
    )
}
