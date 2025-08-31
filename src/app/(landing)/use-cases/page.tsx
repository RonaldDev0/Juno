import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Building2, Users, BarChart3, Shield, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const useCases = [
  {
    icon: Building2,
    title: 'Startups & Scale-ups',
    description: 'Accelerate your growth with data-driven insights and scalable processes',
    features: [
      'Rapid market validation',
      'Team scaling tools',
      'Investor-ready metrics',
      'Growth analytics'
    ],
    cta: 'Learn more',
    href: '/'
  },
  {
    icon: Users,
    title: 'Enterprise Teams',
    description: 'Streamline operations across departments with enterprise-grade security',
    features: [
      'Multi-department management',
      'Advanced permissions',
      'Compliance tools',
      'Enterprise integrations'
    ],
    cta: 'Learn more',
    href: '/'
  },
  {
    icon: BarChart3,
    title: 'Marketing Agencies',
    description: 'Manage multiple clients and campaigns with powerful analytics',
    features: [
      'Client dashboard',
      'Campaign tracking',
      'ROI analytics',
      'Automated reporting'
    ],
    cta: 'Learn more',
    href: '/'
  },
  {
    icon: Shield,
    title: 'Financial Services',
    description: 'Ensure compliance and security while optimizing operations',
    features: [
      'Audit trails',
      'Data encryption',
      'Regulatory compliance',
      'Risk management'
    ],
    cta: 'Learn more',
    href: '/'
  },
  {
    icon: Target,
    title: 'E-commerce',
    description: 'Optimize your online business with comprehensive analytics',
    features: [
      'Sales tracking',
      'Customer insights',
      'Inventory management',
      'Performance metrics'
    ],
    cta: 'Learn more',
    href: '/'
  },
  {
    icon: TrendingUp,
    title: 'Consulting Firms',
    description: 'Deliver exceptional client value with streamlined project management',
    features: [
      'Project tracking',
      'Client collaboration',
      'Resource allocation',
      'Performance analytics'
    ],
    cta: 'Learn more',
    href: '/'
  }
]

export default function UseCasesPage() {
  return (
    <main className='w-full min-h-screen py-20 px-4'>
      <div className='container mx-auto max-w-6xl'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            Built for every business
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Discover how Juno adapts to your industry and business model, providing tailored solutions that drive real results.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {useCases.map((useCase) => (
            <Card key={useCase.title} className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group'>
              <CardHeader className='text-center'>
                <div className='w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors'>
                  <useCase.icon className='h-8 w-8 text-primary' />
                </div>
                <CardTitle className='text-xl'>{useCase.title}</CardTitle>
                <CardDescription className='text-base'>
                  {useCase.description}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <ul className='space-y-2'>
                  {useCase.features.map((feature) => (
                    <li key={feature} className='text-sm text-muted-foreground'>
                      • {feature}
                    </li>
                  ))}
                </ul>
                
                <Button asChild variant='outline' className='w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors'>
                  <Link href={useCase.href}>
                    {useCase.cta}
                    <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-4'>
            Success stories from our customers
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
            See how businesses like yours are achieving remarkable results with Juno
          </p>
          
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center p-6 rounded-lg bg-muted/30'>
              <div className='text-3xl font-bold text-primary mb-2'>3.2x</div>
              <div className='text-sm text-muted-foreground'>Average revenue increase</div>
            </div>
            <div className='text-center p-6 rounded-lg bg-muted/30'>
              <div className='text-3xl font-bold text-primary mb-2'>67%</div>
              <div className='text-sm text-muted-foreground'>Faster decision making</div>
            </div>
            <div className='text-center p-6 rounded-lg bg-muted/30'>
              <div className='text-3xl font-bold text-primary mb-2'>89%</div>
              <div className='text-sm text-muted-foreground'>Customer satisfaction</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center p-12 bg-primary/5 rounded-2xl'>
          <h2 className='text-3xl font-bold mb-4'>
            Ready to see Juno in action?
          </h2>
          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Join thousands of businesses that have transformed their operations with Juno
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild size='lg' className='text-lg px-8 py-6'>
              <Link href='/'>
                Start free trial
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' className='text-lg px-8 py-6'>
              <Link href='/pricing'>View pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
