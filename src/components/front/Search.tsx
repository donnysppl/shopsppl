"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";


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
        <>
            <li onClick={() => openDialogHandle()} className=' cursor-pointer'><BsSearch className='w-5 h-5' /></li>
            {
                openDialog ?
                    <div className="search-dialog fixed w-[30rem] p-1.5 rounded-md bg-white top-[70px] z-10 left-1/2 -translate-x-1/2 shadow-md">
                        <div className="search-bar-div ">
                            <form>
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <BsSearch className='w-5 h-5 text-gray-800' />
                                    </div>
                                    <input type="search" id="default-search" className="input search " placeholder="Search" required onChange={(e) => onSearchHandle(e)} />
                                </div>
                            </form>
                            <div className="search-result">
                                {
                                    (searchInp.length > 0) ? 
                                    <ul className='w-full h-80 overflow-y-scroll p-2.5'>
                                    {searchInp && searchInp.map((item,index)=>(
                                        <li key={index} className='text-gray-900 p-1.5 border-b border-gray-300'><Link href={`/product/${item.slug}`}>{item.name}</Link></li>
                                    ))}
                                </ul> : null
                                }
                                
                            </div>
                        </div>
                    </div> : null
            }

        </>
    )
}
