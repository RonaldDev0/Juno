import {
  Check,
  Shield,
  Workflow,
  BarChart,
  Timer,
  Zap
} from 'lucide-react'

export default function Features() {
  return (
    <section className='py-16 md:py-20 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4'>
            <Zap className='h-4 w-4' />
            <span>Most Popular Choice</span>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
            Transform your business in <span className='text-primary'>14 days</span>
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Join 10,000+ companies that increased revenue by 300% with our proven automation platform
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          <div className='relative text-center space-y-4 p-6 md:p-8 rounded-xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group'>
            <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
              <div className='px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full'>
                #1 CHOICE
              </div>
            </div>
            <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
              <Workflow className='h-8 w-8 text-primary' />
            </div>
            <h3 className='text-2xl font-bold text-foreground'>
              Workflow Automation
            </h3>
            <p className='text-muted-foreground text-lg'>
              <strong className='text-foreground'>Save 40+ hours per week</strong> with AI-powered automation that pays for itself in 30 days
            </p>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-3'>
                <Check className='h-5 w-5 text-green-500 flex-shrink-0 mt-0.5' />
                <span><strong className='text-foreground'>No-code builder</strong> - Setup in minutes, not months</span>
              </li>
              <li className='flex items-start gap-3'>
                <Check className='h-5 w-5 text-green-500 flex-shrink-0 mt-0.5' />
                <span><strong className='text-foreground'>500+ integrations</strong> - Works with your existing tools</span>
              </li>
              <li className='flex items-start gap-3'>
                <Check className='h-5 w-5 text-green-500 flex-shrink-0 mt-0.5' />
                <span><strong className='text-foreground'>ROI guarantee</strong> - See results in 14 days or money back</span>
              </li>
            </ul>
            <div className='pt-4'>
              <div className='text-2xl font-bold text-primary mb-2'>$50,000+</div>
              <div className='text-sm text-muted-foreground'>Average annual savings</div>
            </div>
          </div>

          <div className='text-center space-y-4 p-6 md:p-8 rounded-xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group'>
            <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
              <BarChart className='h-8 w-8 text-primary' />
            </div>
            <h3 className='text-2xl font-bold text-foreground'>Business Intelligence</h3>
            <p className='text-muted-foreground text-lg'>
              <strong className='text-foreground'>Make data-driven decisions</strong> with insights that drive 300% faster growth
            </p>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-3'>
                <Check className='h-5 w-5 text-green-500 flex-shrink-0 mt-0.5' />
                <span><strong className='text-foreground'>Real-time dashboards</strong> - Monitor performance 24/7</span>
              </li>
              <li className='flex items-start gap-3'>
                <Check className='h-5 w-5 text-green-500 flex-shrink-0 mt-0.5' />
                <span><strong className='text-foreground'>Predictive analytics</strong> - Forecast trends before competitors</span>
              </li>
              <li className='flex items-start gap-3'>
                <Check className='h-5 w-5 text-green-500 flex-shrink-0 mt-0.5' />
                <span><strong className='text-foreground'>Automated insights</strong> - Get actionable recommendations daily</span>
              </li>
            </ul>
            <div className='pt-4'>
              <div className='text-2xl font-bold text-primary mb-2'>300%</div>
              <div className='text-sm text-muted-foreground'>Average growth increase</div>
            </div>
          </div>

          <div className='text-center space-y-4 p-6 md:p-8 rounded-xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group'>
            <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
              <Shield className='h-8 w-8 text-primary' />
            </div>
            <h3 className='text-2xl font-bold text-foreground'>Enterprise Security</h3>
            <p className='text-muted-foreground text-lg'>
              <strong className='text-foreground'>Bank-level protection</strong> that keeps your data safe and compliant
            </p>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-3'>
                <Check className='h-5 w-5 text-green-500 flex-shrink-0 mt-0.5' />
                <span><strong className='text-foreground'>SOC 2 Type II certified</strong> - Enterprise-grade security</span>
              </li>
              <li className='flex items-start gap-3'>
                <Check className='h-5 w-5 text-green-500 flex-shrink-0 mt-0.5' />
                <span><strong className='text-foreground'>SSO & MFA</strong> - Secure access for your team</span>
              </li>
              <li className='flex items-start gap-3'>
                <Check className='h-5 w-5 text-green-500 flex-shrink-0 mt-0.5' />
                <span><strong className='text-foreground'>GDPR & HIPAA ready</strong> - Compliance built-in</span>
              </li>
            </ul>
            <div className='pt-4'>
              <div className='text-2xl font-bold text-primary mb-2'>99.9%</div>
              <div className='text-sm text-muted-foreground'>Uptime guarantee</div>
            </div>
          </div>
        </div>

        <div className='text-center mt-12'>
          <div className='inline-flex items-center gap-4 px-6 py-3 rounded-full bg-primary/10 border border-primary/20'>
            <div className='flex items-center gap-2'>
              <Timer className='h-4 w-4 text-primary' />
              <span className='text-sm font-medium text-foreground'>Limited Time: 50% off first year</span>
            </div>
            <div className='w-px h-4 bg-border' />
            <div className='flex items-center gap-2'>
              <Check className='h-4 w-4 text-green-500' />
              <span className='text-sm font-medium text-foreground'>14-day free trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}