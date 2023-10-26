import FrontLayout from '@/components/layout/FrontLayout'
import React from 'react'

export async function generateMetadata() {
    return {
      title: 'About Us',
      description: 'About Us',
      alternates: {
        canonical: `/about`
      }
    }
  }

export default function About() {
  return (
    <FrontLayout innercol={'bg-gray-100'}>
        <h2>About Us</h2>
        <p>Super Plastronics Pvt. Ltd (SPPL) is a manufacturing company established in 1990 with its Head Office in Noida. SPPL is a proud brand licensee of 5 major global brands, viz: Thomson, Kodak, Blaupunkt, Westinghouse and White-Westinghouse (Trademark of Electrolux).</p>
    </FrontLayout>
  )
}
