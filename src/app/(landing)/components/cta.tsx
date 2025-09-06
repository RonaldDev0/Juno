import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className='relative py-16 md:py-20 px-4 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground'>
      {/* Background decoration */}
      <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent'></div>
      <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32'></div>
      <div className='absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24'></div>
      
      <div className='relative container mx-auto max-w-4xl text-center z-10'>
        <div className='space-y-8'>
          {/* Headline */}
          <div className='space-y-4'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              Ready to get started?
            </h2>
            <p className='text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed'>
              Choose your plan and start building something amazing today. 
              <span className='block mt-2 text-lg font-semibold'>No setup fees, no hidden costs.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-10'>
            <Button asChild size='lg' className='bg-background text-primary font-bold hover:bg-background/90 h-14 px-8 text-lg group'>
              <Link href='/pricing'>
                Get started now
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Link>
            </Button>
            <Button asChild variant='outline' size='lg' className='border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg'>
              <Link href='/'>Contact us</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className='flex flex-col sm:flex-row gap-6 justify-center items-center text-sm opacity-90'>
            <div className='flex items-center gap-2'>
              <Check className='h-5 w-5 text-green-400' />
              <span className='font-medium'>No setup fees</span>
            </div>
            <div className='flex items-center gap-2'>
              <Check className='h-5 w-5 text-green-400' />
              <span className='font-medium'>Cancel anytime</span>
            </div>
            <div className='flex items-center gap-2'>
              <Check className='h-5 w-5 text-green-400' />
              <span className='font-medium'>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}