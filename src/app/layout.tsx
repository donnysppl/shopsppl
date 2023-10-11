import './globals.css'
import type { Metadata } from 'next'
import { Libre_Baskerville } from 'next/font/google'

const libre = Libre_Baskerville({ 
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: {
    default:'SHOPSPPL',
    template: '%s | SHOPSPPL',
  },
  description: 'Generated by create next app',
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
    </html>
  )
}
