import ContactForm from '@/components/front/form/ContactForm'
import FrontLayout from '@/components/layout/FrontLayout'
import React from 'react'

export async function generateMetadata() {
  return {
    title: 'Contact US',
    description: 'Contact US',
    alternates: {
      canonical: `/contact`
    }
  }
}

export default function Contact() {
  return (
    <FrontLayout innercol={'bg-gray-100'}>
      <div className='h-40 bg-prim'>
        <div className="max-w-2xl mx-auto text-center pt-10">
          <h1 className='font-bold text-white'>CONTACT US.</h1>

        </div>
      </div>
      <div className="max-w-2xl mx-auto pb-5 p-1.5">
        <div className="bg-white w-full rounded-xl p-5  shadow-md border border-gray-200 form-part-contact relative overflow-hidden">
          <h4 className='mb-4 text-center font-semibold'>GET IN TOUCH</h4>
          <ContactForm type={'contact'} />
        </div>
      </div>


    </FrontLayout>
  )
}
