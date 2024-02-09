
// import React from 'react'
// import { render } from '@react-email/render';
// import { EkartDetailsEmail } from "@/helpers/Email/email";
// import { notFound } from 'next/navigation';

// export default async function Demo() {


//   async function fetchSingleProd() {
//     const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/65c21d73500ab5707e72a508`, {
//       method: 'GET',
//       cache: 'no-cache',
//     })
//     if (fetchApi.status !== 200) return notFound();
//     const data = fetchApi.json();
//     return data;
//   }
//   let data = await fetchSingleProd();
//   console.log(data.result)
//   const emailHtml = render(<EkartDetailsEmail orderData={data && data.result} />);

//   return (
//     <>

//       <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
//     </>
//   )
// }

import React from 'react'

export default function Demo() {
  return (
    <div>Demo</div>
  )
}
