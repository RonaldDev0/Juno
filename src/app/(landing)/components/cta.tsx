import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Check,
  Timer
} from 'lucide-react'

export default function CTA() {
  return (
    <section className='py-16 md:py-20 px-4 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground'>
      <div className='container mx-auto max-w-4xl text-center'>
        <div className='space-y-8'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 text-primary-foreground text-sm font-medium border border-background/30'>
            <Timer className='h-4 w-4' />
            <span>50% Off Enterprise Plans - Limited Time</span>
          </div>

          {/* Headline */}
          <div className='space-y-4'>
            <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
              Ready to transform your business?
            </h2>
            <p className='text-xl opacity-90 max-w-2xl mx-auto'>
              Join 10,000+ enterprises achieving 300% growth.
              <br />
              Start your automation journey today.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Button asChild size='lg' className='text-lg font-bold px-8 py-6 bg-background text-primary hover:bg-background/90 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
              <Link href='/pricing'>
                Start Free Trial
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' className='text-lg px-8 py-6 border-background/30 text-primary-foreground hover:bg-background/10'>
              <Link href='/demo'>Watch Demo</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className='flex flex-col sm:flex-row gap-6 justify-center items-center text-sm opacity-80'>
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
      </div>
    </section>
  )
}