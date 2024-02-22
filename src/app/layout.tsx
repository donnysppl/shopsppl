import './globals.css';
import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';

const libre = Libre_Baskerville({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: {
    default: 'SHOPSPPL',
    template: '%s | SHOPSPPL',
  },
  description: 'SHOPSPPL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // console.log(process.env.NODE_ENV)
  return (
    <html lang="en">
      <body className={libre.className}>
        {children}
      </body>

      {
        (process.env.NODE_ENV === 'production') ?
          <>
            <GoogleAnalytics gaId='G-RFYKYCY9PW' />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Script src="https://embed.tawk.to/6586dfe707843602b8050e1d/1hibdl8av" async />

            <Script async src='https://www.googletagmanager.com/gtag/js?id=G-EHE0S3ZKJR' />
            <Script id="google-tag">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-EHE0S3ZKJR');
      `}</Script>

            <Script id="facebook-tag">{`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '133881636406470');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=133881636406470&ev=PageView&noscript=1"
/></noscript>  `}</Script>
          </> : null
      }

    </html>
  )
}
