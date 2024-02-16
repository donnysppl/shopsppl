'use client';
import { useShoppingCart } from '@/hooks/ShoppingCartContext';

export default function QuantyPart({id} : {id:string}) {

    const {decreaseCartQuantity,increaseCartQuantity,getItemQuantity} = useShoppingCart();

    const quantity = getItemQuantity(id);
    return (
        <ul className='inline-flex me-2'>
            <li onClick={() => decreaseCartQuantity(id)} className='p-1.5 border border-collapse cursor-pointer border-gray-600 rounded-s-md text-sm'>-</li>
            <li className='p-1.5 border border-collapse border-gray-600 text-sm'>{quantity}</li>
            <li onClick={() => increaseCartQuantity(id)} className='p-1.5 border border-collapse cursor-pointer border-gray-600 rounded-e-md text-sm'>+</li>

        </ul>
    )
}
