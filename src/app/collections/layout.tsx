import FrontLayout from '@/components/layout/FrontLayout'
import React from 'react'
import type { Metadata } from 'next';


export const metadata: Metadata = {
    title: {
        default: 'SHOPSPPL',
        template: '%s | Collection | Product | SHOPSPPL',
    },
}

export default function CollectionLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <FrontLayout innercol={'bg-white'}>
            <div className="w-full px-2.5 py-4">
                {children}
            </div>
        </FrontLayout>
    )
}
