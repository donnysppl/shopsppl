'use client';
import { useShoppingCart } from '@/hooks/ShoppingCartContext';

export default function QuantyPart({ id }: { id: string }) {

    const { decreaseCartQuantity, increaseCartQuantity, getItemQuantity } = useShoppingCart();

    const quantity = getItemQuantity(id);
    return (
        <ul className='flex gap-2.5 items-center'>
            <li onClick={() => decreaseCartQuantity(id)} className='w-6 h-6 rounded-full flex items-center justify-center border border-[#98A2B3] cursor-pointer'>-</li>
            <li className='text-base'>{quantity}</li>
            <li onClick={() => increaseCartQuantity(id)} className='w-6 h-6 rounded-full flex items-center justify-center border border-[#98A2B3] cursor-pointer'>+</li>

        </ul>
    )
}
