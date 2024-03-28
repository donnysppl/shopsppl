"use client";
import { useShoppingCart } from '@/hooks/ShoppingCartContext';

interface buyBtn {
  id: string,
}

export default function OnBuyFunct({ id }: buyBtn) {
  const { buyFromCart } = useShoppingCart();

  return (
    <button onClick={() => buyFromCart(id)} className="btn-prim">Buy Now</button>
  )
}
