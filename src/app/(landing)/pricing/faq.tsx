import { Card, CardContent } from '@/components/ui/card'
import { Clock, CreditCard, Users } from 'lucide-react'

const faqs = [
  {
    question: 'How quickly will I see results?',
    answer: 'Most customers see measurable results within 14 days. Our platform is designed to deliver value from day one.',
    icon: Clock
  },
  {
    question: 'What does the free trial include?',
    answer: 'Full access to all plan features for 14 days, including unlimited integrations and advanced analytics.',
    icon: CreditCard
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely! You can cancel your subscription at any time with no penalties or hidden fees.',
    icon: Users
  }
]

export default function Faq() {
  return (
    <div className='max-w-4xl mx-auto mb-20'>
      <div className='text-center mb-16'>
        <h2 className='text-4xl font-bold mb-4'>
          Frequently asked questions
        </h2>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Everything you need to know about our pricing and features
        </p>
      </div>

      <div className='space-y-6'>
        {faqs.map((faq, index) => (
          <Card key={index} className='hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md'>
            <CardContent className='p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1'>
                  <faq.icon className='h-6 w-6 text-primary' />
                </div>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold mb-3 text-foreground'>
                    {faq.question}
                  </h3>
                  <p className='text-muted-foreground leading-relaxed text-lg'>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}