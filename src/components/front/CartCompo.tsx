'use client';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";

export default function CartCompo() {
    const [cartOpen, setcartOpen] = useState<boolean>(false);
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
            <li onClick={onCartDrow}>Cart</li>

            <div className={`cart-drower ${cartOpen ? 'open' : 'close'}`}>

                <div className="flex justify-between p-3">
                    <h4 className='text-2xl font-medium'>Cart</h4>
                    <button onClick={(e) => setcartOpen(false)} ><AiOutlineClose/></button>
                </div>
            </div>



        </>
    )
}
