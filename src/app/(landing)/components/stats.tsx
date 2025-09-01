import {
  Check,
  Globe,
  Timer,
  Zap,
  Building2,
  TrendingUp
} from 'lucide-react'

export default function Stats() {
  return (
    <section className='py-16 md:py-20 px-4 bg-gradient-to-r from-background via-card/30 to-background'>
      <div className='container mx-auto max-w-5xl'>
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4'>
            <TrendingUp className='h-4 w-4' />
            <span>Proven Results</span>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
            Numbers that speak for themselves
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Join thousands of companies achieving extraordinary results with our platform
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          <div className='text-center space-y-4 p-8 rounded-xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group'>
            <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
              <Building2 className='h-8 w-8 text-primary' />
            </div>
            <div className='space-y-2'>
              <div className='text-4xl md:text-5xl font-bold text-primary'>10,000+</div>
              <div className='text-lg font-semibold text-foreground'>Enterprise Customers</div>
              <div className='text-sm text-muted-foreground'>Trust us with their business</div>
            </div>
            <div className='pt-4 border-t border-border'>
              <div className='text-2xl font-bold text-green-500'>$2.5B+</div>
              <div className='text-xs text-muted-foreground'>Total revenue generated</div>
            </div>
          </div>

          <div className='text-center space-y-4 p-8 rounded-xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group'>
            <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
              <Zap className='h-8 w-8 text-primary' />
            </div>
            <div className='space-y-2'>
              <div className='text-4xl md:text-5xl font-bold text-primary'>300%</div>
              <div className='text-lg font-semibold text-foreground'>Average ROI Increase</div>
              <div className='text-sm text-muted-foreground'>In just 90 days</div>
            </div>
            <div className='pt-4 border-t border-border'>
              <div className='text-2xl font-bold text-green-500'>40hrs/week</div>
              <div className='text-xs text-muted-foreground'>Time saved per team</div>
            </div>
          </div>

          <div className='text-center space-y-4 p-8 rounded-xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group'>
            <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
              <Globe className='h-8 w-8 text-primary' />
            </div>
            <div className='space-y-2'>
              <div className='text-4xl md:text-5xl font-bold text-primary'>500+</div>
              <div className='text-lg font-semibold text-foreground'>App Integrations</div>
              <div className='text-sm text-muted-foreground'>Connect everything instantly</div>
            </div>
            <div className='pt-4 border-t border-border'>
              <div className='text-2xl font-bold text-green-500'>5min</div>
              <div className='text-xs text-muted-foreground'>Average setup time</div>
            </div>
          </div>
        </div>

        <div className='text-center mt-12'>
          <div className='inline-flex items-center gap-4 px-6 py-3 rounded-full bg-primary/10 border border-primary/20'>
            <div className='flex items-center gap-2'>
              <Check className='h-4 w-4 text-green-500' />
              <span className='text-sm font-medium text-foreground'>Money-back guarantee</span>
            </div>
            <div className='w-px h-4 bg-border' />
            <div className='flex items-center gap-2'>
              <Timer className='h-4 w-4 text-primary' />
              <span className='text-sm font-medium text-foreground'>See results in 14 days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}