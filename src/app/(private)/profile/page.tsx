'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { useSubscriptionStore, selectSubscription, selectHasActiveSubscription, selectLoading } from '@/store/subscription'
import { Calendar, Mail, Copy } from 'lucide-react'
import { useUserStore, selectUser, selectUserLoading } from '@/store/user'

export default function ProfilePage() {
  // Replace local state with cached user store
  const user = useUserStore(selectUser)
  const userLoading = useUserStore(selectUserLoading)

  const subscription = useSubscriptionStore(selectSubscription)
  const hasActiveSubscription = useSubscriptionStore(selectHasActiveSubscription)
  const subLoading = useSubscriptionStore(selectLoading)

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(user?.id || '')
      toast.success('User ID copied')
    } catch {
      toast.error('Failed to copy')
    }
  }

  if (userLoading && !user) {
    return (
      <div className='flex min-h-[90dvh] items-center justify-center p-4'>
        <div className='w-full max-w-xl space-y-6'>
          <Card>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-4'>
                <Skeleton className='h-16 w-16 rounded-lg' />
                <div className='space-y-2 w-full'>
                  <Skeleton className='h-5 w-40' />
                  <Skeleton className='h-4 w-56' />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className='h-5 w-56' />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const displayUsername = user?.user_metadata?.username || 'User'
  const displayAvatar = user?.user_metadata?.avatar_url || ''
  const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString() : null

  return (
    <div className='flex min-h-[90dvh] items-center justify-center p-4'>
      <div className='w-full max-w-xl space-y-6'>
        {/* Account Card */}
        <Card>
          <CardContent className='space-y-6'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
              <Avatar className='h-16 w-16 rounded-lg'>
                <AvatarImage src={displayAvatar} alt={displayUsername} />
                <AvatarFallback className='rounded-lg'>
                  {displayUsername?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className='space-y-1'>
                <div className='text-lg font-semibold'>{displayUsername}</div>
                <div className='mt-0.5 flex items-center gap-2 text-sm text-muted-foreground'>
                  <Mail className='size-4' />
                  <span>{user?.email}</span>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                  {joinedDate && (
                    <span className='inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground'>
                      <Calendar className='size-3' /> Joined {joinedDate}
                    </span>
                  )}
                  <span className='inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground font-mono'>
                    id: {user?.id?.slice(0, 6)}…
                  </span>
                  <Button variant='secondary' size='sm' onClick={handleCopyId} className='h-7 px-2'>
                    <Copy className='size-3' /> Copy ID
                  </Button>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <Link href='/reset-password' className='text-sm underline-offset-4 hover:underline text-muted-foreground'>
                Reset password
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Card */}
        <Card>
          <CardHeader className='flex items-center justify-between'>
            <CardTitle>Subscription</CardTitle>
            <Link href='/subscription'>
              <Button size='sm' variant='secondary' className='h-8'>Manage subscription</Button>
            </Link>
          </CardHeader>
          <CardContent className='space-y-3 text-sm'>
            {subLoading ? (
              <Skeleton className='h-5 w-56' />
            ) : hasActiveSubscription && subscription ? (
              <>
                <div className='flex items-center gap-2'>
                  <Badge className='bg-emerald-600 text-white hover:bg-emerald-600/90'>Active</Badge>
                  <span className='font-medium'>{subscription.plan_name}</span>
                </div>
                <div className='text-muted-foreground'>
                  Billing: {subscription.billing_cycle} · Renews {new Date(subscription.current_period_end).toLocaleDateString()}
                </div>
              </>
            ) : (
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Badge variant='secondary'>Inactive</Badge>
                <span>No active subscription</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}