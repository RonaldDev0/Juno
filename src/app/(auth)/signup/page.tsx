'use client'

import { signup } from './actions'
import {
  Card,
  CardContent,
  CardDescription,
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

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, { success: false, error: null })

  useEffect(() => {
    if (state.success) {
      toast.success('Account created successfully 🎉', {
        description: 'check your email'
      })
    }
    if (state.error) toast.error(state.error)
  }, [state])

  return (
    <main className='w-full h-screen flex flex-col justify-center items-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='text-center'>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details to create an account
          </CardDescription>
        </CardHeader>
        <form action={formAction} className='space-y-6'>
          <CardContent className='space-y-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Username</Label>
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='u123'
                required
                defaultValue={state.values?.username}
              />
            </div>
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
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                required
                defaultValue={state.values?.password}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Confirm password</Label>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
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
              {isPending ? 'Creating...' : 'Sign up'}
            </Button>
            <Link href='/login' className='w-full text-center text-sm opacity-70 underline-offset-4 hover:underline'>
              Do you already have an account?
            </Link>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
