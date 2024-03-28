"use client";
import { useShoppingCart } from "@/hooks/ShoppingCartContext";
// import jwtDecode from "jwt-decode"
// import toast from "react-hot-toast"

type decodeTokenType = {
  id: string,
}

export default function OnCartFunct({id}: decodeTokenType) {

  const {increaseCartQuantity} = useShoppingCart();

  return (
    <button onClick={() => increaseCartQuantity(id)} className="btn-sec">Add to cart</button>
  )
}
