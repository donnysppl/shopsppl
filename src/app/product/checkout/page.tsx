import Checkout from '@/components/front/product/Checkout/Checkout'
import React from 'react'

export async function generateMetadata() {
  return {
    title: 'Checkout',
    description: 'Checkout',
    alternates: {
      canonical: `/product/checkout`
    }
  }
}

export default function ProductCheckout() {
  return (
    <>
    <div className='relative'><Checkout /></div>
    </>
  )
}
