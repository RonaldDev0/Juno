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
  { label: 'Home', href: '/' },
  { label: 'About', href: '/' },
  { label: 'Services', href: '/' },
  { label: 'Contact', href: '/' }
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className='w-full border-b bg-background'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href='/' className='text-3xl font-bold'>
          Juno
        </Link>

        <div className='hidden md:flex gap-6'>
          {links.map(({ label, href }) => (
            <Link
              key={label + '0'}
              href={href}
              className='text-sm font-medium hover:text-primary'
            >
              {label}
            </Link>
          ))}
        </div>
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
              <nav className='flex flex-col items-center h-full gap-4 mt-14'>
                {links.map(({ label, href }) => (
                  <Link key={label} href={href} onClick={() => setOpen(false)}>
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
