'use client'

import { forgotPassword } from './actions'
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
import Link from 'next/link'
import { toast } from 'sonner'
import { useActionState, useEffect } from 'react'

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPassword, { success: false, error: null })

  useEffect(() => {
    if (state.success) {
      toast.success('Reset email sent! 📧', {
        description: 'Check your email and click the reset link to continue'
      })
    }
    if (state.error) toast.error(state.error)
  }, [state])

  return (
    <main className='w-full h-screen flex flex-col justify-center items-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='text-center'>
          <div className='mb-2'>
            <h1 className='text-2xl font-bold text-primary'>Juno</h1>
          </div>
          <CardTitle>Reset password</CardTitle>
        </CardHeader>
        <form action={formAction} className='space-y-6'>
          <CardContent className='space-y-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='m@example.com'
                required
                defaultValue={state.values?.email}
              />
            </div>
          </CardContent>

          <CardFooter className='flex flex-col gap-3'>
            <Button
              type='submit'
              className='w-full'
              disabled={isPending}
            >
              {isPending ? 'Sending...' : 'Send reset link'}
            </Button>
            <div className='w-full text-center text-sm opacity-70'>
              Remember your password?{' '}
              <Link href='/login' className='underline-offset-4 hover:underline'>
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
