import type { ReactNode } from 'react'
import { Navbar } from '@/components/navbarr'

export default function PrivateLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
