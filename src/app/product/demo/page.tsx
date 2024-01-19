import { render } from '@react-email/render';
import {OrderCompleteEmail} from "@/helpers/Email/email";

export default function page() {

  const emailHtml = render(<OrderCompleteEmail url={`${process.env.NEXT_PUBLIC_BASE_URL}/img/logo.png`} otp="4565" />);

  return <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
}
// import React from 'react'

// export default function Demo() {
//   return (
//     <div>Demo</div>
//   )
// }
