'use client';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";

export default function CartCompo() {
    const [cartOpen, setcartOpen] = useState<boolean>(false);

    const [open, setOpen] = React.useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const onCartDrow = () => {
        setcartOpen(!cartOpen)
    }
    // const cardInp = window?.localStorage.getItem('cart');

    // useEffect(() => {
    // console.log(cardInp)
    //   const cardDataFetch = async () => {
    //     await fetch('/api/product/cart',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type': 'application/json'
    //         },
    //         body:cardInp,
    //     }).then(res => res.json())
    //     .then(res => {
    //       console.log(res.result)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //       })
    //   }
    //   if(cardInp){
    //     cardDataFetch();
    //   }
    // }, [cardInp])

    return (
        <>
            {/* <li onClick={onCartDrow}>Cart</li>

            <div className={`cart-drower ${cartOpen ? 'open' : 'close'}`}>

                <div className="flex justify-between p-3">
                    <h4 className='text-2xl font-medium'>Cart</h4>
                    <button onClick={(e) => setcartOpen(false)} ><AiOutlineClose/></button>
                </div>
            </div> */}

            <li onClick={openDrawer}>Cart</li>
            <Drawer open={open} onClose={closeDrawer} className="p-4">
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Material Tailwind
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <Typography color="gray" className="mb-8 pr-4 font-normal">
                    Material Tailwind features multiple React and HTML components, all
                    written with Tailwind CSS classes and Material Design guidelines.
                </Typography>
                <div className="flex gap-2">
                    <Button size="sm">Get Started</Button>
                    <Button size="sm" variant="outlined">
                        Documentation
                    </Button>
                </div>
            </Drawer>



        </>
    )
}
