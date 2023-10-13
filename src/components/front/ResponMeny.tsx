"use client";
import React, { useState } from 'react'
import { TbMenu } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";

export default function ResponMeny() {
    const [menuOpen, setmenuOpen] = useState<boolean>(false);

    return (
        <>
            <div onClick={() => setmenuOpen(!menuOpen)}><TbMenu className='w-6 h-6' /></div>
            <div className={`menu-drower ${menuOpen ? 'open' : 'close'}`}>

                <div className="flex justify-between p-3">
                    <h4 className='text-2xl font-medium'>Menu</h4>
                    <button onClick={(e) => setmenuOpen(false)} ><AiOutlineClose /></button>
                </div>
            </div>
        </>
    )
}
