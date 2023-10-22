"use client";
import { useShoppingCart } from '@/hooks/ShoppingCartContext';
import React from 'react'

interface buyBtn {
    id:string,
}
export default function OnBuyFunct({id}:buyBtn) {
    const {buyFromCart} = useShoppingCart();
  return (
    <button onClick={() => buyFromCart(id)} className="btn-prim ms-2">Buy Now</button>
  )
}
