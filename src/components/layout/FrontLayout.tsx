import React from 'react'
import Header from '../front/Header'
import Footer from '../front/Footer'
import { ShoppingCardProvider } from '@/hooks/ShoppingCartContext';
import { Toaster } from 'react-hot-toast';

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
        </>
    )
}
