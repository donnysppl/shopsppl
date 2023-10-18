import React from 'react'
import Header from '../front/Header'
import Footer from '../front/Footer'
import { ShoppingCardProvider } from '@/hooks/ShoppingCartContext'

export default function FrontLayout({ children, innercol
}: {
    children: React.ReactNode, innercol: string
}) {
    return (
        <>
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
