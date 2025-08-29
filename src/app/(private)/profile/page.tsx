import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail, Lock, Camera } from 'lucide-react'

export default function ProfilePage() {
  // Mock user data - in a real app, this would come from your auth context or API
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/api/avatar/john-doe' // Optional: replace with actual avatar URL
  }

  return (
    <main className='w-full min-h-[90dvh] flex flex-col gap-6 justify-center items-center p-6'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center space-y-4'>
          <div className='relative flex justify-center'>
            <Avatar className='w-24 h-24'>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className='text-2xl font-semibold bg-primary/10 text-primary'>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button 
              size='icon' 
              variant='secondary' 
              className='absolute -bottom-1 -right-1 size-7 rounded-full shadow-md'
            >
              <Camera className='w-4 h-4' />
            </Button>
          </div>
          <div className='relative'>
            <CardTitle className='text-2xl font-bold pr-20'>{user.name}</CardTitle>
            <Button 
              size='sm' 
              variant='outline' 
              className='absolute right-0 top-1/2 -translate-y-1/2'
            >
              Edit
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className='space-y-6'>
          {/* Email Section */}
          <div className='flex items-center justify-between py-2'>
            <div className='flex items-center gap-3'>
              <Mail className='w-5 h-5 text-muted-foreground' />
              <div>
                <p className='text-sm text-muted-foreground'>Email</p>
                <p className='font-medium'>{user.email}</p>
              </div>
            </div>
            <Button variant='outline' size='sm'>
              Change
            </Button>
          </div>

          {/* Password Section */}
          <div className='flex items-center justify-between py-2'>
            <div className='flex items-center gap-3'>
              <Lock className='w-5 h-5 text-muted-foreground' />
              <div>
                <p className='text-sm text-muted-foreground'>Password</p>
                <p className='font-medium'>••••••••</p>
              </div>
            </div>
            <Button asChild variant='outline' size='sm'>
              <Link href='/reset-password'>
                Change
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}