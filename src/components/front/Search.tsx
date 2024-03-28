"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

interface SeatchRes {
    name: string;
    slug: string;
    _id: string;
}

export default function Search() {

    const [openDialog, setopenDialog] = useState<boolean>(false);
    const [searchInp, setsearchInp] = useState<SeatchRes[]>([]);

    const openDialogHandle = () => {
        setopenDialog(!openDialog);
        if (openDialog) {
            window.document.body.classList.remove('overflow-hidden');
        }
        else {
            window.document.body.classList.add('overflow-hidden');
        }
    }

    const onSearchHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inpval = e.target.value;
        setsearchInp([]);
        if (inpval !== '') {
            await fetch(`/api/product/products/search?q=${inpval}`, {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setsearchInp(res.result);
                    }
                    else if (res.status === 500) {

                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        
            <li className="relative z-10" aria-labelledby="slide-over-title" >

                {
                    openDialog ? <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> : null
                }
                <div onClick={() => openDialogHandle()} className=' cursor-pointer'>

                    <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M17 17L21 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                {
                    openDialog ?
                        <div className="search-dialog fixed md:w-[30rem] w-full md:h-auto h-full p-2.5 rounded-md bg-white md:top-[70px] top-0 z-10 left-1/2 -translate-x-1/2 shadow-md">
                            <div className="search-bar-div ">

                                <form className='flex items-center gap-2'>
                                    <div onClick={() => openDialogHandle()} className="search-close text-gray-900 w-6 h-6 cursor-pointer">
                                        <AiOutlineClose className='w-6 h-6' />
                                    </div>
                                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative flex-grow">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            {/* <BsSearch className='w-5 h-5 text-gray-800' /> */}

                                            <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 17L21 21" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>

                                        </div>
                                        <input type="search" id="default-search" className="input search " placeholder="Search" required onChange={(e) => onSearchHandle(e)} />
                                    </div>
                                </form>
                                <div className="search-result">
                                    {
                                        (searchInp.length > 0) ?
                                            <ul className='w-full md:h-80 h-full overflow-y-scroll p-2.5'>
                                                {searchInp && searchInp.map((item, index) => (
                                                    <li key={index} className='text-gray-900 p-1.5 border-b border-gray-300'><Link href={`/product/${item.slug}`}>{item.name}</Link></li>
                                                ))}
                                            </ul> : null
                                    }

                                </div>
                            </div>
                        </div> : null
                }
            </li>

        
    )
}
