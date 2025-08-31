'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet'

type ILink = {
  label: string,
  href: string
}

const links: ILink[] = [
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Dashboard', href: '/' }
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className='w-full border-b bg-background'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href='/landing' className='text-3xl font-bold'>
          Juno
        </Link>

        {/* Desktop */}
        <div className='hidden md:flex items-center gap-8'>
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200'
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile */}
        <div className='md:hidden'>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Menu className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-64'>
              <SheetTitle className='sr-only'>Navigation menu</SheetTitle>
              <SheetDescription className='sr-only'>
                Main navigation options
              </SheetDescription>

              <div className='flex flex-col items-center mt-10 gap-6'>
                <nav className='flex flex-col gap-4 w-full px-4'>
                  {links.map(({ label, href }) => (
                    <Button 
                      key={label}
                      variant='ghost' 
                      asChild
                      onClick={() => setOpen(false)}
                    >
                      <Link href={href}>{label}</Link>
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}