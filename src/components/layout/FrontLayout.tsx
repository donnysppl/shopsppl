import React from 'react'
import Header from '../front/Header'
import Footer from '../front/Footer'
import { ShoppingCardProvider } from '@/hooks/ShoppingCartContext';
import { Toaster } from 'react-hot-toast';
import { IoIosCall } from "react-icons/io";

export default function FrontLayout({ children, innercol
}: {
    children: React.ReactNode, innercol: string
}) {
    return (
        <>
        <Toaster position="bottom-center" reverseOrder={false} />
            <ShoppingCardProvider>
                <Header />
                <main className={innercol}>
                    {children}
                </main>
                <Footer />
            </ShoppingCardProvider>
            <a href="tel:+917303192721" className='fixed right-6 md:top-[78%] top-[75%] z-10 w-14 h-14 flex items-center justify-center bg-[#013088] rounded-full p-2.5 cursor-pointer'>
                <IoIosCall  className='w-full h-full text-white' />
            </a>
        </>
    )
}
