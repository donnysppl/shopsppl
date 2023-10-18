'use client';
import { useShoppingCart } from '@/hooks/ShoppingCartContext';

export default function QuantyPart({id} : {id:string}) {

    const {decreaseCartQuantity,increaseCartQuantity,getItemQuantity} = useShoppingCart();

    const quantity = getItemQuantity(id);
    return (
        <ul className='inline-flex me-2'>
            <li onClick={() => decreaseCartQuantity(id)} className='p-1.5 border border-collapse cursor-pointer border-gray-600'>-</li>
            <li className='p-1.5 border border-collapse border-gray-600'>{quantity}</li>
            <li onClick={() => increaseCartQuantity(id)} className='p-1.5 border border-collapse cursor-pointer border-gray-600'>+</li>

        </ul>
    )
}
