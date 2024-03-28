import Faqcomp from '@/components/front/policypage/faqcomp'
import FrontLayout from '@/components/layout/FrontLayout'
import Link from 'next/link'
import React from 'react'
import { BiChevronRight, BiHomeAlt } from 'react-icons/bi'

export default function FAQ() {
  return (
    <FrontLayout innercol='bg-gray-200'>
      <div className='h-40 bg-black'>
        <div className="max-w-2xl mx-auto text-center flex justify-center items-end h-full pb-5">
          <h1 className='font-bold text-4xl text-white uppercase'>FAQ</h1>
        </div>
      </div>
      {/* <PolicyPage data={fetchTermPolicy.result[0].pagedata} classname={params.slug} title={fetchTermPolicy.result[0].pagename} /> */}
      <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8'>
            <div className="mx-auto max-w-screen-md content-part">
                <nav className="flex pt-4 text-[0.8rem]" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-prim ">
                                <BiHomeAlt className="w-4 h-4 mr-2.5" />
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <BiChevronRight className="w-5 h-5 text-gray-400" />
                                <Link href="/faq" className="ml-1 text-sm font-medium text-gray-700 hover:text-prim md:ml-2 ">FAQ</Link>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className={`faq py-5 lg:py-8`} >
                    <Faqcomp />
                </div>
            </div>
        </div>
    </FrontLayout>
  )
}
