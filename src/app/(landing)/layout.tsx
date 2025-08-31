import type { ReactNode } from 'react'
import { Navbar } from './navbarr'

export default function LandingLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <div>
        {children}
      </div>
    </div>
  )
}
