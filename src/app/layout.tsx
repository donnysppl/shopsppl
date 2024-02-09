import './globals.css';
import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import FacebookPixel from '@/components/FacebookPixel';

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

  return (
    <html lang="en">
      <body className={libre.className}>
        {children}
      </body>
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
      <FacebookPixel />
    </html>
  )
}
