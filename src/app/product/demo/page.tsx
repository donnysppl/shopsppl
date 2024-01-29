// import { render } from '@react-email/render';
// import { OrderCompleteEmail } from "@/helpers/Email/email";
// import { notFound } from 'next/navigation';

// // async function fetchSingleProd() {
// //   const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/65aba3576366b0547248d8dd`, {
// //     method: 'GET',
// //     cache: 'no-cache',
// //   })
// //   if (fetchApi.status !== 200) return notFound();
// //   const data = fetchApi.json();
// //   return data;
// // }


// export default async function Demo() {
  

//   const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice`, {
//     method: 'GET',
//     cache: 'no-cache',
//   })
//   const data = await fetchApi.json();
//   console.log(data.result)

//   const emailHtml = render(<OrderCompleteEmail orderData={data.result} />);

//   return <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
//   // return <h1>hello</h1>
// }
// // import React from 'react'

// // export default function Demo() {
// //   return (
// //     <div>Demo</div>
// //   )
// // }
import React from 'react'

export default function Demo() {
  return (
    <div>Demo</div>
  )
}
