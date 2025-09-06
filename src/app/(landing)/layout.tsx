import type { ReactNode } from 'react'
import { Navbar } from './navbarr'
import CTA from './components/cta'

export default function LandingLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <div>
        {children}
      </div>
      <CTA />
    </div>
  )
}
