'use client';
import { useRouter } from "next/navigation";
import React ,{ ReactNode, createContext, useContext, useEffect, useState } from "react";

type ShoppingCardProviderProps = {
    children: ReactNode
}
type cartItemtype = {
    id: string
    quantity: number
}
type ShopppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromQuantity: (id: string) => void
    buyFromCart: (id: string) => void
    cartQuantity: number
    cartItem: cartItemtype[]
    deliveryAvailab :boolean
}

const ShoppingCartContext = createContext({} as ShopppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCardProvider({ children }: ShoppingCardProviderProps) {

    const [isCartOpen, setisCartOpen] = useState<boolean>(false);
    const [cartItem, setcartItem] = useState<cartItemtype[]>([]);

    const [deliveryAvailab, setdeliveryAvailab] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        setCartToState();
        fetchdeliveryAvai();
    }, []);

    const setCartToState = () => {
        const storedCart = window.localStorage.getItem("shipment-cart");
        const parsedCart = storedCart ? JSON.parse(storedCart) : [];
        setcartItem(parsedCart);
    };

    const cartQuantity = cartItem.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setisCartOpen(true);
    const closeCart = () => setisCartOpen(false);
    function getItemQuantity(id: string) {
        return cartItem.find(item => item.id === id)?.quantity || 0
    }
    function increaseCartQuantity(id: string) {
        const prevCartData = cartItem;
        let newCartData = [] as cartItemtype[];

        if (prevCartData.find(item => item.id === id) == null) {
            newCartData =  [...prevCartData, { id, quantity: 1 }]
        } else {
            newCartData = prevCartData.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
            })
        }
        setcartItem(newCartData)
        window.localStorage.setItem("shipment-cart", JSON.stringify(newCartData));
        router.push('/product/checkout');
        setCartToState();
    }
    function decreaseCartQuantity(id: string) {
        const prevCartData = cartItem;
        let newCartData = [] as cartItemtype[];

        if (prevCartData.find(item => item.id === id)?.quantity === 1) {
            newCartData = prevCartData.filter(item => item.id !== id)
        } else {
            newCartData = prevCartData.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 }
                } else {
                    return item
                }
            })
        }
        setcartItem(newCartData)
        window.localStorage.setItem("shipment-cart", JSON.stringify(newCartData));
        setCartToState();
    }
    function removeFromQuantity(id: string) {
        console.log(id,cartItem)
        const prevCartData = cartItem;
        let newCartData = [] as cartItemtype[];

        newCartData = prevCartData.filter(item => item.id !== id)
        setcartItem(newCartData)
        window.localStorage.setItem("shipment-cart",JSON.stringify(newCartData))
        setCartToState();
    }
    function buyFromCart(id: string){
        const prevCartData = cartItem;
        let newCartData = [] as cartItemtype[];
        if (prevCartData.find(item => item.id === id) == null) {
            newCartData =  [...prevCartData, { id, quantity: 1 }]
        } else {
            newCartData = prevCartData.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
            })
        }
        setcartItem(newCartData)
        window.localStorage.setItem("shipment-cart", JSON.stringify(newCartData));
        router.push('/product/checkout');
        setCartToState();
    }

    // check delivery availablity session
    function fetchdeliveryAvai(){
        const delAvi = window.sessionStorage.getItem("deliveravle_pincode");
        if(!delAvi){
            return setdeliveryAvailab(false);
        }
        else{
            return setdeliveryAvailab(true);
        }
    }


    return (
        <ShoppingCartContext.Provider value={{
            cartItem, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromQuantity, openCart,
            cartQuantity, closeCart, buyFromCart ,deliveryAvailab
        }}>
            {children}
        </ShoppingCartContext.Provider>

    )
}