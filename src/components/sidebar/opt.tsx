import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function Opt() {
  return (
    <Card className='gap-2 py-4 shadow-none'>
      <CardHeader className='space-y-2 mb-2'>
        <CardTitle className='text-sm w-full flex justify-center'>Juno Pro</CardTitle>
        <CardDescription>
          Upgrade to unlock custom branding, team members, domains and data rooms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className='bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none'
          size='sm'
          asChild
        >
          <Link href='/pricing'>
            Upgrade
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
