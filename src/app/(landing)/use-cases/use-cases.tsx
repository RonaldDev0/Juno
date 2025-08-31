import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowRight, 
  Building2, 
  Users, 
  BarChart3, 
  Shield, 
  Target, 
  TrendingUp,
  Check
} from 'lucide-react'
import Link from 'next/link'

const useCases = [
  {
    icon: Building2,
    title: 'Startups & Scale-ups',
    description: 'How Airbnb scaled from 100 to 10,000 employees in 2 years',
    features: [
      'Automated hiring processes',
      'Real-time performance tracking',
      'Investor reporting automation',
      'Growth analytics dashboard'
    ],
    metric: '75% faster scaling',
    cta: 'Learn more',
    href: '/'
  },
  {
    icon: Users,
    title: 'Enterprise Teams',
    description: 'Microsoft reduced operational costs by $2.1B annually',
    features: [
      'Multi-department workflow automation',
      'Advanced security protocols',
      'Compliance automation',
      'Enterprise-wide integrations'
    ],
    metric: '$2.1B saved annually',
    cta: 'Learn more',
    href: '/'
  },
  {
    icon: BarChart3,
    title: 'Marketing Agencies',
    description: 'Meta increased ad campaign ROI by 340% with automated insights',
    features: [
      'Real-time campaign optimization',
      'Automated A/B testing',
      'ROI prediction models',
      'Client reporting automation'
    ],
    metric: '340% ROI increase',
    cta: 'Learn more',
    href: '/'
  },
  {
    icon: Shield,
    title: 'Financial Services',
    description: 'JPMorgan Chase processed 10x more transactions with zero errors',
    features: [
      'Automated fraud detection',
      'Real-time compliance monitoring',
      'Risk assessment automation',
      'Secure data encryption'
    ],
    metric: '10x transaction capacity',
    cta: 'Learn more',
    href: '/'
  },
  {
    icon: Target,
    title: 'E-commerce',
    description: 'Amazon increased conversion rates from 3% to 47%',
    features: [
      'Personalized product recommendations',
      'Dynamic pricing optimization',
      'Inventory management automation',
      'Customer behavior analytics'
    ],
    metric: '47% conversion rate',
    cta: 'Learn more',
    href: '/'
  },
  {
    icon: TrendingUp,
    title: 'Consulting Firms',
    description: 'McKinsey managed 500+ projects with 95% client satisfaction',
    features: [
      'Project timeline automation',
      'Resource allocation optimization',
      'Client collaboration tools',
      'Performance analytics'
    ],
    metric: '95% client satisfaction',
    cta: 'Learn more',
    href: '/'
  }
]

export default function UseCases() {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {useCases.map((useCase) => (
        <Card key={useCase.title} className='group hover:shadow-lg transition-all duration-300'>
          <CardHeader className='text-center'>
            <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <useCase.icon className='h-6 w-6 text-primary' />
            </div>
            <CardTitle className='text-xl'>{useCase.title}</CardTitle>
            <CardDescription className='text-base'>
              {useCase.description}
            </CardDescription>
            <div className='text-sm font-medium text-primary mt-2'>
              {useCase.metric}
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <ul className='space-y-2'>
              {useCase.features.map((feature) => (
                <li key={feature} className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Check className='h-4 w-4 text-green-500' />
                  {feature}
                </li>
              ))}
            </ul>

            <Button asChild variant='outline' className='w-full'>
              <Link href={useCase.href}>
                {useCase.cta}
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}