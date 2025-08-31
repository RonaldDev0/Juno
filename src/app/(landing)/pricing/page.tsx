import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Star, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for getting started and testing the platform',
    features: [
      'Up to 3 users',
      'Basic features',
      'Email support',
      '1GB storage',
      'Basic reports'
    ],
    cta: 'Start free',
    href: '/',
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Ideal for growing teams',
    features: [
      'Up to 10 users',
      'All features',
      'Priority support',
      '10GB storage',
      'Advanced reports',
      'Integrations',
      'Auto backup'
    ],
    cta: 'Start free trial',
    href: '/',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with specific needs',
    features: [
      'Unlimited users',
      'Custom features',
      '24/7 support',
      'Unlimited storage',
      'Custom API',
      'Guaranteed SLA',
      'Dedicated onboarding'
    ],
    cta: 'Contact sales',
    href: '/',
    popular: false
  }
]

export default function PricingPage() {
  return (
    <main className='w-full min-h-screen py-20 px-4'>
      <div className='container mx-auto max-w-6xl'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            Simple and transparent pricing
          </h1>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Choose the plan that best fits your needs. All plans include 14 days free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
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
              </CardHeader>
              
              <CardContent className='space-y-4'>
                <ul className='space-y-3'>
                  {plan.features.map((feature) => (
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

        {/* FAQ Section */}
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Frequently asked questions
          </h2>
          
          <div className='space-y-6'>
            <div className='border-b pb-6'>
              <h3 className='text-lg font-semibold mb-2'>
                Can I change plans at any time?
              </h3>
              <p className='text-muted-foreground'>
                Yes, you can switch between plans at any time. Changes are applied immediately and prorated.
              </p>
            </div>
            
            <div className='border-b pb-6'>
              <h3 className='text-lg font-semibold mb-2'>
                What does the 14-day free trial include?
              </h3>
              <p className='text-muted-foreground'>
                Full access to all Pro plan features for 14 days, no commitment and no credit card required.
              </p>
            </div>
            
            <div className='border-b pb-6'>
              <h3 className='text-lg font-semibold mb-2'>
                Do you offer discounts for large teams?
              </h3>
              <p className='text-muted-foreground'>
                Yes, for teams with more than 10 users we offer volume discounts. Contact our sales team.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className='text-center mt-16 p-8 bg-primary/5 rounded-2xl'>
          <h2 className='text-2xl font-bold mb-4'>
            Not sure which plan to choose?
          </h2>
          <p className='text-muted-foreground mb-6'>
            Our team is here to help you find the best option for your business.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild variant='outline' size='lg'>
              <Link href='/'>Start free trial</Link>
            </Button>
            <Button asChild size='lg'>
              <Link href='/'>Contact team</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
