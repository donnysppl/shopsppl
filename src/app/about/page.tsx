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
       <div className='h-40 bg-prim'>
        <div className="max-w-2xl mx-auto text-center flex justify-center items-end h-full pb-5">
          <h1 className='font-bold text-4xl text-white uppercase'>About Us</h1>
        </div>
      </div>

      <div className='container mx-auto xl:px-5  max-w-screen-lg py-2.5 px-2.5 lg:py-8'>
        <div className="mx-auto max-w-screen-md content-part">
          <div className="py-5 lg:py-8" >

            <p className='mb-3 text-xl' >
            Super Plastronics Pvt. Ltd (SPPL) is a manufacturing company established in 1990 with its head office in Noida. SPPL is a proud brand licensee of 5 major global brands, viz: Thomson, Kodak, Blaupunkt, Westinghouse and White-Westinghouse (Trademark of Electrolux).
            </p>
            <p className='mb-3 text-xl' >
            Super Plastronics Private Limited (SPPL) is one of India’s leading original equipment manufacturing companies. SPPL started off as a plastic injection molding manufacturing unit and then moved to making Cathode Ray Tube (CRT) televisions. Today the company is leading India’s Light Emitting Diode TVs business (LEDs).
            </p>

            <p className='mb-3 text-xl' >
            Given its current capacity Super Plastronics has propelled the online E-Commerce space for white goods such as televisions, washing machines, air conditioners and coolers along with the licensing industry. Under the current leadership, Avneet Singh Marwah, SPPL has re-introduced globally renowned brands, by way of licensing, such as Kodak, Thomson, Blaupunkt, Westinghouse and White-Westinghouse to India. This has led SPPL to enjoy a huge share of the market with Kodak and Thomson, launched in 2016 and 2018 respectively, being amongst the top three selling TVs online and Blaupunkt, Westinghouse launched in 2020, amongst the top five. With White-Westinghouse, introduced in 2020, Super Plastronics also forayed into the washing machines space.
            </p>

            <p className='mb-3 text-xl' >
            Super Plastronics Private Limited is also one of India’s premium Make-in-India brands and has been since its inception by Amarjeet Singh Marwah in 1990. Along with a number of other firsts under its belt, the company also became the first to be given the official brand license for Google Android to make the software in India within the bounds of its expansive manufacturing facilities. In 2019, Avneet Singh Marwah was listed among the top leaders by Entrepreneur India Magazine in its Annual Top 40 under 40 list, amongst many other accolades received for the company’s portfolio.
            </p>

            <p className='mb-3 text-xl' >
            SPPL started as one of the largest manufacturers of CRT TV cabinets in the 90’s and early 00’s. Today we are one of India’s foremost OEMs in CRT and LED Television. Currently, our products are present in 300 plus chain stores, in 2300 cities and towns with 18000 plus pin codes delivery pan India with 25 Offices & 350 Service Centers. We work with top tech, e-commerce, and LFR companies like Amazon, Flipkart, Paytm, Walmart, Reliance, Spencer’s, Metro cash and carry.
            </p>

          </div>
        </div>
      </div>
    </FrontLayout>
  )
}
