import type { ReactNode } from 'react'
import { Navbar } from './navbarr'

export default function LandingLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
