import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Cta() {
  return (
    <div className='text-center mt-16'>
      <Button asChild size='lg'>
        <Link href='/pricing'>
          Get Started
          <ArrowRight className='ml-2 h-5 w-5' />
        </Link>
      </Button>
    </div>
  )
}