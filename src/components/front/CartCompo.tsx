'use client';
import { Product } from '@/helpers/interFace';
import { useShoppingCart } from '@/hooks/ShoppingCartContext';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";

export default function CartCompo() {
    const { cartQuantity, cartItem } = useShoppingCart();
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

            <div className={`menu-drower ${cartOpen ? 'open' : 'close'}`}>
                <div className="flex justify-between p-3 flex-col h-screen">
                    <div className='cart-header flex justify-between items-start'>
                        <h4 className='text-2xl font-medium'>Cart</h4>
                        <button onClick={(e) => setcartOpen(false)} ><AiOutlineClose className='w-6 h-6' /></button>
                    </div>
                    <div className="cart-data">
                        <ul>
                            {
                                loader ? 'Loading...' :
                                    !cartProd.length ?
                                        <>
                                            Cart is Empty
                                        </> :
                                        cartProd && cartProd.map((item: Product, index: number) => (
                                            <li key={index} className="">
                                                <div className='cart-product flex gap-2.5 border border-gray-400 mb-2.5 rounded-xl overflow-hidden'>
                                                    <Image src={item.mainproductimg} width={100} height={100} alt={item.name} />
                                                    <div className="prod-data p-1.5">
                                                        <div className="name text-[0.7rem] line-clamp-2">{item.name}</div>
                                                        <div className="inline-flex gap-2 items-center text-[0.7rem]">1 <AiOutlineClose /> ₹ {item.productSalePrice}</div>
                                                        <div className="remove-btn flex justify-end"><button onClick={() => removeFromQuantity(item._id)} className="btn-prim scale-75">Remove</button></div>
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
                                <button className='btn-prim w-full'>Checkout</button>
                            </div> : null
                    }

                </div>
            </div>
        </>
    )
}
