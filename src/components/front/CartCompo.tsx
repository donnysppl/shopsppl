'use client';
import { Product } from '@/helpers/interFace';
import { useShoppingCart } from '@/hooks/ShoppingCartContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";

export default function CartCompo() {
    const { cartQuantity, cartItem, getItemQuantity } = useShoppingCart();
    const [cartOpen, setcartOpen] = useState<boolean>(false);
    const onCartDrow = () => {
        setcartOpen(!cartOpen)
    }
    const [loader, setloader] = useState(true);
    const [cartProd, setcartProd] = useState<Product[]>([]);
    const { removeFromQuantity } = useShoppingCart();

    const prodID = cartItem.map(item => item.id).join(',');
    useEffect(() => {
        const cartItemData = async () => {
            setloader(true);
            await fetch(`/api/product/checkout?product=${prodID}`, {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        setcartProd(res.result)
                        setloader(false);
                    }
                    if (res.status === 400) {
                        setloader(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        if (cartOpen) {
            cartItemData();
        }
    }, [cartOpen, cartItem])



    return (
        <>
            <li onClick={onCartDrow} className='cart-icon-div cursor-pointer'><BsCart3 />
                {(cartQuantity !== 0) ? <span className='cart-icon-div-quantity'>{cartQuantity}</span> : null}</li>

            <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

                {
                    cartOpen ? <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> : null
                }

                <div className={`menu-drower ${cartOpen ? 'open' : 'close'}`}>
                    <div className="flex justify-between p-3 flex-col h-screen">
                        <div className='cart-header flex justify-between items-start'>
                            <h4 className='text-2xl font-medium'>Cart</h4>
                            <button onClick={(e) => setcartOpen(false)} ><AiOutlineClose className='w-6 h-6' /></button>
                        </div>
                        <div className="cart-data">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {
                                    loader ? 'Loading...' :
                                        !cartProd.length ?
                                            <>
                                                Cart is Empty
                                            </> :
                                            cartProd && cartProd.map((item: Product, index: number) => (
                                                <li key={index} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-200">
                                                        <Image src={`https://cloud.shopsppl.com/wp-content/uploads/sppl/${item.mainproductimg}`} width={100} height={100} alt={item.name} className="h-full w-full object-contain object-center" />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-sm font-medium text-gray-300">
                                                                <h3 className='text-sm'>
                                                                    <a href="#">{item.name}</a>
                                                                </h3>
                                                                <p className="ml-4"> {`₹${item.productSalePrice}`}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500">Qty {getItemQuantity(item._id)}</p>

                                                            <div className="flex">
                                                                <button type="button" onClick={() => removeFromQuantity(item._id)} className="remove-btn">Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                            ))
                                }
                            </ul>

                        </div>
                        {
                            cartProd.length ?
                                <div className="cart-checkout-btn">
                                    <Link href={'/product/checkout'}>
                                        <button className='btn-prim w-full'>Checkout</button>
                                    </Link>
                                </div> : null
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
