"use client";

import Link from "next/link";
import { useEffect,useState } from "react";
import { Product } from "@/helpers/interFace";

export default function Cart() {

    const [cartDataState, setcartDataState] = useState<Product[]>([]);

    useEffect(() => {

        const localCartData = localStorage.getItem("cart");
        const cartData = async () => {
            await fetch('/api/product/cart',{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(localCartData),
            }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setcartDataState(res.result)
                }
                else if (res.status === 400) {
                    
                }
                else if (res.status === 500) {
                 
                }
                // setloader(false);
            })
            .catch(err => {
                console.log(err);
            })
        }
        cartData();

    }, [])
    
  return (
    <div>Cart
        <ul>
        {
          cartDataState && cartDataState.map((item, index) => (
            <li className="p-2 border mb-3" key={index}>
              <Link href={`/product/${item._id}`}>
                <div>{item.name}</div>
                
              </Link>
              <div className="btn-part">
                  
                </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
