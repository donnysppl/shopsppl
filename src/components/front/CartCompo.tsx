'use client';
import { Product } from '@/helpers/interFace';
import { useShoppingCart } from '@/hooks/ShoppingCartContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import QuantyPart from './product/QuantyPart';

const CartSVG = ({ color }: { color: string }) => (
    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={color}><path d="M19.5 22C20.3284 22 21 21.3284 21 20.5C21 19.6716 20.3284 19 19.5 19C18.6716 19 18 19.6716 18 20.5C18 21.3284 18.6716 22 19.5 22Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.5 22C10.3284 22 11 21.3284 11 20.5C11 19.6716 10.3284 19 9.5 19C8.67157 19 8 19.6716 8 20.5C8 21.3284 8.67157 22 9.5 22Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5 4H22L20 15H7L5 4ZM5 4C4.83333 3.33333 4 2 2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M20 15H7H5.23077C3.44646 15 2.5 15.7812 2.5 17C2.5 18.2188 3.44646 19 5.23077 19H19.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
)

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
                    // console.log(res)
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
        
            <li onClick={onCartDrow} className='cart-icon-div cursor-pointer'><CartSVG color='#ffffff' />
                {(cartQuantity !== 0) ? <span className='cart-icon-div-quantity'>{cartQuantity}</span> : null}

                <div className="relative z-10" >

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
                                                                    <h3 className='text-xs'>
                                                                        <a href="#">{item.name}</a>
                                                                    </h3>
                                                                    <p className="ml-4"> {`₹${item.productSalePrice}`}</p>
                                                                </div>
                                                            </div>
                                                            <div className='flex justify-between mt-1'>
                                                                <QuantyPart id={item?._id} />
                                                                <div className="remove-btn "><button onClick={() => removeFromQuantity(item._id)} className="btn-prim scale-75">Remove</button></div>
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
                                        <Link href={'/product/checkout'} onClick={onCartDrow}>
                                            <button className='btn-prim w-full'>Checkout</button>
                                        </Link>
                                    </div> : null
                            }

                        </div>
                    </div>
                </div>
            </li>
        
    )
}
