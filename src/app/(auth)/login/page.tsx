import { login } from './actions'
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

export default function LoginPage() {
  return (
    <main className='w-full h-screen flex flex-col justify-center items-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='text-center'>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <form className='space-y-6'>
          <CardContent className='space-y-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                {/* <Link
                  href='/forgot-password'
                  className='ml-auto inline-block text-sm underline-offset-4 hover:underline opacity-70'
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id='password'
                name='password'
                type='password'
                required
              />
            </div>
          </CardContent>

          <CardFooter className='flex flex-col gap-3'>
            <Button formAction={login} className='w-full'>
              Log in
            </Button>
            <Link href='/signup' className='w-full text-center text-sm opacity-70 underline-offset-4 hover:underline'>
              Don't have an account yet?
            </Link>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
