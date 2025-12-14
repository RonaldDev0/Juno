'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'

type ILink = {
  label: string,
  href: string
}

const centerLinks: ILink[] = [
  { label: 'Features', href: '/' },
  { label: 'Docs', href: '/' },
  { label: 'Pricing', href: '/pricing' }
]

const rightLinks: ILink[] = [
  { label: 'Sign in', href: '/login' }
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const isLoggedIn = !!user

  return (
    <>
      <nav className='fixed top-0 left-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4 lg:px-6 relative max-w-7xl'>
          {/* Logo - Left */}
          <Link href='/' className='text-3xl font-bold group hover:scale-105 transition-transform duration-200'>
            Juno
          </Link>

          {/* Center Links - Absolutely centered */}
          <div className='hidden md:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2'>
            {centerLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className='px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200'
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Links */}
          <div className='hidden md:flex items-center gap-3'>
            {loading ? (
              <div className='w-8 h-8 bg-muted animate-pulse rounded-full' />
            ) : isLoggedIn ? (
              <>
                <Button asChild className='bg-primary hover:bg-primary/90 text-primary-foreground'>
                  <Link href='/home'>
                    Dashboard
                  </Link>
                </Button>
                <Avatar className='h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all duration-200 rounded-lg'>
                  <AvatarImage 
                    src={user?.user_metadata?.avatar_url} 
                    alt={user?.user_metadata?.username || 'User'} 
                  />
                  <AvatarFallback className='bg-primary text-primary-foreground text-sm font-medium rounded-lg'>
                    {user?.user_metadata?.username?.charAt(0)?.toUpperCase() || 
                     user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 
                     user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                {rightLinks.map(({ label, href }) => (
                  <Button asChild key={label} variant='ghost' className='text-sm font-medium'>
                    <Link href={href}>
                      {label}
                    </Link>
                  </Button>
                ))}
                <Button asChild className='bg-primary hover:bg-primary/90 text-primary-foreground'>
                  <Link href='/pricing'>
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className='md:hidden'>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='relative'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-80 border-l border-border/40'>
                <SheetTitle className='sr-only'>Navigation menu</SheetTitle>
                <SheetDescription className='sr-only'>
                  Main navigation options
                </SheetDescription>

                <div className='flex flex-col h-full'>
                  {/* Mobile Logo */}
                  <div className='p-6 border-b border-border/40'>
                    <Link href='/' className='text-2xl font-bold' onClick={() => setOpen(false)}>
                      Juno
                    </Link>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className='flex flex-col gap-2 pt-6 flex-1'>
                    {centerLinks.map(({ label, href }) => (
                      <Button
                        key={label}
                        variant='ghost'
                        asChild
                        onClick={() => setOpen(false)}
                        className='justify-start h-12 text-base font-medium'
                      >
                        <Link href={href}>
                          {label}
                        </Link>
                      </Button>
                    ))}
                    
                    <div className='pt-4 border-t border-border/40 mt-4'>
                      {isLoggedIn ? (
                        <>
                          <Button asChild className='w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 mb-3'>
                            <Link href='/home' onClick={() => setOpen(false)}>
                              Dashboard
                            </Link>
                          </Button>
                          <div className='flex items-center gap-3 p-3 bg-muted/50 rounded-lg'>
                            <Avatar className='h-10 w-10 rounded-lg'>
                              <AvatarImage 
                                src={user?.user_metadata?.avatar_url} 
                                alt={user?.user_metadata?.username || 'User'} 
                              />
                              <AvatarFallback className='bg-primary text-primary-foreground text-sm font-medium rounded-lg'>
                                {user?.user_metadata?.username?.charAt(0)?.toUpperCase() || 
                                 user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 
                                 user?.email?.charAt(0)?.toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div className='flex-1 text-left'>
                              <p className='text-sm font-medium'>
                                {user?.user_metadata?.username || user?.user_metadata?.full_name || 'User'}
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {rightLinks.map(({ label, href }) => (
                            <Button
                              key={label}
                              variant='ghost'
                              asChild
                              onClick={() => setOpen(false)}
                              className='justify-start h-12 text-base font-medium mb-3'
                            >
                              <Link href={href}>{label}</Link>
                            </Button>
                          ))}
                          <Button asChild className='w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12'>
                            <Link href='/pricing' onClick={() => setOpen(false)}>
                              Get Started
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <div className='h-16' />
    </>
  )
}
