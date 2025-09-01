'use client'

import { logout } from './actions'
import Link from 'next/link'
import { useState, useEffect, useActionState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export function Navbar() {
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [logoutState, logoutAction, isPending] = useActionState(logout, { success: false })

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user ?? null)
    }
    getUser()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.subscription.unsubscribe()
  }, [supabase])

  useEffect(() => {
    if (logoutState.error) {
      toast.error(logoutState.error)
    }
  }, [logoutState])

  return (
    <nav className='w-full border-b bg-background'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href='/home' className='text-3xl font-bold'>
          Juno
        </Link>

        {/* Desktop */}
        <div className='hidden md:flex'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className='cursor-pointer'>
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {user?.email?.[0]?.toUpperCase() ?? 'U'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>{user?.user_metadata?.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href='/profile'>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/settings'>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <form action={logoutAction}>
                <DropdownMenuItem asChild>
                  <Button
                    type='submit'
                    variant='ghost'
                    className='w-full justify-start text-destructive cursor-pointer h-auto p-2'
                    disabled={isPending}
                  >
                    {isPending ? 'Logging out...' : 'Log out'}
                  </Button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
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
                <Avatar className='h-16 w-16'>
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user?.email?.[0]?.toUpperCase() ?? 'U'}
                  </AvatarFallback>
                </Avatar>
                <nav className='flex flex-col gap-4 w-full px-4'>
                  <Button variant='ghost' asChild>
                    <Link href='/profile' onClick={() => setOpen(false)}>Profile</Link>
                  </Button>
                  <Button variant='ghost' asChild>
                    <Link href='/settings' onClick={() => setOpen(false)}>Settings</Link>
                  </Button>
                  <form action={logoutAction} className='w-full'>
                    <Button 
                      type='submit'
                      variant='destructive' 
                      className='w-full'
                      disabled={isPending}
                      onClick={() => setOpen(false)}
                    >
                      {isPending ? 'Logging out...' : 'Log out'}
                    </Button>
                  </form>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}