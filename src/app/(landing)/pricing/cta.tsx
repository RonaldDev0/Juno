import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export default function Cta() {
  return (
    <div className='text-center p-12 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl'>
      <h2 className='text-3xl font-bold mb-4'>
        Ready to join 10,000+ success stories?
      </h2>
      <p className='text-xl opacity-90 mb-8 max-w-2xl mx-auto'>
        Start your 14-day free trial today. No credit card required.
      </p>
      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <Button asChild size='lg' className='bg-background text-primary font-bold hover:bg-background/90'>
          <Link href='/'>Start free trial</Link>
        </Button>
        <Button asChild variant='outline' size='lg' className='border-background/30 text-primary-foreground'>
          <Link href='/'>Contact sales</Link>
        </Button>
      </div>
      <div className='flex flex-col sm:flex-row gap-6 justify-center items-center text-sm opacity-80 mt-8'>
        <div className='flex items-center gap-2'>
          <Check className='h-4 w-4 text-green-400' />
          <span>14-day free trial</span>
        </div>
        <div className='flex items-center gap-2'>
          <Check className='h-4 w-4 text-green-400' />
          <span>Cancel anytime</span>
        </div>
        <div className='flex items-center gap-2'>
          <Check className='h-4 w-4 text-green-400' />
          <span>24/7 support</span>
        </div>
      </div>
    </div>
  )
}