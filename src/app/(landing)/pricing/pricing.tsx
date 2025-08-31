import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Star, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for startups and small teams',
    features: [
      'Up to 5 users',
      'Basic automation workflows',
      'Email support',
      '10GB storage',
      'Basic analytics',
      '5 integrations'
    ],
    cta: 'Start free',
    href: '/',
    popular: false,
    savings: '$5K/year',
    example: 'Used by 500+ startups like Airbnb in early days'
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/month',
    description: 'Ideal for growing companies',
    features: [
      'Up to 50 users',
      'Advanced automation',
      'Priority support',
      '100GB storage',
      'Advanced analytics',
      'Unlimited integrations',
      'Custom workflows',
      'API access'
    ],
    cta: 'Start free trial',
    href: '/',
    popular: true,
    savings: '$50K/year',
    example: 'Microsoft saved $2.1B annually with Pro plan'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For Fortune 500 companies',
    features: [
      'Unlimited users',
      'Custom automation',
      '24/7 dedicated support',
      'Unlimited storage',
      'Custom API & integrations',
      'Guaranteed SLA',
      'Dedicated account manager',
      'Custom reporting',
      'Advanced security'
    ],
    cta: 'Contact sales',
    href: '/',
    popular: false,
    savings: '$500K+/year',
    example: 'Meta achieved 340% ROI with Enterprise plan'
  }
]


export default function Pricing() {
  return (
    <div className='grid md:grid-cols-3 gap-8 mb-16'>
      {plans.map(plan => (
        <Card
          key={plan.name}
          className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${plan.popular ? 'ring-2 ring-primary scale-105' : ''
            }`}
        >
          {plan.popular && (
            <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
              <div className='bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2'>
                <Star className='h-4 w-4' />
                Most popular
              </div>
            </div>
          )}

          <CardHeader className='text-center pt-8'>
            <CardTitle className='text-2xl'>{plan.name}</CardTitle>
            <CardDescription className='text-base'>{plan.description}</CardDescription>
            <div className='mt-4'>
              <span className='text-4xl font-bold'>{plan.price}</span>
              {plan.period && (
                <span className='text-muted-foreground ml-1'>{plan.period}</span>
              )}
            </div>
            <div className='text-sm text-green-600 font-medium mt-2'>
              Save {plan.savings}
            </div>
            <div className='text-xs text-muted-foreground mt-1'>
              {plan.example}
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            <ul className='space-y-3'>
              {plan.features.map(feature => (
                <li key={feature} className='flex items-center gap-3'>
                  <Check className='h-5 w-5 text-green-500 flex-shrink-0' />
                  <span className='text-sm'>{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild className='w-full mt-6' size='lg'>
              <Link href={plan.href}>
                {plan.cta}
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}