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
      <nav className='w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'>
        <div className='container mx-auto flex h-14 items-center justify-between px-4 max-w-6xl'>
          <Link href='/landing' className='text-3xl font-bold'>
            Juno
          </Link>

          <div className='hidden md:flex gap-8'>
            {links.map(({ label, href }) => (
              <Link
                key={label + '0'}
                href={href}
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group'
              >
                {label}
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
              </Link>
            ))}
          </div>
          
          <div className='md:hidden'>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='h-8 w-8'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-64'>
                <SheetTitle className='sr-only'>Navigation menu</SheetTitle>
                <SheetDescription className='sr-only'>
                  Main navigation options
                </SheetDescription>
                <nav className='flex flex-col items-start h-full gap-2 mt-14'>
                  {links.map(({ label, href }) => (
                    <Link 
                      key={label} 
                      href={href} 
                      onClick={() => setOpen(false)}
                      className='w-full text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-accent/50'
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
  )
}
