import {
  Check,
  Star,
  Timer,
  Zap,
  Building2,
  TrendingUp
} from 'lucide-react'

export default function Testimonials() {
  return (
    <section className='py-16 md:py-20 px-4 bg-gradient-to-r from-background via-card/20 to-background'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4'>
            <Star className='h-4 w-4' />
            <span>Customer Success Stories</span>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
            See the results our customers achieve
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Real stories from real companies that transformed their business with our platform
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          <div className='relative space-y-6 p-8 rounded-xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group'>
            <div className='absolute -top-3 left-4'>
              <div className='px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full'>
                ROI: 400%
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                <Building2 className='h-6 w-6 text-primary' />
              </div>
              <div>
                <h3 className='font-bold text-foreground'>Microsoft</h3>
                <p className='text-sm text-muted-foreground'>Enterprise Technology</p>
                <div className='flex items-center gap-1 mt-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                  ))}
                </div>
              </div>
            </div>
            <blockquote className='text-base italic text-muted-foreground leading-relaxed'>
              "Juno's workflow automation helped us reduce operational costs by 40% and increase productivity by 300%. The ROI was immediate and continues to grow."
            </blockquote>
            <div className='pt-4 border-t border-border'>
              <div className='flex items-center justify-between text-sm'>
                <span className='font-medium text-foreground'>Sarah Johnson, CTO</span>
                <span className='text-green-500 font-semibold'>$2.1M saved annually</span>
              </div>
            </div>
          </div>

          <div className='relative space-y-6 p-8 rounded-xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group'>
            <div className='absolute -top-3 left-4'>
              <div className='px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-bold rounded-full'>
                Growth: 500%
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                <TrendingUp className='h-6 w-6 text-primary' />
              </div>
              <div>
                <h3 className='font-bold text-foreground'>Google</h3>
                <p className='text-sm text-muted-foreground'>Cloud & AI Platform</p>
                <div className='flex items-center gap-1 mt-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                  ))}
                </div>
              </div>
            </div>
            <blockquote className='text-base italic text-muted-foreground leading-relaxed'>
              "The business intelligence features gave us insights we never had before. We've grown 500% in the last 18 months thanks to data-driven decisions."
            </blockquote>
            <div className='pt-4 border-t border-border'>
              <div className='flex items-center justify-between text-sm'>
                <span className='font-medium text-foreground'>Michael Chen, CEO</span>
                <span className='text-blue-500 font-semibold'>18 months to scale</span>
              </div>
            </div>
          </div>

          <div className='relative space-y-6 p-8 rounded-xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group'>
            <div className='absolute -top-3 left-4'>
              <div className='px-3 py-1 bg-primary/60 text-primary-foreground text-xs font-bold rounded-full'>
                Time: 60hrs/week
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                <Zap className='h-6 w-6 text-primary' />
              </div>
              <div>
                <h3 className='font-bold text-foreground'>Amazon</h3>
                <p className='text-sm text-muted-foreground'>E-commerce & Cloud</p>
                <div className='flex items-center gap-1 mt-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                  ))}
                </div>
              </div>
            </div>
            <blockquote className='text-base italic text-muted-foreground leading-relaxed'>
              "We automated 80% of our manual processes. Our team now focuses on innovation instead of repetitive tasks. Game-changer for our productivity."
            </blockquote>
            <div className='pt-4 border-t border-border'>
              <div className='flex items-center justify-between text-sm'>
                <span className='font-medium text-foreground'>Alex Rodriguez, CTO</span>
                <span className='text-purple-500 font-semibold'>80% automation</span>
              </div>
            </div>
          </div>
        </div>

        <div className='text-center mt-12'>
          <div className='inline-flex items-center gap-4 px-6 py-3 rounded-full bg-primary/10 border border-primary/20'>
            <div className='flex items-center gap-2'>
              <Check className='h-4 w-4 text-green-500' />
              <span className='text-sm font-medium text-foreground'>Join 10,000+ success stories</span>
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