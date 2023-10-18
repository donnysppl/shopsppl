"use client";
import React, { useState } from 'react'
import { HiOutlineMenuAlt4 } from "react-icons/hi";

export default function ResponMeny() {
    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <>
            <div onClick={openDrawer} ><HiOutlineMenuAlt4 className='w-6 h-6' /></div>

        </>
    )
}
