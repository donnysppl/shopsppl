// import { notFound } from 'next/navigation';
// import FrontLayout from '@/components/layout/FrontLayout';
// import { BiHomeAlt,BiChevronRight } from "react-icons/bi";
// import type { Metadata } from 'next'

// async function pagesShipment() {
//     const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pages/front/shipping-policy`, {
//         method: 'GET',
//     })
//     if (fetchApi.status !== 200) return notFound();
//     const data = fetchApi.json();
//     return data;
// }

// export const metadata: Metadata = {
//   title: 'Shipping Policy',
//     description: 'Shipping Policy',
//     alternates:{
//       canonical:'/shipping-policy'
//     }
// }

// export default async function ShippingPolicy() {

//     const pagesData = await pagesShipment();
//     const dataResult = pagesData.result;

//     return (
//         <FrontLayout innercol='bg-gray-200'>
//             <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8'>
//                 <div className="mx-auto max-w-screen-md content-part">
//                 <nav className="flex pt-4 text-[0.8rem]" aria-label="Breadcrumb">
//         <ol className="inline-flex items-center space-x-1 md:space-x-3">
//           <li className="inline-flex items-center">
//             <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-prim ">
//               <BiHomeAlt className="w-4 h-4 mr-2.5" />
//               Home
//             </a>
//           </li>
//           <li>
//             <div className="flex items-center">
//               <BiChevronRight className="w-5 h-5 text-gray-400" />
//               <a  className="ml-1 text-sm font-medium text-gray-700 hover:text-prim md:ml-2 ">Shipping Policy</a>
//             </div>
//           </li>
//         </ol>
//       </nav>
//                     <div className='py-5 lg:py-8' dangerouslySetInnerHTML={{ __html: dataResult[0].pagedata }} />
//                 </div>
//             </div>
//         </FrontLayout>
//     )
// }
import React from 'react'

export default function ShippingPolicy() {
  return (
    <div>ShippingPolicy</div>
  )
}
