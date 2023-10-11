import React from 'react'
import Header from '../front/Header'
import Footer from '../front/Footer'

export default function FrontLayout({ children,innercol
}: {
    children: React.ReactNode, innercol:string
}) {
    return (
        <>
            <Header />
            <main className={innercol}>
                {children}
            </main>
            <Footer />
        </>
    )
}
