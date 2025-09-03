'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function AuthCodeErrorPage() {
  return (
    <main className='w-full h-screen flex flex-col justify-center items-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='text-center'>
          <CardTitle className='text-red-600'>Authentication Code Error</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-center text-muted-foreground'>
            There was an error processing the authentication code. This usually happens when the code has expired or is invalid.
          </p>
          <div className='flex flex-col gap-2'>
            <Button asChild className='w-full'>
              <Link href='/login'>Try Again</Link>
            </Button>
            <Button variant='outline' asChild className='w-full'>
              <Link href='/'>Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
