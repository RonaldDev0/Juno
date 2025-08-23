import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Juno',
  description: 'App de agendamiento de citas para tu negocio',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' className='dark'>
      <body className={`${poppins.className} antialiased`}>
        {children}
        <Toaster position='top-center' richColors />
      </body>
    </html>
  )
}
