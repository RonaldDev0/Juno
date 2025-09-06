import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Check
} from 'lucide-react'

export default function Hero() {
  return (
    <section className='relative py-16 md:py-20 px-4 overflow-hidden'>
      <div className='relative container mx-auto max-w-4xl text-center'>
        <div className='space-y-8'>
          {/* Main Headline */}
          <div className='space-y-4'>
            <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight'>
              Automate
              <span className='bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent block'>Everything</span>
            </h1>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
              The complete workflow automation platform for modern enterprises.
              Build, scale, and grow with powerful automation tools.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Button asChild size='lg' className='text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground border-0 group'>
              <Link href='/pricing'>
                Start Free Trial
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' className='text-lg px-8 py-6 border-border text-foreground hover:bg-accent hover:border-primary/50'>
              <Link href='/demo'>Watch Demo</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className='flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <Check className='h-4 w-4 text-green-500' />
              <span>14-day free trial</span>
            </div>
            <div className='flex items-center gap-2'>
              <Check className='h-4 w-4 text-green-500' />
              <span>Setup in 5 minutes</span>
            </div>
            <div className='flex items-center gap-2'>
              <Check className='h-4 w-4 text-green-500' />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}