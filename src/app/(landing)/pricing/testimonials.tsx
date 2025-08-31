import { Card } from '@/components/ui/card'

const testimonials = [
  {
    company: 'Microsoft',
    role: 'CTO',
    name: 'Sarah Johnson',
    quote: 'Saved $2.1B annually in operational costs',
    avatar: 'MS'
  },
  {
    company: 'Meta',
    role: 'VP Engineering',
    name: 'Mike Chen',
    quote: '340% increase in ad campaign ROI',
    avatar: 'M'
  },
  {
    company: 'Amazon',
    role: 'Head of Operations',
    name: 'Lisa Wang',
    quote: '47% conversion rate improvement',
    avatar: 'A'
  }
]

export default function Testimonials() {
  return (
    <div className='mb-16'>
      <h2 className='text-3xl font-bold text-center mb-12'>
        Trusted by industry leaders
      </h2>
      <div className='grid md:grid-cols-3 gap-8'>
        {testimonials.map(testimonial => (
          <Card key={testimonial.company} className='text-center p-6'>
            <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-primary font-bold'>{testimonial.avatar}</span>
            </div>
            <blockquote className='text-lg font-medium mb-4'>
              "{testimonial.quote}"
            </blockquote>
            <div className='text-sm text-muted-foreground'>
              <div className='font-medium text-foreground'>{testimonial.name}</div>
              <div>{testimonial.role}, {testimonial.company}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}