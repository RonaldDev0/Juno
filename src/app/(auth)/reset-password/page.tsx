'use client'

import { resetPassword } from './actions'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useActionState, useEffect } from 'react'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [state, formAction, isPending] = useActionState(resetPassword, { success: false, error: null })

  useEffect(() => {
    if (state.error) toast.error(state.error)
  }, [state])

  return (
    <main className='w-full h-screen flex flex-col justify-center items-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='text-center'>
          <div className='mb-2'>
            <h1 className='text-2xl font-bold text-primary'>Juno</h1>
          </div>
          <CardTitle>New password</CardTitle>
        </CardHeader>
        <form action={formAction} className='space-y-6'>
          <CardContent className='space-y-6'>
            <div className='grid gap-2'>
              <Label htmlFor='password'>New Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='Enter new password'
                required
                defaultValue={state.values?.password}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirmPassword'>Confirm New Password</Label>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Confirm new password'
                required
                defaultValue={state.values?.confirmPassword}
              />
            </div>
          </CardContent>

          <CardFooter className='flex flex-col gap-3'>
            <Button
              type='submit'
              className='w-full'
              disabled={isPending}
            >
              {isPending ? 'Resetting...' : 'Reset password'}
            </Button>
            <div className='w-full text-center text-sm opacity-70'>
              <Link href='/login' className='underline-offset-4 hover:underline'>
                Back to login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
